import { useState, useEffect } from 'react';
import { Text, TextInput, View, Pressable, StyleSheet } from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import validator from 'validator';
import isDate from '../../utils/isDate';
import { router } from 'expo-router';

type Errors = {
    email?: string,
    firstName?: string,
    lastName?: string,
    validDateOfBirth?: string,
    validAge?: string

}
export default function RegisterUserInfo() {
    const maxDate = new Date();
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState(new Date());
    const [dateOfBirthString, setDateOfBirthString] = useState("");
    const [showCalendar, setShowCalendar] = useState(false);
    const [errors, setErrors] = useState({} as Errors);
    const [errorsVisible, setErrorsVisible] = useState(false);

    function validateInput() {
        if(!validator.isEmail(email)) {
            setErrors(errors => {
                errors.email = "Not a valid email address"
                return errors;
            })
        } else {
            setErrors(errors => {
                errors.email = undefined;
                return errors;
            })
        }
        
        if(!firstName || firstName.length === 0) {
            setErrors(errors => {
                errors.firstName ="First name cannot be empty"
                return errors;
            })

        } else {
            setErrors(errors => {
                errors.firstName = undefined;
                return errors;
            })
        }

        if(!lastName || lastName.length === 0) {
            setErrors(errors => {
                errors.lastName = "Last name cannot be empty"
                return errors;
            })
        } else {
            setErrors(errors => {
                errors.lastName = undefined;
                return errors;
            })
        }
        
        if(new Date().getTime() - dateOfBirth.getTime() < (18 * 1000 * 3600 * 24 * 365)) {
                setErrors(errors => {
                    errors.validAge = "Must be over 18 to use this app"
                    return errors;
                })
        } else {
            setErrors(errors => {
                errors.validAge = undefined;
                return errors;
            })
        }
        if(!isDate(dateOfBirthString, "mm/dd/yyyy")) {
            setErrors(errors => {
                errors.validDateOfBirth = "Date of birth must be a valid date";
                return errors;
            })
        } else {
            setErrors(errors => {
                errors.validDateOfBirth = undefined;
                return errors;
            })

        }
    } 

    useEffect(validateInput, [email, firstName, lastName, dateOfBirth, dateOfBirthString])

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
            setDateOfBirthString(date.toLocaleDateString(undefined, {month: '2-digit', day: "2-digit", year: "numeric"}))
        }
        setShowCalendar(false);
    };

    const handleDateOfBirthChangeText = (input: string) => {
        input = input.trim();
        setDateOfBirthString(input)
        setDateOfBirth(new Date(dateOfBirthString))
    }

    const handleSubmitInfo = async () => {
        validateInput();
        if(!errors.email &&
           !errors.firstName &&
           !errors.lastName &&
           !errors.validDateOfBirth &&
           !errors.validAge ) {
            const userInfo = {
                email,
                firstName,
                middleName,
                lastName,
                dateOfBirth
            };
            
        router.push("/register/two" )
        } else {
            setErrorsVisible(true)
        }
    }

    return (
        <View style={styles.form}>
            <View style={styles.inputLine}>
                <View style={styles.inputTitle}>
                    <Text>Email: </Text> 
                    {errorsVisible && errors.email && <Text style={styles.error}>{`*${errors.email}`}</Text>}
                </View>
                
                <TextInput 
                    style={[styles.input, errorsVisible && errors.email ? styles.inputErrorState: null]}
                    value={email} 
                    placeholder='something@email.com'
                    onChangeText={handleEmailChange} 
                    inputMode='email' 
                />
               
            </View>
            <View style={styles.inputLine}>
                <View style={styles.inputTitle}>
                    <Text>First name:</Text>
                    {errorsVisible && errors.firstName && <Text style={styles.error}>{`*${errors.firstName}`}</Text>}
                </View>
                <TextInput 
                    style={[styles.input, errorsVisible && errors.firstName ? styles.inputErrorState: null]}
                    value={firstName}
                    placeholder='First Name'
                    onChangeText={handleFirstNameChange}
                    />
            </View>
            <View style={styles.inputLine}>
                <Text>Middle Name: (optional)</Text>
                <TextInput 
                    style={styles.input}
                    value={middleName}
                    placeholder='Middle Name'
                    onChangeText={handleMiddleNameChange}
                />
            </View>

            <View style={styles.inputLine}>
                <View style={styles.inputTitle}>
                    <Text>Last Name: </Text>
                    {errorsVisible && errors.lastName && <Text style={styles.error}>{`*${errors.lastName}`}</Text>}
                </View>
                
                <TextInput 
                    style={[styles.input, errorsVisible && errors.lastName ? styles.inputErrorState: null]}
                    value={lastName}
                    placeholder='Last Name'
                    onChangeText={handleLastNameChange}
                    />
                
            </View>

            <View style={styles.inputLine}>
                <View style={styles.inputTitle}>
                    <Text>Date of Birth:</Text> 
                    {errorsVisible && 
                     errors.validDateOfBirth && 
                     <Text style={styles.error}>{`*${errors.validDateOfBirth}`}</Text>}
                    
                    {errorsVisible && 
                     errors.validAge && 
                     !errors.validDateOfBirth &&
                     <Text style={styles.error}>{`*${errors.validAge}`}</Text>}
                </View>
                
                <TextInput 
                    style={[styles.input, errorsVisible && (errors.validDateOfBirth || errors.validAge) ? styles.inputErrorState: null]}
                    value={dateOfBirthString}
                    onFocus={() => setShowCalendar(true)}
                    placeholder='Birthday:'
                    onChangeText={handleDateOfBirthChangeText}
                    />
            </View>

            {showCalendar && 
                <DateTimePicker
                    mode='date' 
                    maximumDate={maxDate}
                    value={dateOfBirth}
                    onChange={handleDateOfBirthChange}
                />
            }
            <Pressable onPress={handleSubmitInfo} >
                <Text>Continue</Text>
            </Pressable>

        </View>
        
    )
}

const styles = StyleSheet.create({
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
        marginTop: 10,
    },
    inputLine: {
        width: '90%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start'
    },
    inputTitle: {
        display: 'flex',
        flexDirection: 'row'
    },
    input: {
        marginBottom: 5,
        padding: 5,
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 5
    },
    error: {
        color: 'red'
    },
    inputErrorState: {
        borderColor: 'red'
    }
})