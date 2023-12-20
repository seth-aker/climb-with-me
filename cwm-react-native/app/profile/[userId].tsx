import { useLocalSearchParams } from "expo-router";
import { User, useAuth0 } from "react-native-auth0";
import { Text, View } from "../../components/Themed";
import { useToken } from "../../hooks/useToken";
import { getUserProfile } from "../../service/RegisterService";
import { useEffect, useState } from "react";
import ProfilePage from "../../components/ProfileComponents/ProfilePage";
import { CWMUser } from "../../assets/types/profiledata";

export type ProfileProps = {
    userId: string,
    profileData: ProfileData
}

export type PrivateProfileData = {
    state: "private",
    user: CWMUser
    
}

export type PublicProfileData = {
    state: "public",
    user: CWMUser
}

export type ProfileData = 
    | PrivateProfileData 
    | PublicProfileData



export default function UserProfile() {
    const { userId } = useLocalSearchParams<{userId: string}>();
    const { accessToken } = useToken();
    
    const [profileData, setProfileData] = useState<ProfileData>({} as ProfileData)
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const getProfile = async () => {
            const response = await getUserProfile(accessToken, userId)
            if(response.status === 200) {
                setProfileData(response.data);
                setIsLoaded(true)
            } else {
                
            }
        }
        getProfile();
    }, [])

    return (
        isLoaded && <ProfilePage profileData={profileData} />
    )

}

