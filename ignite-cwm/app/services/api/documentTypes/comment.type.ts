import { ObjectId } from "mongodb";
import { ISimpleUser } from "./simpleUser.type";

export interface IComment {
  _id: ObjectId;
  createdAt: Date;
  body: string;
  author: ISimpleUser;
  // Array of user ids who like the comment
  likes: string[];
}
