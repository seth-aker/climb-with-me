import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree";
import { IMessage, MessageModel } from "./Message";

const ChatUser = types.model("ChatUser", {
  /**
   * Guid of chat user
   */
  guid: types.identifier,
  /**
   * Name of the chat user.
   */
  name: types.string
})

interface IChatUser extends Instance<typeof ChatUser> {};

export const ChatModel = types.model("Chat", {
  messages: types.array(MessageModel),
  users: types.map(ChatUser),
  chatName: types.maybeNull(types.string)

}).views((chat) => ({
  chatName(userId: string) {
    if(chat.chatName) {
      return chat.chatName
    }
    let returnString = "";
    if(chat.users.size === 2) {
      chat.users.forEach((user) => {
        if(user.guid !== userId) {
          returnString = user.name
      }})
      return returnString;
    }
    
    chat.users.forEach((user) => {
      returnString += user.name + ", "
    })
    return returnString;
  }
}))
.actions((chat) => ({
  addUser(user: IChatUser) {
    chat.users.put(user);
  },
  removeUser(user: IChatUser) {
    chat.users.delete(user.guid);
  },
  addMessage(message: IMessage) {
    chat.messages.push(message);
  }
}))

export interface IChat extends Instance<typeof ChatModel> {};
export interface IChatSnapshotIn extends SnapshotIn<typeof ChatModel> {};
export interface IChatSnapshotOut extends SnapshotOut<typeof ChatModel> {};
