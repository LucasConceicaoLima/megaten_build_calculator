export type Expertise = {
  [key in ExpertiseField]: {
    min: number;
    max: number;
  };
};

export type ExpertiseField =
  | 'attack'
  | 'spin'
  | 'rush'
  | 'shot'
  | 'rapid'
  | 'guard'
  | 'counter'
  | 'dodge'
  | 'curativeMagic'
  | 'destructionMagic'
  | 'supportMagic'
  | 'curseMagic'
  | 'talk'
  | 'threaten'
  | 'taunt'
  | 'summon'
  | 'occultism'
  | 'fusion'
  | 'demonology'
  | 'weaponKnowledge'
  | 'survivalTechniques'
  | 'psychology'
  | 'medicalSciences'
  | 'crushingTechnique'
  | 'mineralogy'
  | 'biology'
  | 'botany'
  | 'mechanicalEngineering'
  | 'informationEngineering'
  | 'blades'
  | 'sketching'
  | 'creation'
  | 'crafts'
  | 'firearmsKnowledge'
  | 'gunKnowledge'
  | 'pursuit'
  | 'magicControl'
  | 'bless';
