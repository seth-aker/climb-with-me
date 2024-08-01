import { Instance, types } from "mobx-state-tree";
import { FriendModel} from "./Friend";
import { withSetPropAction } from "./helpers/withSetPropAction";
export const FriendRequestModel = types.model("FriendRequest", {
  requestId: types.identifier,
  friend: types.frozen(FriendModel),
  accepted: types.boolean
}).actions(withSetPropAction)

export interface IFriendRequest extends Instance<typeof FriendRequestModel> {};
