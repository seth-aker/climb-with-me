import { useState } from 'react';
import { View , StyleSheet, TextInput} from 'react-native';
import CountryPicker from 'react-native-country-picker-modal'
import { formatPhoneNumber } from '../../utils/formatPhoneNumber';
import { Picker } from '@react-native-picker/picker';
import useRegistrationContext from '../../hooks/useRegistrationContext';
import validator from 'validator';
import Button from '../../components/CustomButton';
import { router } from 'expo-router';
import { styles as baseStyles } from '../../styles/base';
import { CountryCode, Country } from "react-native-country-picker-modal"


export default function RegisterUserInfoPage2() {
    const { gender, setGender, setPrimaryPhone} = useRegistrationContext();
    const [callingCode, setCallingCode] = useState<string[]>([])
    const [primaryPhoneString, setPrimaryPhoneString] = useState("");

    const [countryCode, setCountryCode] = useState<CountryCode>('US')
    const [country, setCountry] = useState<Country>()
    
    const handleSelect = (country: Country) => {
        setCountryCode(country.cca2)
        setCountry(country)
        setCallingCode(country.callingCode)
    }


    const handlePhoneChange = (input: string) => {
        const formattedNumber = formatPhoneNumber(input, primaryPhoneString)
        setPrimaryPhoneString(formattedNumber);
        const parsedPhoneNumber = parseInt(validator.whitelist(`${countryCode[0]}${primaryPhoneString}`, '0123456789'));
        setPrimaryPhone(parsedPhoneNumber);
    }
    
    return (
        <View style={baseStyles.registerForm}>
            <View style={styles.phoneInput}>
                <CountryPicker 
                    containerButtonStyle={styles.countryPickerButton}
                    countryCode={countryCode}
                    onSelect={handleSelect}
                    withCallingCodeButton
                    withCallingCode
                    withFilter
                />
                <TextInput style={styles.phoneText}
                    onChangeText={handlePhoneChange}
                    value={primaryPhoneString}
                    placeholder='Primary Phone'
                    inputMode='numeric'
                    autoComplete='tel'
                    
                />
            </View>

            <Picker 
                style={{width: "100%"}}
                selectedValue={gender}
                onValueChange={(value, index) => {
                    setGender(value)
                }}
            >
                <Picker.Item label='--Select Option Below--' value={undefined}/>
                <Picker.Item label="Male" value={"m"}/>
                <Picker.Item label="Female" value={"f"}/>
                <Picker.Item label="Non-binary" value={"n"}/>
                <Picker.Item label="I'd rather not say" value={"d"}/>
                <Picker.Item label="Other" value={"o"}/>
            </Picker>

            <Button 
                style={baseStyles.button} 
                text='Continue' 
                onPress={() => router.push("/register/three")}
            />
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