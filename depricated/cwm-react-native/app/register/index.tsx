import { useState, useEffect } from 'react';
import { Text, TextInput, View, Pressable, StyleSheet } from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import validator from 'validator';
import isDate from '../../utils/isDate';
import { styles as baseStyles } from '../../styles/base';
import { registerNewUser } from '../../service/RegisterService';

import useRegistrationContext from '../../hooks/useRegistrationContext';
import Button from '../../components/CustomButton';
import { Credentials, useAuth0 } from 'react-native-auth0';
import { useToken } from '../../hooks/useToken';
import { router } from 'expo-router';

type Errors = {
    email?: string,
    firstName?: string,
    lastName?: string,
    validDateOfBirth?: string,
    validAge?: string

}
export default function RegisterUserInfo() {
    const { user, authorize, getCredentials} = useAuth0();
    const {accessToken, setAccessToken} = useToken();
    const {email, setEmail, 
            firstName, setFirstName, 
            lastName, setLastName, 
            dateOfBirth, setDateOfBirth } = useRegistrationContext();
            
    const maxDate = new Date();
   
    const [dateOfBirthString, setDateOfBirthString] = useState("");
    const [showCalendar, setShowCalendar] = useState(false);
    const [errors, setErrors] = useState({} as Errors);
    const [errorsVisible, setErrorsVisible] = useState(false);

    useEffect(() => {
        if(user) {
            setEmail(user.email ? user.email : "")
            setFirstName(user.givenName ? user.givenName : "")
            setLastName(user.familyName ? user.familyName : "")
            setDateOfBirth(user.birthdate ? new Date(user.birthdate) : new Date())
            setDateOfBirthString(user.birthdate ? user.birthdate : dateOfBirthString)
            //console.log(`AccessTokenObj: ${accessToken}, User: ${JSON.stringify(user)}`)
            
        } 

    }, [user])

    //TODO: Refactor this code to be more readable/less bulky, possibly in a separate file.
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

    const handleDateOfBirthChange = (event: DateTimePickerEvent, date?: Date) => {
        if(date && event.type === 'set') {
            setDateOfBirth(date);
            setDateOfBirthString(date.toLocaleDateString(undefined, {month: '2-digit', day: "2-digit", year: "numeric"}))
        }
        setShowCalendar(false);
    };


    const handleSubmitInfo = async () => {
        validateInput();
        if(!errors.email &&
           !errors.firstName &&
           !errors.lastName &&
           !errors.validDateOfBirth &&
           !errors.validAge ) {
        router.push("/register/two")
            const userInfo = {
                email,
                first_name: firstName,
                last_name: lastName,
                date_of_birth: dateOfBirth
            };
        //     try {
        //         registerUser(, userInfo)    
        //         router.push("/register/two" )
        //     } catch (e) {
        //         console.log(e)
        //         setErrorsVisible(true)
        //     }
        } else {
            setErrorsVisible(true)
        }
    }

    return (
        <View style={baseStyles.registerForm}>
            <View style={styles.inputLine}>
                <View style={styles.inputTitle}>
                    <Text style={errorsVisible && errors.email ? styles.error : undefined}>Email: </Text> 
                    {errorsVisible && errors.email && <Text style={styles.error}>{` *${errors.email}`}</Text>}
                </View>
                
                <TextInput 
                    style={[styles.input, errorsVisible && errors.email ? styles.inputErrorState: null]}
                    value={email} 
                    placeholder='something@email.com'
                    onChangeText={(input) => setEmail(input)} 
                    inputMode='email' 
                    autoCapitalize='none'
                    autoComplete='email'
                />
               
            </View>
            <View style={styles.inputLine}>
                <View style={styles.inputTitle}>
                    <Text style={errorsVisible && errors.firstName ? styles.error : undefined}>First name:</Text>
                    {errorsVisible && errors.firstName && <Text style={styles.error}>{` *${errors.firstName}`}</Text>}
                </View>
                <TextInput 
                    style={[styles.input, errorsVisible && errors.firstName ? styles.inputErrorState: null]}
                    value={firstName}
                    placeholder='First Name'
                    onChangeText={(input) => setFirstName(input)}
                    autoCapitalize='sentences'
                    autoComplete='given-name'
                    />
            </View>

            <View style={styles.inputLine}>
                <View style={styles.inputTitle}>
                    <Text style={errorsVisible && errors.lastName ? styles.error : undefined}>Last Name: </Text>
                    {errorsVisible && errors.lastName && <Text style={styles.error}>{` *${errors.lastName}`}</Text>}
                </View>
                
                <TextInput 
                    style={[styles.input, errorsVisible && errors.lastName ? styles.inputErrorState: null]}
                    value={lastName}
                    placeholder='Last Name'
                    onChangeText={(input) => setLastName(input)}
                    autoCapitalize='sentences'
                    autoComplete='family-name'
                    />
                
            </View>

            <View style={styles.inputLine}>
                <View style={styles.inputTitle}>
                    <Text style={errorsVisible && (errors.validDateOfBirth || errors.validAge) ? styles.error : undefined}>Date of Birth:</Text> 
                    {errorsVisible && 
                     errors.validDateOfBirth && 
                     <Text style={styles.error}>{` *${errors.validDateOfBirth}`}</Text>}
                    
                    {errorsVisible && 
                     errors.validAge && 
                     !errors.validDateOfBirth &&
                     <Text style={styles.error}>{` *${errors.validAge}`}</Text>}
                </View>
                
                <TextInput 
                    style={[styles.input, errorsVisible && (errors.validDateOfBirth || errors.validAge) ? styles.inputErrorState: null]}
                    value={dateOfBirthString}
                    onFocus={() => setShowCalendar(true)}
                    placeholder='Birthday:'
                    onChangeText={(input) => {
                        setDateOfBirthString(input)
                        if(isDate(dateOfBirthString, "mm/dd/yyyy")) {
                            setDateOfBirth(new Date(dateOfBirthString))
                        }
                    }}

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
            <Button style={baseStyles.button} text='Continue' onPress={handleSubmitInfo}/>
        </View>
        
    )
}

const styles = StyleSheet.create({
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