import { useState } from "react";
import CustomButton from "./CustomButton";
import { Text, View } from "./Themed";
import { Modal } from "react-native";
import { TextInput } from "react-native-gesture-handler";

type EditableProfileInfoProps = {
    infoKey: string
    infoValue: string,
    // onPress: () => void

}
export default function EditableProfileInfo({infoKey, infoValue}: EditableProfileInfoProps) {
    const [showModal, setShowModal] = useState(false);
    const [modalText, setModalText] = useState(infoValue);

    const onPress = () => {
        setShowModal(true)
    }


    
    return (
        <View style={{display: "flex", flexDirection: 'row', backgroundColor: "lightGrey"}}>
            <Text>{infoKey}:</Text>
            <Text>{infoValue}</Text>
            <CustomButton text="Edit" onPress={onPress}></CustomButton>
            
            <Modal 
                transparent={true}
                animationType="fade"
                visible={showModal}
                onRequestClose={() => setShowModal(false)}>
                <View>
                    <TextInput 
                        value={modalText}
                        onChangeText={(input) => setModalText(input)} />
                    
                    <CustomButton text="Save" />
                </View>

            </Modal>
        </View>
    )
}