export type Tarot = {
  id: string;
  name: string;
  level: number;
  location: string;
  [key: string]: number | string;
};