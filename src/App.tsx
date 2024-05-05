import { QueryClient, QueryClientProvider } from "react-query";
import { useRoutes } from "react-router-dom";
import routes from "./router";
import { Theme, ThemeProvider } from "./components/theme-provider";
const queryClient = new QueryClient();

function App() {
  const content = useRoutes(routes());
  const defaoutTheme = localStorage.getItem("vite-ui-theme") as Theme;

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme={defaoutTheme ?? "system"}>
        {content}
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
