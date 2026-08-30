export type Compendium = {
  hp: number;
  mp: number;
  vit: number;
  int: number;
  stats: number; 
  luck: number;

  boosts: Record<string, number>;
  caps: Record<string, number>;

  special: {
    summonSpeed: boolean;
    summonSync: boolean;
    ailmentDefense: boolean;
    limitBreak: boolean;
  };
};