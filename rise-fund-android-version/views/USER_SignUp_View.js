import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView} from 'react-native';
import styles from '../assets/Styles/Styles';
import addUser from '../controllers/USER_SignUp_Controller';
import { handleSignIn } from '../controllers/USER_Login_Controller.js';
import { AuthContext } from '../AuthContext';

export default function USER_SignUp_View() {
  const [ID, setID] = useState('');
  const [firstName, setFirstName] = useState('');
  const [secondName, setSecondName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [workArea, setWorkArea] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { signIn } = useContext(AuthContext);

  const handleSignUp = async () => {
    if (!ID || !firstName || !secondName || !email || !phoneNumber || !workArea || !password || !confirmPassword) {
      Alert.alert('Missing Fields', 'Please fill in all fields.');
      return;
    }

    if (ID.length !== 10) {
      Alert.alert('Invalid ID', 'ID must be exactly 10 digits.');
      return;
    }

    if (phoneNumber.length !== 8) {
      Alert.alert('Invalid Phone Number', 'Phone number must be exactly 8 digits.');
      return;
    }

    if (!email.endsWith('@estudiantec.cr')) {
      Alert.alert('Invalid Email', 'Email must end with @estudiantec.cr');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Passwords do not match', 'Please make sure the passwords are the same.');
      return;
    }

    try {
      const newUser = {
        ID: parseInt(ID),
        RoleId: 1,
        Email: email,
        FirstName: firstName,
        SecondName: secondName,
        PhoneNumber: phoneNumber,
        WorkArea: workArea,
        Password: password,
        Status: 1
      };

      const result = await addUser(newUser);

      if (result[0].length !== 0) {
        Alert.alert('Account created');
        handleSignIn(email, password, signIn);
      } else {
        Alert.alert('SignUp failed', 'Could not create your account.');
      }
    } catch (error) {
      console.error('Error during signup:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.signUpBox}>
          <Text style={styles.title}>Create your account</Text>

          <TextInput
            placeholder="ID"
            style={styles.input}
            keyboardType="number-pad"
            maxLength={10}
            value={ID}
            onChangeText={(text) => setID(text.replace(/[^0-9]/g, ''))}
          />

          <TextInput
            placeholder="First name"
            style={styles.input}
            maxLength={200}
            value={firstName}
            onChangeText={(text) => setFirstName(text.replace(/[^A-Za-z]/g, ''))}
          />

          <TextInput
            placeholder="Second name"
            style={styles.input}
            maxLength={200}
            value={secondName}
            onChangeText={(text) => setSecondName(text.replace(/[^A-Za-z]/g, ''))}
          />

          <TextInput
            placeholder="Email"
            style={styles.input}
            keyboardType="email-address"
            maxLength={200}
            value={email}
            onChangeText={setEmail}
          />

          <TextInput
            placeholder="Phone number"
            style={styles.input}
            keyboardType="phone-pad"
            maxLength={8}
            value={phoneNumber}
            onChangeText={(text) => setPhoneNumber(text.replace(/[^0-9]/g, ''))}
          />

          <TextInput
            placeholder="Work area"
            style={styles.input}
            maxLength={510}
            value={workArea}
            onChangeText={setWorkArea}
          />

          <TextInput
            placeholder="Password"
            style={styles.input}
            secureTextEntry
            maxLength={100}
            value={password}
            onChangeText={setPassword}
          />

          <TextInput
            placeholder="Confirm password"
            style={styles.input}
            secureTextEntry
            maxLength={100}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />

          <TouchableOpacity style={styles.button} onPress={handleSignUp}>
            <Text style={styles.buttonText}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
