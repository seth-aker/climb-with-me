import { HomeTabScreenProps } from "app/navigators/types"
// import { useSafeAreaInsetsStyle } from "app/utils/useSafeAreaInsetsStyle";
import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { Header, Icon, ListView, Screen } from "app/components"
import { ViewStyle } from "react-native"
import { colors, spacing } from "app/theme"
import { Logo } from "app/components/Logo"
import { useStores } from "app/models"
import { ChatCard } from "app/components/ChatCard"
import { ChatUserModel, IChat, ChatModel } from "app/models/Chat"
import uuid from "react-native-uuid"

interface MessagesScreenProps extends HomeTabScreenProps<"Messages"> {}

export const MessageScreen: FC<MessagesScreenProps> = observer(function MessageScreen(_props) {
  // const $bottomContainerInsets = useSafeAreaInsetsStyle(["bottom"])
  const { navigation } = _props
  const { messageStore, userStore } = useStores()

  const handleCreateNewChat = () => {
    const chatUser = ChatUserModel.create({
      guid: userStore.authId,
      name: userStore.name,
      userImg: userStore.profileImg,
      joinedOn: new Date(),
    })

    const newChat = ChatModel.create({
      chatId: uuid.v4().toString(),
      users: [chatUser],
      messages: [],
    })

    messageStore.addChat(newChat)
    messageStore.setSelectedChatId(newChat.chatId)
    navigation.push("ChatScreen")
  }
  return (
    <Screen preset="fixed" contentContainerStyle={$screenContainer}>
      <Header
        LeftActionComponent={<Logo width={30} height={30} fill={colors.palette.neutral100} />}
        RightActionComponent={
          <Icon
            icon={"pen-to-square"}
            color={colors.palette.neutral100}
            onPress={handleCreateNewChat}
          />
        }
        leftIconColor={colors.palette.neutral100}
        containerStyle={$headerStyle}
        backgroundColor={colors.palette.primary500}
      />
      <ListView<IChat>
        data={messageStore.chats}
        renderItem={({ item }) => <ChatCard chat={item} />}
      />
    </Screen>
  )
})

const $screenContainer: ViewStyle = {
  flex: 1,
}
const $headerStyle: ViewStyle = {
  marginBottom: 0,
  paddingHorizontal: spacing.sm,
}
