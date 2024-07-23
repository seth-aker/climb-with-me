import { AutoImage, Button, Header, Icon, Screen, Text } from "app/components";
import { CommentSection } from "app/components/CommentSection";
import { CardFooter } from "app/components/PostCard";

import { useStores } from "app/models";
import { CommentModel } from "app/models/CommentModel";
import { AppStackScreenProps } from "app/navigators/types";
import { colors, spacing } from "app/theme";
import { formatTimeSince } from "app/utils/formatTime";
import { observer } from "mobx-react-lite";
import React, { FC, useRef, useState } from "react";
import { ImageStyle, ScrollView, TextInput, View, ViewStyle } from "react-native";

import uuid from "react-native-uuid"

export type PostScreenProps = AppStackScreenProps<"PostScreen"> 
export const PostScreen: FC<PostScreenProps> = observer(function PostScreen(_props) {
 
    const {postStore, userStore} = useStores();
    const {navigation} = _props

    const post = postStore.getPostById(postStore.selectedPostId || "");
    if(!post) {
        navigation.goBack()
        throw new Error("Cannot navigate to Post Screen without post selected");
    }
    const insertCommentRef = useRef<TextInput>(null);
    const sortedComments = post.comments.slice().sort((a, b) => {
        return a.createdAt.getTime() - b.createdAt.getTime()
    });
    const [commentText, setCommentText] = useState<string>("");

    const handlePressComment = () => {
        insertCommentRef.current?.focus();
    }

    const onSubmitComment = () => {
        const comment = CommentModel.create({
                guid: uuid.v4().toString(),
                createdAt: Date.now(),
                text: commentText,
                user: userStore.name || "",
                userId: userStore.authId || "",
                userProfImg: userStore.profileImg || ""
             });
        post.addComment(comment);
        setCommentText("");
        insertCommentRef.current?.blur();
    }

    const handlePressBack = () => {
        postStore.setSelectedPostId(null);
        navigation.goBack()
    }
    return (
        <Screen preset="fixed" safeAreaEdges={["bottom"]}>
            <ScrollView style={$scrollViewStyle} >
                <Header       
                    containerStyle={$headerStyle}
                    backgroundColor={colors.palette.primary500}
                    leftIcon={"arrow-left"} 
                    onLeftPress={handlePressBack}
                    leftIconColor={colors.background}
                    />
                    <View style={$postHeader}>
                    { /* eslint-disable-next-line react-native/no-inline-styles */}
                    <View style={{flexDirection: "row"}}>
                        <AutoImage 
                            style={$postThumbnail}
                            src={post.postUserImg}
                            />
                        <View style={$postHeaderTextContainer}>
                            <Text 
                                size="xs"
                                text={post.postUser}
                                />
                            <Text
                                size="xxs"
                                weight="light" 
                                text={`${formatTimeSince(post.timeSincePost())}`}
                                />
                        </View>
                    </View>
                    </View>
                    <View style={$postContent}>
                        <Text 
                        size="lg"
                        weight="bold"
                        text={post.title}
                    />
                    <Text
                        size="sm"
                        text={post.body}
                    />
                    </View>
                    <CardFooter 
                        post={post}
                        handlePressComments={handlePressComment}
                    />
                {/* <PostCard post={post} /> */}
                <CommentSection comments={sortedComments} handlePressComment={handlePressComment} />
            </ScrollView>
            <View style={$footerContainer}>
                <View style={$textInputContainer}>
                    <AutoImage 
                        style={$commentThumbnail}
                        src={userStore.profileImg}
                        />
                    <TextInput 
                        style={$textInputStyle}
                        multiline
                        value={commentText} 
                        onChangeText={(value) => setCommentText(value)} 
                        ref={insertCommentRef}/>
                </View>
                <Button style={$submitCommentBtn} onPress={onSubmitComment}>
                    <Icon icon={"arrow-up"} color={colors.palette.neutral100} />
                </Button>
            </View>
        </Screen>
    )
})

const $scrollViewStyle: ViewStyle = {
    height: "90%"
}
const $headerStyle: ViewStyle = {
    marginBottom: 0
}
const $postHeader: ViewStyle = {
    padding: spacing.md,
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    backgroundColor: colors.palette.neutral100
}
const $postThumbnail: ImageStyle = {
    height: 40,
    width: 40,
    borderRadius: 20,
    alignSelf: "flex-start",
}
const $postHeaderTextContainer: ViewStyle = {
    paddingHorizontal: spacing.sm
}

const $postContent: ViewStyle = {
    paddingHorizontal: spacing.md,
    backgroundColor: colors.palette.neutral100
}
const $footerContainer: ViewStyle = {
    flexDirection: "row",
    height: "auto",
    padding: spacing.xs,
    justifyContent: "space-between",    
    width: "100%",
    backgroundColor: colors.palette.neutral400,
    alignItems: "center"
   
}
const $commentThumbnail: ImageStyle = {
    height: 32,
    width: 32,
    borderRadius: 20,
    alignSelf: "flex-start",
    margin: 5
}

const $textInputContainer: ViewStyle = {
    flexDirection: "row",
    width: "80%",
    
}
const $textInputStyle: ViewStyle = {
    borderRadius: 10,
    backgroundColor: colors.palette.neutral100,
    flexGrow: 1,
    maxWidth: "80%"
}
const $submitCommentBtn: ViewStyle = {
    paddingVertical: 0,
    borderWidth: 0,
    height: 38,
    width: 56,
}

