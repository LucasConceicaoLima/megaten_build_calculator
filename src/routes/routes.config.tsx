import {
  Person,
  BarChart,
  Groups,
  Public,
  LibraryBooks,
} from "@mui/icons-material";

import { lazy } from "react";

export interface RouteConfig {
  path: string;
  label?: string;
  icon?: React.ReactNode;
  element: React.ReactNode;
  section?: "build" | "results";
}

const Player = lazy(() => import("../pages/PlayerPage"));
const Demon = lazy(() => import("../pages/DemonPage"));
const Expertises = lazy(() => import("../pages/ExpertisesPage"));
const World = lazy(() => import("../pages/TheWorldPage"));
const PlayerResults = lazy(() => import("../pages/PlayerResultsPage"));
const DemonResults = lazy(() => import("../pages/DemonResultsPage"));
const PartyResults = lazy(() => import("../pages/PartyResultsPage"));

export const routesConfig: RouteConfig[] = [
  {
    path: "/player",
    label: "Player",
    icon: <Person />,
    element: <Player />,
    section: "build",
  },
  {
    path: "/demon",
    label: "Demon",
    icon: <LibraryBooks />,
    element: <Demon />,
    section: "build",
  },
  {
    path: "/expertises",
    label: "Expertises",
    icon: <BarChart />,
    element: <Expertises />,
    section: "build",
  },
  {
    path: "/world",
    label: "The World",
    icon: <Public />,
    element: <World />,
    section: "build",
  },
  {
    path: "/results/player",
    label: "Player",
    icon: <Person />,
    element: <PlayerResults />,
    section: "results",
  },
  {
    path: "/results/demon",
    label: "Demon",
    icon: <LibraryBooks />,
    element: <DemonResults />,
    section: "results",
  },
  {
    path: "/results/party",
    label: "Party",
    icon: <Groups />,
    element: <PartyResults />,
    section: "results",
  },
];