import { ObjectId } from "mongodb";
import { ISimpleUser } from "./simpleUser.type";

export interface IFriendPair {
  _id: ObjectId;
  friend1: ISimpleUser;
  friend2: ISimpleUser;
  createdOn: Date;
}
