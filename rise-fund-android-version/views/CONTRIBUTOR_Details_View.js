import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import styles from '../assets/Styles/Styles';
import { handleGetProjectById } from '../controllers/CONTRIBUTOR_Details_Controller';

export default function ProjectDetailsView() {
    const route = useRoute();
    const {projectId} = route.params;
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
          //console.log(projectId);
          fetchProject();
        } else {
          console.log("No se pasó el projectId.");
        }
      }, [projectId]);

      const fetchProject = async () => {
        try {
            const projectData = await handleGetProjectById(projectId); 
            setProject(projectData[0]); 
            console.log(project);
        } catch (error) {
            console.error('Error fetching project:', error);
        }
    };

  const handleDonate = () => {
    // Lógica para manejar la donación
    console.log(`Donated $${donationAmount} with message: ${message}`);
  };

  const handlePostComment = () => {
    // Agrega el nuevo comentario
    setComments([...comments, { user: 'You', text: comment }]);
    setComment('');
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {/* Título del Proyecto */}
      <View style={styles.genericBox}>
        <Text style={styles.title}>{project.Title}</Text>

        {/* Imagen del Proyecto */}
        <View style={styles.imagePlaceholder}>
          <Text style={styles.imageText}>Image Placeholder</Text>
        </View>

        {/* Detalles del Proyecto */}
        <View style={styles.projectBox}>
          <Text style={styles.projectDescription}>Description:  {project.Description}</Text>
          <Text style={styles.projectDescription}>Amount Raised: {project.AmountGathered}</Text>
          <Text style={styles.projectDescription}>Goal: {project.ContributionGoal}</Text>
          <Text style={styles.projectDescription}>Progress: {(project.AmountGathered * 100 / project.ContributionGoal).toFixed(2)}%</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Share</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Contact</Text>
          </TouchableOpacity>
        </View>

        {/* Información del Autor */}
        <View style={styles.projectBox}>
          <Text style={styles.title}>Autor:  {project.FirstName}</Text>
          <Text style={styles.rating}>Rating: {'★'.repeat(Math.round(project.AverageRating))}</Text>
          <Text style={styles.description}>Description of the project</Text>
        </View>

        {/* Sección de Donación */}
        <View style={styles.projectBox}>
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
          <TouchableOpacity style={styles.button} onPress={handleDonate}>
            <Text style={styles.buttonText}>Donate</Text>
          </TouchableOpacity>
          <View style={styles.ratingBox}>
            <Text>★ ★ ★ ★ ★</Text>
          </View>
        </View>

        {/* Comentarios */}
        <View style={styles.projectBox}>
          <Text style={styles.title}>Comments</Text>
          {comments.map((comment, index) => (
            <Text key={index} style={styles.commentText}>
              {comment.user}: {comment.text}
            </Text>
          ))}
          <TextInput
            placeholder="Share a comment with other contributors"
            style={styles.input}
            value={comment}
            onChangeText={setComment}
          />
          <TouchableOpacity style={styles.button} onPress={handlePostComment}>
            <Text style={styles.buttonText}>Post</Text>
          </TouchableOpacity>
        </View>

        {/* Botón para acceder al foro */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Access Forum</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
