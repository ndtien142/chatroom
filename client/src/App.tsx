import "./App.css";
import Router from "./common/routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster
        toastOptions={{
          style: {
            background: "#1f2937",
            border: "1px",
            borderColor: "#4c1d95",
          },
        }}
        position="top-right"
        duration={2000}
      />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
