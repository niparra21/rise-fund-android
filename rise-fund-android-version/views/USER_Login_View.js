
import styles from '../assets/Styles/Styles';

import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { AuthContext } from '../AuthContext';

export default function USER_Login_View() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useContext(AuthContext);

  const handleSignIn = () => {
    console.log('Email:', email); 
    console.log('Password:', password);

    // Cambia isSignedIn a true en el contexto
    signIn();
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

