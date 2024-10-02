import { Post } from "app/models/Post"
import React from "react"
import { Pressable, View, ViewStyle, ImageStyle } from "react-native"
import { Text } from "./Text"
import { Svg, Image as ImageSvg, ClipPath, Defs, Circle } from "react-native-svg"
import { spacing } from "app/theme"

export interface TripMarkerProps {
  post: Post
}
export const TripMarkerCallout = (props: TripMarkerProps) => {
  const { post } = props
  return (
    <Pressable style={$calloutContainerStyle}>
      <View style={$calloutHeader}>
        {/* Due to a unique issue with react native maps and Custom Callout components, rendering images on the callout requires using workarounds. 
        Below is an svg component that defines the circular image clip and then imports the image */}
        <Svg style={$svgStyle}>
          <Defs>
            <ClipPath id="circle">
              <Circle cx={"50%"} cy={"50%"} r={12.5} />
            </ClipPath>
          </Defs>
          <ImageSvg
            clipPath="url(#circle)"
            width={"100%"}
            height={"100%"}
            preserveAspectRatio="xMidYMid slice"
            href={{ uri: post.authorProfImg }}
          />
        </Svg>
        <View style={$headerText}>
          <Text preset="bold" size="sm" text={post.title} numberOfLines={1} />
          <Text size="xs" text={post.authorName} />
        </View>
      </View>
      <View style={$calloutBody}>
        <View style={$rowStyle}>
          <Text preset={"bold"} text="Climbing Type" />
          <Text text={post.climbingType} />
        </View>
        <View style={$rowStyle}>
          <Text preset={"bold"} text="Trip Date" />
          <Text text={post.tripDate.toLocaleDateString()} />
        </View>
      </View>
    </Pressable>
  )
}

const $calloutContainerStyle: ViewStyle = {}
const $calloutHeader: ViewStyle = {
  flexDirection: "row",
}
const $headerText: ViewStyle = {
  marginLeft: spacing.xxs,
}
const $svgStyle: ImageStyle = {
  width: 25,
  height: 25,
  alignSelf: "center",
}
const $calloutBody: ViewStyle = {
  flex: 1,
}
const $rowStyle: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
}
