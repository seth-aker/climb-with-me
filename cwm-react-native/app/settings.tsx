import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <View style={styles.separator} />

      {/* Individual Settings */}
      <View style={styles.settingContainer}>
        <Text style={styles.settingText}>Dark Mode</Text>
        <Switch
          value={false} // Set the actual value based on user preference
          onValueChange={(newValue) => {
            // Handle the switch change
          }}
        />
      </View>

      <View style={styles.settingContainer}>
        <Text style={styles.settingText}>Notifications</Text>
        <Switch
          value={true} // Set the actual value based on user preference
          onValueChange={(newValue) => {
            // Handle the switch change
          }}
        />
      </View>

      {/* Add more settings as needed */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 16,
  },
  settingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  settingText: {
    fontSize: 16,
  },
});
