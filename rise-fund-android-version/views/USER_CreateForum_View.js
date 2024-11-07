import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import styles from '../assets/Styles/Styles';
import { executeProcedure } from '../database/apiService';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../AuthContext';
import { createForum } from '../controllers/USER_CreateForum_Controller';

export default function USER_CreateForum_View() {
    const { userID } = useContext(AuthContext);
    const [forumTitle, setForumTitle] = useState('');
    const [forumDescription, setForumDescription] = useState('');
    const navigation = useNavigation();

    const handleCreateForum = async () => {
        try {
            await createForum(0, userID, forumTitle, forumDescription);
            setForumTitle('');
            setForumDescription('');
            navigation.goBack();
        }
        catch (error) {
            console.error('Error creating forum:', error);
        }
    };
    
    const handleCancel = () => {
        setForumTitle('');
        setForumDescription('');
        navigation.goBack();
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.projectContainer}>
                {/* Forum Title Input */}
                <Text style={styles.title}>Create Forum</Text>

                <View style={styles.projectBox}>
                    <Text style={styles.projectDescriptionTitle}>Forum Title:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter forum title"
                        value={forumTitle}
                        onChangeText={setForumTitle}
                    />
                    <Text style={styles.projectDescriptionTitle}>Forum Description:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter forum description"
                        value={forumDescription}
                        onChangeText={setForumDescription}
                        multiline
                    />
                </View>

                {/* Buttons Section */}
                <View style={styles.ProjectButtonContainer}>
                    <TouchableOpacity style={styles.projectButton} onPress={handleCancel}>
                        <Text style={styles.projectButtonText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.projectButton} onPress={handleCreateForum}>
                        <Text style={styles.projectButtonText}>Create Forum</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}
