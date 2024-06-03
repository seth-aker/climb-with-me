import { colors, spacing } from "app/theme";
import React from "react"
import { ImageStyle, Modal, ModalProps, Pressable, View, ViewStyle } from "react-native"
import { Button } from "./Button";
import { Icon } from "./Icon";
import * as ImagePicker from "expo-image-picker"
import { Text } from "./Text";

export interface PhotoUploadModalProps extends ModalProps {
    setVisible: (isVis: boolean) => void
    setImage: (image: ImagePicker.ImagePickerResult) => Promise<boolean> 
}
export const PhotoUploadModal = (props: PhotoUploadModalProps) => {
    const { visible, setVisible, setImage } = props;
    
    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [162, 162],
            quality: 1,
            });
        if(!result.canceled) {
            const imgSet = await setImage(result);
            if(!imgSet) {
                throw new Error("An error occured setting the image, please try again")
            }
            setVisible(false);
        }
    }

    return (
        <Modal
            visible={visible}
            transparent
        >
            <View style={$modalContainerStyle}>
                <View style={$uploadPhotoCard}>
                    <Pressable style={$cardHeaderStyle}
                        onPress={() => setVisible(false)}
                    >
                        <Text 
                            text="Cancel"
                        />
                        <Icon 
                            icon={"x"}
                            onPress={() => setVisible(false)}
                            size={20}
                            style={$buttonIconStyle}
                            />
                    </Pressable>
                    <View style={$buttonContainer}>
                        <Button
                            style={$buttonStyle} 
                            text="Upload Photo"
                            onPress={pickImage}
                            RightAccessory={() => <Icon 
                                icon={"camera"}
                                color={colors.background}
                                style={$buttonIconStyle}
                                />}  
                                />
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
    height: 250,
    padding: spacing.xxs,
    backgroundColor: colors.background,
    borderRadius: spacing.md,
    justifyContent: "flex-start"
}

const $cardHeaderStyle: ViewStyle = {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    
}
const $buttonContainer : ViewStyle = {
    justifyContent: "center",
    flexGrow: 8,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: spacing.sm
}
const $buttonStyle: ViewStyle = {
    marginTop: spacing.xs,
    width: "75%",
    borderRadius: spacing.sm,
    alignSelf: "center",
}

const $buttonIconStyle: ImageStyle = {
    margin: spacing.xs
}
