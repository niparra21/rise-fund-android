import React, { useState, useEffect  } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { adminStyles } from '../assets/Styles/Styles';
import { getLast20RegistersByType } from '../controllers/ADMIN_Menu_Controller';

// Función para obtener los últimos 20 registros según el tipo
const fetchLast20Registers = async (type) => {
  try {
    const registers = await getLast20RegistersByType(type);
    return registers;
  } catch (error) {
    console.error('Error fetching last 20 registers:', error);
    Alert.alert('Error', 'There was an error fetching the register data.');
  }
};

// Función para formatear la fecha y hora en el formato requerido
const formatDateTime = (dateTime) => {
  const date = new Date(dateTime);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Mes comienza desde 0
  const time = date.toTimeString().split(' ')[0]; // Obtiene hh:mm:ss
  const milliseconds = date.getMilliseconds().toString().padStart(3, '0'); // Agrega ceros a la izquierda
  return `${day}/${month} - ${time}.${milliseconds}`;
};



// Funciones para los botones de alertas y refrescar


const handleRefresh = () => {
  Alert.alert('Refresh', 'Data refreshed successfully!');
  // Aquí puedes agregar una lógica para recargar los datos
};

export default function ADMINISTATOR_Menu_View({ navigation }) {
  // Estados para los textos de cada sección
  const [userRegisterText, setUserRegisterText] = useState('Loading user register data...');
  const [donationRegisterText, setDonationRegisterText] = useState('Loading donation register data...');
  const [projectRegisterText, setProjectRegisterText] = useState('Loading project register data...');

  // useEffect para cargar los registros al montar el componente
  const loadRegisters = async () => {
    // Cargar registros de usuario
    const userRegisters = await fetchLast20Registers(1);
    setUserRegisterText(
      userRegisters.map(reg => `ID:${reg.ID}  DateTime:${formatDateTime(reg.DateTime)}\nDetail: ${reg.Detail}`).join('\n') || 'No user register data.'
    );

    // Cargar registros de donaciones
    const donationRegisters = await fetchLast20Registers(2);
    setDonationRegisterText(
      donationRegisters.map(reg => `ID:${reg.ID}  DateTime:${formatDateTime(reg.DateTime)}\nDetail: ${reg.Detail}`).join('\n') || 'No donation register data.'
    );

    // Cargar registros de proyectos
    const projectRegisters = await fetchLast20Registers(3);
    setProjectRegisterText(
      projectRegisters.map(reg => `ID:${reg.ID}  DateTime:${formatDateTime(reg.DateTime)}\nDetail: ${reg.Detail}`).join('\n') || 'No project register data.'
    );
  };

  useEffect(() => {
    loadRegisters();
  }, []);

  // Funciones para los botones de alertas y refrescar
  const handleRefresh = () => {
    Alert.alert('Refresh', 'Data refreshed successfully!');
    loadRegisters(); // Llamada para refrescar los datos
  };

  const handleAdministerUserRegister = () => {
    navigation.navigate('AdminUser'); // Navega a ADMIN_User_View
  };

  const handleAdministerDonationRegister = () => {
    navigation.navigate('AdminDonation'); // Navega a ADMIN_Donation_View
  };

  const handleAdministerProjectsRegister = () => {
    navigation.navigate('AdminProject'); // Navega a ADMIN_Project_View
  };

  const handleShowAlerts = () => {
    navigation.navigate('AdminAlerts');
  };

  return (
    <ScrollView contentContainerStyle={adminStyles.adminContainer}>
      <Text style={adminStyles.adminTitle}>RiseFundAdmin</Text>

      {/* User Register Section */}
      <View style={adminStyles.adminBox}>
        <Text style={adminStyles.adminRegisterTitle}>User Register</Text>
        <View style={adminStyles.adminInfoBox}>
          <Text style={adminStyles.adminInfoText}>{userRegisterText}</Text>
        </View>
        <TouchableOpacity style={adminStyles.adminButton} onPress={handleAdministerUserRegister}>
          <Text style={adminStyles.adminButtonText}>Administer</Text>
        </TouchableOpacity>
      </View>

      {/* Donation Register Section */}
      <View style={adminStyles.adminBox}>
        <Text style={adminStyles.adminRegisterTitle}>Donation Register</Text>
        <View style={adminStyles.adminInfoBox}>
          <Text style={adminStyles.adminInfoText}>{donationRegisterText}</Text>
        </View>
        <TouchableOpacity style={adminStyles.adminButton} onPress={handleAdministerDonationRegister}>
          <Text style={adminStyles.adminButtonText}>Administer</Text>
        </TouchableOpacity>
      </View>

      {/* Projects Register Section */}
      <View style={adminStyles.adminBox}>
        <Text style={adminStyles.adminRegisterTitle}>Projects Register</Text>
        <View style={adminStyles.adminInfoBox}>
          <Text style={adminStyles.adminInfoText}>{projectRegisterText}</Text>
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