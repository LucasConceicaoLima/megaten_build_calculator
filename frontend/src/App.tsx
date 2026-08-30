import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes/App.routes";
import { ThemeContextProvider } from "./styles/ThemeContext";
function App() {
  return (
    <ThemeContextProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ThemeContextProvider>
  );
}

export default App;