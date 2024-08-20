import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"

export const FriendModel = types
  .model("Friend", {
    _id: types.identifier,
    name: "",
    profImg: "",
    friendSince: types.optional(types.Date, Date.now()),
  })
  .actions(withSetPropAction)

export interface IFriend extends Instance<typeof FriendModel> {}
export interface IFriendSnapshotOut extends SnapshotOut<typeof FriendModel> {}
export interface IFriendSnapshotIn extends SnapshotIn<typeof FriendModel> {}
