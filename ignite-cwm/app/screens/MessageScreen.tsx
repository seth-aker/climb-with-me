import { HomeTabScreenProps } from "app/navigators";
// import { useSafeAreaInsetsStyle } from "app/utils/useSafeAreaInsetsStyle";
import { observer } from "mobx-react-lite";
import React, { FC } from "react";
import { Screen, Text } from "app/components";
import { ViewStyle } from "react-native";
import { spacing } from "app/theme";

interface MessagesScreenProps extends HomeTabScreenProps<"Messages"> {}

export const MessageScreen: FC<MessagesScreenProps> = observer(function MessageScreen(_props) {
    // const $bottomContainerInsets = useSafeAreaInsetsStyle(["bottom"])

    return (
        <Screen preset="fixed" safeAreaEdges={["top"]} contentContainerStyle={$screenContainer} >
            <Text text="This is where messages will be displayed">

            </Text>
        </Screen>
    )
} )

const $screenContainer: ViewStyle = {
    paddingTop: spacing.md,
    flex: 1,
}