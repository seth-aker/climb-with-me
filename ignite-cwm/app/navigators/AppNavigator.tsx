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
import { AppStackParamList, NavigationProps } from "./types"
import { ChatScreen } from "app/screens/ChatScreen"
import { LoginScreen, PostScreen } from "app/screens"

import { applySnapshot, getSnapshot } from "mobx-state-tree"
import { getUser, postUser } from "app/services/api/userService/userService"
import { PublicProfileScreen } from "app/screens/PublicProfileScreen"
import { SocketProvider } from "app/services/webSocket/socket"

/**
 * This is a list of all the route names that will exit the app if the back button
 * is pressed while in that screen. Only affects Android.
 */
const exitRoutes = Config.exitRoutes

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<AppStackParamList>()

const AppStack = observer(function AppStack(_props) {
  const { authenticationStore: authStore, userStore } = useStores()
  const { getCredentials, user, isLoading } = useAuth0()

  useEffect(() => {
    authStore.updateAndValidateToken(getCredentials)
    console.log("Effect Ran")
    if (!isLoading && user && authStore.authToken) {
      applySnapshot(userStore, user)
      userStore.setProp("_id", user.sub?.split("|")[1])
      const imgUri = `https://${Config.AWS_BUCKET_NAME}.s3.amazonaws.com/profile/${
        userStore._id
      }.jpg?t=${Date.now()}`
      userStore.setProp("profileImg", imgUri)

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
  }, [user, isLoading, authStore.authToken])

  return (
    <SocketProvider token={authStore.authToken}>
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
            <Stack.Screen name="PublicProfile" component={PublicProfileScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
          </>
        )}
      </Stack.Navigator>
    </SocketProvider>
  )
})

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
