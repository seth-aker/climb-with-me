import React from "react"
import { HeaderProps, Header as DefaultHeader } from "./Header"
import { ImageStyle, Pressable, ViewStyle, Image } from "react-native"
import { Icon } from "./Icon"
import { colors, spacing } from "app/theme"
import { useStores } from "app/models/helpers/useStores"
import { useNavigation } from "@react-navigation/native"

export const AppHeader = (props: HeaderProps) => {
  const navigation = useNavigation()
  const { userStore } = useStores()
  return (
    <DefaultHeader
      LeftActionComponent={
        <Pressable onPress={() => navigation.navigate("HomeTabs", { screen: "Profile" })}>
          <Image src={userStore.avatar} style={$imgThumbnail} />
        </Pressable>
      }
      RightActionComponent={
        <Icon icon={"gear"} color={colors.tint} size={28} containerStyle={$settingsButtonStyle} />
      }
      containerStyle={$headerStyle}
      backgroundColor={colors.background}
      {...props}
    />
  )
}
const $headerStyle: ViewStyle = {
  marginBottom: 0,
  paddingHorizontal: spacing.sm,
}
const $imgThumbnail: ImageStyle = {
  height: 40,
  width: 40,
  borderRadius: 20,
  alignSelf: "flex-start",
  marginRight: spacing.sm,
}
const $settingsButtonStyle: ViewStyle = {
  height: 40,
  width: 40,
  borderRadius: 25,
  backgroundColor: colors.backgroundDim,
  alignItems: "center",
  justifyContent: "center",
}
