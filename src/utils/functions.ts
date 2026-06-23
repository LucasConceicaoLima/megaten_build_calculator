import type { PlayerStats } from "../types/PlayerStats";
import type { DemonStats } from "../types/DemonStats";
import type { PartyStats } from "../types/PartyStats";

export function formatLabel(label: string): string {
  return label.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^./, str => str.toUpperCase());
}

export const formatLabel2 = (label: string) =>
  label
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase());

export const playerStatsLabels: Record<keyof PlayerStats, string> = {
  level: "Level",
  sex: "Sex",
  alignment: "Alignment",
  hp: "Max HP",
  mp: "Max MP",
  strength: "Strength",
  magic: "Magic",
  vitality: "Vitality",
  intelligence: "Intelligence",
  speed: "Speed",
  luck: "Luck",
  clsRng: "Close Range",
  lngRng: "Long Range",
  spell: "Spell",
  support: "Support",
  pDef: "Physical Defense",
  mDef: "Magic Defense",
  critical: "Critical",
  criticalDefense: "Critical Defense",
  lbChance: "Limit Break Chance",
  lbPower: "Limit Break Power",
  taChance: "Technical Attack Chance",
  taPower: "Technical Attack Power",
  pursuitChance: "Pursuit Chance",
  pursuitPower: "Pursuit Power",
  finalCriticalCorrection: "Final Critical Correction",
  lbCap: "Limit Break Cap",
  expertise: "Expertise",
  xp: "Experience",
  shot: "Shot",
  rush: "Rush",
  soulPoints: "Soul Points",
  attack: "Attack",
  spin: "Spin",
  HP_regen: "HP Regen (%)",
  MP_regen: "MP Regen (%)",
  HP_regenFlat: "HP Regen",
  MP_regenFlat: "MP Regen",
  digitalizePoints: "Digitalize Points",
  digitalizeDuration: "Digitalize Duration",
  bethelPoints: "Bethel",
  weapon_affinity: "Weapon Affinity",
  move_speed: "Movement Speed",
  macca: "Macca",
  magnetite: "Magnetite",
  currentHpPercent: "Current HP (%)",
  moonPhase: "Moon Phase",
  timePeriod: "Time Period",
  digitalizeActive: "Digitalize Active",
  deityFamilyDmg: "Damage dealt against Deity race",
  deityFamilyDmgTaken: "Damage taken from Deity race",
  vileFamilyDmg: "Damage dealt against Vile race",
  vileFamilyDmgTaken: "Damage taken from Vile race",
  avianFamilyDmg: "Damage dealt against Avian race",
  avianFamilyDmgTaken: "Damage taken from Avian race",
  megamiFamilyDmg: "Damage dealt against Megami race",
  megamiFamilyDmgTaken: "Damage taken from Megami race",
  amatsuFamilyDmg: "Damage dealt against Amatsu race",
  amatsuFamilyDmgTaken: "Damage taken from Amatsu race",
  raptorFamilyDmg: "Damage dealt against Raptor race",
  raptorFamilyDmgTaken: "Damage taken from Raptor race",
  divineFamilyDmg: "Damage dealt against Divine race",
  divineFamilyDmgTaken: "Damage taken from Divine race",
  jakiFamilyDmg: "Damage dealt against Jaki race",
  jakiFamilyDmgTaken: "Damage taken from Jaki race",
  flightFamilyDmg: "Damage dealt against Flight race",
  flightFamilyDmgTaken: "Damage taken from Flight race",
  yomaFamilyDmg: "Damage dealt against Yoma race",
  yomaFamilyDmgTaken: "Damage taken from Yoma race",
  jiraeFamilyDmg: "Damage dealt against Jirae race",
  jiraeFamilyDmgTaken: "Damage taken from Jirae race",
  machineFamilyDmg: "Damage dealt against Machine race",
  machineFamilyDmgTaken: "Damage taken from Machine race",
  reaperFamilyDmg: "Damage dealt against Reaper race",
  reaperFamilyDmgTaken: "Damage taken from Reaper race",
  holyFamilyDmg: "Damage dealt against Holy race",
  holyFamilyDmgTaken: "Damage taken from Holy race",
  beastFamilyDmg: "Damage dealt against Beast race",
  beastFamilyDmgTaken: "Damage taken from Beast race",
  fairyFamilyDmg: "Damage dealt against Fairy race",
  fairyFamilyDmgTaken: "Damage taken from Fairy race",
  elementFamilyDmg: "Damage dealt against Element race",
  elementFamilyDmgTaken: "Damage taken from Element race",
  fiendFamilyDmg: "Damage dealt against Fiend race",
  fiendFamilyDmgTaken: "Damage taken from Fiend race",
  genmaFamilyDmg: "Damage dealt against Genma race",
  genmaFamilyDmgTaken: "Damage taken from Genma race",
  wilderFamilyDmg: "Damage dealt against Wilder race",
  wilderFamilyDmgTaken: "Damage taken from Wilder race",
  snakeFamilyDmg: "Damage dealt against Snake race",
  snakeFamilyDmgTaken: "Damage taken from Snake race",
  nightFamilyDmg: "Damage dealt against Night race",
  nightFamilyDmgTaken: "Damage taken from Night race",
  avatarFamilyDmg: "Damage dealt against Avatar race",
  avatarFamilyDmgTaken: "Damage taken from Avatar race",
  foulFamilyDmg: "Damage dealt against Foul race",
  foulFamilyDmgTaken: "Damage taken from Foul race",
  bruteFamilyDmg: "Damage dealt against Brute race",
  bruteFamilyDmgTaken: "Damage taken from Brute race",
  hauntFamilyDmg: "Damage dealt against Haunt race",
  hauntFamilyDmgTaken: "Damage taken from Haunt race",
  dragonFamilyDmg: "Damage dealt against Dragon race",
  dragonFamilyDmgTaken: "Damage taken from Dragon race",
  fallenFamilyDmg: "Damage dealt against Fallen race",
  fallenFamilyDmgTaken: "Damage taken from Fallen race",
  femmeFamilyDmg: "Damage dealt against Femme race",
  femmeFamilyDmgTaken: "Damage taken from Femme race",
  kunitsuFamilyDmg: "Damage dealt against Kunitsu race",
  kunitsuFamilyDmgTaken: "Damage taken from Kunitsu race",
  ladyFamilyDmg: "Damage dealt against Lady race",
  ladyFamilyDmgTaken: "Damage taken from Lady race",
  drakeFamilyDmg: "Damage dealt against Drake race",
  drakeFamilyDmgTaken: "Damage taken from Drake race",
  kishinFamilyDmg: "Damage dealt against Kishin race",
  kishinFamilyDmgTaken: "Damage taken from Kishin race",
  omegaFamilyDmg: "Damage dealt against Omega race",
  omegaFamilyDmgTaken: "Damage taken from Omega race",
  tyrantFamilyDmg: "Damage dealt against Tyrant race",
  tyrantFamilyDmgTaken: "Damage taken from Tyrant race",
  heraldFamilyDmg: "Damage dealt against Herald race",
  heraldFamilyDmgTaken: "Damage taken from Herald race",
  slashResist: "Slash Resistance",
  thrustResist: "Thrust Resistance",
  bluntResist: "Blunt Resistance",
  handgunResist: "Handgun Resistance",
  spreadResist: "Spread Resistance",
  penetrateResist: "Penetrate Resistance",
  fireResist: "Fire Resistance",
  iceResist: "Ice Resistance",
  electricResist: "Electric Resistance",
  forceResist: "Force Resistance",
  expelResist: "Expel Resistance",
  deathResist: "Death Resistance",
  mysticResist: "Mystic Resistance",
  nerveResist: "Nerve Resistance",
  mindResist: "Mind Resistance",
  almightyResist: "Almighty Resistance",
  slashBoost: "Slash Boost",
  bluntBoost: "Blunt Boost",
  thrustBoost: "Thrust Boost",
  handgunBoost: "Handgun Boost",  
  spreadBoost: "Spread Boost",
  penetrateBoost: "Penetrate Boost",
  fireBoost: "Fire Boost",
  iceBoost: "Ice Boost",
  electricBoost: "Electric Boost",
  forceBoost: "Force Boost",
  expelBoost: "Expel Boost",
  deathBoost: "Death Boost",
  mysticBoost: "Mystic Boost",
  nerveBoost: "Nerve Boost",
  mindBoost: "Mind Boost",
  almightyBoost: "Almighty Boost",
  slashCap: "Slash Cap",
  thrustCap: "Thrust Cap",
  bluntCap: "Blunt Cap",
  handgunCap: "Handgun Cap",
  spreadCap: "Spread Cap",
  penetrateCap: "Penetrate Cap",
  fireCap: "Fire Cap",
  iceCap: "Ice Cap",
  electricCap: "Electric Cap",
  forceCap: "Force Cap",
  expelCap: "Expel Cap",
  deathCap: "Death Cap",
  mysticCap: "Mystic Cap",
  nerveCap: "Nerve Cap",
  mindCap: "Mind Cap",
  almightyCap: "Almighty Cap",
};

export const demonStatsLabels: Record<keyof DemonStats, string> = {
  level: "Level",
  hp: "Max HP",
  mp: "Max MP",
  demonXp: "Experience",
  strength: "Strength",
  magic: "Magic",
};

export const partyStatsLabels: Record<keyof PartyStats, string> = {
  strength: "Strength",
  magic: "Magic",
  vitality: "Vitality",
  intelligence: "Intelligence",
  speed: "Speed",
  luck: "Luck",
  xp: "Experience",
};

export const playerStatsFormatters: Partial<
  Record<keyof typeof playerStatsLabels, (value: any) => string>
> = {
  sex: (value) => {
    if (value === "m") return "Male";
    if (value === "f") return "Female";
    return value;
  },

  alignment: (value) => {
    switch (value) {
      case "law":
        return "Law";
      case "neutral":
        return "Neutral";
      case "chaos":
        return "Chaos";
      default:
        return value;
    }
  },
};

export const formatStatValue = (key: string, value: any) => {
  const formatter =
    playerStatsFormatters[key as keyof typeof playerStatsFormatters];

  return formatter ? formatter(value) : value;
};