import React from "react"
import { Card } from "./Card"
import { Text } from "./Text"
import { observer } from "mobx-react-lite"
import { Post } from "app/models/Post"
import { View } from "react-native"
import { AutoImage } from "./AutoImage"
import { formatTimeSince } from "app/utils/formatTime"



export interface PostCardProps {
    post: Post
    
}
export const PostCard = observer(function PostCard(props: PostCardProps) {
    const { post } = props;
    const timeSincePost = Date.now() - post.postDate.getTime();
    return (
        <Card
            HeadingComponent={
                <View >
                    <AutoImage 
                        src={post.postUserImg}
                        width={45}
                        height={45}
                        borderRadius={23}
                    />
                    <Text 
                        size="xs"
                        weight="light"
                        text={post.postUser}
                    />
                    <Text
                        size="xxs"
                        weight="light" 
                        text={`Posted ${formatTimeSince(timeSincePost)}`}
                    />
                    <Text 
                        size="md"
                        weight="bold"
                        text={post.title}
                    />
                </View>
            }
            content={post.postDetails}
        />

        
    )
})
