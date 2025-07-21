import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList,
  ActivityIndicator,
  ScrollView,
  Pressable 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, fontSize, borderRadius } from '../../../styles';
import { common } from '../../../styles/common';
import { 
  getQuestionsForQuiz, 
  getQuizById, 
  getLatestQuizAttempt, 
  Question 
} from '../../../services/supabase/quiz';
import { useAuth } from '../../../contexts/AuthContext';

export default function QuizReviewScreen() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [quizTitle, setQuizTitle] = useState('');
  const [score, setScore] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useLocalSearchParams();
  const quizId = params.id as string;
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (quizId) {
      loadQuizData();
    }
  }, [quizId]);

  const loadQuizData = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!user) {
        throw new Error('Please log in to view quiz details');
      }

      if (!quizId) {
        throw new Error('Quiz ID is missing');
      }

      // Get quiz details
      const quizResponse = await getQuizById(quizId);
      if (quizResponse.error) {
        throw new Error('Failed to load quiz details');
      }
      setQuizTitle(quizResponse.data?.title || 'Quiz');

      // Get questions with user answers
      const questionsResponse = await getQuestionsForQuiz(quizId);
      if (questionsResponse.error) {
        throw new Error('Failed to load quiz questions');
      }
      setQuestions(questionsResponse.data || []);

      // Get latest attempt
      const attemptResponse = await getLatestQuizAttempt(quizId);
      if (attemptResponse.data) {
        setScore(attemptResponse.data.score);
      }
      
    } catch (err: any) {
      console.error('Error loading quiz data:', err);
      setError(err.message || 'Failed to load quiz data');
    } finally {
      setLoading(false);
    }
  };

  const renderQuestion = ({ item, index }: { item: Question; index: number }) => {
    const isCorrect = item.user_ans === item.correct_ans;
    const hasUserAnswer = item.user_ans !== undefined && item.user_ans !== null;
    
    return (
      <View style={styles.questionCard}>
        <View style={styles.questionHeader}>
          <Text style={styles.questionNumber}>Question {index + 1}</Text>
          {hasUserAnswer && (
            <View style={[styles.badge, isCorrect ? styles.correctBadge : styles.incorrectBadge]}>
              <Ionicons 
                name={isCorrect ? 'checkmark-circle' : 'close-circle'} 
                size={16} 
                color="#fff" 
              />
              <Text style={styles.badgeText}>
                {isCorrect ? 'Correct' : 'Incorrect'}
              </Text>
            </View>
          )}
        </View>
        
        <Text style={styles.questionText}>{item.question}</Text>
        
        <View style={styles.options}>
          {item.options.map((option, optionIndex) => {
            const isUserAnswer = item.user_ans === optionIndex;
            const isCorrectAnswer = item.correct_ans === optionIndex;
            
            return (
              <View 
                key={`question-${index}-option-${optionIndex}`}
                style={[
                  styles.option,
                  isUserAnswer && styles.userOption,
                  isCorrectAnswer && styles.correctOption,
                  isUserAnswer && !isCorrectAnswer && styles.incorrectOption
                ]}
              >
                <Text style={[
                  styles.optionLabel,
                  isCorrectAnswer && styles.correctOptionText,
                  isUserAnswer && !isCorrectAnswer && styles.incorrectOptionText
                ]}>
                  {String.fromCharCode(65 + optionIndex)}
                </Text>
                <Text style={[
                  styles.optionText,
                  isCorrectAnswer && styles.correctOptionText,
                  isUserAnswer && !isCorrectAnswer && styles.incorrectOptionText
                ]}>
                  {option}
                </Text>
                
                {isCorrectAnswer && (
                  <Ionicons name="checkmark-circle" size={20} color={colors.success} style={styles.icon} />
                )}
                
                {isUserAnswer && !isCorrectAnswer && (
                  <Ionicons name="close-circle" size={20} color={colors.error} style={styles.icon} />
                )}
              </View>
            );
          })}
        </View>
        
        {item.explanation && (
          <View style={styles.explanation}>
            <Text style={styles.explanationLabel}>Explanation:</Text>
            <Text style={styles.explanationText}>{item.explanation}</Text>
          </View>
        )}
      </View>
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={common.container}>
        <View style={styles.container}>
          <Text style={common.title}>Quiz Review</Text>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={styles.statusText}>Loading quiz data...</Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={common.container}>
        <View style={styles.container}>
          <Text style={common.title}>Quiz Review</Text>
          <View style={styles.statusContainer}>
            <Ionicons name="alert-circle-outline" size={48} color={colors.error} />
            <Text style={styles.errorText}>{error}</Text>
            <Pressable style={common.button} onPress={loadQuizData}>
              <Text style={common.buttonText}>Try Again</Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={common.container}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={common.title}>{quizTitle}</Text>
          
          {score !== null && (
            <View style={styles.scoreHeader}>
              <View style={styles.scoreBadge}>
                <Text style={styles.scoreText}>
                  Your Score: {Math.round(score)}%
                </Text>
                <Ionicons name="ribbon" size={20} color="#fff" />
              </View>
            </View>
          )}
          
          <Text style={styles.sectionTitle}>Question Review</Text>
          
          {questions.length > 0 ? (
            questions.map((question, index) => renderQuestion({ item: question, index }))
          ) : (
            <View style={styles.statusContainer}>
              <Ionicons name="document-text-outline" size={48} color={colors.textLight} />
              <Text style={styles.statusText}>No questions found for this quiz.</Text>
            </View>
          )}
          
          <View style={styles.buttonsContainer}>
            <Pressable
              style={[common.button, styles.button]}
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back-outline" size={20} color="#fff" />
              <Text style={common.buttonText}>Back</Text>
            </Pressable>
            
            <Pressable
              style={[common.button, styles.primaryButton]}
              onPress={() => router.push({
                pathname: '/quiz',
                params: {
                  id: quizId
                }
              })}
            >
              <Ionicons name="refresh" size={20} color="#fff" />
              <Text style={common.buttonText}>Take Again</Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.l,
  },
  scrollContainer: {
    paddingBottom: spacing.xxl,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  statusText: {
    fontSize: fontSize.m,
    color: colors.text.secondary,
    marginTop: spacing.m,
    textAlign: 'center',
  },
  errorText: {
    fontSize: fontSize.m,
    color: colors.error,
    marginTop: spacing.m,
    marginBottom: spacing.l,
    textAlign: 'center',
  },
  scoreHeader: {
    marginVertical: spacing.l,
    alignItems: 'center',
  },
  scoreBadge: {
    backgroundColor: colors.secondary,
    paddingHorizontal: spacing.l,
    paddingVertical: spacing.m,
    borderRadius: borderRadius.l,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  scoreText: {
    fontSize: fontSize.l,
    fontWeight: '600',
    color: '#fff',
    marginRight: spacing.m,
  },
  sectionTitle: {
    fontSize: fontSize.l,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: spacing.m,
    marginTop: spacing.l,
  },
  questionCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.m,
    padding: spacing.m,
    marginBottom: spacing.m,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  questionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.s,
  },
  questionNumber: {
    fontSize: fontSize.m,
    fontWeight: '600',
    color: colors.text.secondary,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.s,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.s,
  },
  correctBadge: {
    backgroundColor: colors.success + '30', // 30 is for opacity
  },
  incorrectBadge: {
    backgroundColor: colors.error + '30',
  },
  badgeText: {
    fontSize: fontSize.xs,
    fontWeight: '500',
    marginLeft: spacing.xs,
    color: '#fff',
  },
  questionText: {
    fontSize: fontSize.m,
    color: colors.text.primary,
    marginBottom: spacing.m,
    lineHeight: 22,
  },
  options: {
    marginBottom: spacing.m,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.m,
    marginBottom: spacing.s,
    backgroundColor: colors.background,
    borderRadius: borderRadius.s,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  userOption: {
    borderWidth: 2,
    borderColor: colors.primary,
  },
  correctOption: {
    backgroundColor: colors.success + '20',
    borderColor: colors.success,
    borderWidth: 1,
  },
  incorrectOption: {
    backgroundColor: colors.error + '20',
    borderColor: colors.error,
    borderWidth: 1,
  },
  optionLabel: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.border.light,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: fontSize.s,
    fontWeight: '600',
    color: colors.text.secondary,
    marginRight: spacing.m,
  },
  optionText: {
    fontSize: fontSize.m,
    color: colors.text.primary,
    flex: 1,
  },
  correctOptionText: {
    color: colors.success,
    fontWeight: '500',
  },
  incorrectOptionText: {
    color: colors.error,
    fontWeight: '500',
  },
  icon: {
    marginLeft: spacing.s,
  },
  explanation: {
    backgroundColor: colors.primaryLight + '20',
    borderRadius: borderRadius.s,
    padding: spacing.m,
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
  },
  explanationLabel: {
    fontSize: fontSize.s,
    fontWeight: '600',
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  explanationText: {
    fontSize: fontSize.s,
    color: colors.text.primary,
    lineHeight: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.xl,
    gap: spacing.m,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  primaryButton: {
    backgroundColor: colors.secondary,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
});
