import { observer } from "mobx-react-lite"
import React, { FC, useState } from "react"
import { View, ViewStyle } from "react-native"
import { Button, Header, ListView, Screen} from "app/components"
import { colors, spacing } from "../theme"
import { useSafeAreaInsetsStyle } from "../utils/useSafeAreaInsetsStyle"
import { LoadingSpinner } from "../components/LoadingSpinner"
import { useAuth0 } from "react-native-auth0"
import { useStores } from "app/models"
// import * as Location from "expo-location"
import { NewClimbModal } from "app/components/NewClimbModal"
import { Post } from "app/models/Post"
import { PostCard } from "app/components/PostCard"
import { ContentStyle } from "@shopify/flash-list"
import { HomeTabScreenProps } from "app/navigators/types"

// const welcomeLogo = require("../../assets/images/logo.png")


interface HomeScreenProps extends HomeTabScreenProps<"Home"> {
}

export const HomeScreen: FC<HomeScreenProps> = observer(function HomeScreen(_props
) {
  const { navigation } = _props;
  const $bottomContainerInsets = useSafeAreaInsetsStyle(["bottom"])
  const { clearSession } = useAuth0();
  const { authenticationStore: { logout, tokenLoading }, postStore} = useStores();
  // const [location, setLocation] = useState<Location.LocationObject | undefined>(undefined)
  // const [errorMsg, setErrorMsg] = useState<string | undefined>(undefined);
  
  const [newPostModalVis, setNewPostModalVis] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // TODO: make this into a hook that can be used anywhere
  // useEffect(() => {
  //   (async () => {
  //     let { status } = await Location.getForegroundPermissionsAsync();
  //     // checks current permission status and if not granted yet, requests permission 
  //     if(status !== "granted") {
  //       status = (await Location.requestForegroundPermissionsAsync()).status
  //     }
  //     // checks permission status again if the user granted permission from the Location.requestForegroundPermissionsAsync() function. 
  //     if(status !== "granted") {
  //       setErrorMsg('Permission to access location was denied');
  //       return;
  //     }
  //     const location = await Location.getCurrentPositionAsync();
  //     setLocation(location);
  //   })();
  // }, [])



  const handleLogout = async () => {
    try {
      logout();
      await clearSession();
      navigation.navigate("Login")
  } catch (e) {
    console.log("Log out cancelled")
  }
}

const manualRefresh = async () => {
  setRefreshing(true);
  await postStore.fetchPosts();
  setRefreshing(false)
}

  return (
    tokenLoading ? 
    <>
      <LoadingSpinner />
    </> : (
    <Screen preset="fixed" style={$container} safeAreaEdges={[ "bottom"]}>
      <Header 
        containerStyle={$headerStyle}
        backgroundColor={colors.palette.primary500}/>
      <View style={$topContainer}>
         <ListView<Post>
          contentContainerStyle={$listContentContainer}
          data={postStore.posts.slice()} // Using slice to create a copy of the array that is then used for the cards. Breaks if you don't do this         
          estimatedItemSize={100}
          onRefresh={manualRefresh}
          refreshing={refreshing}
          renderItem={({ item }) => (
            <PostCard 
              post={item}
            />
          )}
        />
      <NewClimbModal visible={newPostModalVis} setVisible={setNewPostModalVis}/>
      </View>

    <View style={[$bottomContainer, $bottomContainerInsets]}>
        {/* <Text text="Location Data:" size="md" />
        {!errorMsg && !location && 
          <LoadingSpinner />
        }
        <Text text={errorMsg || "Location found!"}></Text> */}
        <Button text="Create New Post" onPress={() => setNewPostModalVis(true)} />
        <Button text="Logout" onPress={handleLogout} />
      </View>
    </Screen>
  )
)
})

const $container: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background,
}
const $headerStyle: ViewStyle ={
  marginBottom: 0,

}
const $topContainer: ViewStyle = {
  marginTop: 0,
  flexShrink: 1,
  flexGrow: 1,
  flexBasis: "75%",
  justifyContent: "center",
  
}

const $listContentContainer: ContentStyle = {
  paddingTop: spacing.sm,
  paddingBottom: spacing.lg,
}

const $bottomContainer: ViewStyle = {
  flexShrink: 1,
  flexGrow: 0,
  flexBasis: "25%",
  backgroundColor: colors.palette.neutral100,
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
  justifyContent: "space-around",
}
// const $welcomeLogo: ImageStyle = {
//   height: 88,
//   width: "100%",
//   marginBottom: spacing.xxl,
// }

// const $welcomeHeading: TextStyle = {
//   marginBottom: spacing.md,
// }
