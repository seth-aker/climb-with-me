import React, { useEffect } from "react"
import Animated, { useAnimatedProps, useAnimatedStyle, useSharedValue, withRepeat, withSequence, withTiming, Easing} from "react-native-reanimated"
import { Svg, Circle, G} from 'react-native-svg';
import { View, ViewStyle } from "react-native";
import { colors } from "app/theme";


const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface LoadingSpinnerProps {
    /**
     * RN View Style Props
     */
    style?: ViewStyle
    /**
     * Color of the spinner stroke
     * @default colors.tint
     */
    stroke?: string,
    /**
     * Width in pixels of the spinner
     * @default 5
     */
    strokeWidth?: number
    /**
     * Circumference of the spinner
     * @default 250
     */
    circumference?: number
}
export const LoadingSpinner = (props: LoadingSpinnerProps ) => {
    const { style: $styleOverride, 
        stroke: strokeOverride, 
        strokeWidth: strokeWidthOverride, 
        circumference: circumferenceOverride } = props;
        
    const circumference = circumferenceOverride || 250;
    const radius = circumference / (2 * Math.PI);
    const strokeWidth = strokeWidthOverride || 5;
    const halfCircle = radius + strokeWidth;
    const diameter = 2 * halfCircle;

    const progress = useSharedValue(0);
    const rotation = useSharedValue(0);


    useEffect(() => {
        startAnimation();
    }, [])

    const startAnimation = () => {
        progress.value = withTiming(0.6, {duration: 1000})
        
        progress.value = withRepeat(
            withSequence(
                withTiming(0.7, {duration: 800}),
                withTiming(0.1, {duration: 2000})
            ), -1, true
        );
    
        rotation.value = withRepeat(
            withTiming(360, { duration: 900, easing: Easing.linear}), -1, false
        )
      
    }

    const animatedCircleProps = useAnimatedProps(() => {
        return {
            strokeDashoffset: circumference * (1 - progress.value),
        }
    }, []);

    const animatedViewStyle = useAnimatedStyle(() => {
        return {
            transform: [{rotate: `${rotation.value}deg`}]
        }
    }, []);

    const $mainViewStyle = [
        $mainViewStyleDefault,
        $styleOverride
    ]
    
    const stroke = strokeOverride || colors.tint;
    
    return (
        <View style={$mainViewStyle}
        >
            <Animated.View style={animatedViewStyle}>
                <Svg width={diameter} height={diameter} viewBox={`0 0 ${diameter} ${diameter}`}>
                    <G origin={`${halfCircle}, ${halfCircle}`} rotation={'-90'}>
                        <AnimatedCircle
                            cx={'50%'}
                            cy={"50%"}
                            r={radius}
                            animatedProps={animatedCircleProps}
                            strokeWidth={strokeWidth}
                            stroke={stroke}
                            fill={'transparent'}
                            strokeDasharray={circumference}
                            />
                    </G>
                </Svg>
            </Animated.View>
        </View>
    )

}

const $mainViewStyleDefault : ViewStyle = {
    justifyContent: "center",
    alignItems: "center",
}
