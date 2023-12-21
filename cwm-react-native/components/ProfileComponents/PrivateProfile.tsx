import { PrivateProfileData } from "../../app/profile/[userId]";
import { CWMUser } from "../../assets/types/profileData";

type PrivateProfileProps = {
    user: CWMUser
}

import { View, Text } from "../Themed";
export default function PrivateProfile({user}: PrivateProfileProps) {
    return (
        <View>
            <Text>{JSON.stringify(user)}</Text>
        </View>
    )
}