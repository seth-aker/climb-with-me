import React, { useState } from "react"
import { Card } from "./Card"
import { Text } from "./Text"
import { observer } from "mobx-react-lite"
import { Post } from "app/models/Post"
import { ImageStyle, Modal, Pressable, StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { AutoImage } from "./AutoImage"
import { formatTimeSince } from "app/utils/formatTime"
import { colors, spacing } from "app/theme"
import { Button } from "./Button"
import { Icon } from "./Icon"
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated"
import { useStores } from "app/models"
import { Header } from "./Header"
import { useNavigation } from "@react-navigation/native"
import { RootStackNavigation } from "app/navigators/types"
import { ChatModel, ChatUserModel } from "app/models/Chat"
import uuid from "react-native-uuid"
import { addLike, removeLike } from "app/services/api/postService/postService"

export interface PostCardProps {
  post: Post
}
export const PostCard = observer(function PostCard(props: PostCardProps) {
  const navigation = useNavigation<RootStackNavigation>()
  const { post } = props
  const {
    userStore: { _id: authId, ...userStore },
    postStore,
    messageStore,
    authenticationStore: { authToken },
  } = useStores()

  const userGuid = authId || ""

  const postOwned = userGuid === post.authorId

  const [cardSettingOpen, setCardSettingOpen] = useState(false)

  const handlePressComment = () => {
    postStore.setSelectedPostId(post._id)
    navigation.navigate("PostScreen", { newComment: true })
  }
  const handlePressViewComments = () => {
    postStore.setSelectedPostId(post._id)
    navigation.navigate("PostScreen", { newComment: false })
  }
  const handledSettingBtnPressed = () => {
    setCardSettingOpen(true)
  }

  const handleDeletePost = async () => {
    const success = await postStore.deletePost(post._id, authToken ?? "")
    if (success) {
      postStore.removePost(post)
      setCardSettingOpen(false)
    }
  }
  const handlePressMessage = () => {
    if (post.authorId === userGuid) {
      return
    }
    const chatIdWithUsers = messageStore.chatWithUsersExists([userGuid, post.authorId])
    if (chatIdWithUsers) {
      messageStore.setSelectedChatId(chatIdWithUsers)
      navigation.push("ChatScreen")
    } else {
      const currentUser = ChatUserModel.create({
        _id: userGuid,
        name: userStore.name,
        userImg: userStore.avatar,
        joinedOn: new Date(),
      })
      const userToMessage = ChatUserModel.create({
        _id: post.authorId,
        name: post.authorName,
        userImg: post.authorProfImg,
        joinedOn: new Date(),
      })
      const newChat = ChatModel.create({
        _id: uuid.v4().toString(),
        users: [currentUser, userToMessage],
        messages: [],
      })

      messageStore.addChat(newChat)
      messageStore.setSelectedChatId(newChat._id)
      navigation.push("ChatScreen")
    }
  }
  const navigateToProfile = () => {
    navigation.push("PublicProfile", { userId: post.authorId })
  }
  return (
    <Card
      style={$item}
      HeadingComponent={
        <View style={$itemHeader}>
          <Pressable style={flexRow} onPress={navigateToProfile}>
            <AutoImage style={$itemThumbnail} src={post.authorProfImg} />
            <View style={$headerTextContainer}>
              <Text size="xs" text={post.authorName} />
              <Text size="xxs" weight="light" text={`${formatTimeSince(post.timeSincePost())}`} />
            </View>
          </Pressable>
          <Button
            onPress={handledSettingBtnPressed}
            style={$headerButtonStyle}
            pressedStyle={$headerButtonPressed}
          >
            <Icon icon={"ellipsis-v"} color={colors.palette.neutral600} />
          </Button>
          <Modal
            transparent
            visible={cardSettingOpen}
            animationType="slide"
            onRequestClose={() => setCardSettingOpen(false)}
          >
            <View style={$modalEmptySpace} />
            <View style={$modalStyle}>
              <Header
                title="Close"
                containerStyle={$modalHeader}
                rightIcon={"x"}
                rightIconColor={colors.text}
                onRightPress={() => setCardSettingOpen(false)}
                backgroundColor={colors.palette.neutral100}
              />
              {postOwned ? (
                <Button
                  style={$postModalButtonStyle}
                  textStyle={$postButtonTextStyle}
                  pressedStyle={$defaultButtonPressed}
                  text="Delete"
                  LeftAccessory={() => <Icon icon={"xmark"} color={colors.palette.neutral700} />}
                  onPress={handleDeletePost}
                />
              ) : (
                <Button text="Hide" />
              )}
              <Button
                style={$postModalButtonStyle}
                textStyle={$postButtonTextStyle}
                pressedStyle={$defaultButtonPressed}
                LeftAccessory={() => (
                  <Icon icon={"exclamation"} color={colors.palette.neutral700} />
                )}
                text="Report"
              />
            </View>
          </Modal>
        </View>
      }
      ContentComponent={
        <View style={$contentContainer}>
          <Text selectable size="lg" weight="bold" text={post.title} />
          <Text selectable size="sm" text={post.body} />
          <View>
            <Pressable style={$numOfCommentsButton} onPress={handlePressViewComments}>
              <Text
                size="xxs"
                weight="light"
                style={$numOfCommentsText}
                text={`${post.comments.length} comment${post.comments.length === 1 ? "" : "s"}`}
              />
            </Pressable>
          </View>
        </View>
      }
      FooterComponent={
        <CardFooter
          post={post}
          onPressComments={handlePressComment}
          onPressMessage={handlePressMessage}
        />
      }
    />
  )
})
const $numOfCommentsButton: ViewStyle = {
  alignItems: "flex-end",
}
const $numOfCommentsText: TextStyle = {
  textDecorationLine: "underline",
}

export interface CardFooterProps {
  post: Post
  onPressComments: () => void
  onPressMessage: () => void
  containerStyle?: StyleProp<ViewStyle> | undefined
  buttonStyle?: StyleProp<ViewStyle> | undefined
  pressedButtonStyle?: StyleProp<ViewStyle> | undefined
}

export const CardFooter = observer((props: CardFooterProps) => {
  const {
    post,
    containerStyle: $containerStyleOverride,
    buttonStyle: $buttonStyleOverride,
    pressedButtonStyle: $pressedButtonStyleOverride,
    onPressComments,
    onPressMessage,
  } = props

  const {
    userStore,
    authenticationStore: { authToken },
  } = useStores()
  const userGuid = userStore._id || ""
  const liked = post.isLikedByUser(userGuid)
  const animValue = useSharedValue(liked ? 1 : 0)

  const handlePressLike = () => {
    post.isLikedByUser(userGuid)
      ? removeLike(post._id, authToken ?? "")
      : addLike(post._id, authToken ?? "")
    post.toggleLiked(userStore._id || "")
    animValue.value = withSpring(liked ? 0 : 1)
  }

  const animatedEmptyLikeButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(animValue.value, [0, 1], [1, 0], Extrapolation.EXTEND),
        },
      ],
      opacity: interpolate(animValue.value, [0, 1], [1, 0], Extrapolation.CLAMP),
    }
  })
  const animatedFilledLikeButtonStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: animValue.value,
        },
      ],
      opacity: animValue.value,
    }
  })
  const $footerContainer = [$containerDefault, $containerStyleOverride]
  const $footerButtonStyle = [$buttonDefault, $buttonStyleOverride]
  const $footerButtonPressed = [$defaultButtonPressed, $pressedButtonStyleOverride]

  return (
    <View style={$footerContainer}>
      <Button
        style={$footerButtonStyle}
        pressedStyle={$footerButtonPressed}
        text="Like"
        textStyle={$buttonTextStyle}
        onPress={handlePressLike}
        LeftAccessory={() => (
          <View>
            <Animated.View style={[$iconContainer, animatedEmptyLikeButtonStyle]}>
              <Icon
                icon={["far", "thumbs-up"]}
                containerStyle={$iconStyle}
                color={colors.palette.neutral600}
              />
            </Animated.View>
            <Animated.View style={[$iconContainer, animatedFilledLikeButtonStyles]}>
              <Icon
                icon={["fas", "thumbs-up"]}
                containerStyle={$iconStyle}
                color={colors.palette.neutral600}
              />
            </Animated.View>
          </View>
        )}
      ></Button>
      <Button
        style={$footerButtonStyle}
        pressedStyle={$footerButtonPressed}
        text="Comment"
        textStyle={$buttonTextStyle}
        onPress={onPressComments}
        LeftAccessory={() => <Icon icon={"comment"} color={colors.palette.neutral600} />}
      />
      <Button
        style={$footerButtonStyle}
        pressedStyle={$footerButtonPressed}
        onPress={onPressMessage}
        text="Message"
        textStyle={$buttonTextStyle}
        LeftAccessory={() => <Icon icon={"share"} color={colors.palette.neutral600} />}
      />
    </View>
  )
})

const $item: ViewStyle = {
  borderRadius: 0,
  padding: spacing.md,
  paddingBottom: 0,
  marginBottom: spacing.md,
  minHeight: 120,
}

const $itemHeader: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignContent: "center",
}
const $headerButtonStyle: ViewStyle = {
  backgroundColor: colors.palette.neutral100,
  borderWidth: 0,
  borderRadius: 5,
  minHeight: 0,
  height: 40,
  width: 30,
  paddingVertical: 0,
  paddingHorizontal: 0,
}
const $headerButtonPressed: ViewStyle = {
  backgroundColor: colors.palette.neutral200,
}
const $itemThumbnail: ImageStyle = {
  height: 40,
  width: 40,
  borderRadius: 20,
  alignSelf: "flex-start",
}
const $headerTextContainer: ViewStyle = {
  paddingHorizontal: spacing.sm,
}
const $contentContainer: ViewStyle = {
  marginTop: spacing.xxs,
}
const $containerDefault: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
}
const $buttonDefault: ViewStyle = {
  flexGrow: 1,
  backgroundColor: colors.palette.neutral100,
  borderWidth: 0,
  borderRadius: 5,
}
const $defaultButtonPressed: ViewStyle = {
  backgroundColor: colors.palette.neutral200,
}
const $buttonTextStyle: TextStyle = {
  color: colors.palette.neutral600,
  paddingHorizontal: spacing.xxxs,
}
const $iconContainer: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "row",
  marginEnd: spacing.sm,
}
const $iconStyle: ViewStyle = {
  position: "absolute",
}
const flexRow: ViewStyle = {
  flexDirection: "row",
}

const $modalStyle: ViewStyle = {
  borderTopWidth: 1,
  borderTopColor: colors.palette.neutral200,
  height: "85%",
  backgroundColor: colors.palette.neutral200,
}

const $postButtonTextStyle: TextStyle = {
  color: colors.palette.neutral700,
}
const $postModalButtonStyle: ViewStyle = {
  marginTop: 8,
  backgroundColor: colors.palette.neutral100,
  borderRadius: 5,
  justifyContent: "flex-start",
}

const $modalEmptySpace: ViewStyle = {
  height: "15%",
  backgroundColor: colors.transparent,
}

const $modalHeader: ViewStyle = {
  paddingTop: 0,
  marginTop: 0,
}
