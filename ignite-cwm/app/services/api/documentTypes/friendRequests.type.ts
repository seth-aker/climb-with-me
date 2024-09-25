import { ObjectId } from "mongodb";
import { ISimpleUser } from "./simpleUser.type";

export interface IFriendRequest {
  _id: ObjectId;
  fromUser: ISimpleUser;
  toUser: ISimpleUser;
  accepted: boolean;
  requestedOn: Date;
}
