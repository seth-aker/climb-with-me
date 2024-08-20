import { Header, ListView, Screen } from "app/components"
import { HomeTabScreenProps } from "app/navigators/types"
import { colors, spacing } from "app/theme"
import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useState } from "react"
import { View, ViewStyle } from "react-native"

import { useStores } from "app/models"
import { IFriendRequest } from "app/models/FriendRequest"
import { FriendRequestCard } from "app/components/FriendRequestCard"
import { EmptyListComponent } from "app/components/EmptyListComponent"

import { getFriendRequests as apiGetFriendRequests } from "app/services/api/friendService/friendService"

interface FriendsScreenProps extends HomeTabScreenProps<"Friends"> {}

export const FriendsScreen: FC<FriendsScreenProps> = observer(function FriendsScreen(_props) {
  const {
    friendStore,
    authenticationStore: { authToken },
  } = useStores()
  const [friendRequestsLoading, setFriendRequestsLoading] = useState(false)

  const getFriendRequests = async () => {
    setFriendRequestsLoading(true)
    const result = await apiGetFriendRequests(authToken ?? "")
    console.log(result.data)
    friendStore.setProp("friendRequests", result.data.friendRequests)
    setFriendRequestsLoading(false)
  }
  useEffect(() => {
    getFriendRequests()
  }, [])
  return (
    <Screen preset="fixed" contentContainerStyle={$screenContainer} safeAreaEdges={["bottom"]}>
      <Header
        title="Friend Requests"
        titleStyle={{ color: colors.palette.neutral100 }}
        containerStyle={$headerStyle}
        backgroundColor={colors.palette.primary500}
      />
      <View style={$listContainer}>
        <ListView<IFriendRequest>
          refreshing={friendRequestsLoading}
          onRefresh={getFriendRequests}
          data={friendStore.friendRequests.slice()}
          contentContainerStyle={$listContentContainer}
          estimatedItemSize={200}
          ListEmptyComponent={<EmptyListComponent />}
          renderItem={({ item }) => <FriendRequestCard friendRequest={item} />}
        />
      </View>
    </Screen>
  )
})

const $screenContainer: ViewStyle = {
  flex: 1,
  alignItems: "center",
}
const $listContainer: ViewStyle = {
  width: "100%",
  flex: 1,
}
const $headerStyle: ViewStyle = {
  marginBottom: 0,
  paddingHorizontal: spacing.sm,
}
const $listContentContainer: ViewStyle = {
  paddingBottom: spacing.xxxs,
}
