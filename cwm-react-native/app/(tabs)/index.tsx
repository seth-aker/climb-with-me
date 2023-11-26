import { Pressable, StyleSheet } from 'react-native';
import { Text, View } from '../../components/Themed';
import SearchBar from '../../components/SearchBar';
import { CwmLogo } from '../../components/CwmLogo';
import { LoginButton } from '../../components/LoginButton';
import { LogoutButton } from '../../components/LogoutButton';
import { useAuth0 } from 'react-native-auth0';
import { Link } from 'expo-router';



export default function TabOneScreen() {
  const { user } = useAuth0();
  function handleSearch(query: string): void {
    throw new Error('Function not implemented.');
  }

  return (
    <View style={styles.container}>
      <SearchBar onSearch={handleSearch} />

      <View style={styles.contentContainer}>
        {!user && <View style={styles.buttons}>
          <LoginButton />
        </View>}
        {user && <View style={styles.buttons}>
          <LogoutButton />
        </View>}
      <CwmLogo width='75px' height='75px' fill='#567944' />
        <Text style={styles.title}>Let's Climb!</Text>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <Text>Find Climbers in your Area</Text>
        <Link href="/register" asChild>
          <Pressable>
            <Text>Register</Text>
          </Pressable>
        </Link>
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
  buttons: {
    width: '15%',
    height: '5%',
    backgroundColor: '#567944'
  }
});
