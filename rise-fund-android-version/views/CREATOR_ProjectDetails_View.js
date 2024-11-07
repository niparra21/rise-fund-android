import React, { useEffect, useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import styles from '../assets/Styles/Styles';
import { handleGetProjectById, handleGetProjectComments, handleInsertComment } from '../controllers/CREATOR_ProjectDetails_Controller';
import { AuthContext } from '../AuthContext';

export default function CreatorProjectDetailsView() {
    const route = useRoute();
    const { userID } = useContext(AuthContext);
    const { projectID } = route.params;
    const [project, setProject] = useState({});
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);

    const navigation = useNavigation();

    useEffect(() => {
        if (projectID !== undefined) {
            fetchProject();
            fetchComments();
        } else {
            console.log("No se pasó el projectId.");
        }
    }, [projectID]);

    const fetchProject = async () => {
        try {
            const projectData = await handleGetProjectById(projectID);
            setProject(projectData[0]);
        } catch (error) {
            console.error('Error fetching project:', error);
        }
    };

    const fetchComments = async () => {
        try {
            const projectComments = await handleGetProjectComments(projectID);
            setComments(projectComments);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    const onShare = async () => {
        try {
            const result = await Share.share({
                message: `¡Take a look at this project!\n\nTitle: ${project.Title}\n\nDescription: ${project.Description}\n\nContribution Goal: $${project.ContributionGoal}\n\nRaised Money: ${project.AmountGathered}`,
            });
    
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    console.log('Shared on an specific activity:', result.activityType);
                } else {
                    Alert.alert('Successfully shared!');
                }
            } else if (result.action === Share.dismissedAction) {
                console.log('User dismissed the share dialog.');
            }
        } catch (error) {
            Alert.alert('Error', 'There was an issue while sharing the content from the project.');
            console.error('Error while sharing:', error);
        }
    };

    const handlePostComment = async () => {
        if  (comment !== '') {
            const insertComment = await handleInsertComment(userID, 1, projectID, comment);
            if (insertComment.success) {
                await fetchComments();
                setComment('');
            } else {
                Alert.alert('Comment Error', 'Error creating comment.');
            }
        } else {
            Alert.alert('Comment Error', 'Please enter a comment.');
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.projectContainer}>
                <View style={styles.projectBox}>
                    <Text style={styles.title}>{project.Title}</Text>
                    <View style={styles.imagePlaceholder}>
                        <Text style={styles.imageText}>Image Placeholder</Text>
                    </View>
                    <View style={styles.projectStatsBox}>
                        <Text style={styles.projectDescription}>Amount Raised: {project.AmountGathered}</Text>
                        <Text style={styles.projectDescription}>Goal: {project.ContributionGoal}</Text>
                        <Text style={styles.projectDescription}>Progress: {(project.AmountGathered * 100 / project.ContributionGoal).toFixed(2)}%</Text>
                    </View>
                    <View style={styles.ProjectButtonContainer}>
                        <TouchableOpacity style={styles.projectButton} onPress={onShare}>
                            <Text style={styles.projectButtonText}>Share</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.projectBox}>
                    <Text style={styles.title}>By: {project.FirstName}</Text>
                    <Text style={styles.projectDescription}>Description: {project.Description}</Text>
                    <Text style={styles.stars}>Project Rating: {'★'.repeat(Math.round(project.AverageRating))}</Text>
                </View>

                <View style={styles.projectBox}>
                    <Text style={styles.title}>Comments</Text>
                    <View style={styles.projectCommentsBox}>
                        {comments.map((comment, index) => (
                            <View key={index} style={styles.commentContainer}>
                                <Text style={styles.projectComments}>
                                    {comment.UserId === project.UserId ? (
                                        <Text>
                                            <Text style={{ fontWeight: 'bold' }}>Creator-{comment.FirstName}:</Text> {comment.Content}
                                        </Text>
                                    ) : (
                                        <Text>{comment.FirstName}: {comment.Content}</Text>
                                    )}
                                </Text>
                                <View style={styles.commentDivider} />
                            </View>
                        ))}
                    </View>
                    <TextInput
                        placeholder="Share a comment with your contributors"
                        style={styles.input}
                        value={comment}
                        onChangeText={setComment}
                    />
                    <View style={styles.ProjectButtonContainer}>
                        <TouchableOpacity style={styles.projectButton} onPress={handlePostComment}>
                            <Text style={styles.projectButtonText}>Post</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.ProjectButtonContainer}>
                    <TouchableOpacity style={styles.projectButton} onPress={() => navigation.navigate('ProjectForum', { projectID: projectID, projectUserID: project.UserId, projectTitle: project.Title, projectDescription: project.Description })}>
                        <Text style={styles.projectButtonText}>Access Forum</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}
