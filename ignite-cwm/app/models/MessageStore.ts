import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree";
import { ChatModel, IChat } from "./Chat";

export const MessageStoreModel = types
.model("MessageStore", {
  chats: types.array(ChatModel),
  selectedChatId: types.maybeNull(types.string)
}).actions((store) => ({
  addChat(chat: IChat) {
    store.chats.push(chat);
  },
  deleteChat(chat: IChat) {
    store.chats.remove(chat);
  },
  setSelectedChatId(value: string | null) {
    store.selectedChatId = value;
  }
}))

export interface IMessageStore extends Instance<typeof MessageStoreModel> {};
export interface IMessageStoreSnapshotIn extends SnapshotIn<typeof MessageStoreModel> {};
export interface IMessageStoreSnapshotOut extends SnapshotOut<typeof MessageStoreModel> {};

