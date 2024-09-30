import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useState } from "react"
import { ImageStyle, Pressable, View, ViewStyle } from "react-native"
import { AutoImage, Header, Icon, Screen, Text } from "app/components"
import { colors, spacing } from "../theme"
import { LoadingSpinner } from "../components/LoadingSpinner"
import { useAuth0 } from "react-native-auth0"
import { useStores } from "app/models"
import * as Location from "expo-location"
import { Post } from "app/models/Post"
import { PostCard } from "app/components/PostCard"
import { ContentStyle } from "@shopify/flash-list"
import { HomeTabScreenProps } from "app/navigators/types"
import MapView, { PROVIDER_GOOGLE } from "react-native-maps"
import { ScreenContext } from "react-native-screens"

interface HomeScreenProps extends HomeTabScreenProps<"Home"> {}

export const HomeScreen: FC<HomeScreenProps> = observer(function HomeScreen(_props) {
  const { navigation } = _props
  const { clearSession } = useAuth0()
  const {
    authenticationStore: { logout, tokenLoading, authToken },
    postStore,
    userStore,
  } = useStores()
  const [location, setLocation] = useState<Location.LocationObject | undefined>(undefined)
  const [errorMsg, setErrorMsg] = useState<string | undefined>(undefined)
  const [refreshing, setRefreshing] = useState(false)

  //  TODO: make this into a hook that can be used anywhere
  useEffect(() => {
    ;(async () => {
      let { status } = await Location.getForegroundPermissionsAsync()
      // checks current permission status and if not granted yet, requests permission
      if (status !== "granted") {
        status = (await Location.requestForegroundPermissionsAsync()).status
      }
      // checks permission status again if the user granted permission from the Location.requestForegroundPermissionsAsync() function.
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied")
        return
      }
      const location = await Location.getCurrentPositionAsync()
      setLocation(location)
    })()
  }, [])

  const handleLogout = async () => {
    try {
      logout()
      await clearSession()
    } catch (e) {
      console.log("Log out cancelled")
    }
  }

  const manualRefresh = async () => {
    setRefreshing(true)
    await postStore.fetchPosts(authToken ?? "")
    setRefreshing(false)
  }

  return tokenLoading ? (
    <>
      <LoadingSpinner circumference={100} style={$loadingSpinnerStyle} />
    </>
  ) : (
    <Screen preset="fixed" contentContainerStyle={$container}>
      <Header
        LeftActionComponent={
          <Pressable onPress={() => navigation.navigate("HomeTabs", { screen: "Profile" })}>
            <AutoImage src={userStore.avatar} style={$imgThumbnail} />
          </Pressable>
        }
        RightActionComponent={
          <Icon icon={"gear"} color={colors.tint} size={28} containerStyle={$settingsButtonStyle} />
        }
        containerStyle={$headerStyle}
        backgroundColor={colors.background}
      />

      <View style={$topContainer}>
        {location ? (
          <View>
            <MapView
              provider={PROVIDER_GOOGLE}
              style={$mapStyle}
              initialRegion={{
                longitude: location.coords.longitude,
                latitude: location.coords.latitude,
                longitudeDelta: 0.75,
                latitudeDelta: 0.75,
              }}
            ></MapView>
            
          </View>
        ) : (
          <View style={$loadingSpinnerStyle}>
            <Text preset="subheading" text="Fetching Location..." textColor={colors.tint} />
            <LoadingSpinner circumference={200} />
          </View>
        )}
        {/* <ListView<Post>
          contentContainerStyle={$listContentContainer}
          data={postStore.posts.slice()} // Using slice to create a copy of the array that is then used for the cards. Breaks if you don't do this
          estimatedItemSize={162}
          onRefresh={manualRefresh}
          refreshing={refreshing}
          renderItem={({ item }) => <PostCard post={item} />}
        /> */}
      </View>

      {/* <View style={[$bottomContainer, $bottomContainerInsets]}>
         <Text text="Location Data:" size="md" />
        {!errorMsg && !location && 
          <LoadingSpinner />
        }
        <Text text={errorMsg || "Location found!"}></Text> 
        <Button text="Logout" onPress={handleLogout} />
      </View> */}
    </Screen>
  )
})

const $loadingSpinnerStyle: ViewStyle = {
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  width: "100%",
}

const $container: ViewStyle = {
  height: "100%",
  backgroundColor: colors.background,
}
const $headerStyle: ViewStyle = {
  marginBottom: 0,
  paddingHorizontal: spacing.sm,
}
const $topContainer: ViewStyle = {
  marginTop: 0,
  flexGrow: 1,
  justifyContent: "center",
}
const $imgThumbnail: ImageStyle = {
  height: 40,
  width: 40,
  borderRadius: 20,
  alignSelf: "flex-start",
  marginRight: spacing.sm,
}

const $settingsButtonStyle: ViewStyle = {
  height: 40,
  width: 40,
  borderRadius: 25,
  backgroundColor: colors.backgroundDim,
  alignItems: "center",
  justifyContent: "center",
}
const $mapStyle: ViewStyle = {
  height: "100%",
  width: "100%",
}
// const $bottomContainer: ViewStyle = {

//   backgroundColor: colors.palette.neutral100,
//   borderTopLeftRadius: 16,
//   borderTopRightRadius: 16,
//   justifyContent: "space-around",
// }
// const $welcomeLogo: ImageStyle = {
//   height: 88,
//   width: "100%",
//   marginBottom: spacing.xxl,
// }

// const $welcomeHeading: TextStyle = {
//   marginBottom: spacing.md,
// }
