import React from "react"
import { Card } from "./Card"
import { Text } from "./Text"
import { observer } from "mobx-react-lite"
import { Post } from "app/models/Post"
import { ImageStyle, TextStyle, View, ViewStyle} from "react-native"
import { AutoImage } from "./AutoImage"
import { formatTimeSince } from "app/utils/formatTime"
import { colors, spacing } from "app/theme"
import { Button } from "./Button"
import { Icon } from "./Icon"
import Animated, { Extrapolation, interpolate, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated"
import { useStores } from "app/models"



export interface PostCardProps {
    post: Post
}
export const PostCard = observer(function PostCard(props: PostCardProps) {
    const { post } = props;
    const {userStore: {authId} } = useStores();
    const timeSincePost = Date.now() - post.createdAt.getTime();
    const userGuid = authId || "";
    const liked = useSharedValue(post.isLikedByUser(userGuid) ? 1 : 0);
    const animatedRegularLikeButtonStyles = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    scale: interpolate(liked.value, [0,1], [1,0], Extrapolation.EXTEND)
                },
            ],
            opacity: interpolate(liked.value, [0,1], [1,0], Extrapolation.CLAMP)
        }
    })
    const animatedFilledLikeButtonStyles = useAnimatedStyle(() => {
        return {
        transform: [
            {
            scale: liked.value,
            },
        ],
        opacity: liked.value,
        }
    })

    const handlePressLike = () => {
        post.toggleLiked(userGuid)
        liked.value = withSpring(liked.value ? 0 : 1);
    }
    return (
        <Card
            style={$item}
            HeadingComponent={
                <View style={$itemHeader}>
                    <View style={flexRow}>
                        <AutoImage 
                            style={$itemThumbnail}
                            src={post.postUserImg}
                            />
                        <View style={$headerTextContainer}>
                            <Text 
                                size="xs"
                                text={post.postUser}
                                />
                            <Text
                                size="xxs"
                                weight="light" 
                                text={`${formatTimeSince(timeSincePost)}`}
                                />
                        </View>
                    </View>
                    <Button style={$headerButtonStyle} pressedStyle={$headerButtonPressed}>
                        <Icon icon={"ellipsis-v"} />
                    </Button>
                </View>
            }
            ContentComponent={
                <View style={$contentContainer}>
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
            }
            FooterComponent={
                <View style={$footerContainer}>
                    <Button 
                        style={$footerButtonStyle}
                        pressedStyle={$footerButtonPressed}
                        text="Like"
                        textStyle={$buttonTextStyle}
                        onPress={handlePressLike}
                        LeftAccessory={() =>( 
                            <View>
                                <Animated.View
                                    style={[$iconContainer,animatedRegularLikeButtonStyles]}
                                >
                                    <Icon 
                                        icon={["far", "thumbs-up"]}
                                        containerStyle={$iconStyle} 
                                    />
                                </Animated.View>
                                 <Animated.View
                                    style={[$iconContainer,animatedFilledLikeButtonStyles]}
                                >
                                    <Icon 
                                        icon={["fas", "thumbs-up"]}
                                        containerStyle={$iconStyle} 
                                    />
                                </Animated.View>
                            </View>)}
                    >
                    </Button> 
                    <Button 
                        style={$footerButtonStyle}
                        pressedStyle={$footerButtonPressed}
                        text="Comments"
                        textStyle={$buttonTextStyle}
                        LeftAccessory={() => 
                            <Icon 
                                icon={"comment"} 
                        />}/> 
                    <Button 
                        style={$footerButtonStyle}
                        pressedStyle={$footerButtonPressed}
                        text="Message"
                        textStyle={$buttonTextStyle}
                        LeftAccessory={() => 
                            <Icon 
                                icon={"share"} 
                        />}
                    />
                </View>
            }
        />

        
    )
})
const $item: ViewStyle = {
  padding: spacing.md,
  marginTop: spacing.md,
  minHeight: 120,
}

const $itemHeader: ViewStyle = {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center"
}
const $headerButtonStyle: ViewStyle = {
    backgroundColor: colors.palette.neutral100,
    borderWidth: 0,
    borderRadius: 5,
    minHeight: 0,
    height: 40,
    width: 30,
    paddingVertical: 0,
    paddingHorizontal: 0
}
const $headerButtonPressed: ViewStyle = {
    backgroundColor: colors.palette.neutral200
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
    marginTop: spacing.xxs
}
const $footerContainer: ViewStyle = {
    flexDirection: "row",
    justifyContent: "space-between"
}
const $footerButtonStyle: ViewStyle = {
    flexGrow: 1,
    backgroundColor: colors.palette.neutral100,
    borderWidth: 0,
    borderRadius: 5
}
const $footerButtonPressed: ViewStyle = {
    backgroundColor: colors.palette.neutral200
}
const $buttonTextStyle: TextStyle = {
    color: colors.text,
    paddingHorizontal: spacing.xxxs
}
const $iconContainer: ViewStyle = {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginEnd: spacing.sm,
}
const $iconStyle: ViewStyle = {
    position: "absolute"
}
const flexRow: ViewStyle = {
    flexDirection: "row"
}
