import { Navigate } from "react-router-dom";
import { MainLayout } from "../shared/layouts/MainLayout";
import PlayerPage from "../pages/PlayerPage";
import DemonPage from "../pages/DemonPage";
import ExpertisesPage from "../pages/ExpertisesPage";
import WorldPage from "../pages/TheWorldPage";
import PlayerResultsPage from "../pages/PlayerResultsPage";
import DemonResultsPage from "../pages/DemonResultsPage";
import PartyResultsPage from "../pages/PartyResultsPage";

export const calculatorRoutes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Navigate to="player" replace /> },
      { path: "player", element: <PlayerPage /> },
      { path: "demon", element: <DemonPage /> },
      { path: "expertises", element: <ExpertisesPage /> },
      { path: "world", element: <WorldPage /> },
      { path: "results/player", element: <PlayerResultsPage /> },
      { path: "results/demon", element: <DemonResultsPage /> },
      { path: "results/party", element: <PartyResultsPage /> },
    ],
  },
];
