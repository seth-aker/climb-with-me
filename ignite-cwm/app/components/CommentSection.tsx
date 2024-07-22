import React from "react";
import { ImageStyle, View, ViewStyle } from "react-native";
import { IComment } from "app/models/CommentModel";
import { ListView } from "./ListView";
import { AutoImage } from "./AutoImage";
import { Text } from "./Text";
import { CardFooter } from "./PostCard";
import { useSharedValue, withSpring } from "react-native-reanimated";
import { useStores } from "app/models";
export interface CommentSectionProps {
    comments: IComment[],
    handlePressComment: () => void
}
export const CommentSection = (props: CommentSectionProps) => {
    const { comments, handlePressComment } = props;
    const { userStore } = useStores();
    return (
        <View style={$containerView}>
            <ListView 
                data={comments}
                estimatedItemSize={50}
                renderItem={(item) => (
                    <CommentCard 
                        comment={item.item}
                        viewingUser={userStore.authId || ""}
                        handlePressComment={handlePressComment}
                        />
                )}
            />
        </View>
    )
}

export interface CommentCardProps {
    comment: IComment
    viewingUser: string
    handlePressComment: () => void
}
export const CommentCard = (props: CommentCardProps) => {
    const { comment, viewingUser, handlePressComment } = props;
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
                <CardFooter 
                    liked={liked} 
                    handlePressLike={handlePressLike} 
                    handlePressComments={handlePressComment}/>
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
