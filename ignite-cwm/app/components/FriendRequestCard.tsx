import React from "react"
import { IFriend } from "app/models/Friend"
import { Pressable, View } from "react-native"

export interface FriendRequestCardProps {
  friendRequest: IFriend
}

export const FriendRequestCard = (props: FriendRequestCardProps) => {
  const { friendStore } = useStores()
  return <Pressable></Pressable>
}
