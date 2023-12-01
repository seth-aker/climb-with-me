import { useAuth0 } from 'react-native-auth0';
import { Pressable, PressableProps, StyleSheet } from 'react-native';
import { Text } from './Themed'

interface ButtonProps extends PressableProps {
    text: string
}
export function LoginButton({text, ...props}: ButtonProps) {
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
            <Text>{text}</Text>
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