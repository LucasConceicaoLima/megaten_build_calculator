import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { getTheme } from "./styles/theme";
import App from "./App";
import { ExpertiseProvider } from "./context/ExpertiseContext";
import { PlayerStatsProvider } from "./context/PlayerStatsContext";
import { DemonStatsProvider } from "./context/DemonStatsContext";
import { PartyStatsProvider } from "./context/PartyStatsContext";
import { CompendiumProvider } from "./context/CompendiumContext";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider theme={getTheme("light")}>
    <CssBaseline />
    <PlayerStatsProvider>
      <DemonStatsProvider>
        <PartyStatsProvider>
          <ExpertiseProvider>
            <CompendiumProvider>
              <App />
            </CompendiumProvider>
          </ExpertiseProvider>
        </PartyStatsProvider>
      </DemonStatsProvider>
    </PlayerStatsProvider>
  </ThemeProvider>
);
