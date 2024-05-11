import { useAuth0 } from "react-native-auth0";
import CustomButton from "../../components/CustomButton";
import { CwmLogo } from "../../components/CwmLogo";
import { View, Text } from "../../components/Themed";
import { StyleSheet } from "react-native";
import { useToken } from "../../hooks/useToken";
import { router } from "expo-router";

export default function Login() {
    const { authorize, user } = useAuth0();
    const { setAccessToken } = useToken();


    const onLogin = async () => {
        try {  
            const credentials = await authorize({audience: 'http://localhost:8080'}); //may need to include: {scope: "openid profile offline_access"}
            if(credentials) {
                setAccessToken(credentials.accessToken);
                router.push("/")
            }
        } catch (e) {
            console.log(e);
        }
    };

    const handleRegister = async () => {
        try {
            const credentials = await authorize({audience: 'http://localhost:8080'})
            if(credentials && user) {
                setAccessToken(credentials.accessToken)
                const userId = user.sub?.substring(user.sub.indexOf("|"));
                router.push(`/profile/${userId}`)
            }           
        } catch (e) {
            console.log(e);
        }
    }
    
    return (
        <View>
            <View style={styles.brand_container}>
                <Text>Climb With Me</Text>
                <CwmLogo width='75px' height='75px' fill='#567944' />
            </View>
            <View>
                <CustomButton text="Login" onPress={onLogin}/>
                <CustomButton text="Create new account" onPress={handleRegister}/>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    brand_container: {
        display: "flex",
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        padding: 0,
    }
})