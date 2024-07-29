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

export interface ChatCardProps {
  chat: IChat
}

export const ChatCard = observer((props: ChatCardProps) => {
  const { chat } = props
  const { messageStore, userStore } = useStores()
  const navigation = useNavigation<RootStackNavigation>()
  const onPress = () => {
    messageStore.setSelectedChatId(chat.chatId)
    navigation.navigate("ChatScreen")
  }
  const lastMessage = chat.messages.at(chat.messages.length - 1) ?? ({} as IMessage)
  const messageBody = lastMessage.body
  let lastSent
  if (lastMessage.sentOn) {
    lastSent = formatTimeSince(lastMessage.sentOn?.getDate())
  }

  return (
    <Pressable style={$container} onPress={onPress}>
      <AutoImage src={chat.users.at(0)?.userImg} style={$chatImg} />
      <View>
        <View style={$topTextContainer}>
          <Text text={chat.getChatName(userStore.authId)} preset="bold" />
          <Text>
            {lastSent || ""}
            <Icon icon={"angle-right"} />
          </Text>
        </View>
        <Text text={messageBody} />
      </View>
    </Pressable>
  )
})
const $container: ViewStyle = {
  flexDirection: "row",
}
const $chatImg: ImageStyle = {
  height: 75,
  width: 75,
  borderRadius: 37,
}
const $topTextContainer: ViewStyle = {
  flexDirection: "row",
}
