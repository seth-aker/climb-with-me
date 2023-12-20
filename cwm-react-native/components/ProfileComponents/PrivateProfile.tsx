import { PrivateProfileData } from "../../app/profile/[userId]";
import { CWMUser } from "../../assets/types/profiledata";

import { View, Text } from "../Themed";
export default function PrivateProfile({...props}: CWMUser) {
    return (
        <View>
            <Text>{JSON.stringify(props)}</Text>
        </View>
    )
}