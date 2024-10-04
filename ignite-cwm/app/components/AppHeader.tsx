import React from "react"
import { HeaderProps, Header as DefaultHeader } from "./Header"
import { ImageStyle, Pressable, ViewStyle, Image } from "react-native"
import { Icon } from "./Icon"
import { colors, spacing } from "app/theme"
import { useStores } from "app/models/helpers/useStores"
import { useNavigation } from "@react-navigation/native"
import { AppStackParamList } from "app/navigators/types"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
export const AppHeader = (props: HeaderProps) => {
  const navigation: NativeStackNavigationProp<AppStackParamList> = useNavigation()
  const { userStore } = useStores()
  return (
    <DefaultHeader
      LeftActionComponent={
        <Pressable
          style={$imgBackground}
          onPress={() => navigation.navigate("HomeTabs", { screen: "Profile" })}
        >
          <Image src={userStore.avatar} style={$imgThumbnail} defaultSource={1} />
        </Pressable>
      }
      RightActionComponent={
        <Icon
          icon={"gear"}
          color={colors.tint}
          size={28}
          containerStyle={$settingsButtonStyle}
          onPress={() => navigation.navigate("Settings")}
        />
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
const $imgBackground: ViewStyle = {
  height: 40,
  width: 40,
  borderRadius: 20,
  backgroundColor: colors.backgroundDim,
  alignItems: "center",
  justifyContent: "center",
}
