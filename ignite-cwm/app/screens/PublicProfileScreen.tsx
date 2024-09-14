import React, { useEffect, useState } from "react"
import { AppStackScreenProps } from "app/navigators/types"
import { observer } from "mobx-react-lite"
import { AutoImage, Button, Card, Header, ListView, Screen, Text, TextField } from "app/components"
import { Logo } from "app/components/Logo"
import { colors, spacing } from "app/theme"
import { useStores } from "app/models"
import { useAuth0 } from "react-native-auth0"
import { ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { IUserStoreSnapshotOut } from "app/models/UserStore"
import { getUser } from "app/services/api/userService/userService"
import { LoadingSpinner } from "app/components/LoadingSpinner"

export interface PublicProfileScreenProps extends AppStackScreenProps<"PublicProfile"> {}

export const PublicProfileScreen = observer((props: PublicProfileScreenProps) => {
  const { navigation, route } = props

  const {
    authenticationStore: { logout, authToken },
  } = useStores()
  const { clearSession } = useAuth0()
  const [user, setUser] = useState<IUserStoreSnapshotOut>()
  const [loading, setLoading] = useState(false)
  const handleLogout = async () => {
    try {
      logout()
      await clearSession()
    } catch (err) {
      console.log("Logout cancelled")
    }
  }
  useEffect(() => {
    setLoading(true)
    getUser(route.params.userId, authToken ?? "")
      .then((response) => {
        setUser(response.data)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        navigation.goBack()
      })
  }, [])
  return !loading && user ? (
    <Screen preset="fixed">
      <Header
        title={user.name}
        titleStyle={$titleStyle}
        LeftActionComponent={<Logo width={30} height={30} fill={colors.palette.neutral100} />}
        RightActionComponent={
          <Text
            text="Logout"
            preset="bold"
            textColor={colors.palette.neutral100}
            onPress={handleLogout}
          />
        }
        leftIconColor={colors.palette.neutral100}
        onRightPress={handleLogout}
        containerStyle={$headerStyle}
        backgroundColor={colors.palette.primary500}
      />
      <View style={$screenBody}>
        <AutoImage source={{ uri: user.backgroundImg, cache: "reload" }} style={$coverPhoto} />
        <AutoImage
          source={{ uri: user.profileImg, cache: "reload" }}
          height={75}
          width={75}
          style={$profileImg}
        />
        <View style={$textContainer}>
          <Text text={user.name} preset="heading" />
          <TextField label="About Me" editable={false} value={user.aboutMeText} multiline />
          <View style={$climbingStylesContainer}>
            <Text preset="formLabel" text="Climbing Styles" />
            <ListView
              data={user.climbingStyles.map((item) => item)}
              estimatedItemSize={100}
              renderItem={({ item }) => {
                const contentIndoor = item.maxGradeIndoor
                  ? `Max Indoor Grade: ${item.maxGradeIndoor}`
                  : ""
                const contentOutdoor = item.maxGradeOutdoor
                  ? `Max Outdoor Grade: ${item.maxGradeOutdoor}`
                  : ""
                const spacer = item.maxGradeIndoor && item.maxGradeOutdoor ? "\n" : ""

                return (
                  <Card
                    preset="default"
                    heading={item.style}
                    HeadingComponent={
                      <View style={$climbingStyleCardHeader}>
                        <Text text={item.style} />
                      </View>
                    }
                    content={contentIndoor + spacer + contentOutdoor}
                    footer={`Experience: ${item.yearsExp}`}
                    style={$cardContainerStyle}
                  />
                )
              }}
            />
          </View>
          <Button onPress={() => console.log(user)}></Button>
        </View>
      </View>
    </Screen>
  ) : (
    <LoadingSpinner />
  )
})

const $headerStyle: ViewStyle = {
  marginBottom: 0,
  paddingHorizontal: spacing.sm,
}
const $titleStyle: TextStyle = {
  color: colors.palette.neutral100,
}
const $screenBody: ViewStyle = {}
const $coverPhoto: ImageStyle = {
  position: "absolute",
  width: "100%",
  height: 162,
}
const $profileImg: ImageStyle = {
  height: 162,
  width: 162,
  borderRadius: 81,
  marginHorizontal: spacing.md,
  marginTop: spacing.lg,
}
const $textContainer: ViewStyle = {
  paddingHorizontal: spacing.md,
}
const $climbingStylesContainer: ViewStyle = {
  minHeight: 3,
  flexDirection: "column",
}
const $climbingStyleCardHeader: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
}
const $cardContainerStyle: ViewStyle = {
  marginVertical: spacing.xs,
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
  shadowColor: "none",
  shadowOffset: { width: 0, height: 0 },
  elevation: 0,
  minHeight: 3,
}
