import React from "react"
import { observer } from "mobx-react-lite"
import { ImageStyle, Pressable, View, ViewStyle } from "react-native"
import { AutoImage } from "./AutoImage"
import { IChat } from "app/models/Chat"
import { useNavigation } from "@react-navigation/native"
import { RootStackNavigation } from "app/navigators/types"
import { useStores } from "app/models"
import { Text } from "./Text"
import { formatTimeSince } from "app/utils/formatTime"
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
    lastSent = formatTimeSince(Date.now() - lastMessage.sentOn.getTime())
  }
  const formatMessageBody = (body: string) => {
    if (body.length > 80) {
      return body.substring(0, 80).trimEnd() + "..."
    } else {
      return body
    }
  }
  return (
    <Pressable style={$container} onPress={onPress}>
      <AutoImage src={chat.users.at(0)?.userImg} style={$chatImg} />
      <View style={$textContainer}>
        <View style={$topTextContainer}>
          <Text text={chat.getChatName(userStore.authId)} preset="bold" />
          <Text>
            {lastSent || ""}
            <Icon icon={"angle-right"} />
          </Text>
        </View>
        <Text text={formatMessageBody(messageBody)} />
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
}
