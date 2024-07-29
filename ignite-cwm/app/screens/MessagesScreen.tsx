import { HomeTabScreenProps } from "app/navigators/types"
// import { useSafeAreaInsetsStyle } from "app/utils/useSafeAreaInsetsStyle";
import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useState } from "react"
import { Button, Header, Icon, ListView, Screen } from "app/components"
import { Dimensions, Modal, ViewStyle } from "react-native"
import { colors, spacing } from "app/theme"
import { Logo } from "app/components/Logo"
import { useStores } from "app/models"
import { ChatCard } from "app/components/ChatCard"
import { ChatUserModel, IChat, ChatModel } from "app/models/Chat"
import uuid from "react-native-uuid"

interface MessagesScreenProps extends HomeTabScreenProps<"Messages"> {}

export const MessagesScreen: FC<MessagesScreenProps> = observer(function MessageScreen(_props) {
  const { navigation } = _props
  const { messageStore, userStore } = useStores()
  const [modalVis, setModalVis] = useState(false)

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

  const handleGoBack = () => {
    navigation.goBack()
  }
  return (
    <Screen preset="fixed" contentContainerStyle={$screenContainer}>
      <Header
        LeftActionComponent={<Logo width={30} height={30} fill={colors.palette.neutral100} />}
        RightActionComponent={
          <Icon
            icon={"pen-to-square"}
            color={colors.palette.neutral100}
            onPress={() => setModalVis(true)}
          />
        }
        leftIconColor={colors.palette.neutral100}
        containerStyle={$headerStyle}
        backgroundColor={colors.palette.primary500}
        onLeftPress={handleGoBack}
      />
      <ListView<IChat>
        data={messageStore.chats}
        estimatedItemSize={80}
        renderItem={({ item }) => <ChatCard chat={item} />}
      />
      <Modal visible={modalVis} style={$modalStyle} animationType="slide">
        <Header containerStyle={$headerStyle} backgroundColor={colors.palette.primary500} />
        <Button text="Toggle" onPress={() => setModalVis(false)} />
      </Modal>
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
const $modalStyle: ViewStyle = {}
