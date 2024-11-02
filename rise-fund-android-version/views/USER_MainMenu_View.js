import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import styles from '../assets/Styles/Styles';
import { AuthContext } from '../AuthContext';

export default function USER_MainMenu_View() {
  const { userID } = useContext(AuthContext); // Asegúrate de que sea 'userID' y no 'UserID'
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>RISEFUND</Text>
      <Text style={styles.subtitle}>Building a brighter future, one contribution at a time</Text>

      <View style={styles.infoBox}>
        <Text style={styles.infoLabel}>Projects:</Text>
        <Text style={styles.infoValue}>0</Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoLabel}>Money raised:</Text>
        <Text style={styles.infoValue}>0$</Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoLabel}>Active Users:</Text>
        <Text style={styles.infoValue}>0</Text>
      </View>
    </View>
  );
}
