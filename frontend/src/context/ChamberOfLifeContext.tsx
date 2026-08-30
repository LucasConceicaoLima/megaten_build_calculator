import { useMemo, useState } from "react";
import {
  BoostMap,
  ChamberOfLifeBoost,
  Totals,
} from "../types/ChamberOfLifeBoost";

// ---------------- HELPERS ----------------

const createLevels = (
  maxLevel: number,
  generator: (level: number) => ChamberOfLifeBoost
): ChamberOfLifeBoost[] =>
  Array.from({ length: maxLevel }, (_, i) => generator(i + 1));

// ---------------- TYPES LIST ----------------

const masteryTypes = [
  "Slash", "Thrust", "Blunt", "Handgun", "Penetrate", "Spread",
  "Fire", "Ice", "Elec", "Force", "Expel", "Death",
  "Mystic", "Nerve", "Mind",
] as const;

// separação correta 👇
const capTypes = masteryTypes;
const boostTypes = [...masteryTypes, "Curative"];

// ---------------- LIMIT MASTERY ----------------

const createLimitMasteryLevels = (type: string): ChamberOfLifeBoost[] =>
  createLevels(10, (level) => {
    const value = level <= 2 ? 50 : 100;

    return {
      level,
      effect: `Player ${type} Cap +${value}%, Demon ${type} Cap +${value}%`,
      kind: "cap",
      stats: {
        cap: { player: value, demon: value },
      },
    };
  });

export const limitMastery: BoostMap = Object.fromEntries(
  masteryTypes.map((t) => [t, createLimitMasteryLevels(t)])
);

// ---------------- REINFORCE ----------------

const createBoost = (name: string): ChamberOfLifeBoost[] =>
  createLevels(10, (level) => ({
    level,
    effect: `${name} Boost +10%, Demon ${name} Boost +10%`,
    kind: "boost",
    stats: {
      boost: { type: name, player: 10, demon: 10 },
    },
  }));

export const reinforce: BoostMap = {
  HP: createLevels(10, (level) => ({
    level,
    effect: "MAX HP +50, Demon MAX HP +50",
    kind: "base",
    stats: { hp: 50 },
  })),

  MP: createLevels(10, (level) => ({
    level,
    effect: "MAX MP +50, Demon MAX MP +50",
    kind: "base",
    stats: { mp: 50 },
  })),

  Quickness: createLevels(5, (level) => ({
    level,
    effect: "Movespeed +4%, Demon Movespeed +4%",
    kind: "base",
    stats: { movespeed: 4 },
  })),

  Slash: createBoost("Slash"),
  Thrust: createBoost("Thrust"),
  Blunt: createBoost("Blunt"),
  Handgun: createBoost("Handgun"),
  Penetrate: createBoost("Penetrate"),
  Spread: createBoost("Spread"),
  Fire: createBoost("Fire"),
  Ice: createBoost("Ice"),
  Elec: createBoost("Elec"),
  Force: createBoost("Force"),
  Expel: createBoost("Expel"),
  Death: createBoost("Death"),
  Curative: createBoost("Curative"),
  Mystic: createBoost("Mystic"),
  Nerve: createBoost("Nerve"),
  Mind: createBoost("Mind"),
};

// ---------------- TYPES ----------------

type Group = "reinforce" | "limitMastery";

type SelectionState = {
  reinforce: Record<string, number>;
  limitMastery: Record<string, number>;
};

// ---------------- EMPTY TOTALS ----------------

const createEmptyTotals = (types: readonly string[]) => {
  const base: Record<string, { player: number; demon: number }> = {};

  types.forEach((type) => {
    base[type] = { player: 0, demon: 0 };
  });

  return base;
};

// ---------------- HOOK ----------------

export const useChamberOfLife = () => {
  const [selected, setSelected] = useState<SelectionState>({
    reinforce: {},
    limitMastery: {},
  });

  const handleToggle = (
    group: Group,
    category: string,
    level: number
  ) => {
    setSelected((prev) => {
      const current = prev[group][category] || 0;
      const nextLevel = level === current ? level - 1 : level;

      return {
        ...prev,
        [group]: {
          ...prev[group],
          [category]: nextLevel,
        },
      };
    });
  };

  const totals: Totals = useMemo(() => {
    let hp = 0, mp = 0, movespeed = 0;

    let boosts: Totals["boosts"] = createEmptyTotals(boostTypes);
    let caps: Totals["caps"] = createEmptyTotals(capTypes);

    const process = (data: BoostMap, group: Group) => {
      Object.entries(data).forEach(([cat, levels]) => {
        const max = selected[group][cat] || 0;

        levels.forEach((entry) => {
          if (entry.level > max || !entry.stats) return;

          const { stats, kind } = entry;

          // base
          if (stats.hp) hp += stats.hp;
          if (stats.mp) mp += stats.mp;
          if (stats.movespeed) movespeed += stats.movespeed;

          // cap (somente tipos válidos)
          if (kind === "cap" && stats.cap && caps[cat]) {
            caps[cat].player += stats.cap.player;
            caps[cat].demon += stats.cap.demon;
            return;
          }

          // boost
          if (kind === "boost" && stats.boost) {
            const { type, player, demon } = stats.boost;

            if (boosts[type]) {
              boosts[type].player += player;
              boosts[type].demon += demon;
            }
          }
        });
      });
    };

    process(reinforce, "reinforce");
    process(limitMastery, "limitMastery");

    return { hp, mp, movespeed, boosts, caps };
  }, [selected]);

  return {
    reinforce,
    limitMastery,
    selected,
    handleToggle,
    totals,
  };
};