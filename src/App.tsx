import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useRoutes } from "react-router-dom";
import routes from "./router";
import { Theme, ThemeProvider } from "./components/theme-provider";
const queryClient = new QueryClient();

function App() {
  const isAuthenticated = window.localStorage.getItem("token") ? true : false;

  const content = useRoutes(routes(isAuthenticated));
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
