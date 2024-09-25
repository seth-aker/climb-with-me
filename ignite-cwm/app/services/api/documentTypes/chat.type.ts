import { ObjectId } from "mongodb";
import { IMessage } from "./message.type";
import { ISimpleUser } from "./simpleUser.type";

export interface IChat {
  _id: ObjectId;
  messages: IMessage[];
  users: IChatUser[];
  chatName?: string;
  createdOn: Date;
  lastUpdated: Date;
}

export interface IChatUser extends ISimpleUser {
  joinedOn: Date;
}
