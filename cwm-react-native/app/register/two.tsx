import { useState } from 'react';
import { Text, View } from 'react-native';
export default function RegisterUserInfoPage2() {
    const [primaryPhone, setPrimaryPhone] = useState('');
    const [formattedPrimaryPhone, setFormattedPrimaryPhone] = useState("")
    const [gender, setGender] = useState('');
    const [errors, setErrors] = useState(new Set<string>);
    
    const handlePhoneNumberChange = (value: string) => {
        setPrimaryPhone(value);
        
    }

    return (
        <View>
            <Text>Phone Input Area</Text>
        </View>
    )
}