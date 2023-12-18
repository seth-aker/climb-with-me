import { useEffect, useState } from "react";
import useRegistrationContext from "../../hooks/useRegistrationContext";
import { View, Text } from "../../components/Themed";
import { TextInput } from "react-native";
import CheckBox from "../../components/CheckBox";
import {styles as baseStyles} from "../../styles/base"
import CountryPicker from 'react-native-country-picker-modal'
import { CountryCode, Country, FlagButton } from "react-native-country-picker-modal"

export default function RegisterUserAddress() {
    const {address, setAddress } = useRegistrationContext();
    const [showModal, setShowModal] = useState(false);

    const [addressLine1, setAddressLine1] = useState("");
    const [addressLine2, setAddressLine2] = useState("");
    const [city, setCity] = useState("");
    const [stateProvince, setStateProvince] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [country, setCountry] = useState<Country>();
    const [countryCode, setCountryCode] = useState<CountryCode>("US")
    const [isDefault, setIsDefault] = useState(false);

    useEffect(() => {
        const address = {
            addressLine1,
            addressLine2,
            city,
            stateProvince,
            postalCode,
            country: countryCode,
            isDefault
        }
        setAddress(address)
    }, [addressLine1, addressLine2, city, stateProvince, postalCode, country, isDefault])

    const handleSelect = (country: Country) => {
        setCountry(country)
        setCountryCode(country.cca2)
    }


    return (
        <View style={baseStyles.registerForm}>
            <TextInput 
                value={addressLine1}
                onChangeText={(input) => setAddressLine1(input)}
                placeholder="Address Line 1"
                autoComplete="address-line1"
            />
            <TextInput 
                value={addressLine2}
                onChangeText={(input) => setAddressLine2(input)}
                placeholder="Address Line 2"
                autoComplete="address-line2"
            />
            <TextInput 
                value={city}
                onChangeText={(input) => setCity(input)}
                placeholder="City"
                autoCapitalize="sentences"
            />
            <TextInput
                value={stateProvince}
                onChangeText={(input) => setStateProvince(input)}
                placeholder="State"
                autoComplete="postal-address-region"
            />
            <TextInput
                value={postalCode}
                onChangeText={(input) => setPostalCode(input)}
                placeholder="Zip Code"
                inputMode="numeric"
                autoComplete="postal-code"
            />
            <CountryPicker 
                countryCode={countryCode}
                onSelect={handleSelect}
                withFilter
                visible={showModal}
                onClose={() => setShowModal(false)}
                renderFlagButton={() => {
                    return (<FlagButton 
                        withCountryNameButton
                        placeholder={`Country: ${countryCode}`} 
                        onOpen={() => setShowModal(true)}
                        />)
                    }
                }
            />
           <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
            <CheckBox 
                isChecked={isDefault} 
                onPress={() => setIsDefault(!isDefault)}
                />
            <Text>Default Address?</Text>
           </View>
           

        </View>
    )
    
}