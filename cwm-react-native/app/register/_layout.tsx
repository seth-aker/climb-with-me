import { Stack } from "expo-router";
import { RegistrationContextProvider } from "../../context/RegistrationContext";

export default function RegistrationLayout() {

    return (
        <RegistrationContextProvider>
            <Stack>
                <Stack.Screen name="index"/>
                <Stack.Screen name="two" />
            </Stack>
        </RegistrationContextProvider>
    )
}