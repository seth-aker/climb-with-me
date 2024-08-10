import { useLocalSearchParams } from "expo-router";
import { useToken } from "../../hooks/useToken";
import { getUserProfile, updateUserProfile } from "../../service/ProfileService";
import { useEffect, useState } from "react";
import { CWMUser } from "../../assets/types/profileData";
import PrivateProfile from "../../components/ProfileComponents/PrivateProfile";
import Loading from "../../components/LoadingModal";
import { View } from "../../components/Themed";

/**
 * Endpoint: /profile/{userId}
 * Returns either a editable private profile or a public profile depending on if you are the user.
 * Both the front end and back end should be verifying the user's id vs their token id to determine what component to display  
 * 
 */
export default function UserProfile() {
    const { userId } = useLocalSearchParams<{userId: string}>();
    const { accessToken } = useToken();
    
    const [userData, setUserData] = useState<CWMUser>({} as CWMUser)
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const getProfile = async () => {
            const response = await getUserProfile(accessToken, userId)
            if(response.status === 200) {
                setUserData(response.data);
            } else {
                console.log(`Error: ${response.status}, Message: ${response.data}`)
            }
            setIsLoaded(true)
        }
        getProfile();
    }, [])

    const handleProfileUpdate = async (userProfile: CWMUser) => {
        setIsLoaded(false);
        const response = await updateUserProfile(accessToken, userId, userProfile);
        if(response.status === 200) {
            setUserData(response.data)
        } else {
            console.log(`Error: ${response.status}, Message: ${response.data}`)
        }
        setIsLoaded(true)
    }

    return (
        <View>
            <Loading isLoading={!isLoaded} />
            {isLoaded && <PrivateProfile user={userData} handleProfileUpdate={handleProfileUpdate}/>}
        </View>
    )
       

}

