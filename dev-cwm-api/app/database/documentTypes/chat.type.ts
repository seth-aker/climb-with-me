import { ObjectId } from "mongodb";
import { IMessage } from "./message.type";

export interface IChat {
  _id: ObjectId;
  messages: IMessage[];
  users: IChatUser[];
  chatName?: string;
  createdOn: Date;
}

export interface IChatUser {
  _id: ObjectId;
  name: string;
  profImg: string;
  joinedOn: Date;
}
