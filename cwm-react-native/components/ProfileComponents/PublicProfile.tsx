import { CWMUser } from "../../assets/types/profiledata";
import { View, Text } from "../Themed";

export default function PublicProfile(user: CWMUser) {
    return ( 
        <View>
            <Text>{JSON.stringify(user)}</Text>
        </View>
    )
}