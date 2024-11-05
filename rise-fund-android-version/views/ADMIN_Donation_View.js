import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { RiseFundInterfaceStyles } from '../assets/Styles/Styles';

export default function ADMIN_Donation_View() {
  const [selectedStatus, setSelectedStatus] = useState(""); // Estado para el selector de Status

  // Función para manejar el evento de aceptar
  const handleAccept = () => {
    Alert.alert("Donation Accepted", "The donation has been successfully accepted.");
    // Aquí puedes añadir la lógica para procesar la aceptación de la donación
  };

  // Función para manejar el evento de rechazar
  const handleDecline = () => {
    Alert.alert("Donation Declined", "The donation has been declined.");
    // Aquí puedes añadir la lógica para procesar el rechazo de la donación
  };

  // Función para manejar el evento de View
  const handleView = () => {
    Alert.alert("View Button Pressed", "Navigating to the View section.");
    // Aquí puedes añadir la lógica para la acción de ver, como navegación o mostrar información
  };

  // Función para manejar el evento de Statistics
  const handleStatistics = () => {
    Alert.alert("Statistics Button Pressed", "Navigating to the Statistics section.");
    // Aquí puedes añadir la lógica para la acción de estadísticas
  };

  return (
    <ScrollView style={RiseFundInterfaceStyles.container}>
      <View style={RiseFundInterfaceStyles.header}>
        <Text style={RiseFundInterfaceStyles.headerTitle}>RiseFund Admin</Text>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity style={RiseFundInterfaceStyles.statisticsButton} onPress={handleView}>
            <Text style={RiseFundInterfaceStyles.statisticsButtonText}>View</Text>
          </TouchableOpacity>
          <TouchableOpacity style={RiseFundInterfaceStyles.statisticsButton} onPress={handleStatistics}>
            <Text style={RiseFundInterfaceStyles.statisticsButtonText}>Statistics</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={RiseFundInterfaceStyles.userListContainer}>
        <View style={RiseFundInterfaceStyles.userItem}>
          <Text>Donation ID</Text>
          <Text>Date</Text>
          <Text>Amount</Text>
          <Text>Status</Text>
        </View>
        <View style={RiseFundInterfaceStyles.userItem}>
          <Text>1234567890</Text>
          <Text>2024-09-15</Text>
          <Text>$100000</Text>
          <Text>Petitioned</Text>
        </View>
      </View>

      <View style={RiseFundInterfaceStyles.userDetailsContainer}>
        <TextInput style={RiseFundInterfaceStyles.input} placeholder="Donation ID" />
        <TextInput style={RiseFundInterfaceStyles.input} placeholder="Amount Donated" />
        <TextInput style={RiseFundInterfaceStyles.input} placeholder="Contributor / User ID" />
        <TextInput style={RiseFundInterfaceStyles.input} placeholder="Project ID" />

        <TextInput
          style={[RiseFundInterfaceStyles.input, { height: 80, textAlignVertical: 'top' }]}
          placeholder="Comment"
          multiline
        />

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity style={[RiseFundInterfaceStyles.button, { flex: 1, marginRight: 5 }]} onPress={handleAccept}>
            <Text style={RiseFundInterfaceStyles.buttonText}>Accept</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[RiseFundInterfaceStyles.button, { flex: 1, marginLeft: 5, backgroundColor: '#FF6347' }]} onPress={handleDecline}>
            <Text style={RiseFundInterfaceStyles.buttonText}>Decline</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
