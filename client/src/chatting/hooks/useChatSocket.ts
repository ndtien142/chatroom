import { useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { useQueryClient, type InfiniteData } from "@tanstack/react-query";
import type {
  IListMessageResponse,
  IListUserConversationResponse,
  IMessageItem,
} from "../chatting.interface";
import { QUERY_KEY } from "@/common/constants/querykey.constant";

let socket: Socket | null = null;

export const useChatSocket = (userId: string) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (userId) {
      socket = io("http://localhost:3055", { auth: { userId } });

      socket.on("receive_message", (message: IMessageItem) => {
        queryClient.setQueryData<InfiniteData<IListMessageResponse>>(
          [QUERY_KEY.GET_LIST_MESSAGE, message.conversationId],
          (oldData) => {
            if (!oldData) {
              return {
                pages: [
                  {
                    message: "",
                    status: 200,
                    metadata: {
                      items: [message],
                      meta: {
                        currentPage: 1,
                        totalPages: 1,
                        totalItems: 1,
                        itemPerPage: 20, // or your default value
                      },
                    },
                  },
                ],
                pageParams: [1],
              } as InfiniteData<IListMessageResponse>;
            }

            const newPages = oldData.pages.map((page, idx) =>
              idx === oldData.pages.length - 1
                ? {
                    ...page,
                    metadata: {
                      ...page.metadata,
                      items: [message, ...page.metadata.items],
                    },
                  }
                : page
            );

            return { ...oldData, pages: newPages };
          }
        );

        queryClient.setQueryData(
          [QUERY_KEY.GET_LIST_CONVERSATION],
          (
            oldData: InfiniteData<IListUserConversationResponse> | undefined
          ) => {
            if (!oldData) return null;

            const newPages = oldData.pages.map((page) => {
              const updatedItems = page.metadata.items.map((conversation) => {
                if (conversation._id === message.conversationId) {
                  const newParticipants = conversation.participants.map((p) =>
                    p.userId?._id === userId ? { ...p, unreadCount: 0 } : p
                  );

                  return {
                    ...conversation,
                    lastMessage: message,
                    updatedAt: message.createdAt,
                    participants: newParticipants,
                  };
                }
                return conversation;
              });

              return {
                ...page,
                metadata: { ...page.metadata, items: updatedItems },
              };
            });

            return { ...oldData, pages: newPages };
          }
        );
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.GET_LIST_CONVERSATION],
        });
      });
    }

    return () => {
      socket?.disconnect();
      socket = null;
    };
  }, [queryClient, userId]);
};

export const getSocket = () => socket;
