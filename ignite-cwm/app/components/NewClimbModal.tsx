import React, { useState } from "react";
import { ImageStyle, Modal, ModalProps, Pressable, View, ViewStyle } from "react-native";
import { Text } from "./Text";
import { Icon } from "./Icon";
import { spacing, colors } from "app/theme";
import { TextField } from "./TextField";
import DateTimePicker from "@react-native-community/datetimepicker"
import { formatDate } from "app/utils/formatDate";
import { Button } from "./Button";
import { LoadingSpinner } from "app/screens";
import { delay } from "app/utils/delay";
import { useStores } from "app/models";
import uuid from "react-native-uuid"
import { PostModel } from "app/models/Post";
interface NewClimbModalProps extends ModalProps {
    setVisible: (isVis: boolean) => void
}

export const NewClimbModal = (props: NewClimbModalProps) => {
    const { visible, setVisible } = props;
    const {userStore, postStore} = useStores();
    const [postTitle, setPostTitle] = useState("");
    const [body, setPostDetails] = useState("");
    const [tripDate, setTripDate] = useState(new Date());
    const [dateTimePickerVis, setDateTimePickerVis] = useState(false);
    const [loading, setLoading] = useState(false);
    const guid = uuid.v4().toString();
    const handlePostForm = async () => {
        setLoading(true);
        // Change this to an api call
        const post = PostModel.create( {
            guid,
            title: postTitle,
            body,
            tripDate,
            postDate: Date.now(),
            postUser: userStore.name,
            postUserId: userStore.authId,
            postUserImg: userStore.profileImg,
            postComments: []
        })
        await postStore.createPost(post)
        postStore.posts.forEach(post => {
            console.log(post.title)
        })
        await delay(750);
        setLoading(false);
        handleCloseModal();
    }
    
    const handleCloseModal = () => {
        setPostTitle("");
        setPostDetails("");
        setTripDate(new Date());
        setVisible(false);
    }
    return (
       <Modal 
        visible={visible}     
        animationType="none" 
        transparent>
            <View style={$modalContainerStyle}>
                <View style={$uploadPhotoCard}>
                    <Pressable style={$cardHeaderStyle}
                        onPress={handleCloseModal}
                    >
                        <Text 
                            text="Cancel"
                        />
                        <Icon 
                            icon={"x"}
                            onPress={handleCloseModal}
                            size={20}
                            style={$buttonIconStyle}
                            />
                    </Pressable>
                    <View style={$formContainerStyle}>
                        <TextField 
                            label="Post Title"
                            value={postTitle}
                            onChangeText={(input) => setPostTitle(input)}
                            status={postTitle ? undefined : "error" }
                        />
                        <TextField 
                            label="Details"
                            multiline
                            placeholder="Where are you going? What are you doing?"
                            value={body}
                            onChangeText={(input) => setPostDetails(input)}
                            status={body ? undefined : "error"}
                        />
                        <TextField      
                            label="Date"
                            value={formatDate(tripDate.toISOString(), "MM/dd/yyyy")}
                            onPressIn={() => setDateTimePickerVis(true)}
                            
                        />
                        {dateTimePickerVis && <DateTimePicker
                            minimumDate={new Date()}
                            mode="date"
                            value={tripDate}
                            onChange={(event, date) => {
                                if(event.type === "set" && date) {
                                    setDateTimePickerVis(false);
                                    setTripDate(date);
                                }
                            }}
                        />}
                        <Button 
                            text={loading ? undefined :"Find Partners!"}
                            style={$postClimbBtnStyle}
                            onPress={handlePostForm}
                        >
                        {/* For whatever reason I cannot get this to be centered in the button. Todo: Get this centered */}
                            {loading && <LoadingSpinner
                                stroke={colors.palette.neutral100}
                                strokeWidth={3}
                                circumference={90}
                            />}
                        </Button>
                    </View>
                </View>
            </View>
       </Modal>
    )
}
const $modalContainerStyle: ViewStyle = {
    backgroundColor: `${colors.palette.neutral800}bf`,
    height: "100%",
    width: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
    
}
const $uploadPhotoCard: ViewStyle = {
    width: "90%",
    // height: 250,
    padding: spacing.xs,
    backgroundColor: colors.background,
    borderRadius: spacing.md,
    justifyContent: "flex-start"
}

const $cardHeaderStyle: ViewStyle = {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    
}
const $buttonIconStyle: ImageStyle = {
    margin: spacing.xs
}

const $formContainerStyle: ViewStyle = {

} 
const $postClimbBtnStyle: ViewStyle = {
    minHeight: 60,
    margin: spacing.md,
    alignItems: "center",
}


