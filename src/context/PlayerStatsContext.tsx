import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useMemo,
} from "react";

import type { PlayerStats } from "../types/PlayerStats";

type BonusSource =
  | "equipment"
  | "demonForce"
  | "demonSkills"
  | "epitaph";

type PlayerStatsContextType = {
  baseStats: PlayerStats;
  effectiveStats: PlayerStats;

  updateBaseStat: <K extends keyof PlayerStats>(
    key: K,
    value: PlayerStats[K]
  ) => void;

  setBonusStats: (
    source: BonusSource,
    stats: Partial<PlayerStats>
  ) => void;

  bonusStats: Record<
    BonusSource,
    Partial<PlayerStats>
  >;
};

const STORAGE_KEY = "player_stats";

const PlayerStatsContext = createContext<
  PlayerStatsContextType | undefined
>(undefined);

const initialPlayerStats: PlayerStats = {
  level: 1,
  sex: "m",
  alignment: "neutral",
  hp: 100,
  mp: 50,
  strength: 1,
  magic: 1,
  vitality: 1,
  intelligence: 1,
  speed: 1,
  luck: 1,
  clsRng: 0,
  lngRng: 0,
  spell: 0,
  support: 0,
  pDef: 0,
  mDef: 0,
  critical: 0,
  criticalDefense: 0,
  lbChance: 0,
  lbPower: 0,
  taChance: 0,
  taPower: 0,
  pursuitChance: 0,
  pursuitPower: 0,
  finalCriticalCorrection: 0,
  lbCap: 0,
  expertise: 0,
  xp: 0,
  soulPoints: 0,
  digitalizePoints: 0,
  digitalizeDuration: 0,
  bethelPoints: 0,
  attack: 0,
  spin: 0,
  shot: 0,
  rush: 0,
  HP_regen: 0,
  MP_regen: 0,
  HP_regenFlat: 0,
  MP_regenFlat: 0,
  weapon_affinity: "Slash",
  move_speed: 0,
  currentHpPercent: 100,
  moonPhase: 0,
  timePeriod: "day",
  digitalizeActive: true,
  macca: 0,
  magnetite: 0,
  deityFamilyDmg: 0,
  deityFamilyDmgTaken: 0,
  vileFamilyDmg: 0,
  vileFamilyDmgTaken: 0,
  avianFamilyDmg: 0,
  avianFamilyDmgTaken: 0,
  megamiFamilyDmg: 0,
  megamiFamilyDmgTaken: 0,
  amatsuFamilyDmg: 0,
  amatsuFamilyDmgTaken: 0,
  raptorFamilyDmg: 0,
  raptorFamilyDmgTaken: 0,
  divineFamilyDmg: 0,
  divineFamilyDmgTaken: 0,
  jakiFamilyDmg: 0,
  jakiFamilyDmgTaken: 0,
  flightFamilyDmg: 0,
  flightFamilyDmgTaken: 0,
  yomaFamilyDmg: 0,
  yomaFamilyDmgTaken: 0,
  jiraeFamilyDmg: 0,
  jiraeFamilyDmgTaken: 0,
  machineFamilyDmg: 0,
  machineFamilyDmgTaken: 0,
  reaperFamilyDmg: 0,
  reaperFamilyDmgTaken: 0,
  holyFamilyDmg: 0,
  holyFamilyDmgTaken: 0,
  beastFamilyDmg: 0,
  beastFamilyDmgTaken: 0,
  fairyFamilyDmg: 0,
  fairyFamilyDmgTaken: 0,
  elementFamilyDmg: 0,
  elementFamilyDmgTaken: 0,
  fiendFamilyDmg: 0,
  fiendFamilyDmgTaken: 0,
  genmaFamilyDmg: 0,
  genmaFamilyDmgTaken: 0,
  wilderFamilyDmg: 0,
  wilderFamilyDmgTaken: 0,
  snakeFamilyDmg: 0,
  snakeFamilyDmgTaken: 0,
  nightFamilyDmg: 0,
  nightFamilyDmgTaken: 0,
  avatarFamilyDmg: 0,
  avatarFamilyDmgTaken: 0,
  foulFamilyDmg: 0,
  foulFamilyDmgTaken: 0,
  bruteFamilyDmg: 0,
  bruteFamilyDmgTaken: 0,
  hauntFamilyDmg: 0,
  hauntFamilyDmgTaken: 0,
  dragonFamilyDmg: 0,
  dragonFamilyDmgTaken: 0,
  fallenFamilyDmg: 0,
  fallenFamilyDmgTaken: 0,
  femmeFamilyDmg: 0,
  femmeFamilyDmgTaken: 0,
  kunitsuFamilyDmg: 0,
  kunitsuFamilyDmgTaken: 0,
  ladyFamilyDmg: 0,
  ladyFamilyDmgTaken: 0,
  drakeFamilyDmg: 0,
  drakeFamilyDmgTaken: 0,
  kishinFamilyDmg: 0,
  kishinFamilyDmgTaken: 0,
  omegaFamilyDmg: 0,
  omegaFamilyDmgTaken: 0,
  tyrantFamilyDmg: 0,
  tyrantFamilyDmgTaken: 0,
  heraldFamilyDmg: 0,
  heraldFamilyDmgTaken: 0,
  slashResist: 0,
  bluntResist: 0,
  thrustResist: 0,
  handgunResist: 0,
  penetrateResist: 0,
  spreadResist: 0,
  fireResist: 0,
  iceResist: 0,
  electricResist: 0,
  forceResist: 0,
  expelResist: 0,
  deathResist: 0,
  mysticResist: 0,
  nerveResist: 0,
  mindResist: 0,
  almightyResist: 0,
  slashBoost: 0,
  bluntBoost: 0,
  thrustBoost: 0,
  handgunBoost: 0,
  penetrateBoost: 0,
  spreadBoost: 0,
  fireBoost: 0,
  iceBoost: 0,
  electricBoost: 0,
  forceBoost: 0,
  expelBoost: 0,
  deathBoost: 0,
  mysticBoost: 0,
  nerveBoost: 0,
  mindBoost: 0,
  almightyBoost: 0,
  slashCap: 0,
  thrustCap: 0,
  bluntCap: 0,
  handgunCap: 0,
  spreadCap: 0,
  penetrateCap: 0,
  fireCap: 0,
  iceCap: 0,
  electricCap: 0,
  forceCap: 0,
  expelCap: 0,
  deathCap: 0,
  mysticCap: 0,
  nerveCap: 0,
  mindCap: 0,
  almightyCap: 0
};

export const PlayerStatsProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [baseStats, setBaseStats] =
    useState<PlayerStats>(() => {
      const stored =
        localStorage.getItem(STORAGE_KEY);

      return stored
        ? {
          ...initialPlayerStats,
          ...JSON.parse(stored),
        }
        : initialPlayerStats;
    });

  const [bonusStats, setBonusStatsState] =
    useState<
      Record<
        BonusSource,
        Partial<PlayerStats>
      >
    >({
      equipment: {},
      demonForce: {},
      demonSkills: {},
      epitaph: {},
    });

  const updateBaseStat = useCallback(
    <K extends keyof PlayerStats>(
      key: K,
      value: PlayerStats[K]
    ) => {
      setBaseStats((prev) => {
        if (prev[key] === value) {
          return prev;
        }

        return {
          ...prev,
          [key]: value,
        };
      });
    },
    []
  );

  const setBonusStats = useCallback(
    (
      source: BonusSource,
      stats: Partial<PlayerStats>
    ) => {

      setBonusStatsState((prev) => ({
        ...prev,
        [source]: stats,
      }));
    },
    []
  );

  const effectiveStats = useMemo(() => {
  const isDev = import.meta.env.DEV;

  if (isDev) {
    console.group("PlayerStats Recalculation");
    console.log("baseStats", baseStats);
    console.log("bonusStats", bonusStats);
  }

  const result: PlayerStats = {
    ...baseStats,
  };

  Object.entries(bonusStats).forEach(
    ([sourceName, sourceStats]) => {
      if (isDev) {
        console.group(`Source: ${sourceName}`);
      }

      Object.entries(sourceStats).forEach(
        ([key, value]) => {
          const existsInPlayer = key in baseStats;

          if (!existsInPlayer) {
            if (isDev) {
              console.error(
                `[INVALID STAT] "${key}" exists in bonus source "${sourceName}" but does not exist in PlayerStats`
              );
            }

            return;
          }

          if (typeof value !== "number") {
            if (isDev) {
              console.warn(
                `[NON NUMERIC] ${key}`,
                value
              );
            }

            return;
          }

          const previous =
            (result as any)[key] ?? 0;

          const next =
            previous + value;

          if (isDev) {
            console.log(
              `${key}: ${previous} + ${value} = ${next}`
            );
          }

          (result as any)[key] = next;
        }
      );

      if (isDev) {
        console.groupEnd();
      }
    }
  );

  if (isDev) {
    console.log(
      "effectiveStats result",
      result
    );

    console.groupEnd();
  }

  return result;
}, [baseStats, bonusStats]);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(baseStats)
    );
  }, [baseStats]);

  const contextValue = useMemo(
    () => ({
      baseStats,
      bonusStats,
      effectiveStats,
      updateBaseStat,
      setBonusStats,
    }),
    [
      baseStats,
      bonusStats,
      effectiveStats,
      updateBaseStat,
      setBonusStats,
    ]
  );

  return (
    <PlayerStatsContext.Provider
      value={contextValue}
    >
      {children}
    </PlayerStatsContext.Provider>
  );
};

export const usePlayerStats = () => {
  const context =
    useContext(PlayerStatsContext);

  if (!context) {
    throw new Error(
      "usePlayerStats must be used within a PlayerStatsProvider"
    );
  }

  return context;
};