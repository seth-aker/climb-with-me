import React, { useState } from "react"
import { ImageStyle, Modal, ModalProps, Pressable, View, ViewStyle } from "react-native"
import { Text } from "./Text"
import { Icon } from "./Icon"
import { spacing, colors } from "app/theme"
import { TextField } from "./TextField"
import DateTimePicker from "@react-native-community/datetimepicker"
import { formatDate } from "app/utils/formatDate"
import { Button } from "./Button"
import { LoadingSpinner } from "app/screens"
import { delay } from "app/utils/delay"
import { useStores } from "app/models"
import uuid from "react-native-uuid"
import { PostModel } from "app/models/Post"
import { Header } from "./Header"

interface NewPostModalProps extends ModalProps {
  setVisible: (isVis: boolean) => void
}

export const NewPostModal = (props: NewPostModalProps) => {
  const { visible, setVisible, onRequestClose } = props
  const { userStore, postStore } = useStores()
  const [postTitle, setPostTitle] = useState("")
  const [body, setPostDetails] = useState("")
  const [tripDate, setTripDate] = useState(new Date())
  const [dateTimePickerVis, setDateTimePickerVis] = useState(false)
  const [loading, setLoading] = useState(false)
  const guid = uuid.v4().toString()

  const handlePostForm = async () => {
    if (!postTitle || !body || !tripDate) {
      alert("Please fill in all required fields")
      return
    }
    setLoading(true)
    // Change this to an api call
    const post = PostModel.create({
      guid,
      title: postTitle,
      body,
      tripDate,
      createdAt: Date.now(),
      postUser: userStore.name,
      postUserId: userStore._id,
      postUserImg: userStore.profileImg,
      comments: [],
    })
    await postStore.createPost(post)
    await delay(750)
    setLoading(false)
    handleCloseModal()
  }

  const handleCloseModal = () => {
    setPostTitle("")
    setPostDetails("")
    setTripDate(new Date())
    setVisible(false)
  }
  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onRequestClose}>
      <View style={$modalContainerStyle}>
        <Header
          containerStyle={$modalHeader}
          RightActionComponent={
            <Pressable style={$cardHeaderStyle} onPress={handleCloseModal}>
              <Text text="Cancel" textColor={colors.palette.neutral100} />
              <Icon
                icon={"x"}
                onPress={handleCloseModal}
                size={20}
                style={$buttonIconStyle}
                color={colors.palette.neutral100}
              />
            </Pressable>
          }
          backgroundColor={colors.palette.neutral100}
        />
        <View style={$uploadPhotoCard}>
          <View style={$formContainerStyle}>
            <TextField
              label="Post Title"
              value={postTitle}
              inputWrapperStyle={$inputWrapperStyle}
              onChangeText={(input) => setPostTitle(input)}
              status={postTitle ? undefined : "error"}
            />
            <TextField
              label="Details"
              multiline
              placeholder="Where are you going? What are you doing?"
              value={body}
              inputWrapperStyle={$inputWrapperStyle}
              onChangeText={(input) => setPostDetails(input)}
              status={body ? undefined : "error"}
            />
            <TextField
              label="When are you going?"
              inputWrapperStyle={$inputWrapperStyle}
              value={formatDate(tripDate.toISOString(), "MM/dd/yyyy")}
              onPressIn={() => setDateTimePickerVis(true)}
            />
            {dateTimePickerVis && (
              <DateTimePicker
                minimumDate={new Date()}
                mode="date"
                value={tripDate}
                onChange={(event, date) => {
                  if (event.type === "set" && date) {
                    setDateTimePickerVis(false)
                    setTripDate(date)
                  }
                }}
              />
            )}
            <Button
              text={loading ? undefined : "Find Partners!"}
              style={$postClimbBtnStyle}
              onPress={handlePostForm}
            >
              {/* For whatever reason I cannot get this to be centered in the button. Todo: Get this centered */}
              {loading && (
                <LoadingSpinner
                  stroke={colors.palette.neutral100}
                  strokeWidth={3}
                  circumference={90}
                />
              )}
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  )
}
const $modalContainerStyle: ViewStyle = {
  backgroundColor: `${colors.background}`,
  height: "100%",
  width: "100%",
  flex: 1,
  alignItems: "center",
}
const $modalHeader: ViewStyle = {
  backgroundColor: colors.palette.primary500,
  paddingTop: 0,
  marginTop: 0,
}
const $uploadPhotoCard: ViewStyle = {
  width: "90%",

  padding: spacing.xs,
  backgroundColor: colors.background,
  borderRadius: spacing.md,
  justifyContent: "flex-start",
}

const $cardHeaderStyle: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "flex-end",
}
const $buttonIconStyle: ImageStyle = {
  margin: spacing.xs,
}

const $formContainerStyle: ViewStyle = {}
const $postClimbBtnStyle: ViewStyle = {
  minHeight: 60,
  margin: spacing.md,
  alignItems: "center",
}
const $inputWrapperStyle: ViewStyle = {
  backgroundColor: colors.palette.neutral100,
}
