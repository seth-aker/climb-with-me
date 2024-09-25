import { ObjectId } from "mongodb";

export interface IMessage {
  _id: ObjectId;
  ownerId: ObjectId;
  body: string;
  sentOn: Date;
  readBy: ObjectId[];
  edited: boolean;
}
