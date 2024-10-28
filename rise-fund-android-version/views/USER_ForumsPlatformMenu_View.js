import React from 'react';
import styles from '../assets/Styles/Styles';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Asegúrate de instalar este paquete: expo install @expo/vector-icons

export default function USER_ForumsPlatformMenu_View() {
  const forums = [
    {
      id: 1,
      user: 'User',
      title: 'Forum Title',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    {
      id: 2,
      user: 'User',
      title: 'Forum Title',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    {
      id: 3,
      user: 'User',
      title: 'Forum Title',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.forumTitle}>Forums</Text>

      {[1, 2, 3].map((item) => (
        <View key={item} style={styles.forumCard}>
          <View style={styles.userSection}>
            <Text style={styles.userIcon}>👤</Text>
            <Text style={styles.userText}>User</Text>
          </View>
          <View style={styles.forumContent}>
            <Text style={styles.forumPostTitle}>Forum Title</Text>
            <Text style={styles.forumDescription}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Text>
          </View>
          <TouchableOpacity style={styles.viewButtonContainer}>
            <Text style={styles.viewButtonText}>Ver más</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}