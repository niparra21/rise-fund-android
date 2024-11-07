import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { RiseFundInterfaceStyles } from '../assets/Styles/Styles';
import { getUnacknowledgedAlerts, acknowledgeAlert } from '../controllers/ADMIN_Alerts_Controller';

export default function ADMIN_Alerts_View({ navigation }) {
  const [alertId, setAlertId] = useState('');
  const [alertDetail, setAlertDetail] = useState('');
  const [alerts, setAlerts] = useState([]);

  const loadAlerts = async () => {
    try {
      const alertData = await getUnacknowledgedAlerts();
      setAlerts(alertData);
    } catch (error) {
      console.error('Error loading alerts:', error);
      Alert.alert('Error', 'There was an error loading alerts.');
    }
  };

  // Cargar alertas al montar el componente
  useEffect(() => {
    loadAlerts();
  }, []);

  const handleAlertSelect = (alert) => {
    setAlertId(alert.ID);
    setAlertDetail(alert.Detail);
  };

  const handleAcknowledge = async () => {
    try {
      if (!alertId) {
        Alert.alert('Error', 'No alert selected.');
        loadAlerts();
        return;
      }

      const { success, message } = await acknowledgeAlert(alertId);
      if (success) {
        Alert.alert('Acknowledged', `Alert ID: ${alertId} acknowledged.`);
        // Actualizar la lista de alertas para eliminar la alerta reconocida
        setAlerts((prevAlerts) => prevAlerts.filter((alert) => alert.ID !== alertId));
        // Limpiar los campos de alerta
        setAlertId('');
        setAlertDetail('');
        
      } else {
        Alert.alert('Error', message);
      }
    } catch (error) {
      console.error('Error acknowledging alert:', error);
      Alert.alert('Error', 'There was an error acknowledging the alert.');
    }
    loadAlerts();
  };

  return (
    <ScrollView style={RiseFundInterfaceStyles.container}>
      <View style={RiseFundInterfaceStyles.header}>
        <Text style={RiseFundInterfaceStyles.headerTitle}>RiseFund Alerts</Text>
        <TouchableOpacity style={RiseFundInterfaceStyles.statisticsButton} onPress={() => navigation.goBack()}>
          <Text style={RiseFundInterfaceStyles.statisticsButtonText}>Back</Text>
        </TouchableOpacity>
      </View>

      <View style={RiseFundInterfaceStyles.userListContainer}>
        <Text style={RiseFundInterfaceStyles.headerTitle}>Alerts</Text>
        <View style={RiseFundInterfaceStyles.userInfoBox}>
          {alerts.map((alert) => (
            <TouchableOpacity key={alert.ID} onPress={() => handleAlertSelect(alert)} style={RiseFundInterfaceStyles.userItem}>
              <Text style={RiseFundInterfaceStyles.infoText}>
                {alert.ID} - {new Date(alert.DateTime).toLocaleString()} - {alert.Detail}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={RiseFundInterfaceStyles.userDetailsContainer}>
        {/* Caja para el campo de Alert ID */}
        <View style={RiseFundInterfaceStyles.infoContainer}>
          <TextInput
            style={RiseFundInterfaceStyles.thickInput}
            placeholder="Alert ID"
            value={`ID: ${alertId}`}
            editable={false}
          />
        </View>

        {/* Caja para el campo de Detail */}
        <View style={RiseFundInterfaceStyles.infoContainer}>
          <TextInput
            style={[RiseFundInterfaceStyles.thickInput, { height: 80, textAlignVertical: 'top' }]}
            placeholder="Detail"
            value={alertDetail}
            multiline
            editable={false}
          />
        </View>

        <TouchableOpacity style={RiseFundInterfaceStyles.button} onPress={handleAcknowledge}>
          <Text style={RiseFundInterfaceStyles.buttonText}>Acknowledge</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
