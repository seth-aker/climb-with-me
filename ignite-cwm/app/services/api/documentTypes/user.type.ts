import { IAddress } from "./address.type";

export interface IUser {
  _id: string;
  name: string;
  avatar: string;
  backgroundImg: string;
  email: string;
  emailVerified: boolean;
  lastName: string;
  firstName: string;
  phoneNumber: string;
  phoneVerified: boolean;
  aboutMeText?: string;
  dob?: Date;
  gender?: string;
  addresses?: IAddress[];
  createdOn?: Date;
  lastUpdated?: Date;
}
