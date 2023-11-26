import { useState, useEffect } from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import PhoneInput from 'react-native-phone-number-input';
import validator from 'validator'


// default necessary for expo router to find route
export default function RegisterUserInfo() {
    const maxDate = new Date();
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState(new Date());
    const [dateOfBirthString, setDateOfBirthString] = useState("");
    const [showCalendar, setShowCalendar] = useState(false);
    const [primaryPhone, setPrimaryPhone] = useState('');
    const [formattedPrimaryPhone, setFormattedPrimaryPhone] = useState("")
    const [gender, setGender] = useState('');
    const [errors, setErrors] = useState(new Set<string>);

    const handleEmailChange = (input: string) => {
        input = validator.trim(input)
        setEmail(input);
        if(!validator.isEmail(email)) {
            setErrors(errors => errors.add("Not a valid email address"))
        } else {
            setErrors(errors => {
                errors.delete("Not a valid email address")
                return errors;
            })
        }
    }

    const handleFirstNameChange = (input: string) => {
        input = validator.trim(input)
        setFirstName(input);
        if(!input) {
            setErrors(errors => errors.add("First name cannot be empty"))
        } else {
            setErrors(errors => {
                errors.delete("First name cannot be empty")
                return errors;
            })
        }
    }

    const handleMiddleNameChange = (input: string) => {
        input = validator.trim(input)
        setMiddleName(input);
    }

    const handleLastNameChange = (input: string) => {
        input = validator.trim(input)
        setLastName(input);
        if(!input) {
            setErrors(errors => errors.add("Last name cannot be empty"))
        } else {
            setErrors(errors => {
                errors.delete("Last name cannot be empty")
                return errors;
            })
        }
    }

    const handleDateOfBirthChange = (event: DateTimePickerEvent, date?: Date) => {
        if(date) {
            setDateOfBirth(date);
            setDateOfBirthString(date.toDateString())
            if(new Date().getTime() - dateOfBirth.getTime() < (18 * 1000 * 3600 * 24 * 365)) {
                setErrors(errors => errors.add("Must be over 18 to use this app"))
            } else {
                setErrors(errors => {
                    errors.delete("Must be over 18 to use this app");
                    return errors;
                })
            }
        }
    };

    // const handlePhoneNumberChange = (value: string) => {
    //     setPrimaryPhone(value);
    //     patternFormatter(value, {
    //         format: 
    //     })
    // }



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
            <TextInput 
                value={dateOfBirthString}
                onFocus={() => setShowCalendar(true)}
                placeholder='Birthday:'
                />

            {showCalendar && <DateTimePicker
                mode='date' 
                maximumDate={maxDate}
                value={dateOfBirth}
                onChange={handleDateOfBirthChange}
                
            />}
            {/* <PhoneInput 
                defaultValue={primaryPhone}
                defaultCode='US'
                layout='first'
                onChangeText={handlePhoneNumberChange}

                /> */}
            {/* <PatternFormat 
                type='tel'
                format='(###)-###-####'
                mask="_"
                value={primaryPhone}
                onValueChange={handlePhoneNumberChange}
                required
            /> */}
        </View>
        
    )
}