import { useLocalSearchParams } from "expo-router";
import { useToken } from "../../hooks/useToken";
import { getUserProfile } from "../../service/RegisterService";
import { useEffect, useState } from "react";
import { CWMUser } from "../../assets/types/profileData";
import PrivateProfile from "../../components/ProfileComponents/PrivateProfile";
import PublicProfile from "../../components/ProfileComponents/PublicProfile";
import NotFoundScreen from "../[...missing]";

export type PrivateProfileData = {
    state: "private",
    user: CWMUser
    
}

export type PublicProfileData = {
    state: "public",
    user: CWMUser
}

export type ErrorMessage = {
    state: "error"
    message: string
}

export type ProfileData = 
    | PrivateProfileData 
    | PublicProfileData
    | ErrorMessage



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
            } 
            setIsLoaded(true)
        }
        getProfile();
    }, [])

    switch (profileData.state) {
        case "private":
            return isLoaded && <PrivateProfile user={profileData.user}   />
        case "error":
            return isLoaded && <NotFoundScreen></NotFoundScreen>
        default:
            return isLoaded && <PublicProfile user={profileData.user} />
    }
       

}

