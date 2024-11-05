import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { List, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import styles from '../assets/Styles/Styles';

const customTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 
    '#A7D7C5', // Color para el efecto de presión
  },
};

export default function CustomerSupportScreen() {
  const [name, setName] = useState('');
  const [inquiry, setInquiry] = useState('');


  const faqData = [
    { id: 1, title: 'How do I activate notifications?', content: 'Go to settings > Notifications and toggle the switch.' },
    { id: 2, title: 'How do I donate?', content: 'Navigate to the project page and click on the "Donate" button.' },
    { id: 3, title: 'Requirements to publish my project', content: 'You need to provide project details, images, and complete verification.' },
    { id: 4, title: 'How do I request refunds?', content: 'Visit the support section and select "Request a Refund".' },
  ];

  const [expandedId, setExpandedId] = useState(null);

  const handlePress = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainerFaq}>
      <View style={styles.containerFaq}>
        <Text style={styles.title}>Customer Support</Text>

        <Text style={styles.label}>Name:</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Enter your name"
        />

        <Text style={styles.label}>Inquiry:</Text>
        <TextInput
          style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
          value={inquiry}
          onChangeText={setInquiry}
          placeholder="Enter your inquiry"
          multiline
        />

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>SEND</Text>
        </TouchableOpacity>

        <List.Section title="FAQs" style={styles.faqSection}>
          {faqData.map((item) => (
            <List.Accordion
              key={item.id}
              title={item.title}
              left={props => <List.Icon {...props} icon="help-circle-outline" />}
              style={styles.faqItem}
              titleStyle={styles.faqTitle}
              expanded={expandedId === item.id}
              onPress={() => handlePress(item.id)}
              titleNumberOfLines={null} 
            >
              <View style={styles.faqContentContainer}>
                <Text style={styles.faqContent}>{item.content}</Text>
              </View>
            </List.Accordion>
          ))}
        </List.Section>
      </View>
    </ScrollView>
  );
}
