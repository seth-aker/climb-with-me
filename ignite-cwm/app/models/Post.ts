import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree";
import { withSetPropAction } from "./helpers/withSetPropAction";
import { CommentModel } from "./CommentModel";


export const PostModel = types
.model("Post", {
    guid: types.identifier,
    title: "",
    body: "",
    tripDate: types.Date,
    postDate: types.Date,
    postUser: "",
    postUserId: "",
    postUserImg: "",
    postComments: types.array(CommentModel)
    // tripLocation: "",
})
.actions(withSetPropAction)

export interface Post extends Instance<typeof PostModel> {}
export interface PostSnapshotIn extends SnapshotIn<typeof PostModel>{}
export interface PostSnapshotOut extends SnapshotOut<typeof PostModel>{}
