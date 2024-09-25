import { useStores } from "app/models"
import { observer } from "mobx-react-lite"
import React, { useState } from "react"
import { ImageStyle, Pressable, TextStyle, View, ViewStyle } from "react-native"
import { AutoImage } from "./AutoImage"
import { Icon } from "./Icon"
import { colors, spacing } from "app/theme"
import { Text } from "./Text"
import { NewPostModal } from "./NewPostModal"
import { useNavigation } from "@react-navigation/native"
import { RootStackNavigation } from "app/navigators/types"

export interface NewPostBarProps {
  style?: ViewStyle
}
export const NewPostBar = observer((props: NewPostBarProps) => {
  const { style: $viewStyleOverride } = props
  const { userStore } = useStores()
  const navigation = useNavigation<RootStackNavigation>()
  const [newPostModalVis, setNewPostModalVis] = useState(false)

  return (
    <View style={[$container, $viewStyleOverride]}>
      <Pressable onPress={() => navigation.navigate("HomeTabs", { screen: "Profile" })}>
        <AutoImage src={userStore.avatar} style={$imgThumbnail} />
      </Pressable>
      <Pressable style={$newPostButton} onPress={() => setNewPostModalVis(true)}>
        <Text text="Where are you climbing?" style={$postButtonText} />
        <Icon icon={"plus"} color={colors.palette.neutral500} />
      </Pressable>
      <NewPostModal visible={newPostModalVis} setVisible={setNewPostModalVis} />
    </View>
  )
})
const $container: ViewStyle = {
  flexDirection: "row",
  margin: spacing.sm,
  alignItems: "center",
}
const $imgThumbnail: ImageStyle = {
  height: 40,
  width: 40,
  borderRadius: 20,
  alignSelf: "flex-start",
  marginRight: spacing.sm,
}
const $newPostButton: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  flexGrow: 1,
  height: 42,
  borderWidth: 1,
  borderColor: colors.border,
  borderRadius: 20,
  backgroundColor: colors.palette.neutral100,
  paddingHorizontal: spacing.md,
}
const $postButtonText: TextStyle = {
  color: colors.palette.neutral600,
}
