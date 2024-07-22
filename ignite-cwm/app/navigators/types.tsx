import { BottomTabScreenProps } from "@react-navigation/bottom-tabs"
import { CompositeScreenProps, NavigationProp, NavigatorScreenParams } from "@react-navigation/native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"

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

