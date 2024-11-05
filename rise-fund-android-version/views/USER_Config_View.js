import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import styles from '../assets/Styles/Styles';
import { AuthContext } from '../AuthContext';
import { getUserInfo, getAllRoles, getUserAccountInfo, generateUniqueAccountNumber, insertPaymentAccount, updatePaymentAccount, verifyAndUpdateUserInfo } from '../controllers/USER_Config_Controller';
import {insertRegister} from '../controllers/SYSTEM_Register_Controller'



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

  const [hasAccount, setHasAccount] = useState(false);
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
      try {
        // Obtener información del usuario
        const userInfo = await getUserInfo(userID);
        if (userInfo) {
          setUserId(userInfo.ID.toString());
          setEmail(userInfo.Email);
          setFirstName(userInfo.FirstName);
          setSecondName(userInfo.SecondName);
          setPhoneNumber(userInfo.PhoneNumber);
          setWorkArea(userInfo.WorkArea);
          setStatus(userInfo.Status);
          setStoredPassword(userInfo.Password);
  
          // Obtener todos los roles y encontrar el nombre del rol correspondiente
          const roles = await getAllRoles();
          const userRole = roles.find(role => role.ID === userInfo.RoleId);
          if (userRole) {
            setRoleId(userRole.RoleName); // Establece el nombre del rol en lugar del ID
          } else {
            console.warn('Role not found for RoleId:', userInfo.RoleId);
          }
        }
  
        // Obtener información de la cuenta
        const accountInfo = await getUserAccountInfo(userID);
        if (accountInfo) {  // Si tiene cuenta
          setAccountNumber(accountInfo.AccountNumber);
          setCardNumber(accountInfo.CardNumber);
          const formattedDate = accountInfo.ExpirationDate.substring(0, 10);
          setExpirationDate(formattedDate);
          setSecurityNumber(accountInfo.SecurityNumber.toString());
          setAccountBalance(accountInfo.Balance.toString());
          setBalanceAccountNumber(accountInfo.AccountNumber);
          setHasAccount(true);
        } else { // Si no tiene cuenta
          const uniqueAccountNumber = await generateUniqueAccountNumber();
          setAccountNumber(uniqueAccountNumber);
          setHasAccount(false);
        }
      } catch (error) {
        console.error('Error fetching user or role info:', error);
      }
    };
  
    fetchUserInfo();
  }, [userID]);


  // Función para manejar la inserción de un registro
  const handleInsertRegister = async (type, detail) => {
    try {
      await insertRegister(type, detail);
    } catch (error) {
      console.error('Error inserting register:', error);
    }
  };
//LLAMDA : await handleInsertRegister(1, `User ${parsedUserId} updated their info`); // 1 Usuario - 2 Donacion - 3 Proyecto


  const fetchAccountBalance = async () => {
    try {
      const accountInfo = await getUserAccountInfo(userID); // Usa el mismo método de consulta
      if (accountInfo) {
        setAccountBalance(accountInfo.Balance.toString()); // Actualiza solo el balance actual
        setStatus(accountInfo.Status); // Actualiza el status actual
      } else {
        console.warn('No account found for the given user ID');
      }
    } catch (error) {
      console.error('Error fetching account balance:', error);
    }
  };
  
  
  // Funciones onPress para cada botón
  const handleUpdateUserInfo = async () => {
    try {
      // Asegúrate de que userId y roleId sean enteros
      const parsedUserId = parseInt(userId, 10);
      const parsedRoleId = parseInt(roleId, 10);
  
      const result = await verifyAndUpdateUserInfo(
        parsedUserId,
        parsedRoleId,
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
      // Llama a handleInsertRegister con el DateTime, tipo y detalle del registro
      await handleInsertRegister(1, `User ${parsedUserId} updated their info`); // 1 Usuario - 2 Donacion - 3 Proyecto
      Alert.alert('Update Info', result.message);
    } catch (error) {
      console.error('Error updating user info:', error);
      Alert.alert('Error', 'There was an error updating user information.');
    }
  };

  const handleUpdatePaymentInfo = async () => {
    await fetchAccountBalance();
    if (hasAccount) {
      try {
        // Llama a la función de actualización de cuenta
        await updatePaymentAccount(
          accountNumber,
          cardNumber,
          expirationDate,
          securityNumber,
          parseFloat(accountBalance), // Asegúrate de que el balance sea un número decimal
          status
        );
        Alert.alert('Update Info', 'Payment info updated successfully!');
        await handleInsertRegister(1, `User ${userID} updated their payment account info`); // 1 Usuario - 2 Donacion - 3 Proyecto
        await fetchAccountBalance();
      } catch (error) {
        console.error('Error updating payment account:', error);
        Alert.alert('Error', 'There was an error updating the account.');
      }
    } else {
      try {
        // Llama a la función de inserción de cuenta
        await insertPaymentAccount(
          accountNumber,
          userId,
          cardNumber,
          expirationDate,
          securityNumber,
          parseFloat(0.1)
        );
        setHasAccount(true); // Cambia el estado a que ya tiene cuenta después de crearla
        await handleInsertRegister(1, `User ${userID} created their payment account`); // 1 Usuario - 2 Donacion - 3 Proyecto
        Alert.alert('Account Created', 'New payment account created successfully!');
      } catch (error) {
        console.error('Error creating payment account:', error);
        Alert.alert('Error', 'There was an error creating the account.');
      }
    }
  };

  const handleConfirmFunds = async () => {
    try {
      // Verificar y obtener el balance actual y status
      await fetchAccountBalance();
      
      // Convertir addAmount a número y sumar al balance actual
      const amountToAdd = parseFloat(addAmount);
      if (isNaN(amountToAdd) || amountToAdd <= 0) {
        Alert.alert('Invalid Amount', 'Please enter a valid amount to add.');
        return;
      }
  
      const newBalance = parseFloat(accountBalance) + amountToAdd;
  
      // Actualizar el balance en la base de datos
      await updatePaymentAccount(
        accountNumber,
        cardNumber,
        expirationDate,
        securityNumber,
        newBalance, // Balance actualizado
        status // Usa el status actual
      );
  
      // Actualizar el estado en la interfaz para reflejar el nuevo balance
      setAccountBalance(newBalance.toString());
      setAddAmount(''); // Limpia el campo de entrada después de confirmar
      await handleInsertRegister(1, `User ${userID} added balance payment account`); // 1 Usuario - 2 Donacion - 3 Proyecto
      Alert.alert('Confirm', `Funds added successfully! New Balance: $${newBalance.toFixed(2)}`);
    } catch (error) {
      console.error('Error adding funds to account:', error);
      Alert.alert('Error', 'There was an error adding funds to the account.');
    }
  };

  const handleCardNumberEndEditing = () => {
    if (cardNumber.length < 16) {
        Alert.alert('Invalid Card Number', 'Please enter exactly 16 digits.');
    }
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
        <TextInput 
          style={styles.input} 
          value={accountNumber} 
          onChangeText={setAccountNumber} 
          placeholder="Account Number" 
          keyboardType="numeric" 
          editable={false}
        />

        <Text style={styles.label}>Card Number</Text>
        <TextInput 
          style={styles.input} 
          value={cardNumber} 
          onChangeText={(text) => setCardNumber(text.slice(0, 16))} // Limita a 16 caracteres
          onEndEditing={handleCardNumberEndEditing}                 // Verifica longitud al finalizar
          placeholder="Card Number" 
          keyboardType="numeric" 
        />

        <Text style={styles.label}>Expiration Date</Text>
        <TextInput 
          style={styles.input} 
          value={expirationDate} 
          onChangeText={(text) => {
            // Remueve cualquier carácter no numérico
            const cleanedText = text.replace(/[^0-9]/g, '');

            let formattedText = cleanedText;

            // Verificación del año, el mes y el día en sus respectivos rangos
            if (cleanedText.length > 4) {
              let year = parseInt(cleanedText.slice(0, 4), 10);

              // Verifica que el año esté en el rango de 1950 a 2100
              if (year < 1950) {
                year = 1950;
              } else if (year > 2100) {
                year = 2100;
              }
              
              const month = cleanedText.slice(4, 6);
              formattedText = `${year}-${month}`;

              // Verifica que el mes esté en el rango de 01 a 12
              if (parseInt(month, 10) > 12) {
                formattedText = `${year}-12`; // Si el mes es mayor a 12, lo establece en 12
              } else if (month == '00') {
                formattedText = `${year}-01`;
              } else {
                formattedText = `${year}-${month}`;
              }
            }

            if (cleanedText.length > 6) {
              const day = cleanedText.slice(6, 8);

              // Verifica que el día esté en el rango de 01 a 31
              if (parseInt(day, 10) > 31) {
                formattedText = `${formattedText}-31`; // Si el día es mayor a 31, lo establece en 31
              } else if(day == '00') {
                formattedText = `${formattedText}-01`;
              }else {
                formattedText = `${formattedText}-${day}`;
              }
            }

            setExpirationDate(formattedText); // Actualiza el estado con el texto formateado y validado
          }} 
          placeholder="yyyy-mm-dd" 
          keyboardType="numeric" 
        />

        <Text style={styles.label}>Security Number</Text>
        <TextInput 
          style={styles.input} 
          value={securityNumber} 
          onChangeText={(text) => setSecurityNumber(text.slice(0, 3))} // Limita a 3 caracteres
          placeholder="Security Number" 
          keyboardType="numeric" 
        />

        <TouchableOpacity style={styles.button} onPress={handleUpdatePaymentInfo}>
          <Text style={styles.buttonText}>Update Info</Text>
        </TouchableOpacity>
      </View>

      {/* Monetary Account Config Section */}
      <View style={styles.genericBox}>
        <Text style={styles.title}>Monetary Account Config</Text>

        <Text style={styles.label}>Account Number</Text>
        <TextInput style={styles.input} value={balanceAccountNumber} onChangeText={setBalanceAccountNumber} placeholder="Account Number" keyboardType="numeric" editable={false} />

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
