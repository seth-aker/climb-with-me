import { View, Text } from "react-native"
import { ListHeaderComponentProps } from "react-native-country-codes-picker"
import { CountryButton } from "react-native-country-codes-picker/components/CountryButton"


export default function ListHeaderComponent({countries, lang, onPress}: ListHeaderComponentProps) {
    return (
        <View
            style={{
                paddingBottom: 20,
            }}
        >
            <Text>
                Popular countries
            </Text>
            {countries?.map((country, index) => {
                return (
                    <CountryButton key={index} item={country} name={country?.name?.[lang || 'en']} onPress={() => onPress(country)} />
                )
            })}
        </View>
    )
}