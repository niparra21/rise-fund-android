import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { RiseFundInterfaceStyles } from '../assets/Styles/Styles';
import { getAllUsers, getUserInfo } from '../controllers/ADMIN_User_Controller';

export default function ADMIN_User_View() {
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(""); // Estado para el selector de Status
  const [roles, setRoles] = useState(["Admin", "User", "Guest"]); // Lista de roles inicial
  const [users, setUsers] = useState([]); // Estado para almacenar los usuarios

  // Estado para los detalles del usuario seleccionado
  const [userDetails, setUserDetails] = useState({
    ID: '',
    FirstName: '',
    SecondName: '',
    Email: '',
    PhoneNumber: ''
  });

  // Función para obtener usuarios al cargar el componente
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getAllUsers();
        setUsers(usersData); // Almacena los usuarios en el estado
        console.log('User Details:', usersData);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
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

  // Función para manejar el cambio de estado
  const handleChangeStatus = () => {
    Alert.alert("Status Changed", `User status has been changed to ${selectedStatus}.`);
    // Aquí puedes añadir la lógica para actualizar el estado del usuario en la base de datos o en el estado global
  };

  // Función para manejar el cambio de rol
  const handleChangeRole = () => {
    Alert.alert("Role Changed", `User role has been changed to ${selectedRole}.`);
    // Aquí puedes añadir la lógica para actualizar el rol del usuario en la base de datos o en el estado global
  };

  return (
    <ScrollView style={RiseFundInterfaceStyles.container}>
      <View style={RiseFundInterfaceStyles.header}>
        <Text style={RiseFundInterfaceStyles.headerTitle}>RiseFund Admin</Text>
        <TouchableOpacity style={RiseFundInterfaceStyles.statisticsButton}>
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
        />
        <TextInput
          style={RiseFundInterfaceStyles.input}
          placeholder="Second Name"
          value={userDetails.SecondName}
          onChangeText={(text) => setUserDetails({ ...userDetails, SecondName: text })}
        />
        <TextInput
          style={RiseFundInterfaceStyles.input}
          placeholder="Email"
          value={userDetails.Email}
          onChangeText={(text) => setUserDetails({ ...userDetails, Email: text })}
        />
        <TextInput
          style={RiseFundInterfaceStyles.input}
          placeholder="Phone Number"
          value={userDetails.PhoneNumber}
          onChangeText={(text) => setUserDetails({ ...userDetails, PhoneNumber: text })}
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
            {roles.map((role, index) => (
              <Picker.Item key={index} label={role} value={role} />
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
