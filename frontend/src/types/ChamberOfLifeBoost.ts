export type ChamberOfLifeBoost = {
  level: number;
  effect: string;

  kind: "base" | "boost" | "cap";

  stats?: {
    hp?: number;
    mp?: number;
    movespeed?: number;

    boost?: {
      type: string;
      player: number;
      demon: number;
    };

    cap?: {
      player: number;
      demon: number;
    };
  };
};

export type BoostMap = Record<string, ChamberOfLifeBoost[]>;

export type SelectionState = Record<string, number>;

export type Totals = {
  hp: number;
  mp: number;
  movespeed: number;

  caps: Record<string, { player: number; demon: number }>;

  boosts: Record<string, { player: number; demon: number }>;
};