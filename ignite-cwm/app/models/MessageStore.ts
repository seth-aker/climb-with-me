import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree";
import { ChatModel, IChat } from "./Chat";

export const MessageStoreModel = types
.model("MessageStore", {
  chats: types.array(ChatModel)
}).actions((store) => ({
  addChat(chat: IChat) {
    store.chats.push(chat);
  },
  deleteChat(chat: IChat) {
    store.chats.remove(chat);
  },
  
}))

export interface MessageStore extends Instance<typeof MessageStoreModel> {};
export interface MessageStoreSnapshotIn extends SnapshotIn<typeof MessageStoreModel> {};
export interface MessageStoreSnapshotOut extends SnapshotOut<typeof MessageStoreModel> {};

