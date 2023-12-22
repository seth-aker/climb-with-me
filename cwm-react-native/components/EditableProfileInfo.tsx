import { useState } from "react";
import CustomButton from "./CustomButton";
import { Text, View } from "./Themed";
import { Modal } from "react-native";
import { TextInput } from "react-native-gesture-handler";

type EditableProfileInfoProps = {
    displayText: string,
    // onPress: () => void

}
export default function EditableProfileInfo({displayText}: EditableProfileInfoProps) {
    const [showModal, setShowModal] = useState(false);
    const [modalText, setModalText] = useState(displayText);

    const onPress = () => {
        setShowModal(true)
    }


    
    return (
        <View style={{display: "flex", flexDirection: 'row', backgroundColor: "lightGrey"}}>
            <Text>{displayText}</Text>
            <CustomButton text="Edit" onPress={onPress}></CustomButton>
            
            <Modal 
                transparent={true}
                animationType="fade"
                visible={showModal}
                onRequestClose={() => setShowModal(false)}>
                <View>
                    <TextInput 
                        onChangeText={(input) => setModalText(input)} />
                </View>

            </Modal>
        </View>
    )
}