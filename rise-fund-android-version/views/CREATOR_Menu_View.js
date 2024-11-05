import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import styles from '../assets/Styles/Styles';
import { AuthContext } from '../AuthContext';
import { getUserProjects } from '../controllers/CREATOR_Menu_Controller';
import { useNavigation } from '@react-navigation/native';


export default function CREATOR_Menu_View() {
  const [projects, setProjects] = useState([]);
  const { userID } = useContext(AuthContext);
  const navigation = useNavigation();

  useEffect(() => {
    fetchUserProjects();
    const unsubscribe = navigation.addListener('focus', () => {
      fetchUserProjects();
    });

    return unsubscribe;
  }, []);

  const fetchUserProjects = async () => {
    try {
      const userProjects = await getUserProjects(userID);
      setProjects(userProjects);
    } catch (error) {
      console.error('Error fetching user projects:', error);
    }
  };


  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.exploreTitle}>Your Projects</Text>

      {/* List of User Projects */}
      {projects.map((project) => (
        <View key={`${project.ID}-${project.Title}`} style={styles.projectCard}>
          <View style={styles.imagePlaceholder}>
            <Text style={styles.imageText}>Image</Text>
          </View>
          <View style={styles.projectInfo}>
            <Text style={styles.projectText}>Name: {project.Title}</Text>
            <Text style={styles.projectText}>Money raised: {project.AmountGathered}</Text>
            <Text style={styles.projectText}>Goal: {project.ContributionGoal}</Text>
            <Text style={styles.projectText}>Rating: {'★'.repeat(Math.round(project.AverageRating))}</Text>
            <Text style={styles.projectText}>Progress: {(project.AmountGathered * 100 / project.ContributionGoal).toFixed(2)}%</Text>
            <TouchableOpacity style={styles.detailsButton} onPress={() => navigation.navigate('ProjectDetails', { projectID: project.ID })}>
              <Text style={styles.detailsButtonText}>Details</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.detailsButton} onPress={() => navigation.navigate('EditProject', { projectID: project.ID })}>
              <Text style={styles.detailsButtonText}>✎ Edit</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
      <TouchableOpacity style={styles.newProjectButton} onPress={() => navigation.navigate('NewProject')}>
        <Text style={styles.newProjectButtonText}>New Project</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}


