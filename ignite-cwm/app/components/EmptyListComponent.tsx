import { View, ViewStyle } from "react-native"
import React from "react"
import { Text } from "./Text"
export const EmptyListComponent = () => {
  return (
    <View style={$container}>
      <Text text="It is lonely in here..." />
    </View>
  )
}
const $container: ViewStyle = {
  flex: 1,
  alignItems: "center",
}
