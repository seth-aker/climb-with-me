import React from "react";
import { ImageStyle, View, ViewStyle } from "react-native";
import { Comment } from "app/models/CommentModel";
import { ListView } from "./ListView";
import { AutoImage } from "./AutoImage";
import { Text } from "./Text";
import { CardFooter } from "./PostCard";
import { useSharedValue, withSpring } from "react-native-reanimated";
import { useStores } from "app/models";
export interface CommentSectionProps {
    comments: Comment[]
}
export const CommentSection = (props: CommentSectionProps) => {
    const { comments } = props;
    const { userStore } = useStores();
    const sortedComments = comments.toSorted((a, b) => {
        return a.createdAt.getMilliseconds() - b.createdAt.getMilliseconds()
    });
    return (
        <View style={$containerView}>
            <ListView 
                data={sortedComments}
                renderItem={(item) => (
                    <CommentCard 
                        comment={item.item}
                        viewingUser={userStore.authId || ""}
                        />
                )}
            />
        </View>
    )
}

export interface CommentCardProps {
    comment: Comment
    viewingUser: string
}
const CommentCard = (props: CommentCardProps) => {
    const { comment, viewingUser } = props;
    const liked = useSharedValue(comment.likedByUser(viewingUser) ? 1 : 0)

    const handlePressLike = () => {
        liked.value = withSpring(liked.value ? 0 : 1);

    }
    return (
        <View>
            <AutoImage 
                style={$itemThumbnail}
                src={comment.userProfImg}
            />
            <View>
                <Text 
                    text={comment.user}
                    weight="bold"
                />
                <Text 
                    text={comment.text}
                />
            </View>
            <View>
                <CardFooter liked={liked} handlePressLike={handlePressLike} />
            </View>
        </View>
    )
}

const $containerView: ViewStyle = {

}
const $itemThumbnail: ImageStyle = {
    height: 20,
    width: 20,
    borderRadius: 10,
    alignSelf: "flex-start",
}
