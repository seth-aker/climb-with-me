import { IClimbingStyle } from "app/models/ClimbingStyleModel"
import { IFriend } from "app/models/Friend"
import { IFriendRequest } from "app/models/FriendRequest"

/**
 * These types indicate the shape of the data you expect to receive from your
 * API endpoint, assuming it's a JSON object like we have.
 */
export interface IUser {
  _id: string
  name: string
  profileImg: string
  backgroundImg: string
  aboutMeText: string
  dob: Date
  email: string
  emailVerified: boolean
  familyName: string
  gender: string
  givenName: string
  phoneNumber: string
  phoneVerified: boolean
  climbingStyles: IClimbingStyle[]
  createdOn?: Date
  lastUpdated?: Date
  friendRequests?: IFriendRequest[]
  friends?: IFriend[]
}
