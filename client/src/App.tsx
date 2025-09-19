import "./App.css";
import Router from "./common/routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

function App() {
  const queryClient = new QueryClient();
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
    </QueryClientProvider>
  );
}

export default App;
