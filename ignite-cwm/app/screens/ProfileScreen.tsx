
import { Button, Icon, Screen, Text, TextField } from "app/components";
import DropDownPicker from "react-native-dropdown-picker";
import { HomeTabScreenProps } from "app/navigators";
import { colors, spacing } from "app/theme";
import { observer } from "mobx-react-lite";
import React, { FC, createRef, useState } from "react";
import {Image, ImageStyle, TextInput, TextStyle, View, ViewStyle } from "react-native";
import { useAuth0 } from "react-native-auth0";
import { genderOptions } from "../../data/dropDownPickerOptions"
interface ProfileScreenProps extends HomeTabScreenProps<"Profile"> {

}

export const ProfileScreen: FC<ProfileScreenProps> = observer(function ProfileScreen(_props) {
    // in the future use backend API instead of Auth0 because user info is harder to change with Auth0
    const { user } = useAuth0();
    const [aboutMeText, setAboutMeText] = useState("");
    const [editable, setEditable] = useState(false);
    const [aboutMeTextHeight, setAboutMeTextHeight] = useState(175)
    const aboutMeRef = createRef<TextInput>();
    const handleAboutMeTextChange = (input: string) => {
        setAboutMeText(input)
    }

    const [isGenderPickerOpen, setIsGenderPickerOpen] = useState(false);
    const [gender, setGender] = useState("")
    
    // const handleItemSelected = () => {
    //     setIsGenderPickerOpen(false);
    // }
    // const toggleGenderPicker = () => {
    //     setIsGenderPickerOpen(!isGenderPickerOpen)
    // }
    return (
        <Screen preset="fixed" safeAreaEdges={["top"]} contentContainerStyle={$screenContainer}>
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
            <TextField 
                ref={aboutMeRef}
                containerStyle={[$multiLineContainerStyle, {height: aboutMeTextHeight}]}
                editable={editable}
                placeholder="Tell everyone about yourself"
                value={aboutMeText}
                label="About Me"
                multiline={true}
                onChangeText={handleAboutMeTextChange}
                onContentSizeChange={(event) => {
                    if(event.nativeEvent.contentSize.height > aboutMeTextHeight) {
                        setAboutMeTextHeight(event.nativeEvent.contentSize.height)
                    }
                }}
            />
            {/* TODO: Style this */}
            <DropDownPicker 
                style={editable ? $editableContainerStyles : $disabledContainerStyles}
                disabled={!editable}
                open={isGenderPickerOpen}
                value={gender}
                items={genderOptions}
                setValue={setGender}
                setOpen={setIsGenderPickerOpen}
                textStyle={editable ? $editableTextStyles : $disabledTextStyles}
            />
        </Screen>
    )
})

const $screenContainer: ViewStyle = {
    padding: spacing.lg,
    flex: 1,
    justifyContent: "flex-start"
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
const $multiLineContainerStyle: ViewStyle = {
    marginVertical: spacing.sm
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

const $editableTextStyles: TextStyle = {
    color: colors.text
}

const $disabledTextStyles: TextStyle = {
    color: colors.textDim
}

const $editableContainerStyles: ViewStyle = {
    backgroundColor: colors.palette.neutral100,
    borderColor: colors.palette.neutral400,
}

const $disabledContainerStyles: ViewStyle = {
    borderColor: colors.palette.neutral400,
    backgroundColor: colors.palette.neutral200
}