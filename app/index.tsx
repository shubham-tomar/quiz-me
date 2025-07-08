import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { common, colors } from '../styles';

export default function HomeScreen() {
  const router = useRouter();

  const navigateToCreateQuiz = () => {
    router.push('/(screens)/create-quiz');
  };

  return (
    <SafeAreaView style={common.container}>
      <View style={[common.contentContainer, styles.centeredContent]}>
        <Text style={common.title}>Quiz Me</Text>
        <Text style={common.subtitle}>Create and take quizzes on any topic</Text>
        
        <TouchableOpacity 
          style={common.button}
          onPress={navigateToCreateQuiz}
        >
          <Text style={common.buttonText}>Create New Quiz</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  centeredContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});