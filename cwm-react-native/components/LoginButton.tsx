import { useAuth0 } from 'react-native-auth0';
import { Pressable, StyleSheet } from 'react-native';
import { Text } from './Themed'
export function LoginButton() {
    const { authorize } = useAuth0();

    const handleLogin = async () => {
        try {
            authorize();
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <Pressable style={styles.button} onPress={handleLogin}>
            <Text>Login</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
    }
})