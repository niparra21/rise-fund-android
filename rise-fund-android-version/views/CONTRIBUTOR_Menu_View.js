import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import styles from '../assets/Styles/Styles';
import { handleGetProjects, handleGetFilteredProjectsByCategory, handleGetFilteredProjectsByProgress, handleGetFilteredProjectsByMoney } from '../controllers/CONTRIBUTOR_Menu_Controller';

export default function CONTRIBUTOR_Menu_View() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedProgress, setSelectedProgress] = useState('');
  const [selectedMoney, setSelectedMoney] = useState('');
  const [searchText, setSearchText] = useState('');
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);

  // Obtiene todos los proyectos de la base de datos
  useEffect(() => {
    fetchProjects();
  }, []);

  // Filtra proyectos cuando cambia la categoría, progreso o dinero recaudado
  useEffect(() => {
    applyFilters();
  }, [selectedCategory, selectedProgress, selectedMoney, projects]);

  const fetchProjects = async () => {
    try {
      const allProjects = await handleGetProjects();
      setProjects(allProjects);
      setFilteredProjects(allProjects);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const applyFilters = async () => {
    let filtered = projects;

    if (selectedCategory) {
      filtered = await fetchFilteredProjectsCategory(selectedCategory);
    }

    if (selectedProgress) {
      filtered = await fetchFilteredProjectsByProgress(selectedProgress, filtered);
    }

    if (selectedMoney) {
      filtered = await fetchFilteredProjectsByMoney(selectedMoney, filtered);
    }

    if (searchText) {
      filtered = filterProjectsByName(searchText, filtered);
    }

    setFilteredProjects(filtered);
  };

  const fetchFilteredProjectsCategory = async (categoryID) => {
    try {
      return await handleGetFilteredProjectsByCategory({ CategoryID: parseInt(categoryID) });
    } catch (error) {
      console.error('Error fetching filtered projects by category:', error);
      return [];
    }
  };

  const fetchFilteredProjectsByProgress = async (progressRange, projects) => {
    try {
      const [minProgress, maxProgress] = getProgressLimits(progressRange);
      return projects.filter(project => {
        const progress = (project.AmountGathered * 100 / project.ContributionGoal);
        return progress >= minProgress && progress <= maxProgress;
      });
    } catch (error) {
      console.error('Error filtering projects by progress:', error);
      return projects;
    }
  };

  const getProgressLimits = (progressRange) => {
    switch (progressRange) {
      case '0-25': return [0, 25];
      case '26-50': return [26, 50];
      case '51-75': return [51, 75];
      case '76-100': return [76, 100];
      default: return [0, 100];
    }
  };

  const fetchFilteredProjectsByMoney = async (moneyRange, projects) => {
    try {
      const [minAmount, maxAmount] = getMoneyLimits(moneyRange);
      return projects.filter(project => 
        project.AmountGathered >= minAmount && project.AmountGathered <= maxAmount
      );
    } catch (error) {
      console.error('Error filtering projects by money:', error);
      return projects;
    }
  };

  const getMoneyLimits = (moneyRange) => {
    switch (moneyRange) {
      case '0-100': return [0, 100];
      case '101-500': return [101, 500];
      case '500+': return [500, Infinity];
      default: return [0, Infinity];
    }
  };

  const filterProjectsByName = (searchText, projects) => {
    return projects.filter(project =>
      project.Title.toLowerCase().includes(searchText.toLowerCase())
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.exploreTitle}>Explore projects of your interest</Text>

      {/* Barra de búsqueda */}
      <View style={styles.searchContainer}>
        <TextInput 
          placeholder="Search" 
          style={styles.searchInput} 
          value={searchText} 
          onChangeText={setSearchText}  
        />
        <TouchableOpacity style={styles.searchButton} onPress={() => applyFilters()}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>

      {/* Filtros */}
      <View style={styles.filterContainer}>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedCategory}
            onValueChange={(itemValue) => setSelectedCategory(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Categories" value="" />
            <Picker.Item label="Technology" value="1" />
            <Picker.Item label="Health" value="2" />
            <Picker.Item label="Education" value="3" />
            <Picker.Item label="Art" value="4" />
            <Picker.Item label="Sports" value="5" />
            <Picker.Item label="Science" value="6" />
            <Picker.Item label="Community" value="7" />
            <Picker.Item label="Other" value="8" />
          </Picker>
        </View>

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

      {/* Lista de Proyectos Filtrados */}
      {filteredProjects.map((project) => (
        <View key={`${project.ID}-${project.Title}`} style={styles.projectCard}>
          <View style={styles.imagePlaceholder}>
            <Text style={styles.imageText}>Image</Text>
          </View>
          <View style={styles.projectInfo}>
            <Text style={styles.projectText}>Name: {project.Title}</Text>
            <Text style={styles.projectText}>Money raised: {project.AmountGathered}</Text>
            <Text style={styles.projectText}>Rating: {'★'.repeat(Math.round(project.AverageRating))}</Text>
            <Text style={styles.projectText}>Progress: {(project.AmountGathered * 100 / project.ContributionGoal).toFixed(2)}%</Text>
            <TouchableOpacity style={styles.detailsButton}>
              <Text style={styles.detailsButtonText}>Details</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}
