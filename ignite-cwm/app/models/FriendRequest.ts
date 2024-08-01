import { Instance, types } from "mobx-state-tree";
import { withSetPropAction } from "./helpers/withSetPropAction";
export const FriendRequestModel = types.model("FriendRequest", {
  requestId: types.identifier,
  friendId: types.string,
  friendName: types.string,
  friendProfImg: types.string,
  accepted: types.boolean,
  requestedOn: types.Date,
}).actions(withSetPropAction)


export interface IFriendRequest extends Instance<typeof FriendRequestModel> {};
