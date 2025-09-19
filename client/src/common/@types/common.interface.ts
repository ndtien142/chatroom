export interface ICallbackQuery {
  onSuccess: () => void;
  onError: () => void;
}

export interface IMeta {
  totalPages: number;
  totalItems: number;
  currentPage: number;
  itemPerPage: number;
}
