import React, { useEffect, useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import styles from '../assets/Styles/Styles';
import { handleGetProjectById, handleInsertDonation, handleUpdateAccountBalance } from '../controllers/CONTRIBUTOR_Details_Controller';
import { AuthContext } from '../AuthContext';

export default function ProjectDetailsView() {
    const route = useRoute();
    const { userID } = useContext(AuthContext);
    const { projectId } = route.params;
    const [project, setProject] = useState({});
    const [donationAmount, setDonationAmount] = useState('');
    const [message, setMessage] = useState('');
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([
        { user: 'User1', text: 'Great project!' },
        { user: 'User2', text: 'Looking forward to the results.' },
        { user: 'User3', text: 'How can I contribute further?' }
    ]);

    useEffect(() => {
        if (projectId !== undefined) {
            fetchProject();
        } else {
            console.log("No se pasó el projectId.");
        }
    }, [projectId]);

    const fetchProject = async () => {
        try {
            const projectData = await handleGetProjectById(projectId);
            setProject(projectData[0]);
        } catch (error) {
            console.error('Error fetching project:', error);
        }
    };

    const handlePostComment = () => {
        // Agrega el nuevo comentario
        setComments([...comments, { user: 'You', text: comment }]);
        setComment('');
    };

    const makeDonation = async () => {
        const userId = userID; 
        const amount = parseFloat(donationAmount); 

        if (isNaN(amount) || amount <= 0) {
            console.error('Please enter a valid donation amount.');
            return;
        }

        const result = await handleUpdateAccountBalance(userId, amount);
    
        if (result.success) {
            const createDonation = await handleInsertDonation(userId, projectId, amount, message);
            if (createDonation.success) {
                console.log('Donation success');
                setMessage('');
                setDonationAmount('');
            } else {
                console.error('Error at creating donation');
            }
        } else {
            console.error(result.message);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            {/* Título del Proyecto */}
            <View style={styles.projectContainer}>
                {/* Detalles del Proyecto */}
                <View style={styles.projectBox}>
                    <Text style={styles.title}>{project.Title}</Text>

                    {/* Imagen del Proyecto */}
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

                {/* Sección de Donación */}
                <View style={styles.projectBox}>
                    <Text style={styles.title}>By: {project.FirstName} </Text>
                    <Text style={styles.projectDescription}>Description:  {project.Description}</Text>
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

                {/* Comentarios */}
                <View style={styles.projectBox}>
                    <Text style={styles.title}>Comments</Text>
                    <View style={styles.projectCommentsBox}>
                        {comments.map((comment, index) => (
                            <View key={index} style={styles.commentContainer}>
                                <Text style={styles.projectComments}>
                                    {comment.user}: {comment.text}
                                </Text>
                                {/* Línea de separación */}
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

                {/* Botón para acceder al foro */}
                <View style={styles.ProjectButtonContainer}>
                    <TouchableOpacity style={styles.projectButton}>
                        <Text style={styles.projectButtonText}>Access Forum</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}
