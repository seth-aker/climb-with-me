import { BottomTabScreenProps } from "@react-navigation/bottom-tabs"
import { CompositeScreenProps, NavigationProp, NavigatorScreenParams } from "@react-navigation/native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 *   https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type AppStackParamList = {
  HomeTabs: NavigatorScreenParams<HomeTabParamList>
  PostScreen: undefined
  Login: undefined
  // 🔥 Your screens go here
  // IGNITE_GENERATOR_ANCHOR_APP_STACK_PARAM_LIST
}

export type HomeTabParamList = {
    Home: undefined
    Messages: undefined
    Friends: undefined
    Profile: undefined

}

export type AppStackScreenProps<T extends keyof AppStackParamList> = NativeStackScreenProps<
  AppStackParamList,
  T
>

export type HomeTabScreenProps<T extends keyof HomeTabParamList> = CompositeScreenProps<
    BottomTabScreenProps<HomeTabParamList, T>,
    AppStackScreenProps<keyof AppStackParamList>
    >

export type RootStackNavigation = NavigationProp<AppStackParamList>

