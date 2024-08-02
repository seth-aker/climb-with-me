import { observer } from "mobx-react-lite"
import React, { FC, useState } from "react"
import { View, ViewStyle } from "react-native"
import { Header, ListView, Screen, Text } from "app/components"
import { colors, spacing } from "../theme"
import { LoadingSpinner } from "../components/LoadingSpinner"
import { useAuth0 } from "react-native-auth0"
import { useStores } from "app/models"
// import * as Location from "expo-location"
import { Post } from "app/models/Post"
import { PostCard } from "app/components/PostCard"
import { ContentStyle } from "@shopify/flash-list"
import { HomeTabScreenProps } from "app/navigators/types"
import { NewPostBar } from "app/components/NewPostBar"
import { Logo } from "app/components/Logo"

interface HomeScreenProps extends HomeTabScreenProps<"Home"> {}

export const HomeScreen: FC<HomeScreenProps> = observer(function HomeScreen(_props) {
  const { navigation } = _props
  const { clearSession } = useAuth0()
  const {
    authenticationStore: { logout, tokenLoading },
    postStore,
  } = useStores()
  // const [location, setLocation] = useState<Location.LocationObject | undefined>(undefined)
  // const [errorMsg, setErrorMsg] = useState<string | undefined>(undefined);
  const [refreshing, setRefreshing] = useState(false)

  // TODO: make this into a hook that can be used anywhere
  // useEffect(() => {
  //   (async () => {
  //     let { status } = await Location.getForegroundPermissionsAsync();
  //     // checks current permission status and if not granted yet, requests permission
  //     if(status !== "granted") {
  //       status = (await Location.requestForegroundPermissionsAsync()).status
  //     }
  //     // checks permission status again if the user granted permission from the Location.requestForegroundPermissionsAsync() function.
  //     if(status !== "granted") {
  //       setErrorMsg('Permission to access location was denied');
  //       return;
  //     }
  //     const location = await Location.getCurrentPositionAsync();
  //     setLocation(location);
  //   })();
  // }, [])

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
    await postStore.fetchPosts()
    setRefreshing(false)
  }

  return tokenLoading ? (
    <>
      <LoadingSpinner circumference={100} style={$loadingSpinnerStyle} />
    </>
  ) : (
    <Screen preset="fixed" contentContainerStyle={$container}>
      <Header
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

      <View style={$topContainer}>
        <NewPostBar />
        <ListView<Post>
          contentContainerStyle={$listContentContainer}
          data={postStore.posts.slice()} // Using slice to create a copy of the array that is then used for the cards. Breaks if you don't do this
          estimatedItemSize={162}
          onRefresh={manualRefresh}
          refreshing={refreshing}
          renderItem={({ item }) => <PostCard post={item} />}
        />
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

const $listContentContainer: ContentStyle = {
  paddingTop: spacing.xxs,
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
