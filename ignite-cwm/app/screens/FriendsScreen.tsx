import { Header, ListView, Screen } from "app/components"
import { HomeTabScreenProps } from "app/navigators/types"
import { colors, spacing } from "app/theme"
import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { ViewStyle } from "react-native"
import { FriendCard } from "app/components/FriendCard"
import { IFriend } from "app/models/Friend"
import { useStores } from "app/models"

interface FriendsScreenProps extends HomeTabScreenProps<"Friends"> {}

export const FriendsScreen: FC<FriendsScreenProps> = observer(function FriendsScreen(_props) {
  const { friendStore } = useStores()
  return (
    <Screen preset="fixed" contentContainerStyle={$screenContainer}>
      <Header
        title="Friends"
        containerStyle={$headerStyle}
        backgroundColor={colors.palette.primary500}
      />

      <ListView<IFriend>
        data={friendStore.friends.slice()}
        contentContainerStyle={$listContentContainer}
        renderItem={({ item }) => <FriendCard friend={item} />}
      />
    </Screen>
  )
})

const $screenContainer: ViewStyle = {
  flex: 1,
  alignItems: "center",
  width: "100%",
}

const $headerStyle: ViewStyle = {
  marginBottom: 0,
  paddingHorizontal: spacing.sm,
}
const $listContentContainer: ViewStyle = {}
