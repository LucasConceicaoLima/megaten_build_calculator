export const chainExpertiseRules = {
  masteryOfTheThreeFormsOfLife: {
    max: 10.0,
    formula: (expertise: Record<string, number>) =>
      0.2 * (expertise.weaponKnowledge || 0) + 0.2 * (expertise.gunKnowledge || 0) + 0.2 * (expertise.magicControl || 0) + 0.2 * (expertise.bless || 0),
  },
  synthesis: {
    max: 10.0,
    formula: (expertise: Record<string, number>) =>
      0.4 * (expertise.occultism || 0) + 0.4 * (expertise.demonology || 0) + 0.1 * (expertise.weaponKnowledge || 0) + 0.1 * (expertise.mineralogy || 0),
  },
  demolitionDash: {
    max: 10.0,
    formula: (expertise: Record<string, number>) =>
      0.3 * (expertise.rush || 0) + 0.2 * (expertise.weaponKnowledge || 0) + 0.2 * (expertise.pursuit || 0) + 0.3 * (expertise.magicControl || 0),
  },
  mitamaDemonGrowthScience: {
    max: 10.0,
    formula: (expertise: Record<string, number>) =>
      0.6 * (expertise.demonology || 0) + 0.4 * (expertise.psychology || 0),
  },
  curseOfTheWretched: {
    max: 10.0,
    formula: (expertise: Record<string, number>) =>
      0.5 * (expertise.curseMagic || 0) + 0.3 * (expertise.magicControl || 0) + 0.2 * (expertise.bless || 0),
  },
  enhancement: {
    max: 10.0,
    formula: (expertise: Record<string, number>) =>
      0.4 * (expertise.supportMagic || 0) + 0.3 * (expertise.curativeMagic || 0) + 0.3 * (expertise.bless || 0),
  },
  supportBullet: {
    max: 10.0,
    formula: (expertise: Record<string, number>) =>
      0.2 * (expertise.shot || 0) + 0.4 * (expertise.supportMagic || 0) + 0.4 * (expertise.bless || 0),
  },
  magicBullet: {
    max: 10.0,
    formula: (expertise: Record<string, number>) =>
      0.3 * (expertise.shot || 0) + 0.1 * (expertise.curseMagic || 0) + 0.4 * (expertise.gunKnowledge || 0) + 0.2 * (expertise.magicControl || 0),
  },
  sharpshooter: {
    max: 10.0,
    formula: (expertise: Record<string, number>) =>
      0.3 * (expertise.pursuit || 0) + 0.3 * (expertise.gunKnowledge || 0) + 0.4 * (expertise.demonology || 0),
  },
  vanguard: {
    max: 10.0,
    formula: (expertise: Record<string, number>) =>
      0.3 * (expertise.spin || 0) + 0.3 * (expertise.survivalTechniques || 0) + 0.4 * (expertise.pursuit || 0),
  },
  regalPresence: {
    max: 10.0,
    formula: (expertise: Record<string, number>) =>
      0.4 * (expertise.weaponKnowledge || 0) + 0.2 * (expertise.survivalTechniques || 0) + 0.4 * (expertise.pursuit || 0),
  },
  berserker: {
    max: 10.0,
    formula: (expertise: Record<string, number>) =>
      0.4 * (expertise.attack || 0) + 0.4 * (expertise.weaponKnowledge || 0) + 0.2 * (expertise.pursuit || 0),
  },
  ashesAndDust: {
    max: 10.0,
    formula: (expertise: Record<string, number>) =>
      0.4 * (expertise.rapid || 0) + 0.4 * (expertise.gunKnowledge || 0) + 0.2 * (expertise.pursuit || 0),
  },
  essenceOfMagic: {
    max: 10.0,
    formula: (expertise: Record<string, number>) =>
      0.3 * (expertise.destructionMagic || 0) + 0.3 * (expertise.magicControl || 0) + 0.4 * (expertise.pursuit || 0),
  },
  sanguineContract: {
    max: 10.0,
    formula: (expertise: Record<string, number>) =>
      0.2 * (expertise.summon || 0) + 0.4 * (expertise.fusion || 0) + 0.4 * (expertise.demonology || 0),
  },
  swordsmith: {
    max: 10.0,
    formula: (expertise: Record<string, number>) =>
      0.8 * (expertise.blades || 0) + 0.2 * (expertise.weaponKnowledge || 0),
  },
  armsMaker: {
    max: 10.0,
    formula: (expertise: Record<string, number>) =>
      0.8 * (expertise.crafts || 0) + 0.2 * (expertise.gunKnowledge || 0),
  },
  craftsmanship: {
    max: 10.0,
    formula: (expertise: Record<string, number>) =>
      0.6 * (expertise.creation || 0) + 0.2 * (expertise.medicalSciences || 0) + 0.2 * (expertise.sketching || 0),
  },
};