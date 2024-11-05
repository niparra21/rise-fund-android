import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { RiseFundInterfaceStyles } from '../assets/Styles/Styles';

export default function ADMIN_Project_View() {
  const [selectedStatus, setSelectedStatus] = useState(""); // Estado para el selector de Status

  // Función para manejar el cambio de estado del proyecto
  const handleChangeStatus = () => {
    Alert.alert("Status Changed", `Project status has been changed to ${selectedStatus}.`);
    // Aquí puedes añadir la lógica para actualizar el estado del proyecto en la base de datos o en el estado global
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
          <Text>Project ID</Text>
          <Text>Creator ID</Text>
          <Text>Amount Gathered</Text>
          <Text>Status</Text>
        </View>
        <View style={RiseFundInterfaceStyles.userItem}>
          <Text>1234567890</Text>
          <Text>123456789</Text>
          <Text>99999</Text>
          <Text>Active</Text>
        </View>
      </View>

      <View style={RiseFundInterfaceStyles.userDetailsContainer}>
        <TextInput style={RiseFundInterfaceStyles.input} placeholder="Project ID" />
        <TextInput style={RiseFundInterfaceStyles.input} placeholder="Title" />
        <TextInput
          style={[RiseFundInterfaceStyles.input, { height: 80, textAlignVertical: 'top' }]}
          placeholder="Description"
          multiline
        />
        <TextInput style={RiseFundInterfaceStyles.input} placeholder="Creator ID" />

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TextInput
            style={[RiseFundInterfaceStyles.input, { flex: 1, marginRight: 5 }]}
            placeholder="Progress"
          />
          <TextInput
            style={[RiseFundInterfaceStyles.input, { flex: 1, marginLeft: 5 }]}
            placeholder="Contributors"
          />
        </View>

        <TextInput style={RiseFundInterfaceStyles.input} placeholder="Amount Gathered" />

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
      </View>
    </ScrollView>
  );
}
