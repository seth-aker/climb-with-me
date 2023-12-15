import { Stack } from "expo-router";
import { RegistrationContextProvider } from "../../context/RegistrationContext";

export default function RegistrationLayout() {

    return (
        <RegistrationContextProvider>
            <Stack>
                <Stack.Screen name="index" options={{headerShown: false}}/>
                <Stack.Screen name="two" options={{headerShown: false}}/>
            </Stack>
        </RegistrationContextProvider>
    )
}