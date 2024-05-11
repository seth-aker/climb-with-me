import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
    button: {
        padding: 5,
        backgroundColor: '#567944',
        borderRadius: 5,
        shadowColor: '#333333',
        shadowOffset: {width: -5, height: 5},
        shadowOpacity: 0.7,
        shadowRadius: 5,
        textAlign: 'center',
        margin: 5
    },
    textLight: {
        color: "#F5F5F5"
    },
    registerForm: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
        marginTop: 10,
    }, 
    inputLine: {
        width: '90%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start'
    },
    inputTitle: {
        display: 'flex',
        flexDirection: 'row'
    },
    input: {
        marginBottom: 5,
        padding: 5,
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 5
    },
    error: {
        color: 'red'
    },
    inputErrorState: {
        borderColor: 'red'
    }
})



