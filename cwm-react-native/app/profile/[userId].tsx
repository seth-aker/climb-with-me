import { useLocalSearchParams } from "expo-router";
import { User, useAuth0 } from "react-native-auth0";
import { Text, View } from "../../components/Themed";
import { useToken } from "../../hooks/useToken";
import { getUserProfile } from "../../service/RegisterService";

export type ProfileProps = {
    user: User,
    userId: string
}

export default function UserProfile() {
    const { userId } = useLocalSearchParams<{userId: string}>();
    const { user } = useAuth0();
    if(user && user.sub?.substring(user.sub.indexOf("|")) === userId) {
        
        return (
            <PrivateProfile user={user} userId={userId} />
        )
    } else {
        return <PublicProfile />
    }

}

function PrivateProfile({user, userId}: ProfileProps ) {

    return (
        <View>
            <Text>{user.name}</Text>
        </View>
    )

}

function PublicProfile() {
    return (
        <View>

        </View>
    )   
}