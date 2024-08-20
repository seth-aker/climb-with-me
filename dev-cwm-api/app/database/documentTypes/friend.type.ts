import { ObjectId } from "mongodb";

export interface IFriend {
  _id: ObjectId;
  name: string;
  profileImg: string;
  friendSince: Date;
}
