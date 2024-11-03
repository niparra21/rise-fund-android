// USER_Config_View.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import styles from '../assets/Styles/Styles';

const logo = require('../assets/Logo.jpg');

export default function USER_Config_View() {
  // Estados para los diferentes campos
  const [userId, setUserId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [secondName, setSecondName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [workArea, setWorkArea] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const [accountNumber, setAccountNumber] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [securityNumber, setSecurityNumber] = useState('');

  const [balanceAccountNumber, setBalanceAccountNumber] = useState('');
  const [accountBalance, setAccountBalance] = useState('');
  const [addAmount, setAddAmount] = useState('');

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {/* User Config Section */}
      <View style={styles.genericBox}>
        <Text style={styles.title}>User Config</Text>
        
        <Text style={styles.label}>User ID</Text>
        <TextInput style={styles.input} value={userId} onChangeText={setUserId} placeholder="User ID" />

        <Text style={styles.label}>First Name</Text>
        <TextInput style={styles.input} value={firstName} onChangeText={setFirstName} placeholder="First Name" />

        <Text style={styles.label}>Second Name</Text>
        <TextInput style={styles.input} value={secondName} onChangeText={setSecondName} placeholder="Second Name" />

        <Text style={styles.label}>Phone Number</Text>
        <TextInput style={styles.input} value={phoneNumber} onChangeText={setPhoneNumber} placeholder="Phone number" keyboardType="phone-pad" />

        <Text style={styles.label}>Work Area</Text>
        <TextInput style={styles.input} value={workArea} onChangeText={setWorkArea} placeholder="Work Area" />

        <Text style={styles.label}>Old Password</Text>
        <TextInput style={styles.input} value={oldPassword} onChangeText={setOldPassword} placeholder="Old Password" secureTextEntry />

        <Text style={styles.label}>New Password</Text>
        <TextInput style={styles.input} value={newPassword} onChangeText={setNewPassword} placeholder="New Password" secureTextEntry />

        <Text style={styles.label}>Confirm New Password</Text>
        <TextInput style={styles.input} value={confirmNewPassword} onChangeText={setConfirmNewPassword} placeholder="Confirm New Password" secureTextEntry />

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Update Info</Text>
        </TouchableOpacity>
      </View>

      {/* Payment Config Section */}
      <View style={styles.genericBox}>
        <Text style={styles.title}>Payment Config</Text>

        <Text style={styles.label}>Account Number</Text>
        <TextInput style={styles.input} value={accountNumber} onChangeText={setAccountNumber} placeholder="Account Number" keyboardType="numeric" />

        <Text style={styles.label}>Card Number</Text>
        <TextInput style={styles.input} value={cardNumber} onChangeText={setCardNumber} placeholder="Card Number" keyboardType="numeric" />

        <Text style={styles.label}>Expiration Date</Text>
        <TextInput style={styles.input} value={expirationDate} onChangeText={setExpirationDate} placeholder="mm/yy" />

        <Text style={styles.label}>Security Number</Text>
        <TextInput style={styles.input} value={securityNumber} onChangeText={setSecurityNumber} placeholder="Security Number" secureTextEntry keyboardType="numeric" />

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Update Info</Text>
        </TouchableOpacity>
      </View>

      {/* Monetary Account Config Section */}
      <View style={styles.genericBox}>
        <Text style={styles.title}>Monetary Account Config</Text>

        <Text style={styles.label}>Account Number</Text>
        <TextInput style={styles.input} value={balanceAccountNumber} onChangeText={setBalanceAccountNumber} placeholder="Account Number" keyboardType="numeric" />

        <Text style={styles.label}>Account Balance</Text>
        <TextInput style={styles.input} value={accountBalance} onChangeText={setAccountBalance} placeholder="Account balance" editable={false} />

        <Text style={styles.label}>Add Funds</Text>
        <TextInput style={styles.input} value={addAmount} onChangeText={setAddAmount} placeholder="$0.00" keyboardType="numeric" />

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
