import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useState } from "react"
import { Dimensions, View, ViewStyle } from "react-native"
import { Screen, Text } from "app/components"
import { colors, spacing } from "../theme"
import { LoadingSpinner } from "../components/LoadingSpinner"
import { useAuth0 } from "react-native-auth0"
import { useStores } from "app/models"
import * as Location from "expo-location"
import { HomeTabScreenProps } from "app/navigators/types"
import MapView, { Callout, Marker, PROVIDER_GOOGLE, Region } from "react-native-maps"
import { TripMarkerCallout } from "app/components/TripMarker"
import { AppHeader } from "app/components/AppHeader"
import { getRecentPosts } from "app/services/api/postService/postService"

interface HomeScreenProps extends HomeTabScreenProps<"Home"> {}

export const HomeScreen: FC<HomeScreenProps> = observer(function HomeScreen(_props) {
  const { clearSession } = useAuth0()
  const {
    authenticationStore: { logout, tokenLoading, authToken },
    postStore,
  } = useStores()
  const [location, setLocation] = useState<Region | undefined>(undefined)
  const [errorMsg, setErrorMsg] = useState<string | undefined>(undefined)
  const [refreshing, setRefreshing] = useState(false)
  const screenWidth = Math.round(Dimensions.get("window").width)
  //  TODO: make this into a hook that can be used anywhere
  const queryLocation = async () => {
    let { status } = await Location.getForegroundPermissionsAsync()
    // checks current permission status and if not granted yet, requests permission
    if (status !== "granted") {
      status = (await Location.requestForegroundPermissionsAsync()).status
    }
    // checks permission status again if the user granted permission from the Location.requestForegroundPermissionsAsync() function.
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied")
      return
    }
    const location = await Location.getCurrentPositionAsync()
    setLocation({
      latitude: __DEV__ ? 43.1915008 : location.coords.latitude,
      longitude: __DEV__ ? -70.8476928 : location.coords.longitude,
      latitudeDelta: 0.75,
      longitudeDelta: 0.75,
    })
  }
  useEffect(() => {
    queryLocation()
    getRecentPosts(authToken ?? "").then((res) => {
      postStore.setPosts(res.data)
    })
  }, [])

  const handleLogout = async () => {
    try {
      logout()
      await clearSession()
    } catch (e) {
      console.log("Log out cancelled")
    }
  }

  const markers: JSX.Element[] = []
  postStore.postsGroupedByLocation.forEach((posts, locationKey) => {
    if (posts.length === 1) {
      markers.push(
        <Marker
          calloutAnchor={{ x: 0.5, y: 0 }}
          key={locationKey}
          coordinate={{
            latitude: Number(locationKey.split(",")[0]),
            longitude: Number(locationKey.split(",")[1]),
          }}
        >
          <Callout tooltip style={[$calloutContainerStyle, { maxWidth: screenWidth * 0.9 }]}>
            <TripMarkerCallout post={posts[0]} />
          </Callout>
        </Marker>,
      )
    }
    if (posts.length > 1) {
      const climbingTypes: string[] = []
      posts.forEach((post) => {
        if (!climbingTypes.includes(post.climbingType)) {
          climbingTypes.push(post.climbingType)
        }
      })
      markers.push(
        <Marker
          calloutAnchor={{ x: 0.5, y: 0 }}
          key={locationKey}
          coordinate={{
            latitude: Number(locationKey.split(",")[0]),
            longitude: Number(locationKey.split(",")[1]),
          }}
        >
          <Callout tooltip style={$calloutContainerStyle}>
            <View style={$calloutCardStyle}>
              <View style={$calloutHeader}>
                <Text preset="bold" size="xs" text={posts[0].location.name} />
                <Text size="xxs" text={`${posts.length} trips in this area`} />
              </View>
              <View style={$calloutBody}>
                <View style={$rowStyle}>
                  <Text size="xxs" text={"Climbing Types"} />
                  <Text style={$textStyle} size="xxs" text={climbingTypes.join(", ")} />
                </View>
              </View>
            </View>
          </Callout>
        </Marker>,
      )
    }
  })

  return tokenLoading ? (
    <>
      <LoadingSpinner circumference={100} style={$loadingSpinnerStyle} />
    </>
  ) : (
    <Screen preset="fixed" contentContainerStyle={$container}>
      <AppHeader />
      <View style={$topContainer}>
        {location ? (
          <View>
            <MapView provider={PROVIDER_GOOGLE} style={$mapStyle} region={location}>
              {markers}
            </MapView>
          </View>
        ) : (
          <View style={$loadingSpinnerStyle}>
            <Text preset="subheading" text="Fetching Location..." textColor={colors.tint} />
            <LoadingSpinner circumference={200} />
          </View>
        )}
        {/* <ListView<Post>
          contentContainerStyle={$listContentContainer}
          data={postStore.posts.slice()} // Using slice to create a copy of the array that is then used for the cards. Breaks if you don't do this
          estimatedItemSize={162}
          onRefresh={manualRefresh}
          refreshing={refreshing}
          renderItem={({ item }) => <PostCard post={item} />}
        /> */}
      </View>

      {/* <View style={[$bottomContainer, $bottomContainerInsets]}>
         <Text text="Location Data:" size="md" />
        {!errorMsg && !location && 
          <LoadingSpinner />
        }
        <Text text={errorMsg || "Location found!"}></Text> 
        <Button text="Logout" onPress={handleLogout} />
      </View> */}
    </Screen>
  )
})

const $loadingSpinnerStyle: ViewStyle = {
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  width: "100%",
}

const $container: ViewStyle = {
  height: "100%",
  backgroundColor: colors.background,
}

const $topContainer: ViewStyle = {
  marginTop: 0,
  flexGrow: 1,
  justifyContent: "center",
}
const $mapStyle: ViewStyle = {
  height: "100%",
  width: "100%",
}
const $calloutContainerStyle: ViewStyle = {
  minWidth: 250,
  margin: spacing.md,
  elevation: 10,
}
const $calloutCardStyle: ViewStyle = {
  elevation: 5,
  shadowColor: "black",
  borderRadius: 15,
  backgroundColor: colors.palette.neutral300,
}
const $calloutHeader: ViewStyle = {
  flexDirection: "row",
  margin: spacing.xs,
}

const $calloutBody: ViewStyle = {
  flex: 1,
  backgroundColor: colors.palette.neutral800,
  borderRadius: 15,
  paddingBottom: spacing.xs,
}
const $rowStyle: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  marginHorizontal: spacing.sm,
  marginTop: spacing.xxs,
}
const $textStyle: ViewStyle = {
  width: "100%",
}
