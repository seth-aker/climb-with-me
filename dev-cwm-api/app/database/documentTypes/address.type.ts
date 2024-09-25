import { ObjectId } from "mongodb";

export interface IAddress {
  _id: ObjectId;
  line1: string;
  line2: string;
  line3: string;
  city: string;
  state: string;
  postalCode: number;
  country: string;
  isDefault: boolean;
}
