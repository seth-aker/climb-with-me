import { StyleSheet, TextInput } from "react-native";
import { CWMUser } from "../../assets/types/profileData";
import { View, Text } from "../Themed";
import { useState } from "react";
import { styles as baseStyles } from "../../styles/base";
import CustomButton from "../CustomButton";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import genderCodeToString from "../../utils/genderCodeToString";
import CountryPicker from 'react-native-country-picker-modal'
import { CountryCode, Country } from "react-native-country-picker-modal"
import { formatPhoneNumber } from "../../utils/formatPhoneNumber";
import validateProfiles from "../../utils/validateProfiles";


type PrivateProfileProps = {
    user: CWMUser,
    handleProfileUpdate: (updatedUser: CWMUser) => void
}

const {
    inputNotEmpty, 
    isEmail, 
    isDate, 
    isOver18, 
    isPhoneNumber} = validateProfiles;

//TODO: Split this into manageable components
export default function PrivateProfile({ user, handleProfileUpdate }: PrivateProfileProps) {
    const maxDate = new Date();
    const [editable, setEditable] = useState(false);
    const [showCalendar, setShowCalendar] = useState(false);

    const [firstName, setFirstName] = useState(user.first_name);
    const [firstNameError, setFirstNameError] = useState(false);

    const [lastName, setLastName] = useState(user.last_name);
    const [lastNameError, setLastNameError] = useState(false);

    const [dateOfBirth, setDateOfBirth] = useState(new Date(user.date_of_birth))
    const [dateOfBirthError, setDateOfBirthError] = useState(false);

    const [dateOfBirthString, setDateOfBirthString] = useState(user.date_of_birth)
    const [email, setEmail] = useState(user.email)
    const [emailError, setEmailError] = useState(false);

    const [primaryPhone, setPrimaryPhone] = useState(user.primary_phone)
    const [phoneError, setPhoneError] = useState(false);

    const [genderCode, setGenderCode] = useState(user.gender_code)
    const [pictureString, setPictureString] = useState(user.picture_uri)
    const [addresses, setAddresses] = useState(user.addresses)
    const [climbingStyles, setClimbingStyles] = useState(user.climbing_styles)
    const [callingCode, setCallingCode] = useState<string[]>([])
    

    const [countryCode, setCountryCode] = useState<CountryCode>('US')
    const [country, setCountry] = useState<Country>()
    
    const handleSelect = (country: Country) => {
        setCountryCode(country.cca2)
        setCountry(country)
        setCallingCode(country.callingCode)
    }


    const handlePhoneChange = (input: string) => {
        const formattedNumber = formatPhoneNumber(input, primaryPhone)
        setPrimaryPhone(formattedNumber);
    }

    const handleDateOfBirthChange = (event: DateTimePickerEvent, date?: Date) => {
        if(date && event.type === 'set') {
            setDateOfBirth(date)
            setDateOfBirthString(date.toLocaleDateString(undefined, {month: '2-digit', day: "2-digit", year: "numeric"}))
        }
        setShowCalendar(false);
    };

    const toggleEdit = () => {
        setEditable(!editable)
    }
    const onSaveChanges = () => {
        
        const updatedUser: CWMUser = {
            auth_id: user.auth_id,
            first_name: firstName,
            last_name: lastName,
            date_of_birth: dateOfBirthString,
            email,
            email_verified: user.email_verified,
            primary_phone: primaryPhone,
            created_on: user.created_on,
            gender_code: genderCode,
            is_active: user.is_active,
            picture_uri: pictureString,
            addresses: addresses,
            climbing_styles: climbingStyles
        } 
        handleProfileUpdate(updatedUser);
    }

    

    return (
        <View style={baseStyles.registerForm}>
            <View> 
                <CustomButton 
                    text="Edit" 
                    onPress={toggleEdit} 
                    disabled={editable}/>
                <View>
                    <Text style={[baseStyles.inputTitle, firstNameError && baseStyles.error]}>First Name: </Text>
                    <TextInput
                        style={[baseStyles.input, firstNameError && baseStyles.inputErrorState]} 
                        value={firstName} 
                        onChangeText={(input) => {
                            setFirstName(input)
                            if(!inputNotEmpty(input))
                                setFirstNameError(true)
                            }
                        }
                        editable={editable}
                    />
                    <Text style={[baseStyles.inputTitle, lastNameError && baseStyles.error]}>Last Name: </Text>
                    <TextInput 
                        style={[baseStyles.input, lastNameError && baseStyles.inputErrorState]} 
                        value={lastName}
                        onChangeText={(input) => setLastName(input)}
                        editable={editable}
                    />
                </View>
                <View>
                    <Text style={[baseStyles.inputTitle, emailError && baseStyles.error]}>Email: </Text>
                    <TextInput 
                        style={[baseStyles.input, emailError && baseStyles.inputErrorState]}
                        value={email}
                        onChangeText={(input) => setEmail(input)}
                        inputMode='email' 
                        autoCapitalize='none'
                        autoComplete='email'
                        editable={editable}
                    />
                </View>
                <View>
                    <Text style={[baseStyles.inputTitle, dateOfBirthError && baseStyles.error]}>Birthday: </Text>
                    <TextInput 
                        style={[baseStyles.input, dateOfBirthError && baseStyles.inputErrorState]}
                        value={dateOfBirthString}
                        onFocus={() => setShowCalendar(true)}
                        placeholder='Birthday:'
                        onChangeText={(input) => {
                            setDateOfBirthString(input)
                        }}
                        editable={editable}
                    />
                </View>
                
                <View style={styles.phoneInput}>
                    <Text style={[baseStyles.inputTitle, phoneError && baseStyles.error]}>Primary Phone: </Text>
                    <CountryPicker 
                        containerButtonStyle={styles.countryPickerButton}
                        countryCode={countryCode}
                        onSelect={handleSelect}
                        withCallingCodeButton
                        withCallingCode
                        withFilter
                    />
                    <TextInput style={[styles.phoneText, phoneError && baseStyles.inputErrorState]}
                        onChangeText={handlePhoneChange}
                        value={primaryPhone}
                        placeholder='Primary Phone'
                        inputMode='numeric'
                        autoComplete='tel'
                        
                    />
                    </View>




                {!editable && <Text>Gender: {genderCodeToString(user.gender_code)}</Text>}
                {editable && <Picker 
                    style={{width: "100%"}}
                    selectedValue={genderCode}
                    onValueChange={(value, index) => {
                        setGenderCode(value)
                    }}>

                    <Picker.Item label='--Select Option Below--' value={undefined} enabled={false} />
                    <Picker.Item label="Male" value={"m"}/>
                    <Picker.Item label="Female" value={"f"}/>
                    <Picker.Item label="Non-binary" value={"n"}/>
                    <Picker.Item label="I'd rather not say" value={"d"}/>
                    <Picker.Item label="Other" value={"o"}/>
                </Picker>}

                <CustomButton text="Save Changes" onPress={onSaveChanges} disabled={!editable} />
            </View>



            {showCalendar && 
                <DateTimePicker
                    mode='date' 
                    maximumDate={maxDate}
                    value={dateOfBirth}
                    onChange={handleDateOfBirthChange}
                />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    phoneInput: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        padding: 10
    },
    countryPickerButton: {
        backgroundColor: 'grey',
        padding: 5,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5
    },

    phoneText: {
        width: '80%',
        backgroundColor: 'lightgrey',
        display: 'flex',
        alignItems: 'center',
        borderBottomRightRadius: 5,
        borderTopRightRadius: 5,
        padding: 5
    },

})