import { AppStackScreenProps } from "app/navigators/types";
import { observer } from "mobx-react-lite";
import React, { FC } from "react";
import { Button, Screen, Text } from "../components"
import { ViewStyle, Image, ImageStyle, TextStyle, View } from "react-native";
import { spacing, colors } from "app/theme";
import { useAuth0 } from "react-native-auth0";
import { useStores } from "app/models";

type LoginScreenProps = AppStackScreenProps<"Login">
const LOGO_URI = require("../../assets/images/logo.png");

export const LoginScreen: FC<LoginScreenProps> = observer(function LoginScreen(_props) {
    const { authorize } = useAuth0();
    const {authenticationStore : { setAuthToken }} = useStores()

    const handleLogin = async () => {
        try {
            const credentials = await authorize();
            setAuthToken(credentials?.accessToken)
        } catch (e) {
            console.log(e)
        }
    }

    const handleRegister = async () => {
        try {
            const credentials =  await authorize({additionalParameters: {"screen_hint": "signup"}})
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
                <Image
                    source={LOGO_URI}
                    style={$logoStyle}
                />
                <Text
                    tx="loginScreen.welcomeText"
                    preset="heading"
                    style={$welcomeText}
                />
            </View>
            <View>
                <Button
                    testID="login-button"
                    tx="loginScreen.login"
                    style={$tapButton}
                    preset="default"
                    onPress={handleLogin}
                    />

            
                <Button
                    testID="create-account-button"
                    tx="loginScreen.create"
                    style={$tapButton}
                    preset="reversed"
                    onPress={handleRegister}
                    >

                </Button>
            </View>

    </Screen>
    )
})

const $screenContentContainer: ViewStyle = {
  paddingVertical: spacing.xxxl + spacing.xxxl,
  paddingHorizontal: spacing.lg,
  flex: 1,
  flexDirection: 'column',
  justifyContent: 'space-between'
}

const $tapButton: ViewStyle = {
  marginTop: spacing.xs,
}



const $welcomeText: TextStyle = {
    alignSelf: 'center',
    color: colors.tint
}

const $logoStyle: ImageStyle = {
    resizeMode: 'center', 
    width: '100%',
    height: 250
}

