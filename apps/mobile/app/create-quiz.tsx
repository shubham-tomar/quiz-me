import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { QuizGenerator } from '@quizme/shared';

export default function CreateQuizScreen() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);

  const handleGenerateQuiz = async () => {
    if (!content.trim()) {
      Alert.alert('Missing Content', 'Please enter text content to generate quiz questions.');
      return;
    }

    setLoading(true);
    try {
      const result = await QuizGenerator.generateQuiz(content);
      if (result.success && result.questions && result.questions.length > 0) {
        setQuestions(result.questions);
        Alert.alert('Quiz Generated', `Successfully generated ${result.questions.length} questions!`);
      } else {
        Alert.alert('Error', result.error || 'Failed to generate quiz questions. Please try again.');
      }
    } catch (error: any) {
      console.error('Error generating quiz:', error);
      Alert.alert('Error', error?.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Create Quiz</Text>
      
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Quiz Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="Enter quiz title"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Text Content</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            multiline
            numberOfLines={10}
            textAlignVertical="top"
            placeholder="Enter the content for your quiz here..."
            value={content}
            onChangeText={setContent}
          />
        </View>

        <TouchableOpacity 
          style={styles.button}
          onPress={handleGenerateQuiz}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Generate Quiz</Text>
          )}
        </TouchableOpacity>

        {questions.length > 0 && (
          <View style={styles.resultsContainer}>
            <Text style={styles.resultsText}>
              {questions.length} questions generated!
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  formContainer: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333',
  },
  textArea: {
    minHeight: 150,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  resultsContainer: {
    marginTop: 20,
    padding: 16,
    backgroundColor: '#e8f5e8',
    borderRadius: 8,
    alignItems: 'center',
  },
  resultsText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4caf50',
  },
});