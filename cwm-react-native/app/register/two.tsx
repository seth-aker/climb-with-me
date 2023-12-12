import { useState } from 'react';
import { Pressable, Text, View , StyleSheet, TextInput} from 'react-native';
import { CountryPicker} from 'react-native-country-codes-picker'
import ListHeaderComponent from '../../components/CCListHeaderComponent';
import { formatPhoneNumber } from '../../utils/formatPhoneNumber';

export default function RegisterUserInfoPage2() {
    const [showModal, setShowModal] = useState(false);
    const [countryCode, setCountryCode] = useState("+1");
    const [primaryPhone, setPrimaryPhone] = useState("");
    const [gender, setGender] = useState('');
    const [errors, setErrors] = useState(new Set<string>);

    const handlePhoneChange = (input: string) => {
        const formattedNumber = formatPhoneNumber(input, primaryPhone)
        setPrimaryPhone(formattedNumber);
    }
    
    return (
        <View>
            <View style={styles.phoneInput}>
                <Pressable
                    style={styles.ccButton}
                    onPress={() => {
                        setShowModal(true)
                        setCountryCode("")
                    }}>
                    <Text>{countryCode}</Text>
                </Pressable>
                <TextInput style={styles.phoneText}
                    onChangeText={handlePhoneChange}
                    value={primaryPhone}
                    placeholder='Primary Phone'
                    inputMode='numeric'
                    
                />
            </View>
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

const styles = StyleSheet.create({
    phoneInput: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
    },
    ccButton: {
        width: '15%',
        backgroundColor: "grey",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        margin: 10,
        marginRight: 0,
        padding: 5
    },
    phoneText: {
        width: '80%',
        backgroundColor: 'lightgrey',
        display: 'flex',
        alignItems: 'center',
        borderBottomRightRadius: 5,
        borderTopRightRadius: 5,
        margin: 10,
        marginLeft: 0,
        padding: 5
    },

})