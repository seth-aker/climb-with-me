import React, { useState } from "react"
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
import {
  getFriendRequests,
  respondToFriendRequest,
} from "app/services/api/friendService/friendService"
import { LoadingSpinner } from "./LoadingSpinner"

export interface FriendRequestCardProps {
  friendRequest: IFriendRequest
}

export const FriendRequestCard = observer((props: FriendRequestCardProps) => {
  const { friendRequest } = props
  const {
    friendStore,
    authenticationStore: { authToken },
  } = useStores()
  const navigation = useNavigation<RootStackNavigation>()
  const [responseLoading, setResponseLoading] = useState(false)
  const handleOnPress = () => {
    // navigation.push("UserProfile");
  }
  const refreshFriendRequests = async () => {
    const result = await getFriendRequests(authToken ?? "")
    console.log(result.data)
    friendStore.setProp("friendRequests", result.data.friendRequests)
  }
  const handleAcceptFriend = async () => {
    setResponseLoading(true)
    try {
      await respondToFriendRequest(friendRequest._id, true, authToken ?? "")
      await refreshFriendRequests()
    } catch (err) {
      console.log(err)
    }

    setResponseLoading(false)
  }
  const handleDenyRequest = async () => {
    setResponseLoading(true)
    try {
      await respondToFriendRequest(friendRequest._id, false, authToken ?? "")
      await refreshFriendRequests()
    } catch (err) {
      console.log(err)
    }
    setResponseLoading(false)
  }
  return (
    <Pressable onPress={handleOnPress} style={$container}>
      <AutoImage src={friendRequest.friendProfImg} style={$imgStyle} />
      <View style={$rightContainer}>
        <Text text={friendRequest.friendName} preset="bold" size="xl" />
        <Text text={`Sent: ${formatSentOn(friendRequest.requestedOn)}`} />
        <View style={$buttonContainer}>
          <Button
            disabled={friendRequest.accepted || responseLoading}
            onPress={handleAcceptFriend}
            style={$buttonStyle}
          >
            {responseLoading ? (
              <LoadingSpinner />
            ) : (
              <Text
                text={friendRequest.accepted ? "Accepted" : "Accept"}
                textColor={colors.background}
              />
            )}
          </Button>
          <Button
            disabled={friendRequest.accepted || responseLoading}
            style={$buttonStyle}
            preset="reversed"
            text="Deny"
            onPress={handleDenyRequest}
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
  maxHeight: 75,
}
const $buttonStyle: ViewStyle = {
  borderRadius: 5,
  flex: 1,
  marginRight: spacing.sm,
}
