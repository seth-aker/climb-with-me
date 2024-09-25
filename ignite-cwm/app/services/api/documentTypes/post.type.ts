import { ObjectId } from "mongodb";
import { IComment } from "./comment.type";

export interface IPost {
  _id: ObjectId;
  title: string;
  body: string;
  tripDate: Date;
  createdAt: Date;
  authorName: string;
  authorId: string;
  authorProfImg: string;
  comments: IComment[];
  // Array of user ids who liked the post.
  likes: string[];
}
