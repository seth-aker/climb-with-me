import React, { useEffect } from "react"
import Animated, {  useAnimatedProps, useAnimatedStyle, useSharedValue, withRepeat, withSequence, withTiming, Easing} from "react-native-reanimated"
import { Svg, Circle, G} from 'react-native-svg';
import { View, ViewStyle } from "react-native";
import { colors } from "app/theme";




const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export const LoadingScreen = () => {
    const circumference = 250;
    const radius = circumference / (2 * Math.PI);
    const strokeWidth = 5;
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
                            stroke={colors.tint}
                            fill={'transparent'}
                            strokeDasharray={circumference}
                            />
                    </G>
                </Svg>
            </Animated.View>
        </View>
    )

}

const $mainViewStyle : ViewStyle = {
    justifyContent: "center",
    alignItems: "center",
}
