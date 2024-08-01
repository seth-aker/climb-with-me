import React, { FC } from "react"
import { View, Image, ViewStyle, TextStyle, ImageStyle } from "react-native"
import { Text } from "app/components"
import { faComment, faInfoCircle } from "@fortawesome/free-solid-svg-icons"
import { Icon } from "app/components/Icon" // Update this path based on your project structure
import { spacing } from "app/theme"
import { IFriend } from "app/models/Friend"

interface FriendCardProps {
  friend: IFriend
}

export const FriendCard: FC<FriendCardProps> = (props) => {
  const {
    friend: { profImg, name },
  } = props
  return (
    <View style={$friendContainer}>
      <Image src={profImg} style={$avatar} />
      <Text text={name} style={$friendName} />
      <View style={$iconsContainer}>
        <Icon
          icon={faComment}
          size={24}
          color="#3c3c3c9e"
          onPress={() => console.log(`Message ${name}`)}
        />
        <Icon
          icon={faInfoCircle}
          size={24}
          color="#3c3c3c9e"
          onPress={() => console.log(`Info about ${name}`)}
        />
      </View>
    </View>
  )
}

const $friendContainer: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  marginBottom: spacing.md,
  minWidth: 120,
  paddingHorizontal: spacing.md,
  borderWidth: 1,
  borderColor: "#ccc",
  borderRadius: 10,
  paddingVertical: spacing.sm,
  backgroundColor: "#f9f9f9",
}

const $friendName: TextStyle = {
  marginLeft: spacing.md,
  fontSize: 18,
  flex: 1, // To take up remaining space
}

const $avatar: ImageStyle = {
  width: 50,
  height: 50,
  borderRadius: 25,
  borderWidth: 1,
  borderColor: "#ccc",
}

const $iconsContainer: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  width: 60,
  marginLeft: spacing.md,
}
