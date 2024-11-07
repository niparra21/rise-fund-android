import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { RiseFundInterfaceStyles } from '../assets/Styles/Styles';
import { getAllDonations, approveDonation, addFundsToProject, deleteDonation, addFundsToUserBalance } from '../controllers/ADMIN_Donation_Controller';

export default function ADMIN_Donation_View() {
  const [donations, setDonations] = useState([]);
  const [selectedDonationId, setSelectedDonationId] = useState('');
  const [amount, setAmount] = useState('');
  const [comment, setComment] = useState('');
  const [userId, setUserId] = useState('');
  const [projectId, setProjectId] = useState('');
  const [acceptButtonState, setacceptButtonState] = useState(true);
  const [declineButtonState, setdeclineButtonState] = useState(true);
  const [acceptButtonOpacity, setacceptButtonOpacity] = useState(0.5);
  const [declineButtonOpacity, setdeclineButtonOpacity] = useState(0.5);
  const [filteredDonations, setFilteredDonations] = useState(donations);
  const [showPendingOnly, setShowPendingOnly] = useState(false);

  const fetchDonations = async () => {
    try {
      const donationData = await getAllDonations();
      setDonations(donationData[0]);
  
      // Actualiza filteredDonations según el estado de showPendingOnly
      if (showPendingOnly) {
        setFilteredDonations(donationData[0].filter(donation => !donation.Status)); // Solo pendientes
      } else {
        setFilteredDonations(donationData[0]); // Todas las donaciones
      }
    } catch (error) {
      console.error('Error fetching donations:', error);
      Alert.alert('Error', 'There was an error fetching donations.');
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  // Función para manejar el evento de aceptar
  const handleAccept = async () => {
    try {
      if (!selectedDonationId) {
        Alert.alert("Error", "No donation selected.");
        return;
      }
      const selectedDonation = donations.find(donation => donation.ID === selectedDonationId);
      if (!selectedDonation) {
        Alert.alert("Error", "Donation not found.");
        return;
      }
      // Llama a approveDonation para actualizar el estado en la base de datos
      const resultMessage = await approveDonation(selectedDonationId);
      Alert.alert("Donation Accepted", resultMessage);
  
      // Llama a addFundsToProject para sumar la cantidad de la donación al proyecto correspondiente
      const addFundsMessage = await addFundsToProject(selectedDonation.ProjectId, selectedDonation.Amount);
      console.log(addFundsMessage);
  
      // Actualiza la lista de donaciones
      await fetchDonations();
      console.log(`Donation ID ${selectedDonationId} accepted and funds added to project ID ${selectedDonation.ProjectId}.`);
      setacceptButtonState(true);
      setdeclineButtonState(true);
      setacceptButtonOpacity(0.5);
      setdeclineButtonOpacity(0.5);

      //TODO:Mandar correo de notificacion:
    } catch (error) {
      console.error("Error accepting donation:", error);
      Alert.alert("Error", "There was an issue accepting the donation.");
    }
  };

  // Función para manejar el evento de rechazo
const handleDecline = async () => {
  try {
    if (!selectedDonationId) {
      Alert.alert("Error", "No donation selected.");
      return;
    }
    const selectedDonation = donations.find(donation => donation.ID === selectedDonationId);
    if (!selectedDonation) {
      Alert.alert("Error", "Donation not found.");
      return;
    }
    // Llama a deleteDonation para eliminar la donación
    const deleteMessage = await deleteDonation(selectedDonationId);
    console.log(deleteMessage);

    // Llama a addFundsToUserBalance para reembolsar los fondos al usuario
    const refundMessage = await addFundsToUserBalance(selectedDonation.UserId, selectedDonation.Amount);
    console.log(refundMessage);
    setacceptButtonState(true);
    setdeclineButtonState(true);
    setacceptButtonOpacity(0.5);
    setdeclineButtonOpacity(0.5);

    Alert.alert("Donation Declined", "The donation has been declined and funds have been refunded.");

    // Actualiza la lista de donaciones
    await fetchDonations();
  } catch (error) {
    console.error("Error declining donation:", error);
    Alert.alert("Error", "There was an issue declining the donation.");
  }
};


  // Función para manejar el evento de View
  const handleView = () => {
    Alert.alert("View Button Pressed", `Showing ${showPendingOnly ? "all" : "pending"} donations.`);
    
    if (showPendingOnly) {
      // Mostrar todas las donaciones
      setFilteredDonations(donations);
    } else {
      // Filtrar y mostrar solo las donaciones pendientes
      const pendingDonations = donations.filter(donation => !donation.Status);
      setFilteredDonations(pendingDonations);
    }
    
    // Alternar el estado para la próxima vez
    setShowPendingOnly(!showPendingOnly);
  };

  // Función para manejar el evento de Statistics
  const handleStatistics = () => {
    Alert.alert("Statistics Button Pressed", "Navigating to the Statistics section.");
    // Aquí puedes añadir la lógica para la acción de estadísticas
  };
  //{"Amount": 100, "Comment": "Hola", "DateTime": "2024-11-02T04:25:08.867Z", "ID": 1, "ProjectId": 2, "Status": false, "UserId": 1}
  const handleDonationPress = (donationId) => {
    const selectedDonation = donations.find(donation => donation.ID === donationId);
    if (selectedDonation) {
      setSelectedDonationId(selectedDonation.ID);
      setAmount("$"+selectedDonation.Amount.toString());
      setComment("Comment: "+selectedDonation.Comment);
      setUserId("From User: "+selectedDonation.UserId.toString());
      setProjectId("To Project: "+selectedDonation.ProjectId.toString());
      console.log(`Donation ID: ${donationId}`);
      console.log(`ProjectID: ${selectedDonation.ProjectId}`);
      if (selectedDonation.Status === false) {
        setacceptButtonState(!true);
        setdeclineButtonState(!true);
        setacceptButtonOpacity(1);
        setdeclineButtonOpacity(1); 
      } else {
        setacceptButtonState(true);
        setdeclineButtonState(true);
        setacceptButtonOpacity(0.5);
        setdeclineButtonOpacity(0.5);
      }
    }
  };

  return (
    <ScrollView style={RiseFundInterfaceStyles.container}>
      <View style={RiseFundInterfaceStyles.header}>
        <Text style={RiseFundInterfaceStyles.headerTitle}>RiseFund Admin</Text>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity style={RiseFundInterfaceStyles.statisticsButton} onPress={handleView}>
            <Text style={RiseFundInterfaceStyles.statisticsButtonText}>{showPendingOnly ? "Show All Donations" : "Show Pending Only"}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={RiseFundInterfaceStyles.statisticsButton} onPress={handleStatistics}>
            <Text style={RiseFundInterfaceStyles.statisticsButtonText}>Statistics</Text>
          </TouchableOpacity>
        </View>
      </View>
  
      <View style={RiseFundInterfaceStyles.userListContainer}>
        <View style={RiseFundInterfaceStyles.userItem}>
          <Text style={{ flex: 1, textAlign: 'center', fontWeight: 'bold' }}>Donation ID</Text>
          <Text style={{ flex: 2, textAlign: 'center', fontWeight: 'bold' }}>Date</Text>
          <Text style={{ flex: 1, textAlign: 'center', fontWeight: 'bold' }}>Amount</Text>
          <Text style={{ flex: 1, textAlign: 'center', fontWeight: 'bold' }}>Status</Text>
        </View>
  
        {filteredDonations.map((donation) => (
          <TouchableOpacity 
            key={donation.ID} 
            style={RiseFundInterfaceStyles.userItem} 
            onPress={() => handleDonationPress(donation.ID)}
          >
            <Text style={{ flex: 1, textAlign: 'center' }}>{donation.ID}</Text>
            <Text style={{ flex: 2, textAlign: 'center' }}>{new Date(donation.DateTime).toLocaleDateString()}</Text>
            <Text style={{ flex: 1, textAlign: 'center' }}>${donation.Amount ? donation.Amount.toFixed(2) : '0.00'}</Text>
            <Text style={{ flex: 1, textAlign: 'center' }}>{donation.Status ? 'Approved' : 'Pending'}</Text>
          </TouchableOpacity>
        ))}
      </View>
  
      <View style={RiseFundInterfaceStyles.userDetailsContainer}>
        <TextInput 
          style={RiseFundInterfaceStyles.input} 
          placeholder="Donation ID" 
          value={"ID: " + selectedDonationId.toString()} 
          editable={false} 
        />
        <TextInput 
          style={RiseFundInterfaceStyles.input} 
          placeholder="Amount Donated" 
          value={amount} 
          onChangeText={setAmount} 
          keyboardType="numeric" 
          editable={false} 
        />
        <TextInput 
          style={RiseFundInterfaceStyles.input} 
          placeholder="Contributor / User ID" 
          value={userId} 
          onChangeText={setUserId} 
          editable={false} 
        />
        <TextInput 
          style={RiseFundInterfaceStyles.input} 
          placeholder="Project ID" 
          value={projectId} 
          onChangeText={setProjectId} 
          editable={false} 
        />
        <TextInput 
          style={[RiseFundInterfaceStyles.input, { height: 80, textAlignVertical: 'top' }]}
          placeholder="Comment" 
          value={comment} 
          onChangeText={setComment} 
          multiline 
          editable={false} 
        />
  
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity 
            style={[RiseFundInterfaceStyles.button, { flex: 1, marginRight: 5, opacity: acceptButtonOpacity }]} 
            onPress={handleAccept} 
            disabled={acceptButtonState}
          >
            <Text style={RiseFundInterfaceStyles.buttonText}>Accept</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[RiseFundInterfaceStyles.button, { flex: 1, marginLeft: 5, backgroundColor: '#FF6347', opacity: declineButtonOpacity }]} 
            onPress={handleDecline} 
            disabled={declineButtonState}
          >
            <Text style={RiseFundInterfaceStyles.buttonText}>Decline</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
