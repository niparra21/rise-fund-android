import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import styles from './Styles';


export default function ContribuitorMenuScreen() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedProgress, setSelectedProgress] = useState('');
  const [selectedMoney, setSelectedMoney] = useState('');

  const projects = [
    { id: 1, name: 'My first project', moneyRaised: '100$', rating: '*****', progress: '50%' },
    { id: 2, name: 'My second project', moneyRaised: '200$', rating: '****', progress: '75%' },
    { id: 3, name: 'My third project', moneyRaised: '300$', rating: '***', progress: '30%' },
  ];

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.exploreTitle}>Explore projects of your interest</Text>

      {/* Barra de búsqueda */}
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search"
          style={styles.searchInput}
        />
        <TouchableOpacity style={styles.searchButton}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>

      {/* Filtros */}
      <View style={styles.filterContainer}>
        {/* Dropdown para Categorías */}
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedCategory}
            onValueChange={(itemValue) => setSelectedCategory(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Categories" value="" />
            <Picker.Item label="Technology" value="technology" />
            <Picker.Item label="Health" value="health" />
            <Picker.Item label="Education" value="education" />
          </Picker>
        </View>

        {/* Dropdown para Progreso */}
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedProgress}
            onValueChange={(itemValue) => setSelectedProgress(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Progress" value="" />
            <Picker.Item label="0-25%" value="0-25" />
            <Picker.Item label="26-50%" value="26-50" />
            <Picker.Item label="51-75%" value="51-75" />
            <Picker.Item label="76-100%" value="76-100" />
          </Picker>
        </View>

        {/* Dropdown para Dinero Recaudado */}
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedMoney}
            onValueChange={(itemValue) => setSelectedMoney(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Raised money" value="" />
            <Picker.Item label="Less than $100" value="0-100" />
            <Picker.Item label="$101-$500" value="101-500" />
            <Picker.Item label="More than $500" value="500+" />
          </Picker>
        </View>
      </View>

      {/* Lista de Proyectos */}
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
    </ScrollView>
  );
}