
import { Icon, Screen,  TextField, Button, Card, ListView, Text} from "app/components";
import { HomeTabScreenProps } from "app/navigators";
import { colors, spacing } from "app/theme";
import { observer } from "mobx-react-lite";
import React, { FC, useEffect, useState } from "react";
import { ImageStyle, ScrollView, TextStyle, View, ViewStyle } from "react-native";
import { useAuth0 } from "react-native-auth0";
import { genderOptions, weightRangeOptions, Option } from "../../../data/ModalPickerOptions"
import { formatPhoneNumber } from "app/utils/formatPhoneNumber";
import { ProfileHeader } from "./ProfileHeader";
import { ModalPicker } from "app/components/ModalPicker/ModalPicker";
import { ClimbingStyle as UserStyle} from "../../../data/data"
import { ClimbingStyleModal } from "./ClimbingStyleModal";

interface ProfileScreenProps extends HomeTabScreenProps<"Profile"> {
}

export const ProfileScreen: FC<ProfileScreenProps> = observer(function ProfileScreen(_props) {
    
    // in the future use backend API instead of Auth0 because user info is harder to change with Auth0
    const { user } = useAuth0();
    const [aboutMeText, setAboutMeText] = useState("");
    const [editable, setEditable] = useState(false);
    const [climbingStyleModalVisible, setClimbingStyleModalVisible] = useState(false);
    const [userStyles, setUserStyles] = useState<UserStyle[]>([])
    
    const [phoneNumber, setPhoneNumber] = useState("")

    const handlePhoneNumberChange = (input: string) => {       
        setPhoneNumber(formatPhoneNumber(input, phoneNumber))
    }

    const handleAboutMeTextChange = (input: string) => {
        setAboutMeText(input)
    }

    const handleAddClimbingStyleOnPress = () => {
        setClimbingStyleModalVisible(true)
        setClimbingStyle(undefined)
        setMaxGradeIndoor(undefined)
        setMaxGradeOutdoor(undefined)
        setYearsExp(undefined)
    }

    const submitNewClimbingStyle = () => {
        if(climbingStyle && yearsExp) {
            const newUserStyle: UserStyle = {
                style: climbingStyle,
                maxGradeIndoor,
                maxGradeOutdoor,
                yearsExp
            }
            setUserStyles([...userStyles, newUserStyle])
            setClimbingStyleModalVisible(false)
        }
    }
    
    const [gender, setGender] = useState<Option>()

    const [weightRange, setWeightRange] = useState<Option>();

    const [climbingStyle, setClimbingStyle] = useState<Option>();

    const [maxGradeIndoor, setMaxGradeIndoor] = useState<Option>();
    const [maxGradeOutdoor, setMaxGradeOutdoor] = useState<Option>();

    const [yearsExp, setYearsExp] = useState<Option>()
    const [userStylesEmpty, setUserStylesEmpty] = useState(true);

    

    useEffect(() => {
        if(userStyles.length < 1) {
            setUserStylesEmpty(true)
        } else {
            setUserStylesEmpty(false)
        }
    }, [userStyles])
    
    return (
        <Screen preset="fixed"  safeAreaEdges={["top",]} contentContainerStyle={$screenContainer}>
            <ScrollView style={$scrollViewContainer}>

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
          
            <View 
                style={$flashListContainerStyle}
            >
                <Text 
                    preset="formLabel"
                    text="Climbing Styles"
                />
                {userStylesEmpty && <Card 
                   style={editable ? $cardContainerStyle : [$cardContainerStyle, $disabledContainerStyles]}
                   ContentComponent={<Button 
                                        text="Add a Climbing Style"
                                        disabled={!editable}
                                        onPress={() => handleAddClimbingStyleOnPress()}
                                        style={editable ? $addClimbingStyleButton : $disabledClimbingStyleButton}
                                        textStyle={$addClimbingStyleButtonText}
                                        LeftAccessory={() => 
                                            <Icon 
                                            icon="plus"
                                            color={colors.palette.neutral500}
                                            style={$iconStyle}
                                            containerStyle={$iconContainer}
                                            />
                                        }
                                        />}
                />}
                {!userStylesEmpty && <ListView 
                    data={userStyles}
                    estimatedItemSize={50}
                    renderItem={({ item }) => {
                        const contentIndoor = (item.maxGradeIndoor ? `Max Indoor Grade: ${item.maxGradeIndoor.label}` : "")
                        const contentOutdoor = (item.maxGradeOutdoor ? `Max Outdoor Grade: ${item.maxGradeOutdoor.label}` : "")
                        const spacer = (item.maxGradeIndoor && item.maxGradeOutdoor) ? "\n" : ""
                        return (
                             <Card 
                                preset="default"
                                heading={item.style.label}
                                content={(contentIndoor + spacer + contentOutdoor)}
                                footer={`Experience: ${item.yearsExp?.label}`}
                                style={$cardContainerStyle}
                            />
                        )
                    }}
                    
                    />}
            </View>

            {!userStylesEmpty && <Button 
                text="Add Climbing Style"
                disabled={!editable}
                onPress={() => handleAddClimbingStyleOnPress()}
                LeftAccessory={() => 
                    <Icon 
                    icon="plus"
                    color={colors.background}
                    style={$iconStyle}
                    containerStyle={$iconContainer}
                    />
                }
                />}
            
            <ClimbingStyleModal 
                visible={climbingStyleModalVisible}
                setVisible={setClimbingStyleModalVisible}
                climbingStyle={climbingStyle}
                setClimbingStyle={setClimbingStyle}
                maxGradeIndoor={maxGradeIndoor}
                setMaxGradeIndoor={setMaxGradeIndoor}
                maxGradeOutdoor={maxGradeOutdoor}
                setMaxGradeOutdoor={setMaxGradeOutdoor}
                yearsExp={yearsExp}
                setYearsExp={setYearsExp}
                submitNewClimbingStyle={submitNewClimbingStyle}
            />
            </ScrollView>
        </Screen>
    )
})
                        

const $screenContainer: ViewStyle = {
    flex: 1,
    justifyContent: "flex-start",
    
}
const $scrollViewContainer: ViewStyle = {
    paddingHorizontal: spacing.md
}

const $containerStyle: ViewStyle = {
    marginVertical: spacing.xs
}
const $cardContainerStyle: ViewStyle = {
    marginVertical: spacing.xs,
    flex: 1,
    alignItems: "center",
    justifyContent: 'center',
    shadowColor: "none",
    shadowOffset: {width: 0, height: 0},
    elevation: 0
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

 const $iconContainer: ViewStyle = {
    padding: spacing.xxs,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",

}
 const $iconStyle: ImageStyle = {
    margin: spacing.xxs,
 }

 const $flashListContainerStyle: ViewStyle = {
    minHeight: 3
 }

 const $addClimbingStyleButton: ViewStyle = {
    backgroundColor: colors.palette.neutral100,
    borderStyle: "dashed",
    borderRadius: spacing.sm,
    borderColor: colors.palette.neutral500,
    width: "50%",
    alignSelf: "center",
 }

 const $disabledClimbingStyleButton: ViewStyle = {
    backgroundColor: colors.background,
    borderStyle: "dashed",
    borderRadius: spacing.sm,
    borderColor: colors.palette.neutral500,
    width: "50%",
    alignSelf: "center",
 }
 const $addClimbingStyleButtonText: TextStyle = {
    color: colors.palette.neutral500
 }