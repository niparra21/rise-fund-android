import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import styles from '../assets/Styles/Styles';
  
export default function CREATOR_Menu_View() {
  const projects = [
    { id: 1, name: 'My first project', moneyRaised: '100$', rating: '*****', progress: '50%' },
    { id: 2, name: 'My second project', moneyRaised: '200$', rating: '****', progress: '75%' },
    { id: 3, name: 'My third project', moneyRaised: '300$', rating: '***', progress: '30%' },
  ];

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.title}>My Projects</Text>
      {projects.map((project) => (
        <View key={project.id} style={styles.projectCard}>
          <View style={styles.imagePlaceholder}>
            <Text style={styles.imageText}>Image</Text>
          </View>
          <View style={styles.projectInfo}>
            <Text style={styles.projectText}>Name: {project.name}</Text>
            <Text style={styles.projectText}>Money raised: {project.moneyRaised}</Text>
            <Text style={styles.projectText}>Rating: {project.rating}</Text>
            <Text style={styles.projectText}>Progress: {project.progress}</Text>
            <TouchableOpacity style={styles.detailsButton}>
              <Text style={styles.detailsButtonText}>Details</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
      <TouchableOpacity style={styles.newProjectButton}>
        <Text style={styles.newProjectButtonText}>New Project</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
