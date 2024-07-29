import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree";
import { IMessage, MessageModel } from "./Message";

export const ChatUserModel = types.model("ChatUser", {
  /**
   * Guid of chat user
   */
  guid: types.identifier,
  /**
   * Name of the chat user.
   */
  name: types.maybe(types.string),
  /**
   * Easy access to the profile image of the user
   */
  userImg: types.maybe(types.string),
  /**
   * The date and time the user joined the chat
   */
  joinedOn: types.Date, 
})

export interface IChatUser extends Instance<typeof ChatUserModel> {};

export const ChatModel = types.model("Chat", {
  chatId: types.identifier,
  messages: types.array(MessageModel),
  users: types.array(ChatUserModel),
  chatName: types.maybeNull(types.string)

}).views((chat) => ({
  getChatName(viewingUserId: string) {
    if(chat.chatName) {
      return chat.chatName
    }
    const names = chat.users.filter((user) => user.guid !== viewingUserId)
      .map((user) => user.name) 
    
    return names.join(names.length === 2 ? " & " : ", ")
  }
}))
.actions((chat) => ({
  addUser(user: IChatUser) {
    chat.users.push(user);
  },
  removeUser(user: IChatUser) {
    chat.users.remove(user);
  },
  addMessage(message: IMessage) {
    chat.messages.push(message);
  },
  setChatName(text: string) {
    chat.chatName = text
  },
  deleteChatName() {
    chat.chatName = null
  }
}))

export interface IChat extends Instance<typeof ChatModel> {};
export interface IChatSnapshotIn extends SnapshotIn<typeof ChatModel> {};
export interface IChatSnapshotOut extends SnapshotOut<typeof ChatModel> {};
