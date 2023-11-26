import { useState, useEffect } from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { NumberFormatValues, PatternFormat } from "react-number-format"
import validator from 'validator'
const maxDate = new Date();
export function RegisterUserInfo() {
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState(new Date());
    const [primaryPhone, setPrimaryPhone] = useState('');
    const [gender, setGender] = useState('');
    const [errors, setErrors] = useState<string[]>([]);

    const handleEmailChange = (input: string) => {
        setEmail(input);
        if(!validator.isEmail(email) && !errors.includes("Please enter a valid email address")) {
            setErrors(["Please enter a valid email address", ...errors])
        }
    }

    const handleFirstNameChange = (input: string) => {
        setFirstName(input);
        if(!input && !errors.includes("First name cannot be empty")) {
            setErrors(["First name cannot be empty", ...errors])
        }
    }

    const handleMiddleNameChange = (input: string) => {
        setMiddleName(input);
    }

    const handleLastNameChange = (input: string) => {
        setLastName(input);
    }

    // Function to handle date change
    // TODO: Check for age >= 18 years old before submitting.
    const handleDateOfBirthChange = (event: DateTimePickerEvent, date?: Date) => {
        if(date) {
            setDateOfBirth(date);
        }
    };

    const handlePhoneNumberChange = (value: NumberFormatValues) => {
        setPrimaryPhone(value.formattedValue)
    }



    return (
        <View>
            <TextInput 
                value={email} 
                placeholder='something@email.com'
                onChangeText={handleEmailChange}  
            />
            <TextInput 
                value={firstName}
                placeholder='First Name'
                onChangeText={handleFirstNameChange}
            />
            <TextInput 
                value={middleName}
                placeholder='Middle Name'
                onChangeText={handleMiddleNameChange}
            />
            <TextInput 
                value={lastName}
                placeholder='Last Name'
                onChangeText={handleLastNameChange}
            />
            <DateTimePicker
                mode='date' 
                maximumDate={maxDate}
                value={dateOfBirth}
                onChange={handleDateOfBirthChange}
            />
            <PatternFormat 
                type='tel'
                format='+1 (###)-###-####'
                mask="_"
                value={primaryPhone}
                onValueChange={handlePhoneNumberChange}
                required
            />
        </View>
        
    )
}