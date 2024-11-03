// views/User_Login_View
import styles from '../assets/Styles/Styles';
import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import { AuthContext } from '../AuthContext';
import { useNavigation } from '@react-navigation/native';
import { handleSignIn } from '../controllers/USER_Login_Controller.js';

const logo = require('../assets/Logo.jpg');

export default function USER_Login_View() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useContext(AuthContext);
  const navigation = useNavigation();

  const onSignInPress = () => {
    handleSignIn(email, password, signIn);
  };

  return (
    <View style={styles.container}>
      {/* Add the logo above the sign-in box */}
      <Image source={logo} style={styles.logo} resizeMode="contain" />

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

        <TouchableOpacity style={styles.button} onPress={onSignInPress}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.linkText}>Don't have an account? Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
