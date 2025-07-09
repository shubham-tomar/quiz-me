import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Plus,
  BookOpen,
  TrendingUp,
  Clock,
  Award,
  Users,
  Zap,
  Target,
} from 'lucide-react-native';
import { colors, spacing, fontSize, borderRadius } from '../../styles/theme';

const { width } = Dimensions.get('window');

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  change: string;
  color: string;
}

interface QuickActionProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  onPress: () => void;
  gradient: string[];
}

interface RecentQuizProps {
  title: string;
  category: string;
  score: number;
  totalQuestions: number;
  timeAgo: string;
  image: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, title, value, change, color }) => (
  <View style={[styles.statCard, { borderLeftColor: color }]}>
    <View style={styles.statHeader}>
      <View style={[styles.statIcon, { backgroundColor: color + '20' }]}>
        {icon}
      </View>
      <Text style={styles.statChange}>{change}</Text>
    </View>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statTitle}>{title}</Text>
  </View>
);

const QuickAction: React.FC<QuickActionProps> = ({ icon, title, subtitle, onPress, gradient }) => (
  <TouchableOpacity onPress={onPress} style={styles.quickActionContainer}>
    <LinearGradient colors={gradient} style={styles.quickAction}>
      <View style={styles.quickActionIcon}>{icon}</View>
      <Text style={styles.quickActionTitle}>{title}</Text>
      <Text style={styles.quickActionSubtitle}>{subtitle}</Text>
    </LinearGradient>
  </TouchableOpacity>
);

const RecentQuiz: React.FC<RecentQuizProps> = ({
  title,
  category,
  score,
  totalQuestions,
  timeAgo,
  image,
}) => (
  <TouchableOpacity style={styles.recentQuizCard}>
    <Image source={{ uri: image }} style={styles.recentQuizImage} />
    <View style={styles.recentQuizContent}>
      <View style={styles.recentQuizHeader}>
        <Text style={styles.recentQuizTitle} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.recentQuizTime}>{timeAgo}</Text>
      </View>
      <Text style={styles.recentQuizCategory}>{category}</Text>
      <View style={styles.recentQuizFooter}>
        <View style={styles.scoreContainer}>
          <Award color={colors.warning} size={16} strokeWidth={2} />
          <Text style={styles.scoreText}>
            {score}/{totalQuestions}
          </Text>
        </View>
        <Text style={styles.scorePercentage}>
          {Math.round((score / totalQuestions) * 100)}%
        </Text>
      </View>
    </View>
  </TouchableOpacity>
);

export default function HomeScreen() {
  const router = useRouter();

  const stats = [
    {
      icon: <BookOpen color={colors.primary} size={20} strokeWidth={2} />,
      title: 'Quizzes Taken',
      value: '24',
      change: '+12%',
      color: colors.primary,
    },
    {
      icon: <Target color={colors.success} size={20} strokeWidth={2} />,
      title: 'Average Score',
      value: '87%',
      change: '+5%',
      color: colors.success,
    },
    {
      icon: <Zap color={colors.warning} size={20} strokeWidth={2} />,
      title: 'Streak',
      value: '7 days',
      change: '+2',
      color: colors.warning,
    },
    {
      icon: <Users color={colors.secondary} size={20} strokeWidth={2} />,
      title: 'Rank',
      value: '#12',
      change: '+3',
      color: colors.secondary,
    },
  ];

  const quickActions = [
    {
      icon: <Plus color="#fff" size={24} strokeWidth={2} />,
      title: 'Create Quiz',
      subtitle: 'Build your own quiz',
      onPress: () => router.push('/create'),
      gradient: ['#667eea', '#764ba2'],
    },
    {
      icon: <BookOpen color="#fff" size={24} strokeWidth={2} />,
      title: 'Take Quiz',
      subtitle: 'Test your knowledge',
      onPress: () => router.push('/quizzes'),
      gradient: ['#f093fb', '#f5576c'],
    },
  ];

  const recentQuizzes = [
    {
      title: 'JavaScript Fundamentals',
      category: 'Programming',
      score: 18,
      totalQuestions: 20,
      timeAgo: '2h ago',
      image: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      title: 'World Geography',
      category: 'Geography',
      score: 15,
      totalQuestions: 20,
      timeAgo: '1d ago',
      image: 'https://images.pexels.com/photos/335393/pexels-photo-335393.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      title: 'Modern History',
      category: 'History',
      score: 16,
      totalQuestions: 18,
      timeAgo: '2d ago',
      image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good morning! 👋</Text>
            <Text style={styles.username}>Ready to learn something new?</Text>
          </View>
          <TouchableOpacity style={styles.profileButton}>
            <Image
              source={{
                uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100',
              }}
              style={styles.profileImage}
            />
          </TouchableOpacity>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsContainer}>
          <Text style={styles.sectionTitle}>Your Progress</Text>
          <View style={styles.statsGrid}>
            {stats.map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsContainer}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action, index) => (
              <QuickAction key={index} {...action} />
            ))}
          </View>
        </View>

        {/* Recent Quizzes */}
        <View style={styles.recentContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Quizzes</Text>
            <TouchableOpacity onPress={() => router.push('/quizzes')}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          {recentQuizzes.map((quiz, index) => (
            <RecentQuiz key={index} {...quiz} />
          ))}
        </View>

        {/* Daily Challenge */}
        <View style={styles.challengeContainer}>
          <LinearGradient
            colors={['#4facfe', '#00f2fe']}
            style={styles.challengeCard}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.challengeContent}>
              <View style={styles.challengeIcon}>
                <TrendingUp color="#fff" size={24} strokeWidth={2} />
              </View>
              <View style={styles.challengeText}>
                <Text style={styles.challengeTitle}>Daily Challenge</Text>
                <Text style={styles.challengeSubtitle}>
                  Complete today's quiz and earn bonus points!
                </Text>
              </View>
            </View>
            <TouchableOpacity style={styles.challengeButton}>
              <Text style={styles.challengeButtonText}>Start Now</Text>
            </TouchableOpacity>
          </LinearGradient>
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
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.l,
    paddingVertical: spacing.l,
  },
  greeting: {
    fontSize: fontSize.xl,
    fontFamily: 'Poppins-SemiBold',
    color: colors.text.primary,
  },
  username: {
    fontSize: fontSize.m,
    fontFamily: 'Inter-Regular',
    color: colors.text.secondary,
    marginTop: 4,
  },
  profileButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  statsContainer: {
    paddingHorizontal: spacing.l,
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: fontSize.l,
    fontFamily: 'Poppins-SemiBold',
    color: colors.text.primary,
    marginBottom: spacing.m,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: (width - spacing.l * 3) / 2,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.l,
    padding: spacing.m,
    marginBottom: spacing.m,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.s,
  },
  statIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statChange: {
    fontSize: fontSize.s,
    fontFamily: 'Inter-Medium',
    color: colors.success,
  },
  statValue: {
    fontSize: fontSize.xxl,
    fontFamily: 'Poppins-Bold',
    color: colors.text.primary,
    marginBottom: 4,
  },
  statTitle: {
    fontSize: fontSize.s,
    fontFamily: 'Inter-Regular',
    color: colors.text.secondary,
  },
  quickActionsContainer: {
    paddingHorizontal: spacing.l,
    marginBottom: spacing.xl,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickActionContainer: {
    width: (width - spacing.l * 3) / 2,
  },
  quickAction: {
    borderRadius: borderRadius.l,
    padding: spacing.l,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 120,
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.m,
  },
  quickActionTitle: {
    fontSize: fontSize.m,
    fontFamily: 'Poppins-SemiBold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 4,
  },
  quickActionSubtitle: {
    fontSize: fontSize.s,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  recentContainer: {
    paddingHorizontal: spacing.l,
    marginBottom: spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.m,
  },
  seeAllText: {
    fontSize: fontSize.m,
    fontFamily: 'Inter-Medium',
    color: colors.primary,
  },
  recentQuizCard: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.l,
    padding: spacing.m,
    marginBottom: spacing.m,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  recentQuizImage: {
    width: 60,
    height: 60,
    borderRadius: borderRadius.m,
    marginRight: spacing.m,
  },
  recentQuizContent: {
    flex: 1,
  },
  recentQuizHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  recentQuizTitle: {
    fontSize: fontSize.m,
    fontFamily: 'Poppins-SemiBold',
    color: colors.text.primary,
    flex: 1,
    marginRight: spacing.s,
  },
  recentQuizTime: {
    fontSize: fontSize.s,
    fontFamily: 'Inter-Regular',
    color: colors.text.secondary,
  },
  recentQuizCategory: {
    fontSize: fontSize.s,
    fontFamily: 'Inter-Regular',
    color: colors.text.secondary,
    marginBottom: spacing.s,
  },
  recentQuizFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scoreText: {
    fontSize: fontSize.s,
    fontFamily: 'Inter-Medium',
    color: colors.text.primary,
    marginLeft: 4,
  },
  scorePercentage: {
    fontSize: fontSize.s,
    fontFamily: 'Inter-Bold',
    color: colors.success,
  },
  challengeContainer: {
    paddingHorizontal: spacing.l,
    marginBottom: spacing.xl,
  },
  challengeCard: {
    borderRadius: borderRadius.l,
    padding: spacing.l,
  },
  challengeContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.m,
  },
  challengeIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.m,
  },
  challengeText: {
    flex: 1,
  },
  challengeTitle: {
    fontSize: fontSize.l,
    fontFamily: 'Poppins-SemiBold',
    color: '#fff',
    marginBottom: 4,
  },
  challengeSubtitle: {
    fontSize: fontSize.m,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.9)',
  },
  challengeButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: borderRadius.m,
    paddingVertical: spacing.m,
    paddingHorizontal: spacing.l,
    alignSelf: 'flex-start',
  },
  challengeButtonText: {
    fontSize: fontSize.m,
    fontFamily: 'Inter-SemiBold',
    color: '#fff',
  },
});