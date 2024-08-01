import React, { useRef, useState } from "react"
import { AppStackScreenProps } from "app/navigators/types"
import { observer } from "mobx-react-lite"
import { Button, Header, Icon, ListView, ListViewRef, Screen } from "app/components"
import { TextInput, TextStyle, View, ViewStyle } from "react-native"
import { colors, spacing } from "app/theme"
import { useStores } from "app/models"
import { IMessage, MessageModel } from "app/models/Message"
import uuid from "react-native-uuid"
import { MessageCard } from "app/components/MessageCard"
import { EmptyListComponent } from "app/components/EmptyListComponent"

interface ChatScreenProps extends AppStackScreenProps<"ChatScreen"> {}
export const ChatScreen = observer((props: ChatScreenProps) => {
  // const bottomSafeArea = useSafeAreaInsetsStyle(["bottom"])
  const { navigation } = props
  const { messageStore, userStore } = useStores()

  const inputRef = useRef<TextInput>(null)
  const messageListRef = useRef<ListViewRef<IMessage>>(null)

  const [messageText, setMessageText] = useState("")

  const sendMessage = () => {
    messageStore.selectedChat?.addMessage(
      MessageModel.create({
        guid: uuid.v4().toString(),
        ownerId: userStore.authId,
        ownerName: userStore.name,
        body: messageText,
        sentOn: new Date(),
      }),
    )
    setMessageText("")
    inputRef.current?.blur()
  }

  const handleGoBack = () => {
    messageStore.setSelectedChatId(null)
    navigation.goBack()
  }

  // const [textInputHeight, setTextInputHeight] = useState(35)
  // const $textInputHeight: ViewStyle = { height: textInputHeight }
  if (!messageStore.selectedChat) {
    return null
  }
  return (
    <Screen preset="fixed" contentContainerStyle={$screenContainer} safeAreaEdges={["bottom"]}>
      <View style={$topContainer}>
        <Header
          title={
            // If the number of users is more than 2 return title text is {number} people
            // Else it is the chat name
            !messageStore.selectedChat.chatName && messageStore.selectedChat.userCount > 2
              ? `${messageStore.selectedChat.userCount - 1} people`
              : messageStore.selectedChat.getChatName(userStore.authId)
          }
          titleStyle={{ color: colors.palette.neutral100 }}
          LeftActionComponent={
            <Icon icon={"angle-left"} onPress={handleGoBack} color={colors.palette.neutral100} />
          }
          RightActionComponent={<Icon icon={"pen-to-square"} color={colors.palette.neutral100} />}
          containerStyle={$headerStyle}
          backgroundColor={colors.palette.primary500}
        />
        <ListView<IMessage>
          ref={messageListRef}
          data={messageStore.selectedChat?.messages.slice()}
          estimatedItemSize={40}
          renderItem={({ item }) => {
            return <MessageCard message={item} viewerId={userStore.authId} />
          }}
          ListEmptyComponent={<EmptyListComponent />}
          onLoad={() => messageListRef.current?.scrollToEnd()}
        />
      </View>
      <View style={$bottomContainer}>
        <View style={$textInputContainer}>
          <TextInput
            style={$textInputStyle}
            multiline
            value={messageText}
            onFocus={() => {
              if (
                messageStore.selectedChat?.messages &&
                messageStore.selectedChat?.messages.length > 0
              ) {
                messageListRef.current?.scrollToEnd({ animated: true })
              }
            }}
            onChangeText={(value) => setMessageText(value)}
            ref={inputRef}
          />
          <Button
            style={$sendMessageButton}
            onPress={sendMessage}
            RightAccessory={() => <Icon icon={"arrow-up"} color={colors.palette.neutral100} />}
          />
        </View>
      </View>
    </Screen>
  )
})

const $screenContainer: ViewStyle = {
  flex: 1,
  alignContent: "space-between",
}
const $headerStyle: ViewStyle = {
  marginBottom: 0,
  paddingHorizontal: spacing.sm,
}
const $topContainer: ViewStyle = {
  flexBasis: "93%",
  flexShrink: 1,
  flexGrow: 1,
}
const $bottomContainer: ViewStyle = {
  flexGrow: 1,
  flexShrink: 0,
  padding: spacing.xs,
  alignItems: "center",
  backgroundColor: colors.palette.neutral400,
  justifyContent: "flex-end",
}
const $textInputContainer: ViewStyle = {
  backgroundColor: colors.palette.neutral100,
  flexDirection: "row",
  alignItems: "flex-end",
  borderWidth: 1,
  borderColor: colors.border,
  borderRadius: 20,
  paddingLeft: spacing.sm,
  paddingRight: spacing.xxxs,
  paddingVertical: spacing.xxxs,
}
const $textInputStyle: TextStyle = {
  flexGrow: 1,
  maxWidth: "92%",
  alignSelf: "center",
}
const $sendMessageButton: ViewStyle = {
  width: 30,
  height: 30,
  borderRadius: 15,
}
