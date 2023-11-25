import { useState } from 'react';
import { TextInput, View, StyleSheet } from 'react-native';

export function RegisterPage() {
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [primaryPhone, setPrimaryPhone] = useState(0);
    const [gender, setGender] = useState('');


}