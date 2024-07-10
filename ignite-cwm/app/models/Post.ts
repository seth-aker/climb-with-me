import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree";
import { withSetPropAction } from "./helpers/withSetPropAction";


export const PostModel = types
.model("Post", {
    guid: types.identifier,
    title: "",
    postDetails: "",
    tripDate: types.Date,
    postDate: types.Date,
    postUser: "",
    postUserId: "",
    // tripLocation: "",
})
.actions(withSetPropAction)

export interface Post extends Instance<typeof PostModel> {}
export interface PostSnapshotIn extends SnapshotIn<typeof PostModel>{}
export interface PostSnapshotOut extends SnapshotOut<typeof PostModel>{}
