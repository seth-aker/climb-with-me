import { useEffect } from "react";
import { PrivateProfileData, ProfileData, PublicProfileData } from "../../app/profile/[userId]";
import PrivateProfile from "./PrivateProfile"
import PublicProfile from "./PublicProfile";
export type ProfileProps = {
    profileData: ProfileData
}

export default function ProfilePage({profileData}: ProfileProps) {
    switch (profileData.state) {
        case "private":
            return <PrivateProfile user={profileData.user}   />
    
        default:
            return <PublicProfile user={profileData.user} />
    }
}