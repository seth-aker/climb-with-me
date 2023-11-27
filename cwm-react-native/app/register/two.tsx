import { useState } from 'react';
import { Text, View } from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
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
            <PhoneInput />
        </View>
    )
}