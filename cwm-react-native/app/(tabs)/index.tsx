import { StyleSheet } from 'react-native';
import { Text, View } from '../../components/Themed';
import SearchBar from '../../components/SearchBar';
import { CwmLogo } from '../../components/CwmLogo';

export default function TabOneScreen() {
  function handleSearch(query: string): void {
    throw new Error('Function not implemented.');
  }

  return (
    <View style={styles.container}>
      <SearchBar onSearch={handleSearch} />

      <View style={styles.contentContainer}>
        <CwmLogo width='75px' height='75px' fill='#567944' />
        <Text style={styles.title}>Let's Climb!</Text>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <Text>Find Climbers in your Area</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start', // Adjusted to start from the top
    paddingTop: 20, // Added padding to give space at the top
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#567944',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
