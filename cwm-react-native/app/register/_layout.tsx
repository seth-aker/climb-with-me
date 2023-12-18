import { Stack } from "expo-router";
import { RegistrationContextProvider } from "../../context/RegistrationContext";

export default function RegistrationLayout() {

    return (
        <RegistrationContextProvider>
            <Stack>
                <Stack.Screen name="index" options={{title: "Register"}} />
                <Stack.Screen name="two" options={{title: "Register"}}/>
                <Stack.Screen name="three"  options={{title: "Register"}}/>
            </Stack>
        </RegistrationContextProvider>
    )
}