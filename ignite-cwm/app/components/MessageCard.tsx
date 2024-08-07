import { IMessage } from "app/models/Message"
import { observer } from "mobx-react-lite"
import React from "react"
import { View, ViewStyle } from "react-native"
import { Text } from "./Text"
import { colors, spacing } from "app/theme"
export interface MessageCardProps {
  message: IMessage
  viewerId: string
}
export const MessageCard = observer((props: MessageCardProps) => {
  const { message, viewerId } = props

  const viewerIsOwner = message.ownerId === viewerId
  const backgroundColor = viewerIsOwner ? colors.palette.primary500 : "#dedede"
  const alignSelf = viewerIsOwner ? "flex-end" : "flex-start"
  const $messageContainerStyle: ViewStyle = {
    backgroundColor,
    alignSelf,
  }
  return (
    <View style={[$messageContainerDefaults, $messageContainerStyle]}>
      <Text
        text={message.body}
        textColor={viewerIsOwner ? colors.palette.neutral100 : colors.text}
        selectable
      />
      <View style={viewerIsOwner ? $rightArrow : $leftArrow} />
      <View style={viewerIsOwner ? $rightArrowOverlap : $leftArrowOverlap} />
    </View>
  )
})

const $messageContainerDefaults: ViewStyle = {
  maxWidth: "65%",
  padding: spacing.xs,
  margin: spacing.xs,
  borderRadius: 18,
}
const $rightArrow: ViewStyle = {
  position: "absolute",
  backgroundColor: colors.palette.primary500,
  width: 20,
  height: 25,
  bottom: 0,
  borderBottomLeftRadius: 25,
  right: -11,
}
const $rightArrowOverlap: ViewStyle = {
  position: "absolute",
  backgroundColor: colors.background,
  width: 20,
  height: 35,
  bottom: -6,
  borderBottomLeftRadius: 18,
  right: -20,
}
const $leftArrow: ViewStyle = {
  position: "absolute",
  backgroundColor: "#dedede",
  width: 20,
  height: 25,
  bottom: 0,
  borderBottomRightRadius: 25,
  left: -10,
}
const $leftArrowOverlap: ViewStyle = {
  position: "absolute",
  backgroundColor: colors.background,
  width: 20,
  height: 35,
  bottom: -6,
  borderBottomRightRadius: 18,
  left: -20,
}
