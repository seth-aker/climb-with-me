import { Pressable, PressableProps} from 'react-native';
import { Text } from './Themed';


interface ButtonProps extends PressableProps {
    text: string
}

export default function Button({text, onPress, style, ...props}: ButtonProps) {
   
    return (
        <Pressable  
            {...props}
            style={style}
            onPress={onPress}
        >
            <Text style={{color: "#F5F5F5"}}>{text}</Text>
        </Pressable>
    )
}

