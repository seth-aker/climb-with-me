import React, { View, Image, ImageStyle, ViewStyle } from "react-native"
import { Text, Button, Icon } from "app/components"
import { User } from "react-native-auth0"
import { colors, spacing } from "app/theme"
export interface ProfileHeaderProps {
    user: User | null
    editable: boolean
    setEditable: (editable: boolean) => void
}

export function ProfileHeader(props: ProfileHeaderProps) {
    const { user, editable, setEditable} = props;

    return (
        <View>
            <Image 
                src={user ? user.picture : undefined}
                resizeMode="contain"
                style={$profileImage}
            />
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

const $profileImage: ImageStyle = {
    alignSelf: "flex-start",
    margin: spacing.md,
    height: 162,
    width: 162,
    overflow: "hidden",
    borderRadius: 81,
    borderWidth: 3,
    borderColor: colors.border
}