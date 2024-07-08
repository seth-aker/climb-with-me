import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useState } from "react"
import { Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { Button, Screen, Text } from "app/components"
import { HomeTabScreenProps } from "../navigators"
import { colors, spacing } from "../theme"
import { useSafeAreaInsetsStyle } from "../utils/useSafeAreaInsetsStyle"
import { LoadingSpinner } from "./LoadingSpinner"
import { useAuth0 } from "react-native-auth0"
import { useStores } from "app/models"
import * as Location from "expo-location"

const welcomeLogo = require("../../assets/images/logo.png")


interface HomeScreenProps extends HomeTabScreenProps<"Home"> {
}

export const HomeScreen: FC<HomeScreenProps> = observer(function HomeScreen(_props
) {
  const { navigation } = _props;
  const $bottomContainerInsets = useSafeAreaInsetsStyle(["bottom"])
  const { clearSession } = useAuth0();
  const { authenticationStore: { logout, tokenLoading } } = useStores();
  const [location, setLocation] = useState<Location.LocationObject | undefined>(undefined)
  const [errorMsg, setErrorMsg] = useState<string | undefined>(undefined);
  
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

  
  
  const handleLogout = async () => {
    try {
      logout();
      await clearSession();
      navigation.navigate("Login")
  } catch (e) {
    console.log("Log out cancelled")
  }
}

  return (
    tokenLoading ? 
    <>
      <LoadingSpinner />
    </> : (
    <Screen style={$container}>
      <View style={$topContainer}>
        <Image style={$welcomeLogo} source={welcomeLogo} resizeMode="contain" />
        <Text
          testID="welcome-heading"
          style={$welcomeHeading}
          tx="welcomeScreen.readyForLaunch"
          preset="heading"
        />
        <Text tx="welcomeScreen.exciting" preset="subheading" /> 
      </View>

    <View style={[$bottomContainer, $bottomContainerInsets]}>
        <Text text="Location Data:" size="md" />
        {!errorMsg && !location && 
          <LoadingSpinner />
        }
        <Text text={errorMsg || JSON.stringify(location)}></Text>
        <Button text="Logout" onPress={handleLogout} />
      </View>
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
  flexBasis: "57%",
  justifyContent: "center",
  paddingHorizontal: spacing.lg,
}

const $bottomContainer: ViewStyle = {
  flexShrink: 1,
  flexGrow: 0,
  flexBasis: "43%",
  backgroundColor: colors.palette.neutral100,
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
  paddingHorizontal: spacing.lg,
  justifyContent: "space-around",
}
const $welcomeLogo: ImageStyle = {
  height: 88,
  width: "100%",
  marginBottom: spacing.xxl,
}

const $welcomeHeading: TextStyle = {
  marginBottom: spacing.md,
}
