import * as AuthSession from 'expo-auth-session';

const AuthRequestConfig = {
    clientId: "UP5YOoqMze966nBzDgTwbOLqaWr6MWpO",
    redirectUri: "exp://192.168.0.213:8081"

}

export function Login() {
    const discovery = AuthSession.useAutoDiscovery('dev-sethaker.us.auth0.com');

    
}

