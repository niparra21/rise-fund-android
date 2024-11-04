import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import styles from '../assets/Styles/Styles';

export default function ProjectDetailsView() {
  const [donationAmount, setDonationAmount] = useState('');
  const [message, setMessage] = useState('');
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([
    { user: 'User1', text: 'Great project!' },
    { user: 'User2', text: 'Looking forward to the results.' },
    { user: 'User3', text: 'How can I contribute further?' }
  ]);

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
      <View style={styles.title}>
        <Text style={styles.title}>Title of the Project</Text>
      </View>

      {/* Imagen del Proyecto */}
      <View style={styles.imagePlaceholder}>
        <Text style={styles.imageText}>Image Placeholder</Text>
      </View>

      {/* Detalles del Proyecto */}
      <View style={styles.projectDetailsContainer}>
        <Text style={styles.projectText}>Amount Raised: 100$</Text>
        <Text style={styles.projectText}>Goal: 200$</Text>
        <Text style={styles.projectText}>Progress: 50%</Text>
        <TouchableOpacity style={styles.shareButton}>
          <Text style={styles.shareButtonText}>Share</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.contactButton}>
          <Text style={styles.contactButtonText}>Contact</Text>
        </TouchableOpacity>
      </View>

      {/* Información del Autor */}
      <View style={styles.authorInfoContainer}>
        <Text style={styles.authorTitle}>Author/Owner/Creator</Text>
        <Text style={styles.rating}>Rating: ★★★★★</Text>
        <Text style={styles.description}>Description of the project</Text>
      </View>

      {/* Sección de Donación */}
      <View style={styles.donationContainer}>
        <TextInput
          placeholder="Write a message for the author"
          style={styles.messageInput}
          value={message}
          onChangeText={setMessage}
        />
        <TextInput
          placeholder="$0.00"
          style={styles.donationInput}
          keyboardType="numeric"
          value={donationAmount}
          onChangeText={setDonationAmount}
        />
        <TouchableOpacity style={styles.donateButton} onPress={handleDonate}>
          <Text style={styles.donateButtonText}>Donate</Text>
        </TouchableOpacity>
        <View style={styles.ratingContainer}>
          {/* Estrellas de calificación */}
          <Text>★ ★ ★ ★ ★</Text>
        </View>
      </View>

      {/* Comentarios */}
      <View style={styles.commentsContainer}>
        <Text style={styles.commentsTitle}>Comments</Text>
        {comments.map((comment, index) => (
          <Text key={index} style={styles.commentText}>
            {comment.user}: {comment.text}
          </Text>
        ))}
        <TextInput
          placeholder="Share a comment with other contributors"
          style={styles.commentInput}
          value={comment}
          onChangeText={setComment}
        />
        <TouchableOpacity style={styles.postButton} onPress={handlePostComment}>
          <Text style={styles.postButtonText}>Post</Text>
        </TouchableOpacity>
      </View>

      {/* Botón para acceder al foro */}
      <TouchableOpacity style={styles.accessForumButton}>
        <Text style={styles.accessForumButtonText}>Access Forum</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
