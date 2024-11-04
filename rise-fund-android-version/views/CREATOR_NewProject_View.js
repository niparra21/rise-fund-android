import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Button, Platform, ScrollView} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from '../assets/Styles/Styles';

export default function CREATOR_NewProject_View() {
  const [projectName, setProjectName] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [completionDate, setCompletionDate] = useState(new Date());
  const [contributionGoal, setContributionGoal] = useState('');
  const [status, setStatus] = useState('Active');
  const [category, setCategory] = useState('Technology');
  const [projectContact, setProjectContact] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showCompletionDatePicker, setShowCompletionDatePicker] = useState(false);

  const handleSaveProject = () => {
    // Handle the logic to save the project details here
    console.log('Project saved:', {
      projectName,
      projectId,
      startDate,
      completionDate,
      contributionGoal,
      status,
      category,
      projectContact,
      accountNumber,
    });
  };

  return (
    <ScrollView>
    <View style={styles.containerNewProject}>
      <Text style={styles.titleNewProject}>New Project</Text>

      {/* Project Name */}
      <Text style={styles.labelNewProject}>Project Name</Text>
      <TextInput
        style={styles.inputNewProject}
        value={projectName}
        onChangeText={setProjectName}
        placeholder="Enter project name"
      />

      {/* Start Date */}
      <Text style={styles.labelNewProject}>Start Date</Text>
      <TouchableOpacity onPress={() => setShowStartDatePicker(true)} style={styles.dateInput}>
        <Text>{startDate.toDateString()}</Text>
      </TouchableOpacity>
      {showStartDatePicker && (
        <DateTimePicker
          value={startDate}
          mode="date"
          display="default"
          onChange={(event, date) => {
            setShowStartDatePicker(false);
            if (date) setStartDate(date);
          }}
        />
      )}

      {/* Expected Completion Date */}
      <Text style={styles.labelNewProject}>Expected Completion Date</Text>
      <TouchableOpacity onPress={() => setShowCompletionDatePicker(true)} style={styles.dateInput}>
        <Text>{completionDate.toDateString()}</Text>
      </TouchableOpacity>
      {showCompletionDatePicker && (
        <DateTimePicker
          value={completionDate}
          mode="date"
          display="default"
          onChange={(event, date) => {
            setShowCompletionDatePicker(false);
            if (date) setCompletionDate(date);
          }}
        />
      )}

      {/* Contribution Goal */}
      <Text style={styles.labelNewProject}>Contribution Goal</Text>
      <TextInput
        style={styles.inputNewProject}
        value={contributionGoal}
        onChangeText={setContributionGoal}
        placeholder="Enter goal amount"
        keyboardType="numeric"
      />

      {/* Status */}
      <Text style={styles.labelNewProject}>Status</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={status}
          onValueChange={(itemValue) => setStatus(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Active" value="Active" />
          <Picker.Item label="Completed" value="Completed" />
          <Picker.Item label="Blocked" value="Blocked" />
          <Picker.Item label="Delayed" value="Delayed" />
        </Picker>
      </View>
      {/* Category */}
      <Text style={styles.labelNewProject}>Category</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={category}
          onValueChange={(itemValue) => setCategory(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Technology" value="Technology" />
          <Picker.Item label="Health" value="Health" />
          <Picker.Item label="Education" value="Education" />
          <Picker.Item label="Art" value="Art" />
          <Picker.Item label="Sports" value="Sports" />
          <Picker.Item label="Science" value="Science" />
          <Picker.Item label="Community" value="Community" />
          <Picker.Item label="Other" value="Other" />
        </Picker>
      </View>
      {/* Project Contact */}
      <Text style={styles.labelNewProject}>Project Contact</Text>
      <TextInput
        style={styles.inputNewProject}
        value={projectContact}
        onChangeText={setProjectContact}
        editable={false}
        placeholder="Enter contact information"
      />

      {/* Account Number */}
      <Text style={styles.labelNewProject}>Account Number</Text>
      <TextInput
        style={styles.inputNewProject}
        value={accountNumber}
        onChangeText={setAccountNumber}
        editable={false}
        placeholder="Enter account number"
        keyboardType="numeric"
      />

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveProject}>
        <Text style={styles.saveButtonText}>Create Project</Text>
      </TouchableOpacity>
    </View>
    </ScrollView>
  );
}
