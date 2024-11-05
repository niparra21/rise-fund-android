import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { RiseFundInterfaceStyles } from '../assets/Styles/Styles';
import { getAllProjects, getAllProjectStatus, updateProjectStatus } from '../controllers/ADMIN_Project_Controller';
import {insertRegister} from '../controllers/SYSTEM_Register_Controller'
const handleInsertRegister = async (type, detail) => {
  try {
    await insertRegister(type, detail);
  } catch (error) {
    console.error('Error inserting register:', error);
  }
};

export default function ADMIN_Project_View() {
  const [statuses, setStatuses] = useState([]); // Lista de estados de proyectos
  const [projects, setProjects] = useState([]); // Lista de todos los proyectos
  const [selectedProject, setSelectedProject] = useState(null); // Proyecto seleccionado
  const [selectedStatus, setSelectedStatus] = useState(""); // Estado seleccionado en el desplegable

  // Función para obtener y actualizar la lista de proyectos
  const fetchProjects = async () => {
    try {
      const projectData = await getAllProjects();
      setProjects(projectData); // Actualiza el estado con la lista de proyectos
    } catch (error) {
      console.error('Error fetching projects:', error);
      Alert.alert('Error', 'There was an error fetching projects.');
    }
  };

  // Función para obtener y actualizar la lista de estados de proyectos
  const fetchProjectStatuses = async () => {
    try {
      const statusData = await getAllProjectStatus();
      setStatuses(statusData); // Actualiza el estado con la lista de estados
    } catch (error) {
      console.error('Error fetching project statuses:', error);
      Alert.alert('Error', 'There was an error fetching project statuses.');
    }
  };

  // useEffect para cargar la lista de proyectos y estados al montar el componente
  useEffect(() => {
    fetchProjects();
    fetchProjectStatuses();
  }, []);

  // Función para manejar la selección de un proyecto y configurar su estado correspondiente
  const handleProjectSelect = (project) => {
    setSelectedProject(project); // Establece el proyecto seleccionado

    // Busca el estado correspondiente del proyecto en la lista de estados
    const matchingStatus = statuses.find((status) => status.ID === project.Status);
    if (matchingStatus) {
      setSelectedStatus(matchingStatus.ID); // Configura el estado seleccionado
    } else {
      setSelectedStatus(""); // Limpia el estado si no hay coincidencia
    }
  };

  // Función para manejar el cambio de estado del proyecto
  const handleChangeStatus = async () => {
    // Verifica si hay un proyecto seleccionado
    if (!selectedProject) {
      Alert.alert("Error", "Please select a project to change its status.");
      return;
    }

    // Verifica si se ha seleccionado un estado válido
    if (selectedStatus === "") {
      Alert.alert("Error", "Please select a valid status.");
      return;
    }

    try {
      // Llama a la función del controlador para actualizar el estado en la base de datos
      const result = await updateProjectStatus(selectedProject.ID, selectedStatus);

      if (result.success) {
        Alert.alert("Success", result.message);
        await handleInsertRegister(3, `Project: ${selectedProject.ID} status was changed by Administrator to Status: ${selectedStatus}`); // 1 Usuario - 2 Donacion - 3 Proyecto
        fetchProjects(); // Refresca la lista de proyectos para reflejar el cambio de estado
      } else {
        Alert.alert("Error", result.message);
      }
    } catch (error) {
      console.error("Error changing project status:", error);
      Alert.alert("Error", "There was an error updating the project status.");
    }
  };

  

  return (
    <ScrollView style={RiseFundInterfaceStyles.container}>
      <View style={RiseFundInterfaceStyles.header}>
        <Text style={RiseFundInterfaceStyles.headerTitle}>RiseFund Admin</Text>
        <TouchableOpacity style={RiseFundInterfaceStyles.statisticsButton}>
          <Text style={RiseFundInterfaceStyles.buttonText}>Statistics</Text>
        </TouchableOpacity>
      </View>

      <View style={RiseFundInterfaceStyles.userListContainer}>
        <View style={RiseFundInterfaceStyles.userItem}>
          <Text style={[RiseFundInterfaceStyles.columnHeader, { flex: 1, textAlign: 'center' }]}>ID</Text>
          <Text style={[RiseFundInterfaceStyles.columnHeader, { flex: 2, textAlign: 'center' }]}>Title</Text>
          <Text style={[RiseFundInterfaceStyles.columnHeader, { flex: 1, textAlign: 'center' }]}>Creator ID</Text>
          <Text style={[RiseFundInterfaceStyles.columnHeader, { flex: 1, textAlign: 'center' }]}>Status</Text>
        </View>
        {projects.map((project) => (
          <TouchableOpacity key={project.ID} onPress={() => handleProjectSelect(project)}>
            <View style={RiseFundInterfaceStyles.userItem}>
              <Text style={{ flex: 1, textAlign: 'center' }}>{project.ID}</Text>
              <Text style={{ flex: 2, textAlign: 'center' }}>{project.Title}</Text>
              <Text style={{ flex: 1, textAlign: 'center' }}>{project.UserId}</Text>
              <Text style={{ flex: 1, textAlign: 'center' }}>{project.Status}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={RiseFundInterfaceStyles.userDetailsContainer}>
        <TextInput
          style={RiseFundInterfaceStyles.input}
          placeholder="Project ID"
          value={selectedProject ? selectedProject.ID.toString() : ""}
          editable={false}
        />
        <TextInput
          style={RiseFundInterfaceStyles.input}
          placeholder="Title"
          value={selectedProject ? selectedProject.Title : ""}
          editable={false}
        />
        <TextInput
          style={[RiseFundInterfaceStyles.input, { height: 80, textAlignVertical: 'top' }]}
          placeholder="Description"
          value={selectedProject ? selectedProject.Description : ""}
          multiline
          editable={false}
        />
        <TextInput
          style={RiseFundInterfaceStyles.input}
          placeholder="Creator ID"
          value={selectedProject ? selectedProject.UserId.toString() : ""}
          editable={false}
        />

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TextInput
            style={[RiseFundInterfaceStyles.input, { flex: 1, marginRight: 5 }]}
            placeholder="Goal"
            value={selectedProject ? selectedProject.ContributionGoal.toString() : ""}
            editable={false}
          />
          <TextInput
            style={[RiseFundInterfaceStyles.input, { flex: 1, marginLeft: 5 }]}
            placeholder="Amount Gathered"
            value={selectedProject ? selectedProject.AmountGathered.toString() : ""}
            editable={false}
          />
        </View>

        {/* Desplegable para seleccionar el estado del proyecto */}
        <View style={RiseFundInterfaceStyles.dropdown}>
          <Picker
            selectedValue={selectedStatus}
            onValueChange={(itemValue) => setSelectedStatus(itemValue)}
          >
            <Picker.Item label="Select Status" value="" />
            {statuses.map((status) => (
              <Picker.Item key={status.ID} label={status.StatusName} value={status.ID} />
            ))}
          </Picker>
        </View>

        <TouchableOpacity style={RiseFundInterfaceStyles.button} onPress={handleChangeStatus}>
          <Text style={RiseFundInterfaceStyles.buttonText}>Change Status</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
