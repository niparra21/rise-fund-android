import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from '../assets/Styles/Styles';
import { AuthContext } from '../AuthContext';
import { getUserInfo, getUserAccountInfo } from '../controllers/USER_Config_Controller';
import { getProjectDetails, editProject } from '../controllers/CREATOR_EditProject_Controller';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function CREATOR_EditProject_View() {
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [completionDate, setCompletionDate] = useState(new Date());
  const [contributionGoal, setContributionGoal] = useState('');
  const [amountGathered, setAmountGathered] = useState('');
  const [status, setStatus] = useState('Active');
  const [category, setCategory] = useState('Technology');
  const [projectContact, setProjectContact] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showCompletionDatePicker, setShowCompletionDatePicker] = useState(false);

  const { userID } = useContext(AuthContext);
  const navigation = useNavigation();
  const route = useRoute();
  const { projectID } = route.params;

  useEffect(() => {
    fetchUserInfo();
    fetchProjectDetails();
  }, []);

  const fetchUserInfo = async () => {
    try {
      const userInfo = await getUserInfo(userID);
      if (userInfo) {
        setProjectContact(userInfo.Email);
      }

      const accountInfo = await getUserAccountInfo(userID);
      if (accountInfo) {
        setAccountNumber(accountInfo.AccountNumber);
      } else {
        Alert.alert(
          'Account Information Required',
          'No account information found for this user. Please configure your account before creating a project.',
          [{ text: 'OK', onPress: () => navigation.navigate('UserConfiguration') }]
        );
      }
    } catch (error) {
      console.error('Error fetching user or role info:', error);
    }
  };

  const fetchProjectDetails = async () => {
    try {
      const projectDetails = await getProjectDetails(projectID);
      if (projectDetails) {
        setProjectName(projectDetails.Title);
        setDescription(projectDetails.Description);
        setContributionGoal(projectDetails.ContributionGoal.toString());
        setAmountGathered(projectDetails.AmountGathered.toString());
        setStartDate(new Date(projectDetails.Start));
        setCompletionDate(new Date(projectDetails.End));
        setStatus(projectDetails.Status === 1 ? 'Active' : projectDetails.Status === 2 ? 'Completed' : projectDetails.Status === 3 ? 'Blocked' : 'Delayed');
        setCategory(projectDetails.Category === 1 ? 'Technology' : projectDetails.Category === 2 ? 'Health' : projectDetails.Category === 3 ? 'Education' : projectDetails.Category === 4 ? 'Art' : 
                      projectDetails.Category === 5 ? 'Sports' : projectDetails.Category === 6 ? 'Science' : projectDetails.Category === 7 ? 'Community' : 'Other');
      }
    } catch (error) {
      console.error('Error fetching project details:', error);
    }
  };

  const handleEditProject = async () => {
    if (!projectName || !description || !contributionGoal) {
      Alert.alert('Error', 'Please fill out all required fields.');
      return;
    }

    if (projectName.length > 200) {
      Alert.alert('Error', 'Project name can be up to 200 characters long.');
      return;
    }

    if (description.length > 510) {
      Alert.alert('Error', 'Description can be up to 510 characters long.');
      return;
    }

    if (isNaN(contributionGoal)) {
      Alert.alert('Error', 'Contribution goal must be a numeric value.');
      return;
    }

    if (new Date(startDate) >= new Date(completionDate)) {
      Alert.alert('Error', 'Start date must be earlier than the completion date.');
      return;
    }

    try {
      const projectData = {
        userId: userID,
        title: projectName,
        description,
        contributionGoal: parseFloat(contributionGoal),
        amountGathered: amountGathered,
        start: startDate.toISOString().split('T')[0],
        end: completionDate.toISOString().split('T')[0],
        status: status === 'Active' ? 1 : status === 'Completed' ? 2 : status === 'Blocked' ? 3 : 4,
        category: category === 'Technology' ? 1 : category === 'Health' ? 2 : category === 'Education' ? 3 : category === 'Art' ? 4 : 
                  category === 'Sports' ? 5 : category === 'Science' ? 6 : category === 'Community' ? 7 : 8,
      };

      const result = await editProject(
        projectData.userId,
        projectData.title,
        projectData.description,
        projectData.contributionGoal,
        projectData.amountGathered,
        projectData.start,
        projectData.end,
        projectData.status,
        projectData.category,
      );

      if (result) {
        await handleInsertRegister(3, `Project edited by user ${userID}`);
        Alert.alert('Success', 'Project edited successfully!');
        navigation.navigate('CREATOR_Menu_View');
      } else {
        Alert.alert('Error', 'Project edition failed.');
      }
    } catch (error) {
      console.error('Error saving project:', error);
      Alert.alert('Error', 'There was an issue saving the project.');
    }

    };
  return (
    <ScrollView>
      <View style={styles.containerNewProject}>
        <Text style={styles.titleNewProject}>Edit Project</Text>

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

        {/* Description */}
        <Text style={styles.labelNewProject}>Description</Text>
        <TextInput
          style={styles.inputNewProject}
          value={description}
          onChangeText={setDescription}
          placeholder="Enter project description"
          multiline={true}
        />

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton} onPress={handleEditProject}>
          <Text style={styles.saveButtonText}>Save Project</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
