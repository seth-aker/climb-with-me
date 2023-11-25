import { useState } from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

const maxDate = new Date();

export function RegisterUserInfo() {
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState(new Date());
    const [primaryPhone, setPrimaryPhone] = useState(0);
    const [gender, setGender] = useState('');


    const handleEmailChange = (input: string) => {
        setEmail(input);
    }

    const handleFirstNameChange = (input: string) => {
        setFirstName(input);
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
        </View>
        
    )
}