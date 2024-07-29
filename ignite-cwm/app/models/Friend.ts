import { Instance, SnapshotOut, types } from "mobx-state-tree";

export const FriendModel = types.model("Friend", {
  guid: types.identifier,
  name: "",
  profImg: "",
})

export interface IFriend extends Instance<typeof FriendModel> {}
export interface IFriendSnapshotOut extends SnapshotOut<typeof FriendModel> {}
