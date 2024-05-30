import React, { PropsWithoutRef } from "react";
import { Modal, TextStyle, View, ViewProps, ViewStyle } from "react-native";
import DropDownPicker, {DropDownPickerProps, ValueType} from "react-native-dropdown-picker"
import { Text, TextProps} from "./Text"
import { spacing } from "app/theme";

export type CustomDropDownPickerProps = DropDownPickerProps<ValueType> & {
    containerStyle?: ViewStyle,
    ContainerProps?: ViewProps,
    label?: TextProps["text"],
    LabelTextProps?: TextProps,
    labelTx?: TextProps["tx"],
    labelTxOptions?: TextProps["txOptions"]
    status?: "error" | "disabled"
    visible: boolean
}

export function CustomDropDownPicker(props: PropsWithoutRef<CustomDropDownPickerProps> ) {
    const {
        containerStyle,
        ContainerProps,
        label, 
        labelTx, 
        LabelTextProps, 
        labelTxOptions, 
        status,
        visible, 
        ...DropDownPickerProps
    } = props;

    const $labelStyles = [$labelStyle, LabelTextProps?.style]
    const disabled = status === "disabled"

    return (
        <View
            style={containerStyle}
            {...ContainerProps}
        >
            {!!(label || labelTx) && (
                <Text
                    preset="formLabel"
                    text={label}
                    tx={labelTx}
                    txOptions={labelTxOptions}
                    {...LabelTextProps}
                    style={$labelStyles}
                />
            )}
            <Modal
                visible={visible}
            >
                <DropDownPicker 
                    disabled={disabled}
                    {...DropDownPickerProps}
                />
            </Modal>
        </View>
    )
}

const $labelStyle: TextStyle = {
  marginBottom: spacing.xs,
}