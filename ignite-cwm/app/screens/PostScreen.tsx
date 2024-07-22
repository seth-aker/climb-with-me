import { Button, Screen } from "app/components";
import { CommentSection } from "app/components/CommentSection";
import { PostCard } from "app/components/PostCard";
import { useStores } from "app/models";
import { CommentModel } from "app/models/CommentModel";
import { AppStackScreenProps } from "app/navigators/types";
import { useSafeAreaInsetsStyle } from "app/utils/useSafeAreaInsetsStyle";
import { observer } from "mobx-react-lite";
import React, { FC, useRef, useState } from "react";
import { View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import uuid from "react-native-uuid"

export type PostScreenProps = AppStackScreenProps<"PostScreen"> 
export const PostScreen: FC<PostScreenProps> = observer(function PostScreen(_props) {
    const bottomSafeArea = useSafeAreaInsetsStyle(["bottom"])
    const {postStore, userStore} = useStores();
    const post = postStore.getPostById(postStore.selectedPostId || "");
    if(!post) {
        throw new Error("Cannot navigate to Post Screen without post selected");
    }
    const insertCommentRef = useRef<TextInput>(null);
    const sortedComments = post.comments.slice().sort((a, b) => {
        return b.createdAt.getMilliseconds() - a.createdAt.getMilliseconds()
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
    return (
        <Screen preset="auto" safeAreaEdges={["top", "bottom"]}>
            <PostCard post={post} />
            <CommentSection comments={sortedComments} handlePressComment={handlePressComment} />
            <View style={bottomSafeArea}>
                <TextInput 
                    value={commentText} 
                    onChangeText={(value) => setCommentText(value)} 
                    ref={insertCommentRef}/>
                <Button text="Submit" onPress={onSubmitComment} />
            </View>
        </Screen>
    )
})
