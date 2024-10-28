import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import styles from './Styles';

export default function SignInScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    console.log('Email:', email); 
    console.log('Password:', password);
  
    // Navega al "HomeTabs" en lugar de "Home"
    navigation.navigate('HomeTabs');
  };

  return (
    <View style={styles.container}>
      <View style={styles.signInBox}>
        <Text style={styles.title}>Sign In</Text>

        <TextInput
          placeholder="Email"
          style={styles.input}
          keyboardType="email-address"
          value={email} 
          onChangeText={setEmail} 
        />

        <TextInput
          placeholder="Password"
          style={styles.input}
          secureTextEntry
          value={password} 
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleSignIn}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.linkText}>Dont have an account? Sing up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};