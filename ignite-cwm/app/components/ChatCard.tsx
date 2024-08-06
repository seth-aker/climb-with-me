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
import { Icon } from "./Icon"
import { colors, spacing } from "app/theme"
import { Gesture, GestureDetector } from "react-native-gesture-handler"
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated"

export interface ChatCardProps {
  chat: IChat
}

export const ChatCard = observer((props: ChatCardProps) => {
  const { chat } = props
  const { messageStore, userStore } = useStores()
  const navigation = useNavigation<RootStackNavigation>()

  const offset = useSharedValue(0)
  const offsetInitial = useSharedValue(0)

  const pan = Gesture.Pan()
    .onChange((event) => {
      offset.value = event.translationX + offsetInitial.value
    })
    .onFinalize(() => {
      if (offset.value < -100) {
        offset.value = withTiming(-100, undefined, () => {
          offsetInitial.value = offset.value
        })
      } else {
        offset.value = withTiming(0, { duration: 300, easing: Easing.inOut(Easing.cubic) }, () => {
          offsetInitial.value = offset.value
        })
      }
    })
  const animatedCard = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value }],
    flexBasis: "100%",
  }))

  const animatedDelete = useAnimatedStyle(() => ({
    width: -1 * offset.value,
    position: "absolute",
    right: 0,
    height: "100%",
    // overflow: "hidden",
  }))

  const onPress = () => {
    messageStore.setSelectedChatId(chat.chatId)
    navigation.push("ChatScreen")
  }
  const lastMessage = chat.getLastMessage()
  const lastSent = lastMessage?.sentOn
    ? formatSentOn(lastMessage.sentOn)
    : formatSentOn(chat.createdOn)

  const messageBody = lastMessage?.body ?? ""
  const formatMessageBody = (body: string) => {
    if (body && body.length > 70) {
      return body.substring(0, 70).trimEnd() + "..."
    } else {
      return body
    }
  }
  const chatNameDisplay = chat.getChatName(userStore.authId, 3)
  return (
    <GestureDetector gesture={pan}>
      <View style={$container}>
        <Animated.View style={animatedCard}>
          <Pressable style={$cardContainer} onPress={onPress}>
            <AutoImage
              src={chat.getUsersExcluding(userStore.authId).at(0)?.userImg}
              style={$chatImg}
            />
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
        </Animated.View>
        <Animated.View style={animatedDelete}>
          <Pressable style={$deleteButton} onPress={() => messageStore.deleteChat(chat)}>
            <Icon icon={"trash"} color={colors.palette.neutral100} />
          </Pressable>
        </Animated.View>
      </View>
    </GestureDetector>
  )
})
const $container: ViewStyle = {
  flexDirection: "row",
}
const $cardContainer: ViewStyle = {
  flexDirection: "row",
  height: 80,
  alignItems: "center",
  flexBasis: "100%",
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
const $deleteButton: ViewStyle = {
  backgroundColor: colors.error,
  height: "100%",
  alignItems: "center",
  justifyContent: "center",
}
