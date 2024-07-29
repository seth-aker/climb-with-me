import React, { useRef, useState } from "react"
import { AppStackScreenProps } from "app/navigators/types"
import { observer } from "mobx-react-lite"
import { Button, Header, Icon, Screen } from "app/components"
import { TextInput, TextStyle, View, ViewStyle } from "react-native"
import { colors, spacing } from "app/theme"
import { useStores } from "app/models"

interface ChatScreenProps extends AppStackScreenProps<"ChatScreen"> {}
export const ChatScreen = observer((props: ChatScreenProps) => {
  // const bottomSafeArea = useSafeAreaInsetsStyle(["bottom"])
  const { navigation } = props
  const { messageStore } = useStores()

  const [messageText, setMessageText] = useState("")

  const inputRef = useRef<TextInput>(null)
  const handleGoBack = () => {
    messageStore.setSelectedChatId(null)
    navigation.goBack()
  }

  const [textInputHeight, setTextInputHeight] = useState(35)

  const $textInputHeight: TextStyle = { height: textInputHeight }

  return (
    <Screen preset="fixed" contentContainerStyle={$screenContainer} safeAreaEdges={["bottom"]}>
      <View style={$topContainer}>
        <Header
          LeftActionComponent={<Icon icon={"angle-left"} />}
          RightActionComponent={<Icon icon={"pen-to-square"} color={colors.palette.neutral100} />}
          onLeftPress={handleGoBack}
          containerStyle={$headerStyle}
          backgroundColor={colors.palette.primary500}
        />
      </View>
      <View style={$bottomContainer}>
        <View style={$textInputContainer}>
          <TextInput
            style={[$textInputStyle, $textInputHeight]}
            multiline
            value={messageText}
            onChangeText={(value) => setMessageText(value)}
            onContentSizeChange={(e) => {
              setTextInputHeight(e.nativeEvent.contentSize.height)
            }}
            ref={inputRef}
          />
          <Button
            style={$sendMessageButton}
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
  flexBasis: "90%",
  flexShrink: 1,
  flexGrow: 0,
}
const $bottomContainer: ViewStyle = {
  width: "auto",
  flexGrow: 10,
  flexBasis: 55,
  margin: spacing.xs,
  alignContent: "flex-start",
}
const $textInputContainer: ViewStyle = {
  flexDirection: "row",
  alignItems: "flex-end",
  flexGrow: 10,
  borderWidth: 1,
  borderColor: colors.border,
  borderRadius: 16,
}
const $textInputStyle: TextStyle = {
  flexGrow: 1,
  maxWidth: "92%",
}
const $sendMessageButton: ViewStyle = {
  width: 30,
  height: 30,
  borderRadius: 15,
}
