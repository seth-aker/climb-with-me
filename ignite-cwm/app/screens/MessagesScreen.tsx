import { HomeTabScreenProps } from "app/navigators/types"
// import { useSafeAreaInsetsStyle } from "app/utils/useSafeAreaInsetsStyle";
import { observer } from "mobx-react-lite"
import React, { FC, useState } from "react"
import { AutoImage, Header, Icon, ListView, Screen, Text } from "app/components"
import { ImageStyle, Modal, Pressable, TextInput, View, ViewStyle } from "react-native"
import { colors, spacing } from "app/theme"
import { Logo } from "app/components/Logo"
import { useStores } from "app/models"
import { ChatCard } from "app/components/ChatCard"
import { ChatUserModel, IChat, ChatModel } from "app/models/Chat"
import uuid from "react-native-uuid"
import { IFriend } from "app/models/Friend"

interface MessagesScreenProps extends HomeTabScreenProps<"Messages"> {}

export const MessagesScreen: FC<MessagesScreenProps> = observer(function MessageScreen(_props) {
  const { navigation } = _props
  const { messageStore, userStore, friendStore } = useStores()
  const [modalVis, setModalVis] = useState(false)
  const [toUserSearchText, setToUserText] = useState("")
  const [toUsers, setToUsers] = useState<IFriend[]>([] as IFriend[])
  const [friendSearchResults, setFriendSearchResults] = useState<IFriend[]>([] as IFriend[])

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

  const handleTextChange = (text: string) => {
    setToUserText(text)
    setFriendSearchResults(friendStore.search(text))
  }

  const addToUserList = (friend: IFriend) => {
    setToUsers((toUsers) => [...toUsers, friend])
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
        <Header
          containerStyle={$headerStyle}
          title="New Message"
          titleStyle={{ color: colors.palette.neutral100 }}
          backgroundColor={colors.palette.primary500}
          rightText="Cancel"
          onRightPress={() => setModalVis(false)}
        />
        <View style={$textInputContainer}>
          <Text text={"To: "} />
          {toUsers.length > 0 && (
            <ListView<IFriend>
              contentContainerStyle={$toFriendList}
              data={toUsers}
              horizontal
              renderItem={({ item }) => <Text text={item.name} style={$toFriendListItem} />}
              estimatedItemSize={20}
            />
          )}
          <TextInput
            value={toUserSearchText}
            onChangeText={handleTextChange}
            onFocus={() => handleTextChange(toUserSearchText)}
          />
        </View>
        <ListView<IFriend>
          data={friendSearchResults}
          estimatedItemSize={40}
          renderItem={({ item }) => (
            <FriendInfoCard friend={item} onPress={() => addToUserList(item)} />
          )}
        />
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
const $textInputContainer: ViewStyle = {
  paddingHorizontal: spacing.sm,
  flexDirection: "row",
  borderTopColor: colors.border,
  borderBottomColor: colors.border,
  borderTopWidth: 1,
  borderBottomWidth: 1,
}
const $toFriendList: ViewStyle = {}
const $toFriendListItem: ViewStyle = {
  width: "auto",
  marginHorizontal: spacing.xxxs,
  paddingHorizontal: spacing.xxxs,
  flex: 1,
  backgroundColor: colors.palette.primary500,
  borderRadius: 2,
}

interface FriendInfoCardProps {
  friend: IFriend
  onPress: () => void
}
const FriendInfoCard = observer((props: FriendInfoCardProps) => {
  const { friend, onPress } = props

  return (
    <Pressable onPress={onPress} style={$friendCardContainer}>
      <View style={$flexRow}>
        <AutoImage src={friend.profImg} style={$friendImgStyle} />
        <Text text={friend.name} />
      </View>
      <Icon icon={"angle-right"} color={colors.palette.primary500} />
    </Pressable>
  )
})
const $friendCardContainer: ViewStyle = {
  flexDirection: "row",
  borderTopColor: colors.border,
  borderBottomColor: colors.border,
  borderTopWidth: 1,
  alignItems: "center",
  justifyContent: "space-between",
}
const $flexRow: ViewStyle = {
  alignItems: "center",
  flexDirection: "row",
}
const $friendImgStyle: ImageStyle = {
  height: 40,
  width: 40,
  borderRadius: 20,
  margin: spacing.xs,
}
