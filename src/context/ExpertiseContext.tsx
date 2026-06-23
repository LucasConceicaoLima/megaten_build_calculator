import React, { createContext, useContext, useState } from 'react';
import { Expertise } from '../types/Expertise';

type ExpertiseContextType = {
  expertise: Record<keyof Expertise, number>;
  setExpertise: (values: Record<keyof Expertise, number>) => void;
};

const ExpertiseContext = createContext<ExpertiseContextType | undefined>(undefined);

const initialExpertiseValues: Record<keyof Expertise, number> = {
  attack: 0,
  spin: 0,
  rush: 0,
  shot: 0,
  rapid: 0,
  guard: 0,
  counter: 0,
  dodge: 0,
  curativeMagic: 0,
  destructionMagic: 0,
  supportMagic: 0,
  curseMagic: 0,
  talk: 0,
  threaten: 0,
  taunt: 0,
  summon: 0,
  occultism: 0,
  fusion: 0,
  demonology: 0,
  weaponKnowledge: 0,
  survivalTechniques: 0,
  psychology: 0,
  medicalSciences: 0,
  crushingTechnique: 0,
  mineralogy: 0,
  botany: 0,
  mechanicalEngineering: 0,
  informationEngineering: 0,
  biology: 0,
  blades: 0,
  sketching: 0,
  creation: 0,
  crafts: 0,
  firearmsKnowledge: 0,
  gunKnowledge: 0,
  pursuit: 0,
  magicControl: 0,
  bless: 0,
};

export const ExpertiseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [expertise, setExpertise] = useState<Record<keyof Expertise, number>>(initialExpertiseValues);

  return (
    <ExpertiseContext.Provider value={{ expertise, setExpertise }}>
      {children}
    </ExpertiseContext.Provider>
  );
};

export const useExpertise = (): ExpertiseContextType => {
  const context = useContext(ExpertiseContext);
  if (!context) {
    throw new Error('useExpertise must be used within an ExpertiseProvider');
  }
  return context;
};
