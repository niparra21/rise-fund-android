import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import styles from '../assets/Styles/Styles';

export default function USER_About_View() {
  return (
    <ScrollView contentContainerStyle={styles.aboutContainer}>
      <Text style={styles.aboutTitle}>About</Text>
      <Text style={styles.aboutContent}>
        Our platform's primary goal is to facilitate the realization of small projects through the support of committed individuals and their donations. We strongly believe in the power of community to drive ideas that might not otherwise have the opportunity to come to life. By connecting creators and entrepreneurs with individuals who share their vision and are willing to contribute to their success, we aim to bring meaningful projects to fruition.

        Every donation counts and makes a difference, which is why we prioritize transparency at every step. From the moment a contribution is made to the project's completion, we ensure that every part of the process is clear, accessible, and completely transparent to all involved. Our commitment is to be the bridge that connects great ideas with the resources needed to bring them to life, always ensuring integrity and trust.
      </Text>
    </ScrollView>
  );
}