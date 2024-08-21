import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { IMessage, MessageModel } from "./Message"

export const ChatUserModel = types.model("ChatUser", {
  /**
   * Guid of chat user
   */
  _id: types.identifier,
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

export interface IChatUser extends Instance<typeof ChatUserModel> {}

export const ChatModel = types
  .model("Chat", {
    _id: types.identifier,
    messages: types.array(MessageModel),
    users: types.array(ChatUserModel),
    chatName: types.maybeNull(types.string),
    createdOn: types.optional(types.Date, Date.now()),
  })
  .views((chat) => ({
    /**
     *
     * @param viewingUserId input the user viewing the screen to remove them from the list of names
     * @param numOfDisplayNames How many names to print before stopping and adding "and {num} others"
     * @returns string
     */
    getChatName(viewingUserId: string, numOfDisplayNames?: number) {
      if (chat.chatName) {
        return chat.chatName
      }
      const names = chat.users.filter((user) => user._id !== viewingUserId).map((user) => user.name)

      if (numOfDisplayNames && numOfDisplayNames < names.length) {
        const displayNames = names.slice(0, numOfDisplayNames)
        return `${displayNames.join(", ")}, and ${
          names.length - numOfDisplayNames === 1
            ? `${names.length - numOfDisplayNames} other`
            : `${names.length - numOfDisplayNames} others`
        }`
      }

      return names.join(names.length === 2 ? " & " : ", ")
    },
    get chatUserIds() {
      return chat.users.map((user) => user._id)
    },
    get userCount() {
      return chat.users.length
    },
    getUsersExcluding(excludeId: string) {
      return chat.users.filter((user) => user._id !== excludeId)
    },
    getLastMessage() {
      return chat.messages.at(chat.messages.length - 1)
    },
  }))
  .actions((chat) => ({
    addUser(user: IChatUser) {
      chat.users.push(user)
    },
    removeUser(user: IChatUser) {
      chat.users.remove(user)
    },
    addMessage(message: IMessage) {
      chat.messages.push(message)
    },
    setChatName(text: string) {
      chat.chatName = text
    },
    deleteChatName() {
      chat.chatName = null
    },
  }))

export interface IChat extends Instance<typeof ChatModel> {}
export interface IChatSnapshotIn extends SnapshotIn<typeof ChatModel> {}
export interface IChatSnapshotOut extends SnapshotOut<typeof ChatModel> {}
