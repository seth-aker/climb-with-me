import React from "react"
import { ImageStyle, Pressable, View, ViewStyle } from "react-native"
import { AutoImage } from "./AutoImage"
import { Text } from "./Text"
import { Button } from "./Button"
import { IFriendRequest } from "app/models/FriendRequest"
import { observer } from "mobx-react-lite"

export interface FriendRequestCardProps {
  friendRequest: IFriendRequest
}

export const FriendRequestCard = observer((props: FriendRequestCardProps) => {
  const { friendRequest } = props

  return (
    <View style={$container}>
      <Pressable>
        <AutoImage src={friendRequest.friendProfImg} style={$imgStyle} />
        <View style={$rightContainer}>
          <Text text={friendRequest.friendName} />
          <View style={$buttonContainer}>
            <Button text="Accept" />
            <Button preset="reversed" text="Deny" />
          </View>
        </View>
      </Pressable>
    </View>
  )
})
const $container: ViewStyle = {
  flexDirection: "row",
  width: "100%",
}
const $imgStyle: ImageStyle = {
  height: 70,
  width: 70,
  borderRadius: 35,
}
const $rightContainer: ViewStyle = {
  flex: 1,
  width: "100%",
}
const $buttonContainer: ViewStyle = {
  flexDirection: "row",
}
