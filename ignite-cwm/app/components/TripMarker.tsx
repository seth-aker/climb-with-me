import { Post } from "app/models/Post"
import React from "react"
import { View, ViewStyle, ImageStyle } from "react-native"
import { Text } from "./Text"
import { Svg, Image as ImageSvg, ClipPath, Defs, Circle, Polygon } from "react-native-svg"
import { colors, spacing } from "app/theme"

export interface TripMarkerProps {
  post: Post
}
export const TripMarkerCallout = (props: TripMarkerProps) => {
  const { post } = props

  return (
    <>
      <View style={$calloutContainerStyle}>
        <View style={$calloutHeader}>
          {/* Due to a unique issue with react native maps and Custom Callout components, rendering images on the callout requires using workarounds. 
        Below is an svg component that defines the circular image clip and then imports the image */}
          <Svg style={$svgImageStyle}>
            <Defs>
              <ClipPath id="circle">
                <Circle cx={"50%"} cy={"50%"} r={18} />
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
            <Text preset="bold" size="xs" text={post.title} />
            <Text size="xxs" text={post.authorName} />
          </View>
        </View>
        <View style={$calloutBody}>
          <View style={$rowStyle}>
            <Text size={"xxs"} text="Location" />
            <Text preset={"bold"} size={"xxs"} text={post.location.name} />
          </View>
          <View style={$rowStyle}>
            <Text size="xxs" text="Climbing Type" />
            <Text preset={"bold"} size={"xxs"} text={post.climbingType} />
          </View>
          <View style={$rowStyle}>
            <Text size={"xxs"} text="Trip Date" />
            <Text preset={"bold"} size={"xxs"} text={post.tripDate.toLocaleDateString()} />
          </View>
        </View>
      </View>
      <Svg style={$pointerSvg} height={12} width={12}>
        <Polygon points={"0,0 6,12 12,0"} fill={colors.palette.neutral800} />
      </Svg>
    </>
  )
}

const $calloutContainerStyle: ViewStyle = {
  elevation: 5,
  shadowColor: "black",
  borderRadius: 15,
  backgroundColor: colors.palette.neutral300,
}
const $calloutHeader: ViewStyle = {
  flexDirection: "row",
  margin: spacing.xs,
}
const $headerText: ViewStyle = {
  marginLeft: spacing.xxs,
  flexWrap: "wrap",
}
const $svgImageStyle: ImageStyle = {
  width: 36,
  height: 36,
  alignSelf: "center",
}
const $calloutBody: ViewStyle = {
  flex: 1,
  backgroundColor: colors.palette.neutral800,
  borderRadius: 15,
  paddingBottom: spacing.xs,
}
const $rowStyle: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  marginHorizontal: spacing.sm,
  marginTop: spacing.xxs,
}
const $pointerSvg: ViewStyle = {
  alignSelf: "center",
}
