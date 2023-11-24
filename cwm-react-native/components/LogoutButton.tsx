import { useAuth0 } from 'react-native-auth0';
import { Pressable, Text, StyleSheet } from 'react-native';

export function LogoutButton() {
    const { clearSession } = useAuth0();

    const logout = async () => {
        try {
            await clearSession();
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <Pressable onPress={logout} style={styles.button}>
            <Text>Logout</Text>
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