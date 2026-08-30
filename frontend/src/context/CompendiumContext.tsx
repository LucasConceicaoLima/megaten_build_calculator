import { createContext, useContext, useMemo, useState } from "react";

type CompendiumTotals = {
  HP: number;
  MP: number;
  Strength: number;
  Magic: number;
  Vitality: number;
  Intelligence: number;
  Speed: number;
  Luck: number;
  boosts: Record<string, number>;
  caps: Record<string, number>;
  special: {
    summonSpeed: boolean;
    summonSync: boolean;
    ailmentDefense: boolean;
    limitBreak: boolean;
  };
};

type CompendiumContextType = {
  value: number;
  setValue: (v: number) => void;
  totals: CompendiumTotals;
};

// ---------------- CONTEXT ----------------

const CompendiumContext = createContext<CompendiumContextType | null>(null);

// ---------------- CALC ----------------

const calculateCompendium = (collections: number): CompendiumTotals => {
  const getStep = (req: number, divisor: number) =>
    collections >= req ? Math.floor(collections / divisor) : 0;

  const getPercent = (req: number, divisor: number) =>
    collections >= req ? Math.floor(collections / divisor) : 0;

  return {
    HP: collections >= 15 ? collections : 0,
    MP: collections >= 30 ? collections : 0,
    Strength: getStep(75, 10),
    Magic: getStep(75, 10),
    Vitality: getStep(45, 10),
    Intelligence: getStep(60, 10),
    Speed: getStep(75, 10),
    Luck: getStep(90, 10),

    boosts: {
      Fire: getPercent(170, 10),
      Ice: getPercent(170, 10),
      Elec: getPercent(180, 10),
      Force: getPercent(180, 10),
      Expel: getPercent(190, 10),
      Death: getPercent(190, 10),
      Mystic: getPercent(200, 10),
      Nerve: getPercent(200, 10),
      Mind: getPercent(200, 10),
      Slash: getPercent(220, 15),
      Thrust: getPercent(220, 15),
      Blunt: getPercent(220, 15),
      Handgun: getPercent(240, 15),
      Penetrate: getPercent(240, 15),
      Spread: getPercent(240, 15),
      "Close range": getPercent(260, 15),
      "Long range": getPercent(260, 15),
      "Spell": getPercent(280, 15),
      "Support": getPercent(280, 15),
    },

    caps: {
      critDef: collections >= 120 ? Math.floor(collections / 3) : 0,
      crit: collections >= 135 ? Math.floor(collections / 3) : 0,
    },

    special: {
      summonSpeed: collections >= 105,
      summonSync: collections >= 150,
      ailmentDefense: collections >= 160,
      limitBreak: collections >= 300,
    },
  };
};

// ---------------- PROVIDER ----------------

export const CompendiumProvider = ({ children }: { children: React.ReactNode }) => {
  const [value, setValue] = useState(0);

  const totals = useMemo(() => {
    return calculateCompendium(value);
  }, [value]);

  return (
    <CompendiumContext.Provider value={{ value, setValue, totals }}>
      {children}
    </CompendiumContext.Provider>
  );
};

// ---------------- HOOK ----------------

export const useCompendium = () => {
  const context = useContext(CompendiumContext);

  if (!context) {
    throw new Error("useCompendium must be used within CompendiumProvider");
  }

  return context;
};