import { Timer } from './Timer';
import { Role } from './Role';
import { Resource } from './Resource';

export type User = {
  id?: number;
  username: string;
  email: string;
  provider?: string;
  gold: number;
  wood: number;
  diamonds: number;
  food: number;
  role: Role;
  timer: Timer;
  level: number;
  experience?: number;
  resource: {
    material: Resource[];
  };
};
