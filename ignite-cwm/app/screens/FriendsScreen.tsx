import { Screen, Text } from "app/components";
import { HomeTabScreenProps } from "app/navigators";
import { spacing } from "app/theme";
import { observer } from "mobx-react-lite";
import React, { FC } from "react";
import { ViewStyle } from "react-native";

interface FriendsScreenProps extends HomeTabScreenProps<"Friends"> {

}

export const FriendsScreen: FC<FriendsScreenProps> = observer(function FriendsScreen(_props) {
    
    return (
        <Screen preset="fixed" safeAreaEdges={["top"]} contentContainerStyle={$screenContainer}>
            <Text text="This is where friends list and options to add new friends will be"></Text>
        </Screen>
    )
})

const $screenContainer: ViewStyle = {
    paddingTop: spacing.md,
    flex: 1,
}