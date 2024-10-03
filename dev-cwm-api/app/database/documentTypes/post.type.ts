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
  location: ILocation;
  climbingType: "Sport" | "Trad" | "Bouldering" | "Top Rope";
  comments: IComment[];
  // Array of user ids who liked the post.
  likes: string[];
}

export interface ILocation {
  coords: { latitude: number; longitude: number };
  address: string;
  name: string;
}
