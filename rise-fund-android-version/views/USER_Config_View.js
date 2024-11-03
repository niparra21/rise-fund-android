import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import styles from '../assets/Styles/Styles';
import { AuthContext } from '../AuthContext';
import { getUserInfo, verifyAndUpdateUserInfo } from '../controllers/USER_Config_Controller';

export default function USER_Config_View() {
  const { userID } = useContext(AuthContext);

  // Estados para los diferentes campos
  const [userId, setUserId] = useState('');
  const [roleId, setRoleId] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [secondName, setSecondName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [workArea, setWorkArea] = useState('');
  const [status, setStatus] = useState('');
  
  // Estado para la contraseña guardada y la contraseña introducida
  const [storedPassword, setStoredPassword] = useState(''); // Contraseña original para verificación futura
  const [password, setPassword] = useState(''); // Contraseña introducida por el usuario
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const [accountNumber, setAccountNumber] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [securityNumber, setSecurityNumber] = useState('');

  const [balanceAccountNumber, setBalanceAccountNumber] = useState('');
  const [accountBalance, setAccountBalance] = useState('');
  const [addAmount, setAddAmount] = useState('');

  // Cargar información del usuario cuando el componente se monta
  useEffect(() => {
    const fetchUserInfo = async () => {
      const userInfo = await getUserInfo(userID);
      if (userInfo) {
        setUserId(userInfo.ID.toString());
        setRoleId(userInfo.RoleId.toString());
        setEmail(userInfo.Email);
        setFirstName(userInfo.FirstName);
        setSecondName(userInfo.SecondName);
        setPhoneNumber(userInfo.PhoneNumber);
        setWorkArea(userInfo.WorkArea);
        setStatus(userInfo.Status);
        setStoredPassword(userInfo.Password);
      }
    };

    fetchUserInfo();
  }, [userID]);

  // Funciones onPress para cada botón
  const handleUpdateUserInfo = async  () => {
    const result = await verifyAndUpdateUserInfo(
      userId,
      roleId,
      email,
      firstName,
      secondName,
      phoneNumber,
      workArea,
      password,
      newPassword,
      confirmNewPassword,
      storedPassword,
      status
    );
    Alert.alert('Update Info', result.message);
  };

  const handleUpdatePaymentInfo = () => {
    Alert.alert('Update Info', 'Payment info updated successfully!');
  };

  const handleConfirmFunds = () => {
    Alert.alert('Confirm', `Funds added: $${addAmount}`);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {/* User Config Section */}
      <View style={styles.genericBox}>
        <Text style={styles.title}>User Config</Text>
        
        <Text style={styles.label}>User ID</Text>
        <TextInput style={styles.input} value={userId} placeholder="User ID" editable={false} />

        <Text style={styles.label}>Role ID</Text>
        <TextInput style={styles.input} value={roleId} placeholder="Role ID" editable={false} />

        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Email" keyboardType="email-address" />

        <Text style={styles.label}>First Name</Text>
        <TextInput style={styles.input} value={firstName} onChangeText={setFirstName} placeholder="First Name" />

        <Text style={styles.label}>Second Name</Text>
        <TextInput style={styles.input} value={secondName} onChangeText={setSecondName} placeholder="Second Name" />

        <Text style={styles.label}>Phone Number</Text>
        <TextInput style={styles.input} value={phoneNumber} onChangeText={setPhoneNumber} placeholder="Phone number" keyboardType="phone-pad" />

        <Text style={styles.label}>Work Area</Text>
        <TextInput style={styles.input} value={workArea} onChangeText={setWorkArea} placeholder="Work Area" />

        <Text style={styles.label}>Status</Text>
        <TextInput style={styles.input} value={status ? 'Active' : 'Blocked'} editable={false} placeholder="Status" />

        {/* Campo para que el usuario introduzca su contraseña actual */}
        <Text style={styles.label}>Old Password</Text>
        <TextInput 
          style={styles.input} 
          value={password} 
          onChangeText={setPassword} 
          placeholder="Old Password" 
          secureTextEntry 
        />

        <Text style={styles.label}>New Password</Text>
        <TextInput 
          style={styles.input} 
          value={newPassword} 
          onChangeText={setNewPassword} 
          placeholder="New Password" 
          secureTextEntry 
        />

        <Text style={styles.label}>Confirm New Password</Text>
        <TextInput 
          style={styles.input} 
          value={confirmNewPassword} 
          onChangeText={setConfirmNewPassword} 
          placeholder="Confirm New Password" 
          secureTextEntry 
        />

        <TouchableOpacity style={styles.button} onPress={handleUpdateUserInfo}>
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

        <TouchableOpacity style={styles.button} onPress={handleUpdatePaymentInfo}>
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

        <TouchableOpacity style={styles.button} onPress={handleConfirmFunds}>
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
