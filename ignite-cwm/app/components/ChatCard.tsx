import React from "react"
import { observer } from "mobx-react-lite"
import { ImageStyle, Pressable, TextStyle, View, ViewStyle } from "react-native"
import { AutoImage } from "./AutoImage"
import { IChat } from "app/models/Chat"
import { useNavigation } from "@react-navigation/native"
import { RootStackNavigation } from "app/navigators/types"
import { useStores } from "app/models"
import { Text } from "./Text"
import { formatSentOn } from "app/utils/formatTime"
import { IMessage } from "app/models/Message"
import { Icon } from "./Icon"
import { spacing } from "app/theme"

export interface ChatCardProps {
  chat: IChat
}

export const ChatCard = observer((props: ChatCardProps) => {
  const { chat } = props
  const { messageStore, userStore } = useStores()
  const navigation = useNavigation<RootStackNavigation>()
  const onPress = () => {
    messageStore.setSelectedChatId(chat.chatId)
    navigation.push("ChatScreen")
  }
  const lastMessage = chat.messages.at(chat.messages.length - 1) ?? ({} as IMessage)
  const messageBody = lastMessage.body
  let lastSent
  if (lastMessage.sentOn) {
    lastSent = formatSentOn(lastMessage.sentOn)
  }
  const formatMessageBody = (body: string) => {
    if (body && body.length > 70) {
      return body.substring(0, 70).trimEnd() + "..."
    } else {
      return body
    }
  }
  const chatNameDisplay = chat.getChatName(userStore.authId, 3)
  return (
    <Pressable style={$container} onPress={onPress}>
      <AutoImage src={chat.users.at(0)?.userImg} style={$chatImg} />
      <View style={$textContainer}>
        <View style={$topTextContainer}>
          <Text size="xs" style={$chatTitle} text={chatNameDisplay} preset="bold" />
          <Text weight="light" size="xxs" style={$lastSentStyle}>
            {lastSent || ""}
          </Text>
          <Icon icon={"angle-right"} size={12} />
        </View>
        <Text size="xxs" text={formatMessageBody(messageBody)} />
      </View>
    </Pressable>
  )
})
const $container: ViewStyle = {
  flexDirection: "row",
  height: 80,
  alignItems: "center",
}
const $chatImg: ImageStyle = {
  height: 70,
  width: 70,
  borderRadius: 35,
  margin: spacing.xs,
}
const $textContainer: ViewStyle = {
  flex: 1,
  marginRight: spacing.sm,
}
const $topTextContainer: ViewStyle = {
  flexDirection: "row",
  alignContent: "center",
  justifyContent: "space-between",
}
const $chatTitle: TextStyle = {
  flexGrow: 0,
  width: "75%",
}
const $lastSentStyle: ViewStyle = {}
