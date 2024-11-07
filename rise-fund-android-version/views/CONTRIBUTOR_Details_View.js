import React, { useEffect, useState, useContext, useCallback  } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, Share } from 'react-native';
import { useRoute, useNavigation, useFocusEffect } from '@react-navigation/native';
import styles from '../assets/Styles/Styles';
import { handleGetProjectById, handleInsertDonation, handleUpdateAccountBalance, handleGetPaymentAccountData, handleGetUserById, handleGetProjectComments, handleInsertComment, handleInsertRating, createAlert } from '../controllers/CONTRIBUTOR_Details_Controller';
import { AuthContext } from '../AuthContext';
import { insertRegister } from '../controllers/SYSTEM_Register_Controller';
import { sendEmail } from '../database/apiService';

export default function ProjectDetailsView() {
    const route = useRoute();
    const { userID } = useContext(AuthContext);
    const [userData, setUserData] = useState(null);
    const [paymentData, setPaymentData] = useState(null);
    const { projectId } = route.params;
    const [project, setProject] = useState({});
    const [startDateText, setStartDateText] = useState('');
    const [endDateText, setEndDateText] = useState('');
    const [donationAmount, setDonationAmount] = useState('');
    const [message, setMessage] = useState('');
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const [rating, setRating] = useState(0);
    const [isRatingSubmitted, setIsRatingSubmitted] = useState(false);
    const navigation = useNavigation();


    useFocusEffect(
        useCallback(() => {
          if (projectId !== undefined) {
            fetchProject();
            fetchComments();
          } else {
            console.log("Error at fetching project information");
          }
          getPaymentData();
          getUserData();
        }, [projectId])
    );

    const fetchProject = async () => {
        try {
            const projectData = await handleGetProjectById(projectId);
            await setProject(projectData[0]);
            await setStartDateText(projectData[0]?.Start || '');
            await setEndDateText(projectData[0]?.End || '');
        } catch (error) {
            console.error('Error fetching project:', error);
        }
    };

    const fetchComments = async () => {
        try {
            const projectComments = await handleGetProjectComments(projectId);
            await setComments(projectComments); 
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    const getPaymentData = async () => {
        try {
            const data = await handleGetPaymentAccountData(userID);
            await setPaymentData(data);
        } catch (error) {
            console.error('Error fetching payment account data:', error);
        }
    };

    const getUserData = async () => {
        try {
            const data = await handleGetUserById(userID);
            setUserData(data[0]);
        } catch (error) {0
            console.error('Error fetching user data:', error);
        }
    };

    const checkForDeadline = async () => {
        const startDate = new Date(startDateText);
        const endDate = new Date(endDateText);
        
        if (isNaN(startDate) || isNaN(endDate)) {
            console.log("Las fechas no son válidas:", startDate, endDate);
            return;
        }
    
        const oneWeekInMs = 7 * 24 * 60 * 60 * 1000;
        if ((endDate - startDate) <= oneWeekInMs) {
            Alert.alert(
                'Project Warning',
                'The project end date is within one week of its end date.'
            );
            const currentDate = new Date();
            createAlert(currentDate, 'This project with ID ' + projectId + ' is ending soon.');
        }
    };
    
    
    

    const makeDonation = async () => {
        const amount = parseFloat(donationAmount);

        if (isNaN(amount) || amount <= 0) {
            Alert.alert('Invalid Donation Amount', 'Please enter a valid donation amount.');
            return;
        }

        const halfGoal = project.ContributionGoal * 0.5;
        if (amount >= halfGoal && amount < project.ContributionGoal) {
            const currentDate = new Date();
            createAlert(currentDate, 'This donation amount (' + amount + ') is 50% or more of the project (' + projectId + ') contribution goal.');
        } else if (amount > project.ContributionGoal) {
            const currentDate = new Date();
            createAlert(currentDate, 'This donation amount (' + amount + ') is more than the project (' + projectId + ') contribution goal.');
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
                await donationSentMail(amount, message);
                await checkForDeadline();
            } else {
                Alert.alert('Donation Error', 'Error creating donation.');
            }
        } else {
            Alert.alert('Update Error', result.message);
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

    const handleRatingSubmit = async () => {
        if (rating < 1 || rating > 5) {
            Alert.alert('Invalid Rating', 'Please select a rating between 1 and 5.');
            return;
        }

        const result = await handleInsertRating(projectId, userID, rating);
        if (result.success) {
            setIsRatingSubmitted(true);
            Alert.alert('Thank you!', 'Your rating has been submitted.');
            fetchProject(); 
        } else {
            Alert.alert('Rating Error', 'There was an issue submitting your rating.');
        }
    };

    const handlePostComment = async () => {
        if (comment !== '') {
            const insertComment = await handleInsertComment(userID, 1,  projectId, comment);
            if  (insertComment.success) {
                await fetchComments();
                setComment('');
                } 
            else {
                Alert.alert('Comment Error', 'Error creating comment.');
            }
        } else {
            Alert.alert('Comment Error', 'Please enter a comment.');
    };
}

    const handleInsertRegister = async (type, detail) => {
        try {
            await insertRegister(type, detail);
        } catch (error) {
            console.error('Error inserting register:', error);
        }
    };

    const SendCustomEmail = async (toWho, subject, body) => {
        try {
          await sendEmail(toWho, subject, body);
        } catch (error) {
          console.error('Error sending email:', error);
        }
      };

    const handleContact = async () => {
        const toWho = project.Email; 
        const subject = `Consultation about the project: ${project.Title}`;
        const body = `Hi ${project.FirstName},\n\nI would like to know more about the project: "${project.Title}".\n\nThank you,\n${userData?.FirstName || 'User'}`;
    
        await SendCustomEmail(toWho, subject, body);
        Alert.alert('Email sent', 'Your email has been sent.');
    };

    const donationSentMail = async (amount, message) => {
        const toWho = project.Email;
        const subject = `Donation to the project: ${project.Title}`;
        const body = `Hi ${project.FirstName},\n\nUser ${userData?.FirstName || 'a contributor'} has just made a donation of $${amount} to your project "${project.Title}".\n\nMessage from the donor:\n"${message}"\n\nThank you for your efforts and contributions!\n\nBest regards,\nThe Team`;
    
        try {
            await SendCustomEmail(toWho, subject, body);
        } catch (error) {
            console.error('Error sending donation email:', error);
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
                        <TouchableOpacity style={styles.projectButton} onPress={handleContact}>
                            <Text style={styles.projectButtonText}>Contact</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.projectBox}>
                    <Text style={styles.title}>By: {project.FirstName}</Text>
                    <Text style={styles.projectDescription}>Description: {project.Description}</Text>
                    <Text style={styles.rating}>Project Rating: {'★'.repeat(Math.round(project.AverageRating))}</Text>
                    <Text style={styles.title}>Rate this Project</Text>
                    <View style={[styles.projectBox, { flexDirection: 'row', justifyContent: 'center' }]}>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <TouchableOpacity key={star} onPress={() => setRating(star)} disabled={isRatingSubmitted}>
                                <Text style={styles.stars}>{star <= rating ? '★' : '☆'}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    <View style={styles.ProjectButtonContainer}>
                        <TouchableOpacity style={styles.projectButton} onPress={handleRatingSubmit} disabled={isRatingSubmitted}>
                            <Text style={styles.projectButtonText}>Submit Rating</Text>
                        </TouchableOpacity>
                    </View>
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
                                <Text
                                    style={[
                                        styles.projectComments,
                                        comment.UserId === project.UserId && { fontWeight: 'bold' }
                                    ]}
                                >
                                    {comment.UserId === project.UserId ? "Creator-" : ""}
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
                    <TouchableOpacity style={styles.projectButton} onPress={() => navigation.navigate('ProjectForum', { projectID: projectId, projectUserID: project.UserId, projectTitle: project.Title, projectDescription: project.Description })}>
                        <Text style={styles.projectButtonText}>Access Forum</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}
