import { ObjectId } from "mongodb";

export interface IComment {
  _id: ObjectId;
  createdAt: Date;
  body: string;
  authorName: string;
  authorId: string;
  authorProfImg: string;
  // Array of user ids who like the comment
  likes: string[];
}
