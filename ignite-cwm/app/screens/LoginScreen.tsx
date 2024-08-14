import { AppStackScreenProps } from "app/navigators/types"
import { observer } from "mobx-react-lite"
import React, { FC, useState } from "react"
import { Button, Screen, Text } from "../components"
import { ViewStyle, TextStyle, View } from "react-native"
import { spacing, colors } from "app/theme"
import { useAuth0 } from "react-native-auth0"
import { useStores } from "app/models"
import { LoadingSpinner } from "app/components/LoadingSpinner"

import { Logo } from "app/components/Logo"
import Config from "app/config"
type LoginScreenProps = AppStackScreenProps<"Login">

export const LoginScreen: FC<LoginScreenProps> = observer(function LoginScreen(_props) {
  const { authorize } = useAuth0()
  const {
    authenticationStore: { setAuthToken },
  } = useStores()
  const [isLoading, setIsLoading] = useState(false)
  const handleLogin = async () => {
    setIsLoading(true)
    try {
      const credentials = await authorize({ audience: Config.AUDIENCE })
      setAuthToken(credentials?.accessToken)
    } catch (e) {
      console.log(e)
    }
    setIsLoading(false)
  }

  const handleRegister = async () => {
    try {
      const credentials = await authorize({
        audience: Config.AUDIENCE,
        additionalParameters: { screen_hint: "signup" },
      })
      setAuthToken(credentials?.accessToken)
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <Screen
      preset="auto"
      contentContainerStyle={$screenContentContainer}
      safeAreaEdges={["top", "bottom"]}
    >
      <View>
        <Logo style={$logoStyle} height={200} fill={colors.tint} />
        {/* <Image
                    source={LOGO_URI}
                    style={$logoStyle}
                /> */}
        <Text tx="loginScreen.welcomeText" preset="heading" style={$welcomeText} />
      </View>
      <View>
        <Button
          testID="login-button"
          style={$tapButton}
          preset="default"
          disabled={isLoading}
          onPress={handleLogin}
          text={!isLoading ? "Login" : undefined}
        >
          {isLoading && (
            <LoadingSpinner
              style={$loadingSpinnerStyle}
              circumference={60}
              strokeWidth={3}
              stroke={colors.palette.neutral200}
            />
          )}
        </Button>

        <Button
          testID="create-account-button"
          tx="loginScreen.create"
          style={$tapButton}
          preset="reversed"
          disabled={isLoading}
          onPress={handleRegister}
        ></Button>
      </View>
    </Screen>
  )
})

const $screenContentContainer: ViewStyle = {
  paddingVertical: spacing.xxxl + spacing.xxxl,
  paddingHorizontal: spacing.lg,
  flex: 1,
  flexDirection: "column",
  justifyContent: "space-between",
}

const $tapButton: ViewStyle = {
  alignItems: "center",
  marginTop: spacing.xs,
  height: 52,
}

const $welcomeText: TextStyle = {
  margin: spacing.lg,
  alignSelf: "center",
  color: colors.tint,
}

const $logoStyle: ViewStyle = {
  width: "100%",
}
const $loadingSpinnerStyle: ViewStyle = {
  width: 30,
  height: 30,
}
