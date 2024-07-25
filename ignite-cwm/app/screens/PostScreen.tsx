import { AutoImage, Button, Header, Icon, Screen, Text } from "app/components"
import { CommentSection } from "app/components/CommentSection"
import { CardFooter } from "app/components/PostCard"
import { useStores } from "app/models"
import { CommentModel } from "app/models/CommentModel"
import { AppStackScreenProps } from "app/navigators/types"
import { colors, spacing } from "app/theme"
import { formatTimeSince } from "app/utils/formatTime"
import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useRef, useState } from "react"
import { ImageStyle, Modal, ScrollView, TextInput, TextStyle, View, ViewStyle } from "react-native"

import uuid from "react-native-uuid"

export type PostScreenProps = AppStackScreenProps<"PostScreen">
export const PostScreen: FC<PostScreenProps> = observer(function PostScreen(_props) {
  const { postStore, userStore } = useStores()
  const { navigation, route } = _props
  const post = postStore.getPostById(postStore.selectedPostId || "")
  if (!post) {
    navigation.goBack()
    throw new Error("Cannot navigate to Post Screen without post selected")
  }

  const insertCommentRef = useRef<TextInput>(null)
  const scrollViewRef = useRef<ScrollView>(null)
  const sortedComments = post.comments.slice().sort((a, b) => {
    return a.createdAt.getTime() - b.createdAt.getTime()
  })
  const postOwned = post.postUserId === userStore.authId
  const [commentText, setCommentText] = useState<string>("")
  const [cardSettingOpen, setCardSettingOpen] = useState(false)

  const handledSettingBtnPressed = () => {
    setCardSettingOpen(true)
  }

  const handleDeletePost = () => {
    postStore.deletePost(post)
    postStore.setSelectedPostId(null)
    navigation.goBack()
  }

  const handlePressComment = () => {
    scrollViewRef.current?.scrollToEnd()
    insertCommentRef.current?.focus()
  }

  const onSubmitComment = () => {
    if (commentText) {
      const comment = CommentModel.create({
        guid: uuid.v4().toString(),
        createdAt: Date.now(),
        text: commentText,
        user: userStore.name || "",
        userId: userStore.authId || "",
        userProfImg: userStore.profileImg || "",
      })
      post.addComment(comment)
      setCommentText("")
      insertCommentRef.current?.blur()
    }
  }

  const handlePressBack = () => {
    postStore.setSelectedPostId(null)
    navigation.goBack()
  }

  useEffect(() => {
    if (route.params.newComment) {
      handlePressComment()
    }
  }, [])

  return (
    <Screen preset="fixed" contentContainerStyle={$container} safeAreaEdges={["bottom"]}>
      <ScrollView ref={scrollViewRef} style={$scrollViewStyle}>
        <Header
          containerStyle={$headerStyle}
          backgroundColor={colors.palette.primary500}
          leftIcon={"arrow-left"}
          onLeftPress={handlePressBack}
          leftIconColor={colors.background}
        />
        <View style={$postHeader}>
          {/* eslint-disable-next-line react-native/no-inline-styles */}
          <View style={{ flexDirection: "row" }}>
            <AutoImage style={$postThumbnail} src={post.postUserImg} />
            <View style={$postHeaderTextContainer}>
              <Text size="xs" text={post.postUser} />
              <Text size="xxs" weight="light" text={`${formatTimeSince(post.timeSincePost())}`} />
            </View>
          </View>
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
        <View style={$postContent}>
          <Text size="lg" weight="bold" text={post.title} />
          <Text size="sm" text={post.body} />
        </View>
        <CardFooter post={post} handlePressComments={handlePressComment} />
        {/* <PostCard post={post} /> */}
        <CommentSection comments={sortedComments} handlePressComment={handlePressComment} />
      </ScrollView>
      <View style={$footerContainer}>
        <View style={$textInputContainer}>
          <AutoImage style={$commentThumbnail} src={userStore.profileImg} />
          <TextInput
            style={$textInputStyle}
            multiline
            value={commentText}
            onChangeText={(value) => setCommentText(value)}
            ref={insertCommentRef}
          />
        </View>
        <Button style={$submitCommentBtn} onPress={onSubmitComment}>
          <Icon icon={"arrow-up"} color={colors.palette.neutral100} />
        </Button>
      </View>
    </Screen>
  )
})
const $container: ViewStyle = {
  height: "100%",
}

const $scrollViewStyle: ViewStyle = {
  flexBasis: "95%",
  paddingBottom: spacing.sm,
  flexShrink: 1,
}
const $headerStyle: ViewStyle = {
  marginBottom: 0,
}
const $postHeader: ViewStyle = {
  padding: spacing.md,
  flexDirection: "row",
  justifyContent: "space-between",
  alignContent: "center",
  backgroundColor: colors.palette.neutral100,
}
const $postThumbnail: ImageStyle = {
  height: 40,
  width: 40,
  borderRadius: 20,
  alignSelf: "flex-start",
}
const $postHeaderTextContainer: ViewStyle = {
  paddingHorizontal: spacing.sm,
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
const $postContent: ViewStyle = {
  paddingHorizontal: spacing.md,
  backgroundColor: colors.palette.neutral100,
}
const $footerContainer: ViewStyle = {
  flexDirection: "row",
  flexBasis: 55,

  padding: spacing.xs,
  justifyContent: "space-between",
  width: "100%",
  backgroundColor: colors.palette.neutral400,
  alignItems: "center",
}
const $commentThumbnail: ImageStyle = {
  height: 32,
  width: 32,
  borderRadius: 20,
  alignSelf: "flex-start",
  margin: spacing.xxs,
}

const $textInputContainer: ViewStyle = {
  minHeight: 40,
  flexGrow: 1,
  flexDirection: "row",
  maxWidth: "85%",
}
const $textInputStyle: ViewStyle = {
  borderRadius: 20,
  backgroundColor: colors.palette.neutral100,
  flexGrow: 1,
  height: "auto",
  maxWidth: "87%",
  paddingHorizontal: spacing.sm,
}
const $submitCommentBtn: ViewStyle = {
  paddingVertical: 0,
  borderWidth: 0,
  height: 38,
  width: 56,
  marginHorizontal: spacing.xs,
}
const $modalStyle: ViewStyle = {
  borderTopWidth: 1,
  borderTopColor: colors.palette.neutral200,
  height: "85%",
  backgroundColor: colors.palette.neutral200,
}
const $modalEmptySpace: ViewStyle = {
  height: "15%",
  backgroundColor: colors.transparent,
}
const $modalHeader: ViewStyle = {
  paddingTop: 0,
  marginTop: 0,
}
const $postModalButtonStyle: ViewStyle = {
  marginTop: 8,
  backgroundColor: colors.palette.neutral100,
  borderRadius: 5,
  justifyContent: "flex-start",
}
const $postButtonTextStyle: TextStyle = {
  color: colors.palette.neutral700,
}
const $defaultButtonPressed: ViewStyle = {
  backgroundColor: colors.palette.neutral200,
}
