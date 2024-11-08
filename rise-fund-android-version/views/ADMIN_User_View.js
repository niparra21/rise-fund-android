import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { RiseFundInterfaceStyles } from '../assets/Styles/Styles';
import { getAllUsers, getUserInfo, getAllRoles, UpdateUserInfo, getActiveUserCount, getBlockedUserCount } from '../controllers/ADMIN_User_Controller';

import {insertRegister} from '../controllers/SYSTEM_Register_Controller'
const handleInsertRegister = async (type, detail) => {
  try {
    await insertRegister(type, detail);
  } catch (error) {
    console.error('Error inserting register:', error);
  }
};

export default function ADMIN_User_View() {
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(""); // Estado para el selector de Status
  const [roles, setRoles] = useState([]); // Estado para almacenar los roles desde la base de datos
  const [users, setUsers] = useState([]); // Estado para almacenar los usuarios

  // Estado para los detalles del usuario seleccionado
  const [userDetails, setUserDetails] = useState({
    ID: '',
    FirstName: '',
    SecondName: '',
    Email: '',
    PhoneNumber: ''
  });

  // Función para obtener usuarios y roles al cargar el componente
  const fetchUsers = async () => {
    try {
      const usersData = await getAllUsers();
      setUsers(usersData); // Almacena los usuarios en el estado
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchRoles = async () => {
    try {
      const rolesData = await getAllRoles();
      setRoles(rolesData); // Almacena los roles en el estado
    } catch (error) {
      console.error('Error fetching roles:', error);
    }
  };
  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, []);

  // Función para manejar la selección de un usuario
  const handleUserPress = async (userId) => {
    try {
      const userInfo = await getUserInfo(userId);
      if (userInfo) {
        setUserDetails({
          ID: userInfo.ID,
          FirstName: userInfo.FirstName,
          SecondName: userInfo.SecondName,
          Email: userInfo.Email,
          PhoneNumber: userInfo.PhoneNumber
        });
        setSelectedStatus(userInfo.Status ? "Active" : "Blocked");
        setSelectedRole(userInfo.RoleId); 
      }
    } catch (error) {
      console.error('Error retrieving user information:', error);
    }
  };

  const handleStatistics = async() => {
    const ActiveUsers = await getActiveUserCount();
    const BloquedUsers = await getBlockedUserCount();
    Alert.alert(`Active Users: ${ActiveUsers} \nBlocked Users: ${BloquedUsers}`);
  };
  // Función para manejar el cambio de estado
  const handleChangeStatus = () => {
    const userId = userDetails.ID;
    const status = selectedStatus === "Active" ? 1 : 0; // Convierte el estado a un valor numérico
    // Aquí puedes llamar a una función para actualizar el estado en la base de datos
    updateUserStatus(userId, status);
  };

  // Función que simula la actualización de estado del usuario
  const updateUserStatus = async (userId, status) => {
    fetchUsers();
    const selectedUser = users.find(user => user.ID === userId);
    if (selectedUser) {
      try {
        const result = await UpdateUserInfo(
          selectedUser.ID,                     // userId
          selectedUser.RoleId,                 // roleId
          selectedUser.Email,                  // email
          selectedUser.FirstName,              // firstName
          selectedUser.SecondName,             // secondName
          selectedUser.PhoneNumber,            // phoneNumber
          selectedUser.WorkArea,               // workArea (proporciona un valor vacío si no existe)
          selectedUser.Password,               // storedPassword (proporciona un valor vacío si no existe)
          status                               // status (nuevo estado que queremos asignar)
        );
        if (result.success) {
          const statusText = status === 1 ? "activated" : "blocked";
          await handleInsertRegister(1, `User ${selectedUser.ID} Status has been ${statusText}.`);
          Alert.alert('Success', result.message);
          fetchUsers();
        } else {
          console.error('Failed to update user information:', result.message);
          Alert.alert('Error', result.message);
        }
      } catch (error) {
        console.error('Error updating user information:', error);
        Alert.alert('Error', 'There was an error updating user information.');
      }
    } else {
      console.log(`User with ID ${userId} not found.`);
    }
  };

  // Función para manejar el cambio de rol
  const handleChangeRole = async () => {
    fetchUsers();
    const userId = userDetails.ID;
    // Verifica si se ha seleccionado un usuario
    if (!userId) {
        Alert.alert('Error', 'Please select a user to update the role.');
        return;
    }
    const selectedRoleId = roles.find(role => role.ID === selectedRole)?.ID;
    const selectedRoleName = roles.find(role => role.ID === selectedRole)?.RoleName;
    if (selectedRoleId) {
      try {
        const result = await UpdateUserInfo(
          userId,
          selectedRoleId,                   // Nuevo RoleId
          userDetails.Email,                 // Email actual
          userDetails.FirstName,             // Nombre actual
          userDetails.SecondName,            // Segundo nombre actual
          userDetails.PhoneNumber,           // Teléfono actual
          userDetails.WorkArea,        // Área de trabajo o vacío si falta
          userDetails.Password,        // Contraseña almacenada o vacío si falta
          selectedStatus === "Active" ? 1 : 0 // Estado actual
        );
        if (result.success) {
          fetchUsers();
          await handleInsertRegister(1, `User ${userId} has been given the role of ${selectedRoleName}.`);
          Alert.alert('Success', result.message);
        } else {
          console.error('Failed to update user role:', result.message);
          Alert.alert('Error', result.message);
        }
      } catch (error) {
        console.error('Error updating user role:', error);
        Alert.alert('Error', 'There was an error updating the user role.');
      }
    } else {
      console.error(`Role with ID ${selectedRole} not found.`);
      Alert.alert('Error', 'Selected role not found.');
    }
  };


  return (
    <ScrollView style={RiseFundInterfaceStyles.container}>
      <View style={RiseFundInterfaceStyles.header}>
        <Text style={RiseFundInterfaceStyles.headerTitle}>RiseFund Admin</Text>
        <TouchableOpacity style={RiseFundInterfaceStyles.statisticsButton} onPress={handleStatistics}>
          <Text style={RiseFundInterfaceStyles.statisticsButtonText}>Statistics</Text>
        </TouchableOpacity>
      </View>

      <View style={RiseFundInterfaceStyles.userListContainer}>
        <View style={RiseFundInterfaceStyles.userItem}>
          <Text>User ID</Text>
          <Text>Email</Text>
          <Text>Status</Text>
        </View>
        {users.map((user) => (
          <TouchableOpacity 
            key={user.ID} 
            style={RiseFundInterfaceStyles.userItem} 
            onPress={() => handleUserPress(user.ID)}
          >
            <Text>{user.ID}</Text>
            <Text>{user.Email}</Text>
            <Text>{user.Status ? "Active" : "Blocked"}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={RiseFundInterfaceStyles.userDetailsContainer}>
        <TextInput
          style={RiseFundInterfaceStyles.input}
          placeholder="User ID"
          value={userDetails.ID.toString()}
          editable={false}
        />
        <TextInput
          style={RiseFundInterfaceStyles.input}
          placeholder="First Name"
          value={userDetails.FirstName}
          onChangeText={(text) => setUserDetails({ ...userDetails, FirstName: text })}
          editable={false}
        />
        <TextInput
          style={RiseFundInterfaceStyles.input}
          placeholder="Second Name"
          value={userDetails.SecondName}
          onChangeText={(text) => setUserDetails({ ...userDetails, SecondName: text })}
          editable={false}
        />
        <TextInput
          style={RiseFundInterfaceStyles.input}
          placeholder="Email"
          value={userDetails.Email}
          onChangeText={(text) => setUserDetails({ ...userDetails, Email: text })}
          editable={false}
        />
        <TextInput
          style={RiseFundInterfaceStyles.input}
          placeholder="Phone Number"
          value={userDetails.PhoneNumber}
          onChangeText={(text) => setUserDetails({ ...userDetails, PhoneNumber: text })}
          editable={false}
        />

        <View style={RiseFundInterfaceStyles.dropdown}>
          <Picker
            selectedValue={selectedStatus}
            onValueChange={(itemValue) => setSelectedStatus(itemValue)}
          >
            <Picker.Item label="Select Status" value="" />
            <Picker.Item label="Active" value="Active" />
            <Picker.Item label="Blocked" value="Blocked" />
          </Picker>
        </View>
        <TouchableOpacity style={RiseFundInterfaceStyles.button} onPress={handleChangeStatus}>
          <Text style={RiseFundInterfaceStyles.buttonText}>Change Status</Text>
        </TouchableOpacity>

        <View style={RiseFundInterfaceStyles.dropdown}>
          <Picker
            selectedValue={selectedRole}
            onValueChange={(itemValue) => setSelectedRole(itemValue)}
          >
            <Picker.Item label="Select a Role" value="" />
            {roles.map((role) => (
              <Picker.Item key={role.ID} label={role.RoleName} value={role.ID} />
            ))}
          </Picker>
        </View>
        <TouchableOpacity style={RiseFundInterfaceStyles.button} onPress={handleChangeRole}>
          <Text style={RiseFundInterfaceStyles.buttonText}>Change Role</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
