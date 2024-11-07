import React, { useState, useEffect, useContext } from 'react';
import styles from '../assets/Styles/Styles';
import { View, Text, TextInput, Button, FlatList, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { AuthContext } from '../AuthContext';
import { useRoute } from '@react-navigation/native';
import { executeProcedure } from '../database/apiService';
import { handleGetForumComments, handleInsertComment } from '../controllers/USER_ProjectForum_Controller';

export default function USER_ProjectForum_View() {
    const route = useRoute();
    const { projectID, projectUserID, projectTitle, projectDescription } = route.params;
    const [commentText, setCommentText] = useState('');
    const [comments, setComments] = useState([]);
    const [forumID, setForumID] = useState();
    const { userID } = useContext(AuthContext);

    useEffect(() => {
        getForumID();
    }, []);
    
    useEffect(() => {
        if (forumID) {
            fetchForumComments();
        }
    }, [forumID]);
    

    const getForumID = async () => {
        try {
            const procedureName = 'sp_get_forum_id_by_project_id';
            const parameters = { projectID:projectID };
            const result = await executeProcedure(procedureName, parameters);
            setForumID(result[0][0].ID);
        } catch {
          console.log('Error getting forum ID');
          return null;
        }
    }

    const fetchForumComments = async () => {
        try {
            const forumComments = await handleGetForumComments(forumID);
            setComments(forumComments);
        } catch {
          console.log('Error fetching comments');
          return null;
        }
    };
    
    const handleAddComment = async () => {
        if (commentText !== '') {
            const insertComment = await handleInsertComment(userID, 0, forumID, commentText);
            if (insertComment.success) {
                await fetchForumComments();
                setCommentText('');
            } else {
                Alert.alert('Comment Error', 'Error creating comment.');
            }
        } else {
            Alert.alert('Comment Error', 'Comment cannot be empty.');
    };
}

    const handleCancel = () => {
    setCommentText('');
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.projectContainer}>
                {/* Project Title */}
                <View style={styles.projectBox}>
                    <Text style={styles.title}>{projectTitle} Forum</Text>
                </View>

                {/* Project Description */}
                <View style={styles.projectBox}>
                    <Text style={styles.projectDescriptionTitle}>Project Description:</Text>            
                    <Text style={styles.projectDescription}>{projectDescription}</Text>
                </View>

                {/* Comment Input Section */}
                <View style={styles.projectBox}>
                    <TextInput
                        style={styles.input}
                        placeholder="Add a comment..."
                        value={commentText}
                        onChangeText={setCommentText}
                    />
                    <View style={styles.ProjectButtonContainer}>
                        <TouchableOpacity style={styles.projectButton} onPress={handleCancel}>
                            <Text style={styles.projectButtonText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.projectButton} onPress={handleAddComment}>
                            <Text style={styles.projectButtonText}>Comment</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Comments Section */}
                <View style={styles.projectBox}>
                    <Text style={styles.title}>Comments</Text>
                    <View style={styles.projectCommentsBox}>
                        {comments.length > 0 ? (
                            comments.map((comment, index) => (
                                <View key={index} style={styles.commentContainer}>
                                    <Text style={styles.projectComments}>
                                        {comment.UserId === projectUserID ? (
                                            <Text>
                                                <Text style={{ fontWeight: 'bold' }}>Creator-{comment.FirstName}:</Text> {comment.Content}
                                            </Text>
                                        ) : (
                                            <Text>{comment.FirstName}: {comment.Content}</Text>
                                        )}
                                    </Text>
                                    <View style={styles.commentDivider} />
                                </View>
                            ))
                        ) : (
                            <Text style={styles.noCommentsText}>No comments yet. Be the first to comment!</Text>
                        )}
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}
