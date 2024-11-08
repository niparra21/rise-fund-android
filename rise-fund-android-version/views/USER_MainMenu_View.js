import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import styles from '../assets/Styles/Styles';
import { AuthContext } from '../AuthContext';
import { getActiveUserCount, getProjectCount, getDonationsByStatus } from '../controllers/USER_MainMenu_Controller'

export default function USER_MainMenu_View() {
  const { userID } = useContext(AuthContext); // Asegúrate de que sea 'userID' y no 'UserID'
  
  // Constantes de estado para los valores
  const [projects, setProjects] = useState(0);
  const [moneyRaised, setMoneyRaised] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);
  const fetchStatistics = async () => {

    setProjects(await getProjectCount());
    setMoneyRaised(await getDonationsByStatus());
    setActiveUsers(await getActiveUserCount());
  };
  // useEffect para cargar valores al montar la pantalla
  useEffect(() => {
    fetchStatistics();
    
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>RISEFUND</Text>
      <Text style={styles.subtitle}>Building a brighter future, one contribution at a time</Text>

      <View style={styles.infoBox}>
        <Text style={styles.infoLabel}>Projects:</Text>
        <Text style={styles.infoValue}>{projects}</Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoLabel}>Money raised:</Text>
        <Text style={styles.infoValue}>{moneyRaised}$</Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoLabel}>Active Users:</Text>
        <Text style={styles.infoValue}>{activeUsers}</Text>
      </View>
    </View>
  );
}
