import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { ChatModel, IChat } from "./Chat"

export const MessageStoreModel = types
  .model("MessageStore", {
    chats: types.array(ChatModel),
    selectedChatId: types.maybeNull(types.string),
  })
  .actions((store) => ({
    addChat(chat: IChat) {
      store.chats.push(chat)
    },
    deleteChat(chat: IChat) {
      store.chats.remove(chat)
    },
    setSelectedChatId(value: string | null) {
      store.selectedChatId = value
    },
  }))
  .views((store) => ({
    get selectedChat() {
      return store.chats.find((chat) => {
        return chat._id === store.selectedChatId
      })
    },
    chatWithUsersExists(userIds: string[]) {
      const setOfUsers = new Set(userIds)

      for (const chat of store.chats) {
        // if sets sizes don't match skip the set;
        if (setOfUsers.size !== chat.chatUserIds.length) {
          continue
        }
        const chatUserSet = new Set(chat.chatUserIds)
        // If allMatches stays true after checking all of the users then we return the chat Id
        let allMatches = true
        for (const id of setOfUsers) {
          if (!allMatches) {
            break
          }
          if (!chatUserSet.has(id)) {
            allMatches = false
          }
        }
        if (allMatches) {
          return chat._id
        }
      }
      // returns null when we have checked all of the chats and came up with nothing
      return null
    },
  }))

export interface IMessageStore extends Instance<typeof MessageStoreModel> {}
export interface IMessageStoreSnapshotIn extends SnapshotIn<typeof MessageStoreModel> {}
export interface IMessageStoreSnapshotOut extends SnapshotOut<typeof MessageStoreModel> {}
