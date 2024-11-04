import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { adminStyles } from '../assets/Styles/Styles';
import { getLast20RegistersByType } from '../controllers/ADMIN_Menu_Controller';

// Función para obtener los últimos 20 registros según el tipo
const fetchLast20Registers = async (type) => {
  try {
    const registers = await getLast20RegistersByType(type);
    console.log('Registers:', registers); // Puedes ajustar esto para actualizar el estado de los registros o procesarlos
    return registers;
  } catch (error) {
    console.error('Error fetching last 20 registers:', error);
    Alert.alert('Error', 'There was an error fetching the register data.');
  }
};

// Funciones para manejar las presiones de los botones
const handleAdministerUserRegister = () => {
  Alert.alert('Administer User Register', 'This will take you to the User Register management screen.');
};

const handleAdministerDonationRegister = () => {
  Alert.alert('Administer Donation Register', 'This will take you to the Donation Register management screen.');
};

const handleAdministerProjectsRegister = () => {
  Alert.alert('Administer Projects Register', 'This will take you to the Projects Register management screen.');
};

// Funciones para los botones de alertas y refrescar
const handleShowAlerts = () => {
  Alert.alert('Alerts', 'This will show alerts.');
};

const handleRefresh = () => {
  Alert.alert('Refresh', 'Data refreshed successfully!');
  // Aquí puedes agregar una lógica para recargar los datos
};

export default function ADMINISTATOR_Menu_View() {
  return (
    <ScrollView contentContainerStyle={adminStyles.adminContainer}>
      <Text style={adminStyles.adminTitle}>RiseFundAdmin</Text>

      {/* User Register Section */}
      <View style={adminStyles.adminBox}>
        <Text style={adminStyles.adminRegisterTitle}>User Register</Text>
        <View style={adminStyles.adminInfoBox}>
          <Text style={adminStyles.adminInfoText}>Detail of action by user that triggered a register update</Text>
        </View>
        <TouchableOpacity style={adminStyles.adminButton} onPress={handleAdministerUserRegister}>
          <Text style={adminStyles.adminButtonText}>Administer</Text>
        </TouchableOpacity>
      </View>

      {/* Donation Register Section */}
      <View style={adminStyles.adminBox}>
        <Text style={adminStyles.adminRegisterTitle}>Donation Register</Text>
        <View style={adminStyles.adminInfoBox}>
          <Text style={adminStyles.adminInfoText}>Detail of action by donation that triggered a register update</Text>
        </View>
        <TouchableOpacity style={adminStyles.adminButton} onPress={handleAdministerDonationRegister}>
          <Text style={adminStyles.adminButtonText}>Administer</Text>
        </TouchableOpacity>
      </View>

      {/* Projects Register Section */}
      <View style={adminStyles.adminBox}>
        <Text style={adminStyles.adminRegisterTitle}>Projects Register</Text>
        <View style={adminStyles.adminInfoBox}>
          <Text style={adminStyles.adminInfoText}>Detail of action by project that triggered a register update</Text>
        </View>
        <TouchableOpacity style={adminStyles.adminButton} onPress={handleAdministerProjectsRegister}>
          <Text style={adminStyles.adminButtonText}>Administer</Text>
        </TouchableOpacity>
      </View>

      {/* Botones de Alertas y Refrescar */}
      <TouchableOpacity style={adminStyles.alertButton} onPress={handleShowAlerts}>
        <Text style={adminStyles.alertButtonText}>Alerts</Text>
      </TouchableOpacity>
      <TouchableOpacity style={adminStyles.refreshButton} onPress={handleRefresh}>
        <Text style={adminStyles.refreshButtonText}>Refresh</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
