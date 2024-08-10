import { Pressable, PressableProps } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
interface CheckBoxProps extends PressableProps {
    isChecked: boolean
}

export default function CheckBox({onPress, isChecked, ...props}: CheckBoxProps) {
    
    return (
        <Pressable {...props} onPress={onPress}>
            {isChecked && <MaterialCommunityIcons name="checkbox-marked" size={24} color={"#567944"}/>}
            {!isChecked && <MaterialCommunityIcons name="checkbox-blank-outline" size={24} color={"#567944"}/>}
        </Pressable>
    )
}