import { ObjectId } from "mongodb";

export interface IFriendRequest {
  _id: ObjectId;
  friendId: string;
  friendName: string;
  friendProfImg: string;
  accepted: boolean;
  requestedOn: Date;
}
