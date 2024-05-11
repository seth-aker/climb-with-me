import { AppStackScreenProps } from "app/navigators";
import { observer } from "mobx-react-lite";
import React, { FC } from "react";
import { Button, Icon, Screen, Text } from "../components"
import { ViewStyle } from "react-native";
import { spacing } from "app/theme";

interface LoginScreenProps extends AppStackScreenProps<"Login"> {}

export const LoginScreen: FC<LoginScreenProps> = observer(function LoginScreen(_props) {

    return (
        <Screen
            preset="auto"
            contentContainerStyle={$screenContentContainer}
            safeAreaEdges={["top", "bottom"]}
        >

    </Screen>
    )
})

const $screenContentContainer: ViewStyle = {
  paddingVertical: spacing.xxl,
  paddingHorizontal: spacing.lg,
}