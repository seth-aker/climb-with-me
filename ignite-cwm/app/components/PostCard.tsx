import React, { useState } from "react"
import { Card } from "./Card"
import { Text } from "./Text"
import { observer } from "mobx-react-lite"
import { Post } from "app/models/Post"
import { ImageStyle, Modal, TextStyle, View, ViewStyle} from "react-native"
import { AutoImage } from "./AutoImage"
import { formatTimeSince } from "app/utils/formatTime"
import { colors, spacing } from "app/theme"
import { Button } from "./Button"
import { Icon } from "./Icon"
import Animated, { Extrapolation, interpolate, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated"
import { useStores } from "app/models"
import { Header } from "./Header"


export interface PostCardProps {
    post: Post

}
export const PostCard = observer(function PostCard(props: PostCardProps) {
    const { post, } = props;
    const {userStore: {authId}, postStore } = useStores();
    const timeSincePost = Date.now() - post.createdAt.getTime();
    const userGuid = authId || "";
    const liked = useSharedValue(post.isLikedByUser(userGuid) ? 1 : 0);
    const postOwned = userGuid === post.postUserId;

    const [cardSettingOpen, setCardSettingOpen] = useState(false);

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
    
    const handledSettingBtnPressed = () => {
        setCardSettingOpen(true);
    }

    const handleDeletePost = () => {
        postStore.deletePost(post);
        setCardSettingOpen(false);
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
                    <Button onPress={handledSettingBtnPressed} style={$headerButtonStyle} pressedStyle={$headerButtonPressed}>
                        <Icon icon={"ellipsis-v"} color={colors.palette.neutral600} />
                    </Button>
                    <Modal 
                        transparent
                        visible={cardSettingOpen} 
                        animationType="slide" 
                        onRequestClose={() => setCardSettingOpen(false)}

                    >
                        <View style={$modalEmptySpace}/>
                        <View style={$modalStyle}>
                            <Header 
                                title="Close"
                                containerStyle={$modalHeader}
                                rightIcon={"x"}
                                rightIconColor={colors.text}
                                onRightPress={()=> setCardSettingOpen(false)}
                                backgroundColor={colors.palette.neutral100}
                            />
                            {postOwned ? <Button 
                                style={$postModalButtonStyle}
                                textStyle={$postButtonTextStyle}
                                pressedStyle={$footerButtonPressed}
                                text="Delete" 
                                LeftAccessory={() => <Icon icon={"xmark"} color={colors.palette.neutral700}/>}
                                onPress={handleDeletePost}
                                
                            /> : <Button text="Hide" />
                            }
                        </View>
                    </Modal>
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
                                        color={colors.palette.neutral600} 
                                    />
                                </Animated.View>
                                 <Animated.View
                                    style={[$iconContainer,animatedFilledLikeButtonStyles]}
                                >
                                    <Icon 
                                        icon={["fas", "thumbs-up"]}
                                        containerStyle={$iconStyle} 
                                        color={colors.palette.neutral600}
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
                                color={colors.palette.neutral600}
                        />}/> 
                    <Button 
                        style={$footerButtonStyle}
                        pressedStyle={$footerButtonPressed}
                        text="Message"
                        textStyle={$buttonTextStyle}
                        LeftAccessory={() => 
                            <Icon 
                                icon={ "share"} 
                                color={colors.palette.neutral600}
                        />}
                    />
                </View>
            }
        />

        
    )
})
const $item: ViewStyle = {
    borderRadius: 0,
    padding: spacing.md,
    paddingBottom: 0,
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
    color: colors.palette.neutral600,
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

const $modalStyle: ViewStyle = {
    borderTopWidth: 1,
    borderTopColor: colors.palette.neutral200,
    height: "85%",
    backgroundColor: colors.palette.neutral200
}

const $postButtonTextStyle: TextStyle = {
    color: colors.palette.neutral700

}
const $postModalButtonStyle: ViewStyle = {
    margin: 8,
    backgroundColor: colors.palette.neutral100,
    borderRadius: 5,
    justifyContent: "flex-start"
}

const $modalEmptySpace: ViewStyle = {
    height: "15%",
    backgroundColor: colors.transparent
}

const $modalHeader: ViewStyle = {
    paddingTop: 0,
    marginTop: 0
}
