import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import styles from './Styles';

export default function SignUpScreen () {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [secondName, setSecondName] = useState('');
  const [ID, setID] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [workArea, setWorkArea] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignIn = () => {
    console.log('Email:', email); 
    console.log('Password:', password);
  };

  return (
    <View style={styles.container}>
      <View style={styles.signUpBox}>
        <Text style={styles.title}>Create your account</Text>

        <TextInput
          placeholder="Email"
          style={styles.input}
          keyboardType="email-address"
          value={email} 
          onChangeText={setEmail} 
        />

        <TextInput
          placeholder="First name"
          style={styles.input}
          keyboardType="first-name"
          value={firstName} 
          onChangeText={setFirstName} 
        />

        <TextInput
          placeholder="Second name"
          style={styles.input}
          keyboardType="second-name"
          value={secondName} 
          onChangeText={setSecondName} 
        />

        <TextInput
          placeholder="ID"
          style={styles.input}
          keyboardType="ID"
          value={ID} 
          onChangeText={setID} 
        />   

        <TextInput
          placeholder="Phone number"
          style={styles.input}
          keyboardType="phone-number"
          value={phoneNumber} 
          onChangeText={setPhoneNumber} 
        />

        <TextInput
          placeholder="Work area"
          style={styles.input}
          keyboardType="work-area"
          value={workArea} 
          onChangeText={setWorkArea} 
        />      

        <TextInput
          placeholder="Password"
          style={styles.input}
          secureTextEntry
          value={password} 
          onChangeText={setPassword}
        />

        <TextInput
          placeholder="Confirm password"
          style={styles.input}
          secureTextEntry
          value={confirmPassword} 
          onChangeText={setConfirmPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleSignIn}>
          <Text style={styles.buttonText}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
