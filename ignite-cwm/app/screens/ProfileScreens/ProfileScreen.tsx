import { Icon, Screen, TextField, Button, Card, ListView, Text, Header } from "app/components"
import { colors, spacing } from "app/theme"
import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useState } from "react"
import { ImageStyle, ScrollView, TextStyle, View, ViewStyle } from "react-native"
import { genderOptions } from "../../../data/ModalPickerOptions"
import { formatPhoneNumber } from "app/utils/formatPhoneNumber"
import { ProfileHeader } from "./ProfileHeader"
import { ModalPicker } from "app/components/ModalPicker/ModalPicker"
import { ClimbingStyleModal } from "./ClimbingStyleModal"
import { useStores } from "app/models"
import { IClimbingStyle } from "app/models/ClimbingStyleModel"
import { HomeTabScreenProps } from "app/navigators/types"
import { Logo } from "app/components/Logo"
import { useAuth0 } from "react-native-auth0"

interface ProfileScreenProps extends HomeTabScreenProps<"Profile"> {}

export const ProfileScreen: FC<ProfileScreenProps> = observer(function ProfileScreen(_props) {
  const { navigation } = _props
  const { clearSession } = useAuth0()
  const {
    userStore: user,
    authenticationStore: { logout },
  } = useStores()
  const [editable, setEditable] = useState(false)
  const [climbingStyleModalVisible, setClimbingStyleModalVisible] = useState(false)

  const handleLogout = async () => {
    try {
      logout()
      clearSession()
      navigation.navigate("Login")
    } catch (e) {
      console.log("Log out cancelled")
    }
  }

  const handlePhoneNumberChange = (input: string) => {
    user.setProp("phoneNumber", formatPhoneNumber(input, user.phoneNumber ? user.phoneNumber : ""))
  }

  const handleAboutMeTextChange = (input: string) => {
    user.setProp("aboutMeText", input)
  }

  const handleGenderChange = (input: string) => {
    user.setProp("gender", input)
  }
  const handleAddClimbingStyleOnPress = () => {
    setClimbingStyleModalVisible(true)
    setClimbingStyle(undefined)
    setMaxGradeIndoor(undefined)
    setMaxGradeOutdoor(undefined)
    setYearsExp(undefined)
  }

  const submitNewClimbingStyle = () => {
    if (climbingStyle && yearsExp) {
      const newUserStyle: IClimbingStyle = {
        style: climbingStyle,
        maxGradeIndoor,
        maxGradeOutdoor,
        yearsExp,
      }
      user.addClimbingStyle(newUserStyle)
      setClimbingStyleModalVisible(false)
    }
  }

  const [climbingStyle, setClimbingStyle] = useState<string>()

  const [maxGradeIndoor, setMaxGradeIndoor] = useState<string>()
  const [maxGradeOutdoor, setMaxGradeOutdoor] = useState<string>()

  const [yearsExp, setYearsExp] = useState<string>()
  const [userStylesEmpty, setUserStylesEmpty] = useState(true)

  useEffect(() => {
    if (user.climbingStyles.length < 1) {
      setUserStylesEmpty(true)
    } else {
      setUserStylesEmpty(false)
    }
  }, [user.climbingStyles])

  return (
    <Screen preset="fixed" contentContainerStyle={$screenContainer}>
      <Header
        LeftActionComponent={<Logo width={30} height={30} fill={colors.palette.neutral100} />}
        RightActionComponent={
          <Text
            text="Logout"
            preset="bold"
            textColor={colors.palette.neutral100}
            onPress={handleLogout}
          />
        }
        leftIconColor={colors.palette.neutral100}
        onRightPress={handleLogout}
        containerStyle={$headerStyle}
        backgroundColor={colors.palette.primary500}
      />
      <ScrollView style={$scrollViewContainer}>
        <ProfileHeader editable={editable} setEditable={setEditable} />
        <View style={$formContainerStyle}>
          <TextField
            inputWrapperStyle={editable ? $editableContainerStyles : $disabledContainerStyles}
            editable={editable}
            placeholder="Tell everyone about yourself"
            value={user.aboutMeText}
            label="About Me"
            multiline={true}
            onChangeText={handleAboutMeTextChange}
          />
          <TextField
            label="Phone Number"
            containerStyle={$containerStyle}
            inputWrapperStyle={editable ? $editableContainerStyles : $disabledContainerStyles}
            editable={editable}
            placeholder="(###) ###-####"
            value={user.phoneNumber}
            onChangeText={handlePhoneNumberChange}
          />
          <ModalPicker
            value={user.gender}
            onChange={handleGenderChange}
            disabled={!editable}
            data={genderOptions}
            placeholder="Please select your gender"
            headerTitle="Please select your gender"
            label={"Gender"}
            inputWrapperStyle={editable ? $editableContainerStyles : $disabledContainerStyles}
            pickerTextStyle={editable ? $editableTextStyles : $disabledTextStyles}
            containerStyle={$containerStyle}
            RightAccessory={() => <Icon icon={"caret-down"} />}
          />

          <View style={$flashListContainerStyle}>
            <Text preset="formLabel" text="Climbing Styles" />
            {userStylesEmpty && (
              <Card
                style={
                  editable ? $cardContainerStyle : [$cardContainerStyle, $disabledContainerStyles]
                }
                ContentComponent={
                  <Button
                    text="Add a Climbing Style"
                    disabled={!editable}
                    onPress={() => handleAddClimbingStyleOnPress()}
                    style={editable ? $addClimbingStyleButton : $disabledClimbingStyleButton}
                    textStyle={$addClimbingStyleButtonText}
                    LeftAccessory={() => (
                      <Icon
                        icon="plus"
                        color={colors.palette.neutral500}
                        style={$iconStyle}
                        containerStyle={$iconContainer}
                      />
                    )}
                  />
                }
              />
            )}
            {!userStylesEmpty && (
              <ListView
                data={user.climbingStyles.map((item) => item)}
                estimatedItemSize={50}
                renderItem={({ item }) => {
                  const contentIndoor = item.maxGradeIndoor
                    ? `Max Indoor Grade: ${item.maxGradeIndoor}`
                    : ""
                  const contentOutdoor = item.maxGradeOutdoor
                    ? `Max Outdoor Grade: ${item.maxGradeOutdoor}`
                    : ""
                  const spacer = item.maxGradeIndoor && item.maxGradeOutdoor ? "\n" : ""
                  return (
                    <Card
                      preset="default"
                      heading={item.style}
                      content={contentIndoor + spacer + contentOutdoor}
                      footer={`Experience: ${item.yearsExp}`}
                      style={$cardContainerStyle}
                    />
                  )
                }}
              />
            )}
          </View>

          {!userStylesEmpty && (
            <Button
              text="Add Climbing Style"
              disabled={!editable}
              onPress={() => handleAddClimbingStyleOnPress()}
              LeftAccessory={() => (
                <Icon
                  icon="plus"
                  color={colors.background}
                  style={$iconStyle}
                  containerStyle={$iconContainer}
                />
              )}
            />
          )}

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
        </View>
      </ScrollView>
    </Screen>
  )
})

const $screenContainer: ViewStyle = {
  height: "100%",
  backgroundColor: colors.background,
}
const $headerStyle: ViewStyle = {
  marginBottom: 0,
  paddingHorizontal: spacing.sm,
}
const $scrollViewContainer: ViewStyle = {}

const $formContainerStyle: ViewStyle = {
  paddingHorizontal: spacing.md,
}

const $containerStyle: ViewStyle = {
  marginVertical: spacing.xs,
}
const $cardContainerStyle: ViewStyle = {
  marginVertical: spacing.xs,
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
  shadowColor: "none",
  shadowOffset: { width: 0, height: 0 },
  elevation: 0,
}

const $editableTextStyles: TextStyle = {
  color: colors.text,
}

const $disabledTextStyles: TextStyle = {
  color: colors.textDim,
}

const $editableContainerStyles: ViewStyle = {
  backgroundColor: colors.palette.neutral100,
  borderColor: colors.palette.neutral400,
}

const $disabledContainerStyles: ViewStyle = {
  borderColor: colors.palette.neutral400,
  backgroundColor: colors.palette.neutral200,
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
  minHeight: 3,
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
  color: colors.palette.neutral500,
}
