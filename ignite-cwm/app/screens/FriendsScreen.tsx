import { Screen, Text } from "app/components";
import { HomeTabScreenProps } from "app/navigators";
import { spacing } from "app/theme";
import { observer } from "mobx-react-lite";
import React, { FC } from "react";
import { View, Image, ViewStyle, TextStyle, ImageStyle, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';

interface FriendsScreenProps extends HomeTabScreenProps<"Friends"> {}

// Mock data for friends
const friends = [
  { id: 1, name: "Ellie", avatar: "https://static.wikia.nocookie.net/thelastofus/images/3/34/Part_II_Ellie_infobox.png/revision/latest/scale-to-width-down/1200?cb=20230215221019" },
  { id: 2, name: "David", avatar: "https://static.wikia.nocookie.net/thelastofus/images/3/3c/Part_I_David_infobox.png/revision/latest?cb=20230222041515" },
  { id: 3, name: "Jess", avatar: "https://static.wikia.nocookie.net/thelastofus/images/9/92/Part_II_Jesse_infobox.png/revision/latest?cb=20230215214214" },
  { id: 4, name: "Jane", avatar: "https://static.wikia.nocookie.net/thelastofus/images/f/f0/Part_II_Tommy_infobox.png/revision/latest?cb=20230216035810" },
  { id: 5, name: "Normande", avatar: "https://static.wikia.nocookie.net/thelastofus/images/2/2f/Part_I_Bill_infobox.png/revision/latest?cb=20230215182523" },
];

// Now init the screen and put the friends there
export const FriendsScreen: FC<FriendsScreenProps> = observer(function FriendsScreen(_props) {
  return (
    <Screen preset="fixed" safeAreaEdges={["top"]} contentContainerStyle={$screenContainer}>
      <Text text="Friends List" style={$headerText} />
      {friends.map(friend => (
        <Friend key={friend.id} name={friend.name} avatar={friend.avatar} />
      ))}
    </Screen>
  );
});

// Individual friend component
const Friend: FC<{ name: string; avatar: string }> = ({ name, avatar }) => {
  return (
    <View style={$friendContainer}>
      <Image source={{ uri: avatar }} style={$avatar} />
      <Text text={name} style={$friendName} />
      <View style={$iconsContainer}>
        <TouchableOpacity onPress={() => console.log(`Message ${name}`)}>
          <Icon name="message" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log(`Info about ${name}`)}>
          <Icon name="info" size={24} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const $screenContainer: ViewStyle = {
  paddingTop: spacing.md,
  flex: 1,
  alignItems: "center",
};

// Some simple styles. Change these as needed.
const $headerText: TextStyle = {
  fontSize: 24,
  marginBottom: spacing.lg,
};

const $friendContainer: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  marginBottom: spacing.md,
  marginLeft: spacing.md,
  width: "100%",
  paddingHorizontal: spacing.md,
  borderWidth: 1,
  borderColor: "#ccc",
  borderRadius: 10,
  paddingVertical: spacing.sm,
  backgroundColor: "#f9f9f9",
};

const $friendName: TextStyle = {
  marginLeft: spacing.md,
  fontSize: 18,
  flex: 1,  // To take up remaining space
};

const $avatar: ImageStyle = {
  width: 50,
  height: 50,
  borderRadius: 25,
  borderWidth: 1,
  borderColor: "#ccc",
};

const $iconsContainer: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  width: 60,
  marginLeft: spacing.md,
};

export default FriendsScreen;
