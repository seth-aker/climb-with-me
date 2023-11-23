import { useAuth0 } from 'react-native-auth0';
import { Button, View } from 'react-native';

export function LoginButton() {
    const { authorize } = useAuth0();

    const onLogin = async () => {
        try {
            authorize();
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <View>
            <Button title='Login' onPress={onLogin}></Button>
        </View>
    )
}