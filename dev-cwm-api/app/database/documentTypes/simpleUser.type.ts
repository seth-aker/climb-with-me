import { ObjectId } from "mongodb";

export interface ISimpleUser {
  _id: ObjectId;
  name: string;
  avatar: string;
}
