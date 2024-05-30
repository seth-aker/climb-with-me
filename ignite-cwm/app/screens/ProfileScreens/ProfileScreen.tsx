
import { Icon, Screen,  TextField, } from "app/components";
import { HomeTabScreenProps } from "app/navigators";
import { colors, spacing } from "app/theme";
import { observer } from "mobx-react-lite";
import React, { FC, useEffect, useState } from "react";
import {TextStyle, ViewStyle } from "react-native";
import { useAuth0 } from "react-native-auth0";
import { climbingGrades as CGOptions, climbingStyles, genderOptions, weightRangeOptions, Option } from "../../../data/dropDownPickerOptions"
import { formatPhoneNumber } from "app/utils/formatPhoneNumber";
import { ProfileHeader } from "./ProfileHeader";

import { ModalPicker } from "app/components/ModalPicker/ModalPicker";
interface ProfileScreenProps extends HomeTabScreenProps<"Profile"> {
}




export const ProfileScreen: FC<ProfileScreenProps> = observer(function ProfileScreen(_props) {
    
    // in the future use backend API instead of Auth0 because user info is harder to change with Auth0
    const { user } = useAuth0();
    const [aboutMeText, setAboutMeText] = useState("");
    const [editable, setEditable] = useState(false);
    // const [climbingStyleModalVisible, setClimbingStyleModalVisible] = useState(false);

    
    const [phoneNumber, setPhoneNumber] = useState("")

    const handlePhoneNumberChange = (input: string) => {       
        setPhoneNumber(formatPhoneNumber(input, phoneNumber))
    }

    const handleAboutMeTextChange = (input: string) => {
        setAboutMeText(input)
    }

    const [gender, setGender] = useState<Option>()
    

    const [weightRange, setWeightRange] = useState<Option>();

    const [climbingStyle, setClimbingStyle] = useState("");
    // const [climbingStyleOpen, setClimbingStyleOpen] = useState(false);

    // const [maxGrade, setMaxGrade] = useState("");
    // const [maxGradeOpen, setMaxGradeOpen] = useState(false);

    const [climbingGrades, setClimbingGrades] = useState(CGOptions.sport)

    // const [indoorOnly, setIndoorOnly] = useState(true);

    // const toggleClimbingStyleModal = () => {
    //     setClimbingStyleModalVisible(!climbingStyleModalVisible);
    // }

    useEffect(() => {
        if(climbingStyle === "sport" || climbingStyle === "top rop"){
            setClimbingGrades(CGOptions.sport)
        } else if(climbingStyle === "bouldering") {
            setClimbingGrades((CGOptions.bouldering))
        } 
    }, [climbingStyle])

    return (
        <Screen preset="scroll"  safeAreaEdges={["top"]} contentContainerStyle={$screenContainer}>
            <ProfileHeader
                editable={editable}
                setEditable={setEditable}
                user={user}
            />
            <TextField 
                inputWrapperStyle={editable ? $editableContainerStyles: $disabledContainerStyles}
                editable={editable}
                placeholder="Tell everyone about yourself"
                value={aboutMeText}
                label="About Me"
                multiline={true}
                onChangeText={handleAboutMeTextChange}
            />
            <TextField 
                label="Phone Number"
                containerStyle={$containerStyle}
                inputWrapperStyle={editable ? $editableContainerStyles: $disabledContainerStyles}
                editable={editable}
                placeholder="(###) ###-####"
                value={phoneNumber}
                onChangeText={handlePhoneNumberChange}
                />
            <ModalPicker 
                value={gender}
                onChange={setGender}
                disabled={!editable}
                data={genderOptions}
                placeholder="Please select your gender"
                headerTitle="Please select your gender"
                label={"Gender"}
                inputWrapperStyle={editable ? $editableContainerStyles : $disabledContainerStyles}
                pickerTextStyle={editable ? $editableTextStyles: $disabledTextStyles}
                containerStyle={$containerStyle}
                RightAccessory={() => (
                    <Icon 
                        icon={"caret-down"}
                    />
                )}
            />
            <ModalPicker 
                value={weightRange}
                onChange={setWeightRange}
                disabled={!editable}
                data={weightRangeOptions}
                placeholder="Please select approximate weight range"
                headerTitle="Please select approximate weight range"
                label={"Approx Weight"}
                inputWrapperStyle={editable ? $editableContainerStyles : $disabledContainerStyles}
                pickerTextStyle={editable ? $editableTextStyles: $disabledTextStyles}
                containerStyle={$containerStyle}
                RightAccessory={() => (
                    <Icon 
                        icon={"caret-down"}
                    />
                )}
            />
                {/* <CustomDropDownPicker 
                    containerStyle={$multiLineContainerStyle}
                    style={editable ? $editableContainerStyles : $disabledContainerStyles}
                    disabled={!editable}
                    open={genderOpen}
                    value={gender}
                    items={genderOptions}
                    setValue={setGender}
                    setOpen={onGenderOpen}
                    textStyle={editable ? $editableTextStyles : $disabledTextStyles}
                    label="Gender"
                    visible={genderModalVisible}
                    zIndex={1000}
                    zIndexInverse={3000}
                    />
        
            <Modal
                visible={weightRangeVisible}
            >
                <CustomDropDownPicker 
                style={editable ? $editableContainerStyles : $disabledContainerStyles}
                disabled={!editable}
                open={weightRangeOpen}
                value={weightRange}
                items={weightRangeOptions}
                setValue={setWeightRange}
                setOpen={onWeightRangeOpen}
                textStyle={editable ? $editableTextStyles : $disabledTextStyles}
                label="Approximate Weight"
                zIndex={3000}
                zIndexInverse={1000}
                />

            </Modal>
            
            <Button 
                text="Add Climbing Style"
                onPress={toggleClimbingStyleModal}
                LeftAccessory={() => 
                    <Icon 
                    icon="plus"
                    />
                }
                /> */}
            {/* <Modal
                visible={climbingStyleModalVisible}
                >
                <View>
                    <CustomDropDownPicker
                        style={$editableContainerStyles}
                        value={climbingStyle}
                        open={climbingStyleOpen}
                        setOpen={setClimbingStyleOpen}
                        setValue={setClimbingStyle}
                        items={climbingStyles}
                        label="Climbing Style"
                        zIndex={1000}
                        />
                    <CustomDropDownPicker
                        style={$editableContainerStyles}
                        value={maxGrade}
                        setValue={setMaxGrade}
                        open={maxGradeOpen}
                        setOpen={setMaxGradeOpen}
                        items={climbingGrades}
                        label="Current Max Grade"
                        zIndex={2000}
                        />
                    <Toggle 
                        variant="checkbox"
                        label="Indoor Only"
                        value={indoorOnly}
                        onPress={() => setIndoorOnly(!indoorOnly)}
                        />
                </View>
                
            </Modal> */}
        </Screen>
    )
})
                        

const $screenContainer: ViewStyle = {
    padding: spacing.lg,
    flex: 1,
    justifyContent: "flex-start"
}


const $containerStyle: ViewStyle = {
    marginVertical: spacing.xs
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