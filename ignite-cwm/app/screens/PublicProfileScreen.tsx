import React from "react"
import { AppStackScreenProps } from "app/navigators/types"
import { observer } from "mobx-react-lite"
import { Header, Screen } from "app/components"

export interface PublicProfileScreenProps extends AppStackScreenProps<"PublicProfile"> {}

export const PublicProfileScreen = observer((props: PublicProfileScreenProps) => {
  return (
    <Screen preset="fixed">
      <Header></Header>
    </Screen>
  )
})
