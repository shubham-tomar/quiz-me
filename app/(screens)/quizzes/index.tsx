import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  Pressable, 
  Alert,
  ActivityIndicator,
  SafeAreaView,
  GestureResponderEvent
} from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { useCallback } from 'react';
import { Ionicons } from '@expo/vector-icons';
// Using a relative time formatter instead of date-fns
import { common } from '../../../styles/common';
import { colors, spacing, fontSize, borderRadius } from '../../../styles';
import { getUserQuizzes, Quiz, deleteQuiz, getLatestQuizAttempt, Attempt } from '../../../services/supabase/quiz';
import { useAuth } from '../../../contexts/AuthContext';

export default function QuizzesScreen() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const { user } = useAuth();
  const router = useRouter();

  // Load quizzes whenever the screen comes into focus
  const memoizedLoadQuizzes = useCallback(async (resetPage = true) => {
    try {
      const currentPage = resetPage ? 0 : page + 1;
      
      if (resetPage) {
        setLoading(true);
        setError(null);
        setPage(0);
      } else {
        setLoadingMore(true);
      }
      
      if (!user) {
        setError('Please log in to view your quizzes.');
        setLoading(false);
        return;
      }

      console.log(`Loading quizzes for page: ${currentPage}`);
      const response = await getUserQuizzes(currentPage);
      
      if (response.error) {
        throw response.error;
      }
      
      const { data, hasMore: moreAvailable } = response;
      console.log(`Received ${data?.length || 0} quizzes, has more: ${moreAvailable}`);
      
      const quizzesWithAttempts = await Promise.all((data || []).map(async (quiz) => {
        const { data: attemptData } = await getLatestQuizAttempt(quiz.id);
        return {
          ...quiz,
          latestAttempt: attemptData
        };
      }));
      
      if (resetPage) {
        console.log('Resetting quiz list');
        setQuizzes(quizzesWithAttempts);
      } else {
        console.log('Appending quizzes to list');
        setQuizzes(prev => [...prev, ...quizzesWithAttempts]);
      }

      setHasMore(moreAvailable);
      setPage(currentPage);
    } catch (err: any) {
      console.error('Error loading quizzes:', err);
      setError(err.message || 'Failed to load quizzes.');
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [page, user]);

  // Use useRef to track if this is the initial load
  const initialLoadDone = useRef(false);

  // Only load quizzes when the screen comes into focus and it's the first time
  useFocusEffect(
    useCallback(() => {
      // Only load on first focus or when returning to the screen
      if (!initialLoadDone.current) {
        console.log('Initial quiz load');
        memoizedLoadQuizzes(true);
        initialLoadDone.current = true;
      }
      
      // Cleanup function for when screen loses focus
      return () => {
        // Reset the flag if we want to reload when focusing again
        // Uncomment this if you want to reload each time the screen gains focus
        // initialLoadDone.current = false;
      };
    }, [memoizedLoadQuizzes])
  );

  // Use the memoized function for all loading operations
  const loadQuizzes = memoizedLoadQuizzes;

  // Standalone function to load more quizzes without resetting the current list
  const loadMoreQuizzes = useCallback(async () => {
    if (!hasMore || loading || loadingMore) return;
    
    try {
      setLoadingMore(true);
      const nextPage = page + 1;
      console.log(`Loading more quizzes: page ${nextPage}`);
      
      const response = await getUserQuizzes(nextPage);
      if (response.error) throw response.error;
      
      const { data, hasMore: moreAvailable } = response;
      console.log(`Loaded ${data?.length || 0} additional quizzes`);
      
      // Process quizzes
      const quizzesWithAttempts = await Promise.all((data || []).map(async (quiz) => {
        const { data: attemptData } = await getLatestQuizAttempt(quiz.id);
        return { ...quiz, latestAttempt: attemptData };
      }));
      
      // Append to existing list
      setQuizzes(prev => [...prev, ...quizzesWithAttempts]);
      setHasMore(moreAvailable);
      setPage(nextPage);
    } catch (err: any) {
      console.error('Error loading more quizzes:', err);
    } finally {
      setLoadingMore(false);
    }
  }, [hasMore, loading, loadingMore, page]);
  
  // Handler for the Load More button with proper GestureResponderEvent typing
  const handleLoadMore = useCallback((_event: GestureResponderEvent) => {
    loadMoreQuizzes();
  }, [loadMoreQuizzes]);

  const handleTakeQuiz = (quizId: string) => {
    router.push({
      pathname: '/quiz',
      params: {
        id: quizId
      }
    });
  };
  
  const handleReviewQuiz = (quizId: string) => {
    router.push({
      pathname: '/quiz-review',
      params: {
        id: quizId
      }
    });
  };

  const handleDeleteQuiz = async (quizId: string) => {
    Alert.alert(
      'Delete Quiz',
      'Are you sure you want to delete this quiz?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              setLoading(true);
              const { error } = await deleteQuiz(quizId);
              
              if (error) {
                throw error;
              }
              
              // Refresh the quizzes list
              loadQuizzes();
              Alert.alert('Success', 'Quiz deleted successfully.');
            } catch (err: any) {
              console.error('Error deleting quiz:', err);
              Alert.alert('Error', err.message || 'Failed to delete quiz.');
              setLoading(false);
            }
          }
        }
      ]
    );
  };

  const renderItem = ({ item }: { item: Quiz }) => {
    const createdDate = item.created_at ? new Date(item.created_at) : new Date();
    // Format relative time without date-fns
    const getTimeAgo = (date: Date) => {
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffSecs = Math.floor(diffMs / 1000);
      const diffMins = Math.floor(diffSecs / 60);
      const diffHours = Math.floor(diffMins / 60);
      const diffDays = Math.floor(diffHours / 24);
      
      if (diffDays > 30) {
        return `${Math.floor(diffDays / 30)} month${Math.floor(diffDays / 30) !== 1 ? 's' : ''} ago`;
      } else if (diffDays > 0) {
        return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
      } else if (diffHours > 0) {
        return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
      } else if (diffMins > 0) {
        return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
      } else {
        return 'Just now';
      }
    };
    
    const timeAgo = getTimeAgo(createdDate);

    return (
      <View style={styles.quizCard}>
        <View style={styles.quizInfo}>
          <View style={styles.titleRow}>
            <Text style={styles.quizTitle}>{item.title}</Text>
            {item.latestAttempt ? (
              <View style={styles.scoreContainer}>
                <Ionicons name="ribbon-outline" size={16} color={colors.primary} />
                <Text style={styles.scoreText}>
                  <Text style={styles.scoreValue}>
                    {typeof item.latestAttempt.score === 'number' ? item.latestAttempt.score : '0'}%
                  </Text>
                </Text>
              </View>
            ) : null}
          </View>
          <Text style={styles.quizSource}>{item.source || 'No source'}</Text>
          <View style={styles.quizMeta}>
            <Text style={styles.quizDate}>{timeAgo}</Text>
          </View>
        </View>
        
        <View style={styles.actionButtons}>
          <Pressable
            style={[styles.actionButton, styles.takeButton]}
            onPress={() => handleTakeQuiz(item.id)}
          >
            <Ionicons name="play" size={18} color="#fff" />
            <Text style={styles.actionButtonText}>Take</Text>
          </Pressable>
          
          <Pressable
            style={[styles.actionButton, styles.reviewButton]}
            onPress={() => handleReviewQuiz(item.id)}
          >
            <Ionicons name="list-outline" size={18} color="#fff" />
            <Text style={styles.actionButtonText}>Review</Text>
          </Pressable>
          
          <Pressable
            style={[styles.actionButton, styles.deleteButton]}
            onPress={() => handleDeleteQuiz(item.id)}
          >
            <Ionicons name="trash-outline" size={18} color="#fff" />
            <Text style={styles.actionButtonText}>Delete</Text>
          </Pressable>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={common.container}>
        <View style={styles.container}>
          <Text style={common.title}>Your Quizzes</Text>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={styles.loadingText}>Loading quizzes...</Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={common.container}>
        <View style={styles.container}>
          <Text style={common.title}>Your Quizzes</Text>
          <View style={styles.errorContainer}>
            <Ionicons name="alert-circle-outline" size={48} color={colors.error} />
            <Text style={styles.errorText}>{error}</Text>
            <Pressable style={common.button} onPress={() => memoizedLoadQuizzes(true)}>
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
        <Text style={common.title}>Your Quizzes</Text>
        
        {quizzes.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="document-text-outline" size={64} color={colors.textLight} />
            <Text style={styles.emptyText}>You haven't created any quizzes yet.</Text>
            <Pressable 
              style={[common.button, styles.createButton]} 
              onPress={() => router.push('/create-quiz')}
            >
              <Ionicons name="add" size={20} color="#fff" />
              <Text style={common.buttonText}>Create a Quiz</Text>
            </Pressable>
          </View>
        ) : (
          <>
            <Pressable 
              style={[common.button, styles.createButton]} 
              onPress={() => router.push('/create-quiz')}
            >
              <Ionicons name="add" size={20} color="#fff" />
              <Text style={common.buttonText}>Create a Quiz</Text>
            </Pressable>
            
            <FlatList
              data={quizzes}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.list}
              showsVerticalScrollIndicator={false}
              ListFooterComponent={hasMore ? (
                <Pressable 
                  style={[common.button, styles.loadMoreButton]}
                  onPress={handleLoadMore}
                  disabled={loadingMore}
                >
                  {loadingMore ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <Text style={common.buttonText}>Load More</Text>
                  )}
                </Pressable>
              ) : null}
            />
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.l,
  },
  list: {
    paddingVertical: spacing.m,
  },
  quizCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.m,
    padding: spacing.m,
    marginBottom: spacing.m,
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  quizInfo: {
    flex: 1,
    marginRight: spacing.m,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  quizTitle: {
    fontSize: fontSize.l,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  quizSource: {
    fontSize: fontSize.s,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },
  quizDate: {
    fontSize: fontSize.xs,
    color: colors.text.secondary,
    opacity: 0.7,
  },
  quizMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryLight,
    paddingHorizontal: spacing.s,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.s,
    borderWidth: 1,
    borderColor: colors.primary + '40', // 40 for 25% opacity
    minWidth: 90,
  },
  scoreText: {
    fontSize: fontSize.xs,
    color: colors.primary,
    fontWeight: '500',
    marginLeft: spacing.xs,
  },
  scoreValue: {
    fontSize: fontSize.xs,
    fontWeight: '700',
    color: colors.primary,
  },
  actionButtons: {
    justifyContent: 'center',
    gap: spacing.s,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.m,
    paddingVertical: spacing.s,
    borderRadius: borderRadius.m,
    justifyContent: 'center',
    minWidth: 80,
  },
  takeButton: {
    backgroundColor: colors.primary,
  },
  reviewButton: {
    backgroundColor: colors.secondary,
  },
  deleteButton: {
    backgroundColor: colors.error,
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: fontSize.s,
    marginLeft: spacing.xs,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.l,
  },
  emptyText: {
    fontSize: fontSize.l,
    color: colors.text.secondary,
    textAlign: 'center',
    marginTop: spacing.l,
    marginBottom: spacing.xl,
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.secondary,
    marginBottom: spacing.m,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: fontSize.m,
    color: colors.text.secondary,
    marginTop: spacing.m,
  },
  loadMoreButton: {
    marginTop: spacing.m,
    marginBottom: spacing.l,
    backgroundColor: colors.secondary,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.l,
  },
  errorText: {
    fontSize: fontSize.m,
    color: colors.error,
    textAlign: 'center',
    marginTop: spacing.m,
    marginBottom: spacing.l,
  },
});
