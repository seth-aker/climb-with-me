import React from "react"
import { Card } from "./Card"
import { Text } from "./Text"
import { observer } from "mobx-react-lite"
import { Post } from "app/models/Post"
import { ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { AutoImage } from "./AutoImage"
import { formatTimeSince } from "app/utils/formatTime"
import { colors, spacing } from "app/theme"
import { Button } from "./Button"
import { Icon } from "./Icon"



export interface PostCardProps {
    post: Post
}
export const PostCard = observer(function PostCard(props: PostCardProps) {
    const { post } = props;
    const timeSincePost = Date.now() - post.postDate.getTime();
    return (
        <Card
            style={$item}
            HeadingComponent={
                <View style={$itemHeader}>
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
                        LeftAccessory={() => 
                            <Icon 
                                icon={"thumbs-up"} 
                        />}
                    />
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
    flexDirection: "row"
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
