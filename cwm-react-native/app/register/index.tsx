import { useState, useEffect } from 'react';
import { Text, TextInput, View, Pressable, StyleSheet } from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import validator from 'validator'
import { Link } from 'expo-router';


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
    const [errors, setErrors] = useState(new Set<string>);

    useEffect(() => {
        if(!validator.isEmail(email)) {
            setErrors(errors => errors.add("Not a valid email address"))
        } else {
            setErrors(errors => {
                errors.delete("Not a valid email address")
                return errors;
            })
        }
        
        if(!firstName) {
            setErrors(errors => errors.add("First name cannot be empty"))
        } else {
            setErrors(errors => {
                errors.delete("First name cannot be empty")
                return errors;
            })
        }

        if(!lastName) {
            setErrors(errors => errors.add("Last name cannot be empty"))
        } else {
            setErrors(errors => {
                errors.delete("Last name cannot be empty")
                return errors;
            })
        }
        
        if(new Date().getTime() - dateOfBirth.getTime() < (18 * 1000 * 3600 * 24 * 365)) {
                setErrors(errors => errors.add("Must be over 18 to use this app"))
            } else {
                setErrors(errors => {
                    errors.delete("Must be over 18 to use this app");
                    return errors;
                })
            }
            
        if(!validator.isDate(dateOfBirthString)) {
            setErrors(errors => errors.add("Date of birth must be a valid date"))
        } else {
            setErrors(errors => {
                errors.delete("Date of birth must be a valid date")
                return errors;
            })
            setDateOfBirth(new Date(dateOfBirthString));

        }

    }, [email, firstName, lastName, dateOfBirth, dateOfBirthString]) 


    const handleEmailChange = (input: string) => {
        input = validator.trim(input)
        setEmail(input);
    }

    const handleFirstNameChange = (input: string) => {
        input = validator.trim(input)
        setFirstName(input);
        
    }

    const handleMiddleNameChange = (input: string) => {
        input = validator.trim(input)
        setMiddleName(input);
    }

    const handleLastNameChange = (input: string) => {
        input = validator.trim(input)
        setLastName(input);
        
    }

    const handleDateOfBirthChange = (event: DateTimePickerEvent, date?: Date) => {
        if(date && event.type === 'set') {
            setDateOfBirth(date);
            setDateOfBirthString(date.toLocaleDateString())
        }
        setShowCalendar(false);
    };

    const handleDateOfBirthChangeText = (input: string) => {
        setDateOfBirthString(input);
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
            <TextInput 
                value={dateOfBirthString}
                onFocus={() => setShowCalendar(true)}
                placeholder='Birthday:'
                onChangeText={handleDateOfBirthChangeText}
                />

            {showCalendar && 
                <DateTimePicker
                    mode='date' 
                    maximumDate={maxDate}
                    value={dateOfBirth}
                    onChange={handleDateOfBirthChange}
                    
                />
                }
            {errors.size === 0 && 
                <Link href="/register/two" asChild>
                    <Pressable>
                        <Text>Continue</Text>
                    </Pressable>
                </Link>
                
            }
        </View>
        
    )
}