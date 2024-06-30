import { Screen, Text } from "app/components";
import { HomeTabScreenProps } from "app/navigators";
import { spacing } from "app/theme";
import { observer } from "mobx-react-lite";
import React, { FC } from "react";
import { ViewStyle, TextStyle } from "react-native";
import { FriendCard } from "app/components/FriendCard"; 

interface FriendsScreenProps extends HomeTabScreenProps<"Friends"> {}

//
// Mock data for friends, delete this once we're hooked up to the API
//

const friends = [
  { id: 1, name: "Ellie", numberOfClimbs: "40", avatar: "https://static.wikia.nocookie.net/thelastofus/images/3/34/Part_II_Ellie_infobox.png/revision/latest/scale-to-width-down/1200?cb=20230215221019" },
  { id: 2, name: "David", numberOfClimbs: "32", avatar: "https://static.wikia.nocookie.net/thelastofus/images/3/3c/Part_I_David_infobox.png/revision/latest?cb=20230222041515" },
  { id: 3, name: "Jess", numberOfClimbs: "30", avatar: "https://static.wikia.nocookie.net/thelastofus/images/9/92/Part_II_Jesse_infobox.png/revision/latest?cb=20230215214214" },
  { id: 4, name: "Jane", numberOfClimbs: "27", avatar: "https://static.wikia.nocookie.net/thelastofus/images/f/f0/Part_II_Tommy_infobox.png/revision/latest?cb=20230216035810" },
  { id: 5, name: "Normande", numberOfClimbs: "15", avatar: "https://static.wikia.nocookie.net/thelastofus/images/2/2f/Part_I_Bill_infobox.png/revision/latest?cb=20230215182523" },
];

//
// Now init the screen and put the friends there
//

export const FriendsScreen: FC<FriendsScreenProps> = observer(function FriendsScreen(_props) {
  return (
    <Screen preset="fixed" safeAreaEdges={["top"]} contentContainerStyle={$screenContainer}>
      <Text text="Friends List" style={$headerText} />
      {friends.map(friend => (
        <FriendCard key={friend.id} name={friend.name} avatar={friend.avatar} numberOfClimbs={friend.numberOfClimbs} />
      ))}
    </Screen>
  );
});



const $screenContainer: ViewStyle = {
  paddingTop: spacing.md,
  flex: 1,
  alignItems: "center",
};

const $headerText: TextStyle = {
  fontSize: 24,
  marginBottom: spacing.lg,
};

export default FriendsScreen;
