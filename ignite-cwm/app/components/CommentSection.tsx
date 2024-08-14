import React from "react"
import { ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { IComment } from "app/models/CommentModel"
import { ListView } from "./ListView"
import { AutoImage } from "./AutoImage"
import { Text } from "./Text"
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withSequence,
  withSpring,
} from "react-native-reanimated"
import { useStores } from "app/models"
import { formatTimeSince } from "app/utils/formatTime"
import { colors, spacing } from "app/theme"
import { Button } from "./Button"
import { observer } from "mobx-react-lite"

export interface CommentSectionProps {
  comments: IComment[]
  handlePressComment: () => void
}
export const CommentSection = observer((props: CommentSectionProps) => {
  const { comments, handlePressComment } = props
  const { userStore } = useStores()

  return (
    <View style={$containerView}>
      <ListView
        contentContainerStyle={$commentListStyle}
        data={comments}
        estimatedItemSize={145}
        renderItem={(item) => (
          <CommentCard
            comment={item.item}
            viewingUser={userStore._id || ""}
            handlePressComment={handlePressComment}
          />
        )}
      />
    </View>
  )
})

const $containerView: ViewStyle = {
  minHeight: 50,
}
const $commentListStyle: ViewStyle = {
  paddingBottom: spacing.md,
}

export interface CommentCardProps {
  comment: IComment
  viewingUser: string
  handlePressComment: () => void
}
export const CommentCard = observer((props: CommentCardProps) => {
  const { comment, viewingUser } = props
  const liked = comment.likedByUser(viewingUser)
  const likedFontSize = useSharedValue(12)
  const timeSinceComment = Date.now() - comment.createdAt.getTime()
  const handlePressLike = () => {
    if (liked) {
      comment.removeLike(viewingUser)
    } else {
      comment.addLike(viewingUser)
      likedFontSize.value = withSequence(
        withSpring(15, { duration: 600 }),
        withSpring(12, { duration: 500 }),
      )
    }
  }

  const animatedLikedText = useAnimatedProps(() => {
    return {
      fontSize: likedFontSize.value,
    }
  })
  const likeTextStyle = liked ? $likedButtonText : $likeButtonText
  return (
    <View style={$container}>
      <AutoImage style={$itemThumbnail} src={comment.userProfImg} />
      <View style={$cardContainer}>
        <View style={$commentHeading}>
          <Text text={comment.user} size="xs" />
          <Text size="xxs" weight="light" text={`${formatTimeSince(timeSinceComment)}`} />
        </View>
        <Text style={$commentTextStyle} text={comment.text} />
        <View style={$footerContainer}>
          <Button style={$likeButton} pressedStyle={$pressedLikeButton} onPress={handlePressLike}>
            <Animated.Text style={[likeTextStyle, animatedLikedText]}>{"Like"}</Animated.Text>
          </Button>
          <View style={$numOfLikesContainer}>
            <Text
              text={`${comment.likes.length} like${comment.likes.length === 1 ? " " : "s"}`}
              size="xs"
            />
          </View>
        </View>
      </View>
      {/* <Card
        style={$cardContainer}
        HeadingComponent={
          <View style={$commentHeading}>
            <Text text={comment.user} size="xs" />
            <Text size="xxs" weight="light" text={`${formatTimeSince(timeSinceComment)}`} />
          </View>
        }
        content={comment.text}
        contentStyle={$commentTextStyle}
        // ContentComponent={<Text style={$commentTextStyle} text={comment.text} />}
        FooterComponent={
          <View style={$footerContainer}>
            <View style={$footerContent}>
              <Button
                style={$likeButton}
                pressedStyle={$pressedLikeButton}
                onPress={handlePressLike}
              >
                <Animated.Text style={[likeTextStyle, animatedLikedText]}>{"Like"}</Animated.Text>
              </Button>
              <View style={$numOfLikesContainer}>
                <Text
                  text={`${comment.likes.length} like${comment.likes.length === 1 ? " " : "s"}`}
                  size="xs"
                />
              </View>
            </View>
          </View>
        }
      /> */}
    </View>
  )
})

const $container: ViewStyle = {
  flexDirection: "row",
  marginHorizontal: spacing.sm,
  marginTop: spacing.xs,
  marginBottom: spacing.xs,
}
const $cardContainer: ViewStyle = {
  flexGrow: 1,
  maxWidth: "90%",
  backgroundColor: colors.palette.neutral100,
  borderRadius: spacing.md,
  padding: spacing.xs,
  borderWidth: 1,
  shadowColor: colors.palette.neutral800,
  shadowOffset: { width: 0, height: 12 },
  shadowOpacity: 0.08,
  shadowRadius: 12.81,
  elevation: 16,
  minHeight: 96,
  borderColor: colors.palette.neutral300,
}
const $itemThumbnail: ImageStyle = {
  marginVertical: spacing.md,
  marginRight: spacing.xxs,
  height: 32,
  width: 32,
  borderRadius: spacing.md,
  alignSelf: "flex-start",
}
const $commentHeading: ViewStyle = {
  alignContent: "center",
  marginHorizontal: spacing.sm,
  marginTop: spacing.xs,
}
const $commentTextStyle: ViewStyle = {
  marginHorizontal: spacing.sm,
  paddingLeft: 0,
  marginBottom: spacing.xs,
}
const $footerContainer: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
}
const $likeButton: ViewStyle = {
  paddingVertical: 0,
  backgroundColor: colors.palette.neutral100,
  borderWidth: 0,
  borderRadius: 5,
  justifyContent: "flex-start",
}
const $pressedLikeButton: ViewStyle = {
  backgroundColor: colors.palette.neutral200,
}

const $likeButtonText: TextStyle = {
  color: colors.palette.neutral600,
}
const $likedButtonText: TextStyle = {
  color: colors.palette.primary600,
}

const $numOfLikesContainer: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
}
