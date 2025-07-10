import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, ActivityIndicator, Alert, SafeAreaView, Platform } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, fontSize, borderRadius } from '../../../styles';
import { common } from '../../../styles/common';
import { QuizQuestion } from '../../src/quiz-gen';
import { ExtendedPressableStateCallbackType } from '../create-quiz/types';

export default function QuizScreen() {
  const router = useRouter();
  const { questions: questionsParam } = useLocalSearchParams();
  
  // State
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [quizComplete, setQuizComplete] = useState(false);

  // Initialize questions from params
  useEffect(() => {
    try {
      if (questionsParam) {
        const parsedQuestions = JSON.parse(decodeURIComponent(questionsParam as string));
        setQuestions(parsedQuestions);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to load questions');
    } finally {
      setIsLoading(false);
    }
  }, [questionsParam]);

  // Current question
  const currentQuestion = questions[currentQuestionIndex];
  
  // Handle option selection
  const handleOptionSelect = (optionIndex: number) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[currentQuestionIndex] = optionIndex;
    setSelectedOptions(newSelectedOptions);
  };

  // Handle navigation
  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizComplete(true);
      // Calculate score and navigate to results
      const score = calculateScore();
      router.push({
        pathname: '/results',
        params: {
          score: score.toString(),
          total: questions.length.toString(),
          answers: JSON.stringify(selectedOptions),
          questions: questionsParam as string
        }
      });
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  // Calculate score
  const calculateScore = () => {
    let score = 0;
    questions.forEach((question, index) => {
      if (selectedOptions[index] === question.correctAnswer) {
        score++;
      }
    });
    return score;
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Loading quiz questions...</Text>
      </SafeAreaView>
    );
  }

  if (!currentQuestion) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>No questions available</Text>
        <Pressable 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>Go Back</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.questionCounter}>Question {currentQuestionIndex + 1} of {questions.length}</Text>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progress, 
              { width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }
            ]} 
          />
        </View>
      </View>

      <View style={styles.questionContainer}>
        <Text style={styles.question}>{currentQuestion.question}</Text>

        <View style={styles.optionsContainer}>
          {currentQuestion.options.map((option, index) => (
            <Pressable
              key={index}
              style={({pressed, hovered}: ExtendedPressableStateCallbackType) => [
                styles.optionButton,
                selectedOptions[currentQuestionIndex] === index && styles.selectedOption,
                hovered && Platform.OS === 'web' && selectedOptions[currentQuestionIndex] !== index && styles.hoveredOption,
                pressed && selectedOptions[currentQuestionIndex] !== index && styles.pressedOption
              ]}
              onPress={() => handleOptionSelect(index)}
            >
              <Text style={[
                styles.optionText,
                selectedOptions[currentQuestionIndex] === index && styles.selectedOptionText
              ]}>
                {option}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={styles.navigationButtons}>
        <Pressable
          style={({pressed, hovered}: ExtendedPressableStateCallbackType) => [
            styles.navButton,
            styles.prevButton,
            currentQuestionIndex === 0 && styles.disabledButton,
            hovered && Platform.OS === 'web' && currentQuestionIndex !== 0 && styles.hoveredNavButton
          ]}
          onPress={goToPreviousQuestion}
          disabled={currentQuestionIndex === 0}
        >
          <Ionicons name="chevron-back" size={24} color={currentQuestionIndex === 0 ? colors.textLight : colors.white} />
          <Text style={[
            styles.navButtonText,
            currentQuestionIndex === 0 && styles.disabledButtonText
          ]}>Previous</Text>
        </Pressable>

        <Pressable
          style={({pressed, hovered}: ExtendedPressableStateCallbackType) => [
            styles.navButton,
            styles.nextButton,
            selectedOptions[currentQuestionIndex] === undefined && styles.disabledButton,
            hovered && Platform.OS === 'web' && selectedOptions[currentQuestionIndex] !== undefined && styles.hoveredNavButton
          ]}
          onPress={goToNextQuestion}
          disabled={selectedOptions[currentQuestionIndex] === undefined}
        >
          <Text style={[
            styles.navButtonText,
            selectedOptions[currentQuestionIndex] === undefined && styles.disabledButtonText
          ]}>
            {currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next'}
          </Text>
          <Ionicons 
            name={currentQuestionIndex === questions.length - 1 ? "checkmark" : "chevron-forward"} 
            size={24} 
            color={selectedOptions[currentQuestionIndex] === undefined ? colors.textLight : colors.white}
          />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.l
  },
  header: {
    marginBottom: spacing.l
  },
  questionCounter: {
    fontSize: fontSize.m,
    color: colors.textDark,
    marginBottom: spacing.xs
  },
  progressBar: {
    height: 6,
    backgroundColor: colors.backgroundDark,
    borderRadius: 3,
    overflow: 'hidden'
  },
  progress: {
    height: '100%',
    backgroundColor: colors.primary
  },
  questionContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  question: {
    fontSize: fontSize.xl,
    fontWeight: '600',
    color: colors.textDark,
    marginBottom: spacing.xl
  },
  optionsContainer: {
    marginTop: spacing.m
  },
  optionButton: {
    backgroundColor: colors.backgroundLight,
    padding: spacing.m,
    borderRadius: borderRadius.m,
    marginBottom: spacing.s,
    borderWidth: 2,
    borderColor: 'transparent'
  },
  selectedOption: {
    backgroundColor: `${colors.primary}15`,
    borderColor: colors.primary
  },
  hoveredOption: {
    backgroundColor: colors.backgroundDark
  },
  pressedOption: {
    opacity: 0.8
  },
  optionText: {
    fontSize: fontSize.m,
    color: colors.textDark
  },
  selectedOptionText: {
    color: colors.primary,
    fontWeight: '600'
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.xl
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.s,
    paddingHorizontal: spacing.m,
    borderRadius: borderRadius.m,
    minWidth: 100,
    justifyContent: 'center'
  },
  prevButton: {
    backgroundColor: colors.secondary
  },
  nextButton: {
    backgroundColor: colors.primary
  },
  hoveredNavButton: {
    opacity: 0.9
  },
  disabledButton: {
    backgroundColor: colors.backgroundDark,
    opacity: 0.5
  },
  navButtonText: {
    color: colors.white,
    fontSize: fontSize.m,
    fontWeight: '600',
    marginHorizontal: spacing.xs
  },
  disabledButtonText: {
    color: colors.textLight
  },
  loadingText: {
    marginTop: spacing.m,
    fontSize: fontSize.m,
    color: colors.textDark
  },
  errorText: {
    fontSize: fontSize.l,
    color: colors.error,
    textAlign: 'center'
  },
  backButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.l,
    paddingVertical: spacing.m,
    borderRadius: borderRadius.m,
    marginTop: spacing.l,
    alignSelf: 'center'
  },
  backButtonText: {
    color: colors.white,
    fontSize: fontSize.m,
    fontWeight: '600'
  }
});
