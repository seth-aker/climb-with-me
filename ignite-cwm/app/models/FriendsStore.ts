import { flow, Instance, types } from "mobx-state-tree";
import { FriendModel, IFriend } from "./Friend";
import { FriendRequestModel } from "./FriendRequest";

export const FriendsStoreModel = types.model("FriendsStore", {
  friends: types.array(FriendModel),
  friendRequests: types.array(FriendRequestModel),

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
  },
  /**
   * Async function to create a new friend request. The unusual syntax required is required by mobx-state-tree. a flow function is essentially the same as async. yield is essentially the same as await.
   */
  createRequest: flow(function* createRequest(fromUserId: string, toUserId: string) {
    
  }),
})).actions((store)=> ({
  clearStore() {
    store.friends.clear()
  }
}))

export interface IFriendsStoreModel extends Instance<typeof FriendsStoreModel> {}

