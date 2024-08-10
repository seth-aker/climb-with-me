import { StyleSheet } from 'react-native';
import { Text, View } from '../../components/Themed';
import SearchBar from '../../components/SearchBar';
import { CwmLogo } from '../../components/CwmLogo';
import Button from '../../components/CustomButton'
import { useAuth0 } from 'react-native-auth0';
import { router } from 'expo-router';
import { useToken } from '../../hooks/useToken';
import { useEffect } from 'react';
import {styles as baseStyles } from '../../styles/base'
import jwtDecode from 'jwt-decode'
import { registerNewUser } from '../../service/RegisterService';
import { convertUser } from 'react-native-auth0/src/utils/userConversion'
//These login components are probably in the wrong spot but they are here for now.


export default function TabOneScreen() {
  const { user, authorize, clearSession} = useAuth0();
  const { setAccessToken, getToken } = useToken();
  
  useEffect(() => {
    if(user) {
      // console.log("user exists")
      getToken().then((response) => {
        setAccessToken(response);
      });
    }
  }, [])

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
  
  const handleRegister = async () => {
    try {
      const cred = await authorize({audience: "http://localhost:8080", additionalParameters: {"screen_hint": "signup"}})
      if(cred) {
        const result = await registerNewUser(cred.accessToken, convertUser(jwtDecode(cred.idToken)))
        console.log(`Registration Result: ${JSON.stringify(result)}`)
        if(result.status === 201) {
          router.push("/register")
        } else {
          //const error message: result.statusText
          //router.push("/someErrorPage")
        }
      }
      
    } catch (error) {
      console.log(error)
    }
    
  }
  return (
    <View style={styles.container}>
      <CwmLogo width='75px' height='75px' fill='#567944' />
        <Text style={styles.title}>Let's Climb!</Text>
      <SearchBar onSearch={handleSearch} />

      <View style={styles.contentContainer}>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <Text>Find Climbers in your Area</Text>
        
        {!user &&<Button text='Login' onPress={handleLogin} style={baseStyles.button}/>}
        {user && <Button text="Logout" onPress={handleLogout} style={baseStyles.button} />}       
        <Button text="Register" style={baseStyles.button} onPress={handleRegister}></Button>
        
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
  }
});
