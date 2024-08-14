import React from "react"
import { observer } from "mobx-react-lite"
import { Dimensions, ImageStyle, Pressable, TextStyle, View, ViewStyle } from "react-native"
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
import { delay } from "app/utils/delay"

export interface ChatCardProps {
  chat: IChat
}

export const ChatCard = observer((props: ChatCardProps) => {
  const { chat } = props
  const { messageStore, userStore } = useStores()
  const navigation = useNavigation<RootStackNavigation>()
  const windowWidth = Dimensions.get("window").width
  const offset = useSharedValue(0)
  const offsetInitial = useSharedValue(0)
  const cardHeight = useSharedValue(80)

  const pan = Gesture.Pan()
    .onChange((event) => {
      if (event.translationX > 0) {
        return
      }
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
    width: Math.min(windowWidth, -1 * offset.value),
    position: "absolute",
    right: 0,
    height: "100%",
    // overflow: "hidden",
  }))
  const animatedHeight = useAnimatedStyle(() => ({
    height: cardHeight.value,
  }))

  const onPress = () => {
    messageStore.setSelectedChatId(chat.chatId)
    navigation.push("ChatScreen")
  }

  const handleDelete = async () => {
    offset.value = withTiming(-1 * windowWidth, { duration: 500 })
    cardHeight.value = withTiming(0, { duration: 500 })
    await delay(500)
    messageStore.deleteChat(chat)
  }

  const lastMessage = chat.getLastMessage()
  const lastSent = lastMessage?.sentOn
    ? formatSentOn(lastMessage.sentOn)
    : formatSentOn(chat.createdOn)

  const messageBody = lastMessage?.body ?? ""

  const chatNameDisplay = chat.getChatName(userStore._id, 3)

  return (
    <GestureDetector gesture={pan}>
      <Animated.View style={[$container, animatedHeight]}>
        <Animated.View style={[$cardContainer, animatedCard]}>
          <Pressable style={$pressableContainer} onPress={onPress}>
            <AutoImage
              src={chat.getUsersExcluding(userStore._id).at(0)?.userImg}
              style={$chatImg}
            />
            <View style={$textContainer}>
              <View style={$topTextContainer}>
                <Text
                  ellipsizeMode="tail"
                  numberOfLines={1}
                  size="xs"
                  style={$chatTitle}
                  text={chatNameDisplay}
                  preset="bold"
                />
                <Text weight="light" size="xxs" style={$lastSentStyle}>
                  {lastSent || ""}
                </Text>
                <Icon icon={"angle-right"} size={12} />
              </View>
              <Text ellipsizeMode={"tail"} numberOfLines={2} size="xxs" text={messageBody} />
            </View>
          </Pressable>
        </Animated.View>
        <Animated.View style={animatedDelete}>
          <Pressable style={$deleteButton} onPress={handleDelete}>
            <Icon icon={"trash"} color={colors.palette.neutral100} />
          </Pressable>
        </Animated.View>
      </Animated.View>
    </GestureDetector>
  )
})
const $container: ViewStyle = {
  flexDirection: "row",
}
const $cardContainer: ViewStyle = {}
const $pressableContainer: ViewStyle = {
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
