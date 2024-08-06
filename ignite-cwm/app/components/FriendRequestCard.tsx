import React from "react"
import { ImageStyle, Pressable, View, ViewStyle } from "react-native"
import { AutoImage } from "./AutoImage"
import { Text } from "./Text"
import { Button } from "./Button"
import { IFriendRequest } from "app/models/FriendRequest"
import { observer } from "mobx-react-lite"
import { colors, spacing } from "app/theme"
import { useNavigation } from "@react-navigation/native"
import { RootStackNavigation } from "app/navigators/types"
import { formatSentOn } from "app/utils/formatTime"
import { useStores } from "app/models"

export interface FriendRequestCardProps {
  friendRequest: IFriendRequest
}

export const FriendRequestCard = observer((props: FriendRequestCardProps) => {
  const { friendRequest } = props
  const { friendStore } = useStores()
  const navigation = useNavigation<RootStackNavigation>()
  const handleOnPress = () => {
    // navigation.push("UserProfile");
  }
  const handleAcceptFriend = () => {
    friendStore.acceptRequest(friendRequest.requestId)
  }
  return (
    <Pressable onPress={handleOnPress} style={$container}>
      <AutoImage src={friendRequest.friendProfImg} style={$imgStyle} />
      <View style={$rightContainer}>
        <Text text={friendRequest.friendName} preset="bold" size="xl" />
        <Text text={`Sent: ${formatSentOn(friendRequest.requestedOn)}`} />
        <View style={$buttonContainer}>
          <Button
            disabled={friendRequest.accepted}
            onPress={handleAcceptFriend}
            style={$buttonStyle}
            text={friendRequest.accepted ? "Accepted" : "Accept"}
          />
          <Button
            disabled={friendRequest.accepted}
            style={$buttonStyle}
            preset="reversed"
            text="Deny"
          />
        </View>
      </View>
    </Pressable>
  )
})
const $container: ViewStyle = {
  flexDirection: "row",
  width: "100%",
  borderBottomWidth: 1,
  borderBottomColor: colors.border,
  paddingVertical: spacing.sm,
}
const $imgStyle: ImageStyle = {
  height: 85,
  width: 85,
  borderRadius: 43,
  margin: spacing.xs,
  marginLeft: spacing.sm,
}
const $rightContainer: ViewStyle = {
  flex: 1,
  width: "100%",
}
const $buttonContainer: ViewStyle = {
  flexDirection: "row",
}
const $buttonStyle: ViewStyle = {
  borderRadius: 5,
  flex: 1,
  marginRight: spacing.sm,
}
