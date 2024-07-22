/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native"
import { createNativeStackNavigator} from "@react-navigation/native-stack"
import { observer } from "mobx-react-lite"
import React, { useEffect } from "react"
import { useColorScheme } from "react-native"
import * as Screens from "app/screens"
import Config from "../config"
import { navigationRef, useBackButtonHandler } from "./navigationUtilities"
import { colors } from "app/theme"
import { useStores } from "app/models"
import { useAuth0 } from "react-native-auth0"
import { HomeTabNavigator } from "./HomeTabsNavigator"
import { AppStackParamList } from "./types"



/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 *   https://reactnavigation.org/docs/typescript/#organizing-types
 */

/**
 * This is a list of all the route names that will exit the app if the back button
 * is pressed while in that screen. Only affects Android.
 */
const exitRoutes = Config.exitRoutes



// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<AppStackParamList>()

const AppStack = observer(function AppStack(_props) {

const { 
  authenticationStore: {isAuthenticated, updateAndValidateToken},
  userStore
} = useStores();
  const { getCredentials, user } = useAuth0(); 

  

  // Used to sync the authentication store with Auth0's SDK and determine what screen to load first.
  useEffect(() => {
   (async () => {
    await updateAndValidateToken(getCredentials)
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
    // If the user 
    if(user?.sub) {
      userStore.setProp("state", "success")
    }
    })()
  },[user])
  
  return (
  
      <Stack.Navigator
        screenOptions={{ headerShown: false, navigationBarColor: colors.background }}
        initialRouteName={isAuthenticated ? "HomeTabs" : "Login"}
      >

        {isAuthenticated ? (
          <>
            <Stack.Screen name="HomeTabs" component={HomeTabNavigator} />
            <Stack.Screen name="PostScreen" component={Screens.PostScreen} />
             
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={Screens.LoginScreen} />
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
