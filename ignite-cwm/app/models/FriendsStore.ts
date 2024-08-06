import { flow, Instance, types } from "mobx-state-tree";
import { FriendModel, IFriend } from "./Friend";
import { FriendRequestModel } from "./FriendRequest";
import { delay } from "app/utils/delay";
import uuid from "react-native-uuid"

export const FriendsStoreModel = types.model("FriendsStore", {
  friends: types.array(FriendModel),
  friendRequests: types.array(FriendRequestModel),

}).views((store) => ({
  search(query: string) {
    return store.friends.filter((friend) => {
      return friend.name.toLowerCase().includes(query.toLowerCase())
    }).sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1)
  },
  getRequestById(id: string) {
    return store.friendRequests.find((request) => request.requestId === id)
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
   * Util function to add a friend request to the friendrequest store. For persistent data use createRequest() (once it's setup)
   * @param friend 
   */
  addFriendRequest(userId: string, userName: string, profImg: string) {
    store.friendRequests.push(FriendRequestModel.create({
      requestId: uuid.v4().toString(),
      friendId: userId,
      friendName: userName,
      friendProfImg: profImg,
      accepted: false,
      requestedOn: Date.now()
    }));
  }
}))
  .actions((store) => ({
/**
   * Async function to create a new friend request. The unusual syntax required is required by mobx-state-tree. a flow function is essentially the same as async. yield is essentially the same as await.
   */
  createRequest: flow(function* createRequest(fromUserId: string, toUserId: string) {
    delay(1000);
    return true;
  }),
  acceptRequest: flow(function* acceptRequest(requestId: string){
    const friendRequest = store.friendRequests.find((request) => request.requestId === requestId)
    if(!friendRequest) {
      return false;
    }
    friendRequest.setProp("accepted", true);
    // const friend = yield friendService.acceptFriendRequest(friendRequest.friendId)
    store.addFriend(FriendModel.create({guid: friendRequest.friendId, name: friendRequest.friendName, profImg: friendRequest.friendProfImg, friendSince: Date.now()}));
    return true;
  }),
  denyRequest: flow(function* denyRequest(requestId: string) {
    const request = store.friendRequests.find((request) => request.requestId === requestId)
    if(request) {
      store.friendRequests.remove(request)
      return true;
    }
    return false


  }),

})).actions((store)=> ({
  clearStore() {
    store.friends.clear()
    store.friendRequests.clear()
  }
}))

export interface IFriendsStoreModel extends Instance<typeof FriendsStoreModel> {}

