import type { PlayerStats } from "./PlayerStats";

export type PlayerForm = Pick<
  PlayerStats,
  | "level"
  | "sex"
  | "alignment"
  | "strength"
  | "magic"
  | "vitality"
  | "intelligence"
  | "speed"
  | "luck"
  | "currentHpPercent"
  | "moonPhase"
  | "timePeriod"
  | "digitalizeActive"
>;