import { useLocalSearchParams } from "expo-router";
import { useToken } from "../../hooks/useToken";
import { getUserProfile, updateUserProfile } from "../../service/ProfileService";
import { useEffect, useState } from "react";
import { CWMUser } from "../../assets/types/profileData";
import PrivateProfile from "../../components/ProfileComponents/PrivateProfile";


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
        isLoaded && <PrivateProfile user={userData} onSaveChanges={handleProfileUpdate}/>
    )
       

}

