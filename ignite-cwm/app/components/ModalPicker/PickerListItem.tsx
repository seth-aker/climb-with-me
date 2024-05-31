import { Option } from "data/ModalPickerOptions"
import React from "react"
import { Pressable, TextStyle, View, ViewStyle } from "react-native"
import { Text } from "../Text"
import { isRTL } from "app/i18n"
import { colors, spacing } from "app/theme"

export interface PickerListItemProps {
    item: Option
    handleItemOnPress: (item: Option) => void
    listTextStyle?: TextStyle 
    itemSeparatorStyle?: ViewStyle
}

export const PickerListItem = (props: PickerListItemProps) => {
    
    const { 
        handleItemOnPress, 
        item, 
        listTextStyle: $listTextStyle,
        itemSeparatorStyle: $dividerStyleOverride
    } = props

    const $dividerStyles = [$divider, $dividerStyleOverride]

    return (
        <View>
            <Pressable
                onPress={() => handleItemOnPress(item)}
            >
                <View style={$listItemView}>
                    <Text style={[$textStyle, $listTextStyle]} 
                        text={item.label}
                    />
                </View>
                <View style={$dividerStyles} />
            </Pressable>
        </View>
    )
}



const $textStyle: TextStyle = {
    paddingHorizontal: spacing.sm,
    color: colors.text,
    textAlign: isRTL ? "right" : "left"
}

const $listItemView: ViewStyle = {
    flexDirection: "row",
    alignItems: "center",
    padding: spacing.sm,
}
const $divider: ViewStyle = {
    width: "95%",
    height: 0.8,
    marginHorizontal: spacing.sm,
    backgroundColor: "#D3D3D3",
  }