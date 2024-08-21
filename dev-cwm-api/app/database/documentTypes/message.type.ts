import { ObjectId } from "mongodb";

export interface IMessage {
  _id: ObjectId;
  ownerId: ObjectId;
  ownerName: string;
  body: string;
  sentOn: Date;
  readBy: string[];
}
