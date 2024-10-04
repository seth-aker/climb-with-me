import { Header, Icon, Screen } from "app/components"
import { AppStackScreenProps } from "app/navigators/types"
import { colors, spacing } from "app/theme"
import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { TextStyle, View, ViewStyle } from "react-native"

export interface SettingsScreenProps extends AppStackScreenProps<"Settings"> {}
export const SettingsScreen: FC<SettingsScreenProps> = observer(function SettingsScreen(props) {
  return (
    <Screen preset="fixed" contentContainerStyle={$screenContainer}>
      <Header
        title="Settings"
        titleStyle={$titleStyle}
        RightActionComponent={
          <View style={$closeContainerButton}>
            <Icon icon={"x"} color={colors.tint} onPress={() => props.navigation.goBack()} />
          </View>
        }
      />
    </Screen>
  )
})
const $screenContainer: ViewStyle = {
  flex: 1,
}
const $closeContainerButton: ViewStyle = {
  height: 40,
  width: 40,
  borderRadius: 25,
  marginRight: spacing.sm,
  backgroundColor: colors.backgroundDim,
  alignItems: "center",
  justifyContent: "center",
}
const $titleStyle: TextStyle = {
  color: colors.palette.neutral100,
}
