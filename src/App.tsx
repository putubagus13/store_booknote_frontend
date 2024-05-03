import { QueryClient, QueryClientProvider } from "react-query";
import { useRoutes } from "react-router-dom";
import routes from "./router";
import { ThemeProvider } from "./components/theme-provider";
const queryClient = new QueryClient();

function App() {
  const content = useRoutes(routes());
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system">{content}</ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
