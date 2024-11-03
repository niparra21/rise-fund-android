import styles from '../assets/Styles/Styles';
import { executeProcedure } from '../database/apiService';

import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import { AuthContext } from '../AuthContext';
import { useNavigation } from '@react-navigation/native';

const logo = require('../assets/Logo.jpg');

export default function USER_Login_View() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useContext(AuthContext);
  const navigation = useNavigation();

  const handleSignIn = async () => {
    try {
      const procedureName = 'sp_get_user_id_by_email_password';
      const params = { Email: email, Password: password };
      const result = await executeProcedure(procedureName, params);
      if (result[0].length !== 0) {
        signIn(result[0][0].ID);
      } else {
        console.log('Credenciales inválidas');
        Alert.alert(
          'Invalid Credentials',
          'The email or password you entered is incorrect. Please try again.',
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      console.error('Error iniciando sesión:', error);
    }
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

        <TouchableOpacity style={styles.button} onPress={handleSignIn}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.linkText}>Don't have an account? Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
