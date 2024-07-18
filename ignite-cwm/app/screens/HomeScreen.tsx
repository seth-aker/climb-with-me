import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useState } from "react"
import { View, ViewStyle } from "react-native"
import { Button, ListView, Screen, Text } from "app/components"
import { HomeTabScreenProps } from "../navigators"
import { colors, spacing } from "../theme"
import { useSafeAreaInsetsStyle } from "../utils/useSafeAreaInsetsStyle"
import { LoadingSpinner } from "../components/LoadingSpinner"
import { useAuth0 } from "react-native-auth0"
import { useStores } from "app/models"
import * as Location from "expo-location"
import { NewClimbModal } from "app/components/NewClimbModal"
import { Post } from "app/models/Post"
import { PostCard } from "app/components/PostCard"
import { ContentStyle } from "@shopify/flash-list"

// const welcomeLogo = require("../../assets/images/logo.png")


interface HomeScreenProps extends HomeTabScreenProps<"Home"> {
}

export const HomeScreen: FC<HomeScreenProps> = observer(function HomeScreen(_props
) {
  const { navigation } = _props;
  const $bottomContainerInsets = useSafeAreaInsetsStyle(["bottom"])
  const { clearSession, user } = useAuth0();
  const { authenticationStore: { logout, tokenLoading }, postStore, userStore } = useStores();
  const [location, setLocation] = useState<Location.LocationObject | undefined>(undefined)
  const [errorMsg, setErrorMsg] = useState<string | undefined>(undefined);
  
  const [newPostModalVis, setNewPostModalVis] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // TODO: make this into a hook that can be used anywhere
  useEffect(() => {
    (async () => {
      let { status } = await Location.getForegroundPermissionsAsync();
      // checks current permission status and if not granted yet, requests permission 
      if(status !== "granted") {
        status = (await Location.requestForegroundPermissionsAsync()).status
      }
      // checks permission status again if the user granted permission from the Location.requestForegroundPermissionsAsync() function. 
      if(status !== "granted") {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      const location = await Location.getCurrentPositionAsync();
      setLocation(location);
    })();
  }, [])

  // Use effect runs when the "user" object from Auth0 gets changed
  useEffect(() => {
    userStore.setProp("name", user?.name)
    userStore.setProp("authId", user?.sub)
    userStore.setProp("givenName", user?.givenName)
    userStore.setProp("familyName", user?.familyName)
    userStore.setProp("email", user?.email)
    userStore.setProp("emailVerified", user?.emailVerified)
    if(user?.birthdate){
      userStore.setProp("dob", Date.parse(user.birthdate))
    }
    userStore.setProp("phoneNumber", user?.phoneNumber)
    userStore.setProp("phoneVerified", user?.phoneNumberVerified)
    userStore.setProp("gender", user?.gender)
    userStore.setProp("profileImg", user?.picture)
    
  },[user])

  const handleLogout = async () => {
    try {
      logout();
      await clearSession();
      navigation.navigate("Login")
  } catch (e) {
    console.log("Log out cancelled")
  }
}

const manualRefresh = async () => {
  setRefreshing(true);
  await postStore.fetchPosts();
  setRefreshing(false)
}
const handleDeleteAllPosts = () => {
  postStore.posts.forEach(post => {
    postStore.deletePost(post)
  })
}

  return (
    tokenLoading ? 
    <>
      <LoadingSpinner />
    </> : (
    <Screen preset="fixed" style={$container}>
      <View style={$topContainer}>
         <ListView<Post>
          contentContainerStyle={$listContentContainer}
          data={postStore.posts.slice()} // Using slice to create a copy of the array that is then used for the cards. Breaks if you don't do this
          estimatedItemSize={100}
          onRefresh={manualRefresh}
          refreshing={refreshing}
          renderItem={({ item }) => (
            <PostCard 
              post={item}
            />
          )}
        />
      </View>

    <View style={[$bottomContainer, $bottomContainerInsets]}>
        {/* <Text text="Location Data:" size="md" />
        {!errorMsg && !location && 
          <LoadingSpinner />
        }
        <Text text={errorMsg || "Location found!"}></Text> */}
        <Button text="Create New Post" onPress={() => setNewPostModalVis(true)} />
        <Button text="Logout" onPress={handleLogout} />
        <Button text="Delete all posts" onPress={handleDeleteAllPosts} />
      </View>
        <NewClimbModal visible={newPostModalVis} setVisible={setNewPostModalVis}/>
    </Screen>
  )
)
})

const $container: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background,
}

const $topContainer: ViewStyle = {
  flexShrink: 1,
  flexGrow: 1,
  flexBasis: "75%",
  justifyContent: "center",
  
}

const $listContentContainer: ContentStyle = {
  paddingHorizontal: spacing.lg,
  paddingTop: spacing.lg + spacing.xl,
  paddingBottom: spacing.lg,
}

const $bottomContainer: ViewStyle = {
  flexShrink: 1,
  flexGrow: 0,
  flexBasis: "25%",
  backgroundColor: colors.palette.neutral100,
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
  paddingHorizontal: spacing.lg,
  justifyContent: "space-around",
}
// const $welcomeLogo: ImageStyle = {
//   height: 88,
//   width: "100%",
//   marginBottom: spacing.xxl,
// }

// const $welcomeHeading: TextStyle = {
//   marginBottom: spacing.md,
// }
