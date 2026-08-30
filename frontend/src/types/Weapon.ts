type WeaponSlot = {
  id: string;
  [key: string]: number | string;
};

export type Weapon = {
  id: string;
  name: string;
  type: string;
  location: string;
  s1: WeaponSlot[];
  s2: WeaponSlot[];
  s3: WeaponSlot[];
};
