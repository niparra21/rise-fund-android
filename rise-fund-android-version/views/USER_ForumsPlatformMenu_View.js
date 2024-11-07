import React, { useState, useEffect, useCallback } from 'react';
import styles from '../assets/Styles/Styles';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { getCommunityForums, getUserInfo } from '../controllers/USER_ForumsPlatformMenu_Controller';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

export default function USER_ForumsPlatformMenu_View() {
  const [forums, setForums] = useState([]);
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      fetchForums();
    }, [])
  );

  const fetchForums = async () => {
    try {
      const response = await getCommunityForums();
      setForums(response);
    } catch {
      console.error('Error fetching forums');
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {/* Page Title */}
      <Text style={styles.forumTitle}>Community Forums</Text>

      {/* Create Forum Button */}
      <TouchableOpacity style={styles.newProjectButton} onPress={() => navigation.navigate('CreateForum')}>
        <Text style={styles.newProjectButtonText}>Create Forum</Text>
      </TouchableOpacity>

      {/* Display Forums */}
      {forums.length > 0 ? (
        forums.map((forum) => (
          <View key={forum.ID} style={styles.forumCard}>
            <View style={styles.userSection}>
              <Text style={styles.userIcon}>👤</Text>
              <Text style={styles.userText}>{forum.FirstName || 'User'}</Text>
            </View>
            <View style={styles.forumContent}>
              <Text style={styles.forumPostTitle}>{forum.Title}</Text>
              <Text style={styles.forumDescription}>{forum.Content}</Text>
            </View>
            <TouchableOpacity
              style={styles.viewButtonContainer}
              onPress={() => navigation.navigate('GeneralForum', { forumID: forum.ID })}
            >
              <Text style={styles.viewButtonText}>View More</Text>
            </TouchableOpacity>
          </View>
        ))
      ) : (
        <Text style={styles.noForumsText}>No forums available. Be the first to create one!</Text>
      )}
    </ScrollView>
  );
}