import { ObjectId } from "mongodb";
import { IClimbingStyle } from "./climbingStyle.type";
import { IFriendRequest } from "./friendRequests.type";

export interface IUser {
  _id: ObjectId;
  name: string;
  profileImg: string;
  backgroundImg: string;
  aboutMeText: string;
  dob: Date;
  email: string;
  emailVerified: boolean;
  familyName: string;
  gender: string;
  givenName: string;
  phoneNumber: string;
  phoneVerified: boolean;
  climbingStyles: IClimbingStyle[];
  createdOn?: Date;
  lastUpdated?: Date;
  friendRequests?: IFriendRequest[];
}
