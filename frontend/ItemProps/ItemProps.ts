import { Price } from "../models/Price";

export interface ItemProps {
  id: string;
  name: string;
  image: string;
  attack?: number;
  defense?: number;
  agility?: number;
  itemLevel: number;
  price: Price;
}