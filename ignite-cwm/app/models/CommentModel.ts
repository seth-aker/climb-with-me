import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree";
import { withSetPropAction } from "./helpers/withSetPropAction";

export const CommentModel = types.model("Comment", {
    guid: types.identifier,
    text: types.string,
    user: types.string,
    userId: types.string,
    parent: types.string // Parent Comment GUID
}).actions(withSetPropAction)

export interface Comment extends Instance<typeof CommentModel> {}
export interface CommentSnapshotIn extends SnapshotIn<typeof CommentModel>{}
export interface CommentSnapshotOut extends SnapshotOut<typeof CommentModel>{}
