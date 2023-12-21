import { CWMUser } from "../../assets/types/profileData";
import { View, Text } from "../Themed";

type PublicProfileProps = {
    user: CWMUser
}

export default function PublicProfile({user}: PublicProfileProps) {
    return ( 
        <View>
            <Text>{JSON.stringify(user)}</Text>
        </View>
    )
}