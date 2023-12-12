import { StyleSheet } from 'react-native';
import { Text, View } from '../../components/Themed';
import SearchBar from '../../components/SearchBar';
import { CwmLogo } from '../../components/CwmLogo';
import Button from '../../components/Button'
import { useAuth0 } from 'react-native-auth0';
import { router } from 'expo-router';
import { useToken } from '../../hooks/useToken';


//These login components are probably in the wrong spot but they are here for now.


export default function TabOneScreen() {
  const { user, authorize, clearSession} = useAuth0();
  const { setAccessToken, getToken } = useToken();
  
  function handleSearch(query: string): void {
    throw new Error('Function not implemented.');
  }

  const handleLogin = async () => {
      try {
          authorize();
          const token = await getToken();
          setAccessToken(token)
      } catch (e) {
          console.log(e);
      }
  };

  const handleLogout = async () => {
      try {
          await clearSession();
          setAccessToken(undefined)
      } catch (e) {
          console.log(e);
      }
  }
  
  const handleRegister = () => {
    
    router.push("/register/")
  }
  return (
    <View style={styles.container}>
      <SearchBar onSearch={handleSearch} />

      <View style={styles.contentContainer}>
      <CwmLogo width='75px' height='75px' fill='#567944' />
        <Text style={styles.title}>Let's Climb!</Text>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <Text>Find Climbers in your Area</Text>
        {!user && <View style={styles.buttons}>
          <Button text='Login' onPress={handleLogin} style={styles.button}/>
        </View>}
        {user && <View style={styles.buttons}>
          <Button text="Logout" onPress={handleLogout} style={styles.button} />
        </View>}       
        <View style={[styles.buttons, {width: '20%'}]}>
          <Button text="Register" style={styles.button} onPress={handleRegister}></Button>
        </View>
        
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
    margin: 5,
    borderRadius: 5,
    width: '15%',
    height: 25,
    backgroundColor: '#567944',
  },
  button: {
    paddingLeft: 5,
    paddingRight: 5,
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  
    }
});
