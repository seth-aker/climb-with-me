import { Modal } from "react-native";
import { Text, View } from "./Themed";
type LoadingProps = {
    isLoading: boolean
}
export default function Loading({isLoading}: LoadingProps) {
    
    return (
        <Modal
            transparent={true}
            animationType="fade"
            visible={isLoading}
            onRequestClose={() => null}>
                <View style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>Loading...</Text>
                </View>
                
        </Modal>
    )
}