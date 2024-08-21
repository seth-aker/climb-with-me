import { HomeTabScreenProps } from "app/navigators/types"
// import { useSafeAreaInsetsStyle } from "app/utils/useSafeAreaInsetsStyle";
import { observer } from "mobx-react-lite"
import React, { FC, useRef, useState } from "react"
import { AutoImage, Button, Header, Icon, ListView, Screen, Text } from "app/components"
import {
  FlatList,
  ImageStyle,
  Modal,
  Pressable,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from "react-native"
import { colors, spacing } from "app/theme"
import { Logo } from "app/components/Logo"
import { useStores } from "app/models"
import { ChatCard } from "app/components/ChatCard"
import { ChatUserModel, IChat, ChatModel, IChatUser } from "app/models/Chat"
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
  const textInputRef = useRef<TextInput>(null)
  const chatList = messageStore.chats.slice().sort((a, b) => {
    return (
      (b.getLastMessage()?.sentOn.getTime() ?? b.createdOn.getTime()) -
      (a.getLastMessage()?.sentOn.getTime() ?? a.createdOn.getTime())
    )
  })

  const handleCreateNewChat = () => {
    const chatUserIds = [userStore._id, ...toUsers.map((user) => user._id)]
    const chatId = messageStore.chatWithUsersExists(chatUserIds)
    if (chatId !== null) {
      messageStore.setSelectedChatId(chatId)
    } else {
      const currentUser = ChatUserModel.create({
        _id: userStore._id,
        name: userStore.name,
        userImg: userStore.profileImg,
        joinedOn: new Date(),
      })
      const chatUsers: IChatUser[] = [currentUser]
      toUsers.forEach((user) => {
        chatUsers.push(
          ChatUserModel.create({
            _id: user._id,
            name: user.name,
            userImg: user.profImg,
            joinedOn: new Date(),
          }),
        )
      })

      const newChat = ChatModel.create({
        _id: uuid.v4().toString(),
        users: chatUsers,
        messages: [],
      })

      messageStore.addChat(newChat)
      messageStore.setSelectedChatId(newChat._id)
    }
    navigation.push("ChatScreen")
    setModalVis(false)
  }

  const handleTextChange = (text: string) => {
    setToUserText(text)
    setFriendSearchResults(friendStore.search(text))
  }

  const addToUserList = (friend: IFriend) => {
    setToUsers((toUsers) => [...toUsers, friend])
    textInputRef.current?.clear()
  }
  const handleOpenModal = () => {
    setToUsers([])
    setToUserText("")
    setModalVis(true)
  }

  return (
    <Screen preset="fixed" contentContainerStyle={$screenContainer}>
      <Header
        LeftActionComponent={<Logo width={30} height={30} fill={colors.palette.neutral100} />}
        RightActionComponent={
          <Icon
            icon={"pen-to-square"}
            color={colors.palette.neutral100}
            onPress={handleOpenModal}
            containerStyle={$iconContainerStyle}
          />
        }
        leftIconColor={colors.palette.neutral100}
        containerStyle={$headerStyle}
        backgroundColor={colors.palette.primary500}
      />
      <ListView<IChat>
        data={chatList}
        estimatedItemSize={80}
        // Required for height animation change to not affect more than one card. This is due to flashlist's default component reuse
        keyExtractor={(item) => {
          return item._id
        }}
        renderItem={({ item }) => <ChatCard chat={item} />}
      />
      <Modal
        onShow={() => textInputRef.current?.focus()}
        visible={modalVis}
        style={$modalStyle}
        animationType="slide"
      >
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
          <View style={$textInputItems}>
            {toUsers.length > 0 && (
              <FlatList
                columnWrapperStyle={$toFriendList}
                scrollEnabled={false}
                data={toUsers}
                numColumns={99}
                renderItem={({ item }) => <Text text={item.name} style={$toFriendListItem} />}
              />
            )}
            <TextInput
              ref={textInputRef}
              style={$textInputStyle}
              value={toUserSearchText}
              onChangeText={handleTextChange}
              onFocus={() => handleTextChange(toUserSearchText)}
              onKeyPress={(e) => {
                if (e.nativeEvent.key === "Backspace" && toUserSearchText === "") {
                  setToUsers((prevToUsers) => prevToUsers.slice(0, -1))
                }
              }}
            />
          </View>
          <Button onPress={handleCreateNewChat} style={$createButton}>
            <Icon icon={"arrow-right"} color={colors.palette.neutral100} />
          </Button>
        </View>
        <ListView<IFriend>
          data={friendSearchResults}
          keyboardShouldPersistTaps={"always"}
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
const $iconContainerStyle: ViewStyle = {
  height: "100%",
  justifyContent: "center",
  alignItems: "center",
  minWidth: 50,
  position: "absolute",
  right: -1 * spacing.sm,
}
const $modalStyle: ViewStyle = {}
const $textInputContainer: ViewStyle = {
  width: "100%",
  paddingHorizontal: spacing.sm,
  flexDirection: "row",
  flexWrap: "wrap",
  alignItems: "center",
  borderTopColor: colors.border,
  borderBottomColor: colors.border,
  borderTopWidth: 1,
  borderBottomWidth: 1,
}
const $textInputItems: ViewStyle = {
  flex: 1,
}
const $textInputStyle: TextStyle = {
  width: "90%",
}

const $toFriendList: ViewStyle = {
  flexWrap: "wrap",
}

const $toFriendListItem: TextStyle = {
  color: colors.palette.neutral100,
  maxHeight: 30,
  width: "auto",
  marginHorizontal: spacing.xxxs,
  paddingHorizontal: spacing.xxxs,
  marginVertical: spacing.xxxs,
  backgroundColor: colors.palette.primary500,
  borderRadius: 2,
}
const $createButton: ViewStyle = {
  marginVertical: spacing.xxxs,
  width: 30,
  height: 30,
  borderRadius: 15,
  alignSelf: "flex-end",
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
  borderBottomWidth: 1,
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
