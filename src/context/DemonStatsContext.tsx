import React, { createContext, useContext, useState } from "react";
import type { DemonStats } from "../types/DemonStats";

type DemonStatsContextType = {
    stats: DemonStats;
    setStats: React.Dispatch<React.SetStateAction<DemonStats>>;
};

const DemonStatsContext = createContext<DemonStatsContextType | undefined>(undefined);

const initialDemonStats: DemonStats = {
    level: 1,
    hp: 100,
    mp: 50,
};

export const DemonStatsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [stats, setStats] = useState<DemonStats>(initialDemonStats);

    return (
        <DemonStatsContext.Provider value={{ stats, setStats }}>
            {children}
        </DemonStatsContext.Provider>
    );
};

export const useDemonStats = (): DemonStatsContextType => {
    const context = useContext(DemonStatsContext);
    if (!context) {
        throw new Error("useDemonStats must be used within a DemonStatsProvider");
    }
    return context;
};
