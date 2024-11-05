import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { RiseFundInterfaceStyles } from '../assets/Styles/Styles';

export default function ADMIN_User_View() {
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(""); // Estado para el selector de Status
  const [roles, setRoles] = useState(["Admin", "User", "Guest"]); // Lista de roles inicial, puede actualizarse dinámicamente

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
        <View style={RiseFundInterfaceStyles.userItem}>
          <Text>1234567890</Text>
          <Text>email.example@domain.ex</Text>
          <Text>Active</Text>
        </View>
      </View>

      <View style={RiseFundInterfaceStyles.userDetailsContainer}>
        <TextInput style={RiseFundInterfaceStyles.input} placeholder="User ID" />
        <TextInput style={RiseFundInterfaceStyles.input} placeholder="First Name" />
        <TextInput style={RiseFundInterfaceStyles.input} placeholder="Second Name" />
        <TextInput style={RiseFundInterfaceStyles.input} placeholder="Email" />
        <TextInput style={RiseFundInterfaceStyles.input} placeholder="Phone Number" />

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
