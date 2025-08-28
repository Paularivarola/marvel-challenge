import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NavigationRoutes from "../routes/NavigationRoutes";
import Layout from "../components/Layout/Layout";
import { FavoritesProvider } from "../context/favorites/FavoritesProvider";
import ErrorBoundary from "../components/ErrorBoundary/ErrorBoundary";
import { BrowserRouter } from "react-router-dom";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 1,
        staleTime: 1000 * 60 * 5,
      },
    },
  });

  return (
    <BrowserRouter>
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <FavoritesProvider>
            <Layout>
              <NavigationRoutes />
            </Layout>
          </FavoritesProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
