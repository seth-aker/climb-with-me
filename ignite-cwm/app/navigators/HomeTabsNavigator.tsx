import { CompositeScreenProps } from "@react-navigation/native"
import { BottomTabScreenProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import React from "react"
import { TextStyle, ViewStyle } from "react-native"
import { AppStackParamList, AppStackScreenProps } from "./AppNavigator"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { colors, spacing, typography } from "app/theme"
import { HomeScreen, ProfileScreen } from "app/screens"
import en from "app/i18n/en"
// import { translate } from "i18n-js"
import { Icon } from "app/components"
import { MessageScreen } from "app/screens/MessageScreen"
import { FriendsScreen } from "app/screens/FriendsScreen"

export type HomeTabParamList = {
    Home: undefined
    Messages: undefined
    Friends: undefined
    Profile: undefined
    NewClimb: undefined
}


export type HomeTabScreenProps<T extends keyof HomeTabParamList> = CompositeScreenProps<
    BottomTabScreenProps<HomeTabParamList, T>,
    AppStackScreenProps<keyof AppStackParamList>
    >

const Tab = createBottomTabNavigator<HomeTabParamList>();


export function HomeTabNavigator() {
    const { bottom } = useSafeAreaInsets();

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarHideOnKeyboard: true,
                tabBarStyle: [$tabBar, { height: bottom + 70}],
                tabBarActiveTintColor: colors.tint,
                tabBarInactiveTintColor: colors.textDim,
                tabBarLabelStyle: $tabBarLabel,
                tabBarItemStyle: $tabBarItem,
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    // TODO: Create Translation Options for the Label
                    // Ex: tabBarLabel: translate("homeNavigator.homeTab")
                    tabBarLabel: en.homeNavigator.homeTab,
                    tabBarIcon: ({ focused }) => (
                        // TODO: create real home icon
                        <Icon icon="house" color={focused ? colors.tint : colors.textDim} size={30} />
                    ),
                }}
            />
            <Tab.Screen
                name="Messages"
                component={MessageScreen}
                options={{
                    // TODO: Create Translation Options for the Label
                    // Ex: tabBarLabel: translate("homeNavigator.homeTab")
                    tabBarLabel: en.homeNavigator.messagesTab,
                    tabBarIcon: ({ focused }) => (
                        // TODO: create real home icon
                        <Icon icon="message" color={focused ? colors.tint : colors.textDim} size={30} />
                    ),
                }}
            />
            <Tab.Screen 
                name="Friends"
                component={FriendsScreen}
                options={{
                    tabBarLabel: en.homeNavigator.friendsTab,
                    tabBarIcon: ({ focused }) => (
                        <Icon icon="user-group" color={focused ? colors.tint : colors.textDim} size={30} />
                    )
                }}
            />
            <Tab.Screen 
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarLabel: en.homeNavigator.profileTab,
                    tabBarIcon: ({ focused }) => (
                        <Icon icon="user" color={focused ? colors.tint : colors.textDim} size={30} />
                    )
                }}
            />
        </Tab.Navigator>
    )
}


const $tabBar: ViewStyle = {
  backgroundColor: colors.background,
  borderTopColor: colors.transparent,
}
const $tabBarItem: ViewStyle = {
  paddingTop: spacing.md,
}

const $tabBarLabel: TextStyle = {
  fontSize: 12,
  fontFamily: typography.primary.medium,
  lineHeight: 16,
}
