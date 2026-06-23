import React, { createContext, useContext, useState } from "react";
import type { PartyStats } from "../types/PartyStats";

type PartyStatsContextType = {
  stats: PartyStats;
 setStats: React.Dispatch<React.SetStateAction<PartyStats>>;
};

const PartyStatsContext = createContext<PartyStatsContextType | undefined>(undefined);

const initialPartyStats: PartyStats = {
  strength: 1,
  magic: 1,
  vitality: 1,
  intelligence: 1,
  speed: 1,
  luck: 1,
};

export const PartyStatsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [stats, setStats] = useState<PartyStats>(initialPartyStats);

  return (
    <PartyStatsContext.Provider value={{ stats, setStats }}>
      {children}
    </PartyStatsContext.Provider>
  );
};

export const usePartyStats = (): PartyStatsContextType => {
  const context = useContext(PartyStatsContext);
  if (!context) {
    throw new Error("usePartyStats must be used within a PartyStatsProvider");
  }
  return context;
};
