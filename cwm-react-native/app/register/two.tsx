import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { E164Number } from 'libphonenumber-js/types.cjs';
import { CountryPicker} from 'react-native-country-codes-picker'
import ListHeaderComponent from '../../components/CCListHeaderComponent';
export default function RegisterUserInfoPage2() {
    const [showModal, setShowModal] = useState(false);
    const [countryCode, setCountryCode] = useState("+1")
    const [formattedPrimaryPhone, setFormattedPrimaryPhone] = useState("")
    const [gender, setGender] = useState('');
    const [errors, setErrors] = useState(new Set<string>);

    return (
        <View>
            <Pressable
                onPress={() => {
                    setCountryCode("")
                    setShowModal(true)
                }}
            >
                <Text>{countryCode}</Text>
                
            </Pressable>
            <CountryPicker lang="en" 
                show={showModal}
                pickerButtonOnPress={(item) => {
                    setCountryCode(item.dial_code);
                    setShowModal(false);
                }}
                ListHeaderComponent={ListHeaderComponent}
                popularCountries={["us", "ca"]}
                
            />
        </View>
    )
}