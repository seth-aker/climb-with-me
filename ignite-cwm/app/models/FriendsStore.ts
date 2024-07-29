import { Instance, types } from "mobx-state-tree";
import { FriendModel, IFriend } from "./Friend";

export const FriendsStoreModel = types.model("FriendsStore", {
  friends: types.array(FriendModel),
  
}).views((store) => ({
  search(query: string) {
    return store.friends.filter((friend) => {
      return friend.name.toLowerCase().includes(query.toLowerCase())
    }).sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1)
  }
})).actions((store) => ({
  addFriend(friend: IFriend) {
    if(!store.friends.includes(friend)) {
      store.friends.push(friend);
    }
  },
  removeFriend(friend: IFriend) {
    store.friends.remove(friend)
  }
})).actions((store)=> ({
  clearStore() {
    store.friends.clear()
  }
}))

export interface IFriendsStoreModel extends Instance<typeof FriendsStoreModel> {}

