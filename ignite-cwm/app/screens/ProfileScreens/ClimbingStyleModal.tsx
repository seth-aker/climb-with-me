
import { Button, Header, Icon } from "app/components"
import { ModalPicker } from "app/components/ModalPicker/ModalPicker"
import { colors, spacing } from "app/theme"
import { Option, climbingGrades as CGOptions, yearsExpOptions, climbingStyles } from "../../../data/ModalPickerOptions"
import React, { useEffect, useState } from "react"
import { Modal, ModalProps, TextStyle, View, ViewStyle } from "react-native"

export interface ClimbingStyleModalProps extends ModalProps {
    setVisible: (input: boolean) => void,
    climbingStyle?: Option
    setClimbingStyle: (input: Option | undefined) => void
    maxGradeIndoor?: Option
    setMaxGradeIndoor: (input: Option | undefined) => void
    maxGradeOutdoor?: Option
    setMaxGradeOutdoor: (input: Option | undefined) => void
    yearsExp?: Option
    setYearsExp: (input: Option | undefined) => void
    submitNewClimbingStyle: () => void
}

// I know this is a garbage component and needs to be cleaned up but I am lazy and the profile screen needed to look cleaner
export const ClimbingStyleModal = (props: ClimbingStyleModalProps) => {
    const { 
        visible, 
        setVisible,
        climbingStyle,
        setClimbingStyle,
        maxGradeIndoor,
        setMaxGradeIndoor,
        maxGradeOutdoor,
        setMaxGradeOutdoor,
        yearsExp,
        setYearsExp,
        submitNewClimbingStyle
    } = props;

    const [climbingGrades, setClimbingGrades] = useState(CGOptions.sport);


    useEffect(() => {
            if(climbingStyle?.value === "sport" || climbingStyle?.value === "top rope"){
                setClimbingGrades(CGOptions.sport);
                
            } else if(climbingStyle?.value === "bouldering") {
                setClimbingGrades((CGOptions.bouldering))
            } 
            setMaxGradeIndoor(undefined);
            setMaxGradeOutdoor(undefined);
            setYearsExp(undefined);
        }, [climbingStyle])
        
    return (
        <Modal visible={visible} animationType="slide">
            <Header 
                title="Add a climbing style" 
                rightIcon={"x"}
                rightIconColor={colors.text}
                onRightPress={() => setVisible(false)}
                />
            <View style={$modalContainerStyle}>
                <ModalPicker 
                    value={climbingStyle}
                    onChange={setClimbingStyle}
                    data={climbingStyles}
                    placeholder="Select a climbing style"
                    headerTitle="Select a climbing style"
                    label="Climbing Style"
                    inputWrapperStyle={$editableContainerStyles}
                    pickerTextStyle={$editableTextStyles}
                    containerStyle={$modalPickerContainerStyle}
                    RightAccessory={() => (
                        <Icon 
                        icon={"caret-down"}
                        />
                    )}
                    />
                <ModalPicker 
                    value={maxGradeIndoor}
                    onChange={setMaxGradeIndoor}
                    data={climbingGrades}
                    placeholder="Select the hardest grade climbed recently"
                    headerTitle="Recent hardest grade indoors"
                    label="Indoors Max Grade"
                    inputWrapperStyle={$editableContainerStyles}
                    pickerTextStyle={$editableTextStyles}
                    containerStyle={$modalPickerContainerStyle}
                    RightAccessory={() => (
                        <Icon 
                        icon={"caret-down"}
                        />
                    )}
                    />
                <ModalPicker 
                    value={maxGradeOutdoor}
                    onChange={setMaxGradeOutdoor}
                    data={climbingGrades}
                    placeholder="Select the hardest grade climbed recently"
                    headerTitle="Recent hardest grade outdoors"
                    label="Outdoor Max Grade"
                    inputWrapperStyle={$editableContainerStyles}
                    pickerTextStyle={$editableTextStyles}
                    containerStyle={$modalPickerContainerStyle}
                    RightAccessory={() => (
                        <Icon 
                        icon={"caret-down"}
                        />
                    )}
                    />
                <ModalPicker
                    value={yearsExp}
                    onChange={setYearsExp}
                    data={yearsExpOptions}
                    placeholder="How long have you been climbing?"
                    headerTitle="Years Experience"
                    label="Years Experience"
                    inputWrapperStyle={$editableContainerStyles}
                    pickerTextStyle={$editableTextStyles}
                    containerStyle={$modalPickerContainerStyle}
                    RightAccessory={() => (
                        <Icon 
                        icon={"caret-down"}
                        />
                    )}
                    />
                <Button 
                    text="Add Style"
                    onPress={() => submitNewClimbingStyle()}
                    style={$buttonStyle}
                    LeftAccessory={() => <Icon 
                                            icon={"plus"}
                                            color={colors.background}
                                        />} 
                    />
            </View>
        </Modal>
    )
}

const $modalContainerStyle: ViewStyle = {
    paddingHorizontal: spacing.md
}

const $editableTextStyles: TextStyle = {
    color: colors.text
}

const $editableContainerStyles: ViewStyle = {
    backgroundColor: colors.palette.neutral100,
    borderColor: colors.palette.neutral400,
}
 const $modalPickerContainerStyle: ViewStyle = {
    marginVertical: spacing.xs,
 }

 const $buttonStyle: ViewStyle = {
    alignSelf: "center",
    marginTop: spacing.xs,
    width: "75%",
    borderRadius: spacing.sm
 }