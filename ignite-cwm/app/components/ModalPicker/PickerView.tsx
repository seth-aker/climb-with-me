import React, { ComponentType } from "react"
import { Pressable, StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { Text, TextProps } from "../Text"
import { TxKeyPath, isRTL } from "app/i18n"
import { colors, spacing, typography } from "app/theme"


export interface PickerViewAccessoryProps {
    style: StyleProp<any>
    editable: boolean
}

export interface PickerViewProps {
    status?: "error" | undefined
    disabled?: boolean
    openModal: (modalState: boolean) => void
    value?: string
    placeholder?: string
    textStyle?: TextStyle
    containerStyle?: ViewStyle 
    placeholderTx?: TxKeyPath
    placeholderStyle?: TextStyle
    label?: TextProps["text"]
    LabelTextProps?: TextProps
    labelTx?: TextProps["tx"]
    labelTxOptions?: TextProps["txOptions"]
    inputWrapperStyle?: StyleProp<ViewStyle>
    LeftAccessory?: ComponentType<PickerViewAccessoryProps>
    RightAccessory?: ComponentType<PickerViewAccessoryProps>
}

export const PickerView = (props: PickerViewProps) => {
    const { 
        disabled, 
        openModal, 
        value, 
        containerStyle: $containerStyle, 
        placeholder, 
        placeholderTx, 
        textStyle: $inputStyleOverride, 
        placeholderStyle: $placeholderStyleOverride,
        inputWrapperStyle: $inputWrapperStyleOverride,
        LeftAccessory,
        RightAccessory,
        label,
        labelTx,
        labelTxOptions,
        LabelTextProps,
        status
     } = props
    
    const $inputWrapperStyles = [
        $inputWrapperStyle,
        status === "error" && { borderColor: colors.error },
        LeftAccessory && { paddingStart: 0 },
        RightAccessory && { paddingEnd: 0 },
        $inputWrapperStyleOverride,
    ]

    const $labelStyles = [$labelStyle, LabelTextProps?.style]

    const $inputStyles: StyleProp<TextStyle> = [
        $inputStyle,
        disabled && { color: colors.textDim },
        isRTL && { textAlign: "right" as TextStyle["textAlign"] },
        $inputStyleOverride,
    ]

    const $placeholderStyles = [
        $inputStyle,
        isRTL && { textAlign: "right" as TextStyle["textAlign"] },
        $placeholderStyleOverride
    ]
     return (
        <View>
            <Pressable 
                disabled={disabled}
                onPress={() => openModal(true)}
                style={$containerStyle}    
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
                <View style={$inputWrapperStyles}>
                    {!!LeftAccessory && <LeftAccessory 
                        style={$leftAccessoryStyle}
                        editable={!disabled}
                     />}

                    {value ? (
                        <Text style={$inputStyles} text={value} />
                    ) : (
                        <Text style={$placeholderStyles} text={placeholder} tx={placeholderTx} />
                    )}

                    {!!RightAccessory && <RightAccessory 
                        style={$rightAccessoryStyle}
                        editable={!disabled}
                        />}
                </View>
            </Pressable>
        </View>

    )
} 

const $inputWrapperStyle: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  borderWidth: 1,
  borderRadius: 4,
  backgroundColor: colors.palette.neutral200,
  borderColor: colors.palette.neutral400,
  overflow: "hidden",
}

const $inputStyle: TextStyle = {
  flex: 1,
  alignSelf: "stretch",
  fontFamily: typography.primary.normal,
  color: colors.text,
  fontSize: 16,
  height: 24,
  // https://github.com/facebook/react-native/issues/21720#issuecomment-532642093
  paddingVertical: 0,
  paddingHorizontal: 0,
  marginVertical: spacing.xs,
  marginHorizontal: spacing.sm,
}

const $rightAccessoryStyle: ViewStyle = {
  marginEnd: spacing.xs,
  height: 40,
  justifyContent: "center",
  alignItems: "center",
}
const $leftAccessoryStyle: ViewStyle = {
  marginStart: spacing.sm,
  height: 40,
  justifyContent: "center",
  alignItems: "center",
}

const $labelStyle: TextStyle = {
  marginBottom: spacing.xs,
}
