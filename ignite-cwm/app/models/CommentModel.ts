import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"

export const CommentModel = types
  .model("Comment", {
    _id: types.identifier,
    createdAt: types.Date,
    body: types.string,
    authorName: types.string,
    authorId: types.string,
    authorProfImg: types.string,
    likes: types.array(types.string), // User guids of people who have liked the comment
  })
  .actions(withSetPropAction)
  .actions((comment) => ({
    addLike(guid: string) {
      comment.likes.push(guid)
    },
    removeLike(guid: string) {
      comment.likes.remove(guid)
    },
  }))
  .views((comment) => ({
    likedByUser(guid: string) {
      return comment.likes.includes(guid)
    },
  }))

export interface IComment extends Instance<typeof CommentModel> {}
export interface ICommentSnapshotIn extends SnapshotIn<typeof CommentModel> {}
export interface ICommentSnapshotOut extends SnapshotOut<typeof CommentModel> {}
