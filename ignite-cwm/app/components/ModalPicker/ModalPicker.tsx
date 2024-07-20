import React, { ComponentType, useState } from "react"
import { ColorValue, Modal, TextStyle, View, ViewStyle } from "react-native";
import { PickerView, PickerViewAccessoryProps } from "./PickerView";
import { ListView } from "../ListView";
import { PickerListItem } from "./PickerListItem";
import { TextProps } from "../Text";
import { Header } from "../Header";
import { colors } from "app/theme";

export interface ModalPickerProps {
    data?: string[] ;
    disabled?: boolean
    onChange?: (value: any) => void
    value?: string
    status?: "error" | undefined
    containerStyle?: ViewStyle
    hideSearchBar?: boolean;
    searchBarStyle?: ViewStyle;
    pickerContainerStyle?: ViewStyle;
    pickerTextStyle?: TextStyle
    inputWrapperStyle?: ViewStyle
    placeholder?: string;
    placeholderTextColor?: ColorValue | undefined;
    searchBarPlaceHolder?: string;
    searchBarPlaceHolderColor?: string;
    label?: TextProps["text"]
    LabelTextProps?: TextProps
    labelTx?: TextProps["tx"]
    labelTxOptions?: TextProps["txOptions"]
    animationType?: "none" | "slide" | "fade" | undefined;
    headerTitle?: string
    LeftAccessory?: ComponentType<PickerViewAccessoryProps>
    RightAccessory?: ComponentType<PickerViewAccessoryProps>
    
    listTextStyle?: TextStyle;
    itemSeparatorStyle?: ViewStyle;
}

export const ModalPicker = (props: ModalPickerProps) => {
    const { 
        disabled,
        animationType = "slide",
        data,
        value,
        onChange,
        inputWrapperStyle: $inputWrapperStyle,
        headerTitle,
        pickerTextStyle: $pickerTextStyle,
        status
     } = props

    const [modalVisible, setModalVisible] = useState(false);

    const handleItemOnPress = (item: string) => {
        setModalVisible(false);
        onChange && onChange(item)
    }

    return (
        <View>
            <PickerView
                disabled={disabled} 
                openModal={setModalVisible}
                value={value}
                status={status}
                inputWrapperStyle={$inputWrapperStyle}
                textStyle={$pickerTextStyle}
                {...props}
            />
            <Modal
                visible={modalVisible}
                animationType={animationType}
                onRequestClose={() => setModalVisible(false)}
            >
                <Header 
                    title={headerTitle}
                    rightIcon={"x"}
                    rightIconColor={colors.text}
                    onRightPress={()=> setModalVisible(false)}
                />
                <ListView
                    data={data}
                    renderItem={(item) => (
                        <PickerListItem 
                            {...item}
                            handleItemOnPress={handleItemOnPress}
                        />
                    )}
                    estimatedItemSize={30}
                />

            </Modal>
        </View>
    )
}
