/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import { DarkTheme, DefaultTheme, NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { observer } from "mobx-react-lite"
import React, { useEffect } from "react"
import { useColorScheme } from "react-native"
import Config from "../config"
import { navigationRef, useBackButtonHandler } from "./navigationUtilities"
import { colors } from "app/theme"
import { useStores } from "app/models"
import { useAuth0 } from "react-native-auth0"
import { HomeTabNavigator } from "./HomeTabsNavigator"
import { AppStackParamList } from "./types"
import { ChatScreen } from "app/screens/ChatScreen"
import { LoginScreen, PostScreen } from "app/screens"
import { FriendModel } from "app/models/Friend"
import { getUser, postUser } from "app/services/api"
import { applySnapshot, getSnapshot } from "mobx-state-tree"

/**
 * This is a list of all the route names that will exit the app if the back button
 * is pressed while in that screen. Only affects Android.
 */
const exitRoutes = Config.exitRoutes

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<AppStackParamList>()

const AppStack = observer(function AppStack(_props) {
  const { authenticationStore: authStore, userStore, friendStore } = useStores()
  const { getCredentials, user, isLoading } = useAuth0()

  useEffect(() => {
    if (__DEV__) {
      friendStore.clearStore()
      const fakeFriends = [
        {
          guid: "1",
          name: "Joe",
          profImg: "https://placehold.co/200x200.png",
          friendSince: Date.now(),
        },
        {
          guid: "2",
          name: "Paul Bergeron",
          profImg: "https://placehold.co/200x200.png",
          friendSince: Date.now(),
        },
        {
          guid: "3",
          name: "Ellie Bergeron Aker",
          profImg: "https://placehold.co/200x200.png",
          friendSince: Date.now(),
        },
        {
          guid: "4",
          name: "David Bergeron",
          profImg: "https://placehold.co/200x200.png",
          friendSince: Date.now(),
        },
        {
          guid: "5",
          name: "Michael Normand",
          profImg: "https://placehold.co/200x200.png",
          friendSince: Date.now(),
        },
        {
          guid: "6",
          name: "Jane Bergeron",
          profImg: "https://placehold.co/200x200.png",
          friendSince: Date.now(),
        },
        {
          guid: "7",
          name: "Chip Aker",
          profImg: "https://placehold.co/200x200.png",
          friendSince: Date.now(),
        },
        {
          guid: "8",
          name: "Amy Aker",
          profImg: "https://placehold.co/200x200.png",
          friendSince: Date.now(),
        },
        {
          guid: "9",
          name: "Joel",
          profImg: "https://placehold.co/200x200.png",
          friendSince: Date.now(),
        },
        {
          guid: "10",
          name: "Sam Aker",
          profImg: "https://placehold.co/200x200.png",
          friendSince: Date.now(),
        },
        {
          guid: "11",
          name: "Will Aker",
          profImg: "https://placehold.co/200x200.png",
          friendSince: Date.now(),
        },
      ]
      const friendRequests = [
        {
          guid: "one",
          name: "Ellie",
          profImg:
            "https://static.wikia.nocookie.net/thelastofus/images/3/34/Part_II_Ellie_infobox.png/revision/latest/scale-to-width-down/1200?cb=20230215221019",
        },
        {
          guid: "two",
          name: "David",
          profImg:
            "https://static.wikia.nocookie.net/thelastofus/images/3/3c/Part_I_David_infobox.png/revision/latest?cb=20230222041515",
        },
        {
          guid: "three",
          name: "Jess",
          profImg:
            "https://static.wikia.nocookie.net/thelastofus/images/9/92/Part_II_Jesse_infobox.png/revision/latest?cb=20230215214214",
        },
        {
          guid: "four",
          name: "Jane",
          profImg:
            "https://static.wikia.nocookie.net/thelastofus/images/f/f0/Part_II_Tommy_infobox.png/revision/latest?cb=20230216035810",
        },
        {
          guid: "five",
          name: "Normande",
          profImg:
            "https://static.wikia.nocookie.net/thelastofus/images/2/2f/Part_I_Bill_infobox.png/revision/latest?cb=20230215182523",
          friendSince: Date.now(),
        },
      ]
      fakeFriends.forEach((friend) => {
        friendStore.addFriend(FriendModel.create(friend))
      })
      friendRequests.forEach((friend) => {
        friendStore.addFriendRequest(friend.guid, friend.name, friend.profImg)
      })
    }
  }, [])

  useEffect(() => {
    authStore.updateAndValidateToken(getCredentials)
    console.log("Effect Ran")
    if (!isLoading && user && authStore.authToken) {
      applySnapshot(userStore, user)
      userStore.setProp("_id", user.sub?.split("|")[1])
      userStore.setProp("profileImg", user.picture)

      getUser(userStore._id, authStore.authToken).then(
        // Callback when request is successful
        (response) => {
          applySnapshot(userStore, response.data)
        },
        // Callback when request is unsuccessful
        // Posts the user to mongodb
        () => {
          postUser(getSnapshot(userStore), authStore.authToken ?? "").then((postedUser) => {
            applySnapshot(userStore, postedUser.data)
          })
        },
      )
    }
  }, [user])

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, navigationBarColor: colors.background }}
      initialRouteName={authStore.isAuthenticated ? "HomeTabs" : "Login"}
    >
      {authStore.isAuthenticated ? (
        <>
          <Stack.Screen name="HomeTabs" component={HomeTabNavigator} />
          <Stack.Screen
            name="PostScreen"
            component={PostScreen}
            options={{ animation: "slide_from_right" }}
          />
          <Stack.Screen
            name="ChatScreen"
            component={ChatScreen}
            options={{ animation: "slide_from_right" }}
          />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
        </>
      )}
    </Stack.Navigator>
  )
})

export interface NavigationProps
  extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = observer(function AppNavigator(props: NavigationProps) {
  const colorScheme = useColorScheme()

  useBackButtonHandler((routeName) => exitRoutes.includes(routeName))

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      {...props}
    >
      <AppStack />
    </NavigationContainer>
  )
})
