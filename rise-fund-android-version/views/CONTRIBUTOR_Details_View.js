import React, { useEffect, useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import styles from '../assets/Styles/Styles';
import { handleGetProjectById, handleInsertDonation, handleUpdateAccountBalance, handleGetPaymentAccountData, handleGetUserById, handleGetProjectComments, handleInsertComment } from '../controllers/CONTRIBUTOR_Details_Controller';
import { AuthContext } from '../AuthContext';
import { insertRegister } from '../controllers/SYSTEM_Register_Controller';

export default function ProjectDetailsView() {
    const route = useRoute();
    const { userID } = useContext(AuthContext);
    const [userData, setUserData] = useState(null);
    const [paymentData, setPaymentData] = useState(null);
    const { projectId } = route.params;
    const [project, setProject] = useState({});
    const [donationAmount, setDonationAmount] = useState('');
    const [message, setMessage] = useState('');
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);

    useEffect(() => {
        if (projectId !== undefined) {
            fetchProject();
            fetchComments();
        } else {
            console.log("No se pasó el projectId.");
        }
        getPaymentData();
        getUserData();
    }, [projectId]);

    const fetchProject = async () => {
        try {
            const projectData = await handleGetProjectById(projectId);
            setProject(projectData[0]);
        } catch (error) {
            console.error('Error fetching project:', error);
        }
    };

    const fetchComments = async () => {
        try {
            const projectComments = await handleGetProjectComments(projectId);
            setComments(projectComments); 
            console.log(projectComments); 
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    const getPaymentData = async () => {
        try {
            const data = await handleGetPaymentAccountData(userID);
            setPaymentData(data);
            console.log('Balance:', data[0]?.Balance);
        } catch (error) {
            console.error('Error fetching payment account data:', error);
        }
    };

    const getUserData = async () => {
        try {
            const data = await handleGetUserById(userID);
            setUserData(data[0]);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const makeDonation = async () => {
        const amount = parseFloat(donationAmount);

        if (isNaN(amount) || amount <= 0) {
            Alert.alert('Invalid Donation Amount', 'Please enter a valid donation amount.');
            return;
        }

        await getPaymentData();

        if (paymentData && paymentData.length > 0) {
            const balance = paymentData[0].Balance;

            if (balance < amount) {
                Alert.alert('Insufficient Funds', 'You have insufficient balance for this donation.');
                return;
            }
        } else {
            Alert.alert('Error', 'Unable to fetch payment data.');
            return;
        }

        const result = await handleUpdateAccountBalance(userID, amount);

        if (result.success) {
            const createDonation = await handleInsertDonation(userID, projectId, amount, message);
            if (createDonation.success) {
                setMessage('');
                setDonationAmount('');
                await getPaymentData();
                await handleInsertRegister(2, `User ${userID} has donated to the project ${projectId}`);
            } else {
                Alert.alert('Donation Error', 'Error creating donation.');
            }
        } else {
            Alert.alert('Update Error', result.message);
        }
    };

    const handlePostComment = async () => {
        const insertComment = await handleInsertComment(userID, 1,  projectId, comment);
        if  (insertComment.success) {
            await fetchComments();
            } 
        else {
            Alert.alert('Comment Error', 'Error creating comment.');
        }
    };

    const handleInsertRegister = async (type, detail) => {
        try {
            await insertRegister(type, detail);
        } catch (error) {
            console.error('Error inserting register:', error);
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
                        <TouchableOpacity style={styles.projectButton}>
                            <Text style={styles.projectButtonText}>Share</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.projectButton}>
                            <Text style={styles.projectButtonText}>Contact</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.projectBox}>
                    <Text style={styles.title}>By: {project.FirstName}</Text>
                    <Text style={styles.projectDescription}>Description: {project.Description}</Text>
                    <Text style={styles.rating}>Project Rating: {'★'.repeat(Math.round(project.AverageRating))}</Text>
                    <TextInput
                        placeholder="Write a message for the author"
                        style={styles.input}
                        value={message}
                        onChangeText={setMessage}
                    />
                    <TextInput
                        placeholder="$0.00"
                        style={styles.input}
                        keyboardType="numeric"
                        value={donationAmount}
                        onChangeText={setDonationAmount}
                    />
                    <View style={styles.ProjectButtonContainer}>
                        <TouchableOpacity style={styles.projectButton} onPress={makeDonation}>
                            <Text style={styles.projectButtonText}>Donate</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.projectBox}>
                    <Text style={styles.title}>Comments</Text>
                    <View style={styles.projectCommentsBox}>
                        {comments.map((comment, index) => (
                            <View key={index} style={styles.commentContainer}>
                                <Text style={styles.projectComments}>
                                    {comment.FirstName}: {comment.Content}
                                </Text>
                                <View style={styles.commentDivider} />
                            </View>
                        ))}
                    </View>
                    <TextInput
                        placeholder="Share a comment with other contributors"
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
                    <TouchableOpacity style={styles.projectButton}>
                        <Text style={styles.projectButtonText}>Access Forum</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}
