import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, SafeAreaView, Platform } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, fontSize, borderRadius } from '../../../styles';
import { common } from '../../../styles/common';
import { QuizQuestion } from '../../src/quiz-gen';
import { ExtendedPressableStateCallbackType } from '../create-quiz/types';

export default function ResultsScreen() {
  const router = useRouter();
  const { score, correctAnswers, total, answers, questions: questionsParam } = useLocalSearchParams();

  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);

  useEffect(() => {
    try {
      if (questionsParam && answers) {
        const parsedQuestions = JSON.parse(decodeURIComponent(questionsParam as string));
        const parsedAnswers = JSON.parse(decodeURIComponent(answers as string));
        setQuestions(parsedQuestions);
        setUserAnswers(parsedAnswers);
      }
    } catch (error) {
      console.error('Error parsing results data', error);
    }
  }, [questionsParam, answers]);

  // Score is now directly the percentage
  const scorePercentage = Number(score);

  // Get message based on score
  const getFeedbackMessage = () => {
    if (scorePercentage >= 90) return "Outstanding! You've mastered this content!";
    if (scorePercentage >= 75) return "Great job! You have a strong understanding of the material.";
    if (scorePercentage >= 60) return "Good work! You're on the right track.";
    if (scorePercentage >= 40) return "Keep practicing! You're making progress.";
    return "Don't worry! Learning takes time. Try reviewing the material again.";
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.scoreCard}>
          <Text style={styles.title}>Quiz Results</Text>

          <View style={styles.scoreCircle}>
            <Text style={styles.scorePercentage}>{scorePercentage}%</Text>
          </View>

          <Text style={styles.scoreText}>
            You scored {correctAnswers} out of {total}
          </Text>

          <Text style={styles.feedbackText}>
            {getFeedbackMessage()}
          </Text>
        </View>

        <Text style={styles.reviewTitle}>Review Your Answers</Text>

        {questions.map((question, index) => (
          <View key={index} style={styles.questionReview}>
            <Text style={styles.questionNumber}>Question {index + 1}</Text>
            <Text style={styles.questionText}>{question.question}</Text>

            <View style={styles.optionsReview}>
              {question.options.map((option, optIndex) => (
                <View
                  key={optIndex}
                  style={[
                    styles.optionItem,
                    userAnswers[index] === optIndex &&
                    (optIndex === question.correctAnswer ? styles.correctSelected : styles.incorrectSelected),
                    optIndex === question.correctAnswer && styles.correctOption
                  ]}
                >
                  <Text style={[
                    styles.optionText,
                    userAnswers[index] === optIndex &&
                    (optIndex === question.correctAnswer ? styles.correctSelectedText : styles.incorrectSelectedText),
                    optIndex === question.correctAnswer && styles.correctOptionText
                  ]}>
                    {option}
                  </Text>

                  {optIndex === question.correctAnswer && (
                    <Ionicons name="checkmark-circle" size={20} color={colors.success} style={styles.icon} />
                  )}

                  {userAnswers[index] === optIndex && optIndex !== question.correctAnswer && (
                    <Ionicons name="close-circle" size={20} color={colors.error} style={styles.icon} />
                  )}
                </View>
              ))}
            </View>
          </View>
        ))}

        <View style={styles.buttonContainer}>
          <Pressable
            style={({ hovered }: ExtendedPressableStateCallbackType) => [
              styles.button,
              hovered && Platform.OS === 'web' && styles.buttonHovered
            ]}
            onPress={() => router.push('/')}
          >
            <Text style={styles.buttonText}>Back to Home</Text>
          </Pressable>

          <Pressable
            style={({ hovered }: ExtendedPressableStateCallbackType) => [
              styles.button,
              styles.primaryButton,
              hovered && Platform.OS === 'web' && styles.primaryButtonHovered
            ]}
            onPress={() => router.push('/create-quiz')}
          >
            <Text style={[styles.buttonText, styles.primaryButtonText]}>Create New Quiz</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    padding: spacing.l,
  },
  scoreCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.l,
    padding: spacing.l,
    alignItems: 'center',
    marginBottom: spacing.xl,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4
  },
  title: {
    fontSize: fontSize.xl,
    fontWeight: '700',
    color: colors.textDark,
    marginBottom: spacing.m
  },
  scoreCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: spacing.m,
    borderWidth: 6,
    borderColor: colors.primary
  },
  scorePercentage: {
    fontSize: fontSize.xxl,
    fontWeight: '700',
    color: colors.primary
  },
  scoreText: {
    fontSize: fontSize.l,
    color: colors.textDark,
    fontWeight: '600',
    marginTop: spacing.s
  },
  feedbackText: {
    fontSize: fontSize.m,
    color: colors.textMedium,
    textAlign: 'center',
    marginTop: spacing.m
  },
  reviewTitle: {
    fontSize: fontSize.l,
    fontWeight: '600',
    color: colors.textDark,
    marginBottom: spacing.m
  },
  questionReview: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.m,
    padding: spacing.m,
    marginBottom: spacing.m,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2
  },
  questionNumber: {
    fontSize: fontSize.s,
    fontWeight: '600',
    color: colors.textMedium,
    marginBottom: spacing.xs
  },
  questionText: {
    fontSize: fontSize.m,
    fontWeight: '600',
    color: colors.textDark,
    marginBottom: spacing.m
  },
  optionsReview: {
    marginTop: spacing.xs
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.s,
    marginBottom: spacing.xs,
    borderRadius: borderRadius.s,
    backgroundColor: colors.backgroundLight,
    borderWidth: 1,
    borderColor: 'transparent'
  },
  correctOption: {
    borderColor: colors.success,
    borderWidth: 1,
    backgroundColor: `${colors.success}10`
  },
  correctSelected: {
    backgroundColor: `${colors.success}15`,
    borderColor: colors.success
  },
  incorrectSelected: {
    backgroundColor: `${colors.error}15`,
    borderColor: colors.error
  },
  optionText: {
    flex: 1,
    fontSize: fontSize.s,
    color: colors.textDark
  },
  correctOptionText: {
    color: colors.success,
    fontWeight: '600'
  },
  correctSelectedText: {
    color: colors.success,
    fontWeight: '600'
  },
  incorrectSelectedText: {
    color: colors.error
  },
  icon: {
    marginLeft: spacing.s
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.l,
    marginBottom: spacing.xxl
  },
  button: {
    paddingVertical: spacing.m,
    paddingHorizontal: spacing.l,
    borderRadius: borderRadius.m,
    backgroundColor: colors.backgroundDark,
    minWidth: '45%',
    alignItems: 'center'
  },
  buttonHovered: {
    backgroundColor: colors.backgroundDarker
  },
  primaryButton: {
    backgroundColor: colors.primary
  },
  primaryButtonHovered: {
    backgroundColor: colors.primaryDark
  },
  buttonText: {
    fontSize: fontSize.m,
    fontWeight: '600',
    color: colors.textDark
  },
  primaryButtonText: {
    color: colors.white
  }
});
