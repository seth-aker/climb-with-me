import React from "react";
import { ImageStyle, View, ViewStyle } from "react-native";
import { IComment } from "app/models/CommentModel";
import { ListView } from "./ListView";
import { AutoImage } from "./AutoImage";
import { Text } from "./Text";
import { useSharedValue, withSpring } from "react-native-reanimated";
import { useStores } from "app/models";
import { formatTimeSince } from "app/utils/formatTime";
import { spacing } from "app/theme";
import { Card } from "./Card";
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
                contentContainerStyle={$commentListStyle} 
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

const $containerView: ViewStyle = {
    minHeight: 50
}
const $commentListStyle: ViewStyle = {
    
}


export interface CommentCardProps {
    comment: IComment
    viewingUser: string
    handlePressComment: () => void
}
export const CommentCard = (props: CommentCardProps) => {
    const { comment, viewingUser, handlePressComment } = props;
    const liked = useSharedValue(comment.likedByUser(viewingUser) ? 1 : 0)
    const timeSinceComment = Date.now() - comment.createdAt.getTime();
    const handlePressLike = () => {
        liked.value = withSpring(liked.value ? 0 : 1);
    }
    return (
        <View style={$container}>
            <AutoImage 
                style={$itemThumbnail}
                src={comment.userProfImg}
                />
            <Card 
                style={$cardContainer}
                HeadingComponent={
                    <View style={$commentHeading}>
                            <Text 
                                text={comment.user}
                                size="xs"
                                />
                            <Text
                                size="xxs"
                                weight="light" 
                                text={`${formatTimeSince(timeSinceComment)}`}
                                />
                    
                       
                    </View>
                }
                ContentComponent={      
                    <Text
                    style={$commentTextStyle} 
                    text={comment.text}
                    />
                }
                />     
      
        </View>
    )
}
const $container: ViewStyle ={
    flexDirection: "row",
    marginHorizontal: spacing.sm,
    marginTop: spacing.sm,
}
const $cardContainer: ViewStyle = {
    flexGrow: 1
}
const $itemThumbnail: ImageStyle = {
    marginVertical: spacing.md,
    marginRight: spacing.xxs,
    height: spacing.xl,
    width: spacing.xl,
    borderRadius: spacing.md,
    alignSelf: "flex-start",
}


const $commentHeading: ViewStyle = {
    alignContent: "center",
    marginHorizontal: spacing.sm,
    marginTop: spacing.xs
}
const $commentTextStyle: ViewStyle = {
    marginHorizontal: spacing.sm,
    paddingLeft: 0
}
