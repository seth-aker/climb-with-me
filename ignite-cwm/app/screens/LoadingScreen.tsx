import React, { useEffect } from "react"
import Animated, { useAnimatedProps, useAnimatedStyle, useSharedValue, withRepeat, withSequence, withTiming} from "react-native-reanimated"
import { Screen } from "app/components"
import { Svg, Circle, G} from 'react-native-svg';
import { Easing } from "react-native";
import { colors } from "app/theme";
import { AppStackScreenProps } from "app/navigators";
import { observer } from "mobx-react-lite";

interface LoadingScreenProps extends AppStackScreenProps<"Loading"> {}
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export const LoadingScreen: React.FC<LoadingScreenProps> = observer(function LoadingScreen(_props) {
    const circumference = 500;
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
        progress.value = withRepeat(withSequence(
            withTiming(0.7, {duration: 800}),
            withTiming(0.1, {duration: 2000})
        ), -1, true);

        rotation.value = withRepeat(
            withTiming(360, { duration: 900, easing: Easing.linear}), -1, false
        );
    };

    const animatedCircleProps = useAnimatedProps(() => {
        return {
            strokeDashoffset: circumference * (1 - progress.value),
        }
    }, []);

    const animatedViewStyle = useAnimatedStyle(() => {
        return {
            transform: [{rotate: rotation.value + 'deg'}]
        }
    }, []);

    return (
        <Screen
            preset="auto"
            safeAreaEdges={["top", "bottom"]}
        >
            <Animated.View style={animatedViewStyle}>
                <Svg width={diameter} height={diameter} viewBox={`0 0 ${diameter} ${diameter}`}>
                    <G origin={`${halfCircle}, ${halfCircle}`} rotation={'-90'}>
                        <AnimatedCircle
                            cx={'50%'}
                            cy={'50%'}
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
        </Screen>
    )

}
)