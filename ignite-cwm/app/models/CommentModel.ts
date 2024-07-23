import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree";
import { withSetPropAction } from "./helpers/withSetPropAction";

export const CommentModel = types.model("Comment", {
    guid: types.identifier,
    createdAt: types.Date,
    text: types.string,
    user: types.string,
    userId: types.string,
    userProfImg: types.string, 
    likes: types.array(types.string) // User guids of people who have liked the comment
})
.actions(withSetPropAction)
.actions((comment) => ({
    addLike(guid: string) {
        comment.likes.push(guid);
    },
    removeLike(guid: string) {
        comment.likes.remove(guid);
    }
}))
.views((comment) => ({
    likedByUser(guid: string) {
        return comment.likes.includes(guid);
    }
}))

export interface IComment extends Instance<typeof CommentModel> {}
export interface CommentSnapshotIn extends SnapshotIn<typeof CommentModel>{}
export interface CommentSnapshotOut extends SnapshotOut<typeof CommentModel>{}

