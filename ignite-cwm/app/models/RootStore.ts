import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { AuthenticationStoreModel } from "./AuthenticationStore"
import { IUserStore, UserStoreModel } from "./UserStore"
import { IPostStore, PostStoreModel } from "./PostStore"
import { IMessageStore, MessageStoreModel } from "./MessageStore"
import { FriendsStoreModel, IFriendsStoreModel } from "./FriendsStore"

/**
 * A RootStore model.
 */
export const RootStoreModel = types.model("RootStore").props({
    authenticationStore: types.optional(AuthenticationStoreModel, {}),
    userStore: types.optional(UserStoreModel, {} as IUserStore),
    postStore: types.optional(PostStoreModel, {} as IPostStore),
    messageStore: types.optional(MessageStoreModel, {} as IMessageStore),
    friendStore: types.optional(FriendsStoreModel, {} as IFriendsStoreModel)
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}
/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
