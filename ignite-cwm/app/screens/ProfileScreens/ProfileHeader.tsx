import React, { View, Image, ImageStyle, ViewStyle, Pressable, } from "react-native"
import { Text, Button, Icon, } from "app/components"
import { User } from "react-native-auth0"
import { colors, spacing } from "app/theme"
import { LoadingScreen } from "../LoadingScreen"
import { useState } from "react"
import { PhotoUploadModal } from "app/components/PhotoUploadModal"
import { ImagePickerResult } from "expo-image-picker"

export interface ProfileHeaderProps {
    user: User | null
    editable: boolean
    setEditable: (editable: boolean) => void
}

export function ProfileHeader(props: ProfileHeaderProps) {
    const { user, editable, setEditable} = props;
    const [profilePicModalVisible, setProfilePicModalVisible] = useState(false);   

    const [profImg, setProfImg] = useState<ImagePickerResult>()

    const [backgroundImage, setBackgroundImage] = useState<ImagePickerResult>()
    const [backgroundImgModalVis, setBackgroundImgModalVis] = useState(false);

    const setProfileImage = async (image: ImagePickerResult) => {
        if(image.canceled) {
            return false
        }
        setProfImg(image)
        return true
    }

    const _setBackgroundImage = async (image: ImagePickerResult) => {
        if(image.canceled) {
            return false;
        }
        setBackgroundImage(image);
        return true;
    }
    
    return (
        <View>
            <View style={$profileImgContainer}>
                {user || profImg ? ( 
                    <Image 
                        src={profImg?.assets ? profImg.assets[0].uri : user?.picture}
                        resizeMode="cover"
                        style={$profileImage}
                        />
                ) : (
                    <LoadingScreen />
                )}
                <Pressable 
                    style={$editProfileImageButton}
                    onPress={() => {
                        setEditable(true);
                        setProfilePicModalVisible(true);
                    }}>
                    <Icon 
                        icon={"camera"}
                        color={colors.background}
                    />
                </Pressable>
                <PhotoUploadModal
                    visible={profilePicModalVisible}
                    setImage={setProfileImage}
                    setVisible={setProfilePicModalVisible}
                />
            </View>
            <View style={$backgroundImgContainer}>
                {backgroundImage && <Image 
                    src={backgroundImage.assets ? backgroundImage.assets[0].uri : undefined}
                    style={$backgroundImageStyle}
                />}
                <Pressable 
                    style={$editBackgroundImageButton}
                    onPress={() => {
                        setEditable(true);
                        setBackgroundImgModalVis(true);
                    }}>
                    <Icon 
                        icon={"camera"}
                        color={colors.background}
                    />
                </Pressable>
                <PhotoUploadModal 
                    visible={backgroundImgModalVis}
                    setImage={_setBackgroundImage}
                    setVisible={setBackgroundImgModalVis}
                />
            </View>        
            <Text 
                text={user ? user.name : undefined}
                preset="heading"
            />
            <View style={$buttonContainer}>
                <Button 
                    text={editable ? "Save Changes" : "Edit Profile"}
                    onPress={() => {
                        setEditable(!editable)
                    }}
                    style={$editProfileButtonStyle}
                    LeftAccessory={() => <Icon 
                        icon={editable ? "floppy-disk" : "pencil"}
                        containerStyle={$iconContainer}
                        style={$iconStyle}
                        color={colors.palette.neutral200}
                        size={20}
                        />}
                        
                />
                <Button 
                    text="Settings"
                    style={$editSettingsButtonStyle}
                    LeftAccessory={() => <Icon 
                        icon="ellipsis-vertical"
                        containerStyle={$iconContainer}
                        style={$settingsIconStyle}
                        color={colors.palette.neutral200}
                        size={20}
                        />}
                />
            </View>
        </View>
    )

}
const $buttonContainer: ViewStyle = {
    flexDirection: "row",
}
 const $editProfileButtonStyle: ViewStyle = {
    width: "50%",
    borderRadius: 10,
    alignSelf: "flex-end",
 }

  const $editSettingsButtonStyle: ViewStyle = {
    width: "50%",
    borderRadius: 10,
    alignSelf: "flex-end",
 }
 const $iconContainer: ViewStyle = {
    padding: spacing.xxs,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",

}
 const $iconStyle: ImageStyle = {
    margin: spacing.xxs,
 }
  const $settingsIconStyle: ImageStyle = {
    marginVertical: spacing.xxs,
 }

const $profileImgContainer: ViewStyle = {
    height: 162,
    width: 162,
    marginVertical: spacing.md,
    zIndex: 1000
}
const $profileImage: ImageStyle = {
    alignSelf: "flex-start",
    overflow: "hidden",
    borderRadius: 81,
    borderWidth: 3,
    borderColor: colors.border,
    height: "100%",
    width: "100%"
}

const $editProfileImageButton: ViewStyle = {
    backgroundColor: colors.tint,
    position: "absolute",
    bottom: spacing.xs,
    right: spacing.sm,
    height: 36,
    width: 36,
    borderRadius: 18,
    borderWidth: spacing.xxxs,
    borderColor: colors.background,
    alignItems: "center",
    justifyContent: "center"
}

const $backgroundImgContainer: ViewStyle = {
    position: "absolute",
    height: 162 + spacing.md,
    width: "100%",
}

const $backgroundImageStyle: ImageStyle = {
    width: "100%",
    height: "100%",
    zIndex: 3000
}

const $editBackgroundImageButton: ViewStyle = {
    backgroundColor: colors.tint,
    position: "absolute",
    bottom: spacing.xs,
    right: spacing.sm,
    height: 36,
    width: 36,
    borderRadius: 18,
    borderWidth: spacing.xxxs,
    borderColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 3500
}