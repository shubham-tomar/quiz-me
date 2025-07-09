import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Search, ListFilter as Filter, Clock, Users, Star, Play, BookOpen, Trophy } from 'lucide-react-native';
import { colors, spacing, fontSize, borderRadius } from '../../styles/theme';

const { width } = Dimensions.get('window');

interface CategoryProps {
  title: string;
  icon: React.ReactNode;
  count: number;
  gradient: string[];
  onPress: () => void;
}

interface QuizCardProps {
  title: string;
  description: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  duration: string;
  participants: number;
  rating: number;
  image: string;
  onPress: () => void;
}

const Category: React.FC<CategoryProps> = ({ title, icon, count, gradient, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.categoryContainer}>
    <LinearGradient colors={gradient} style={styles.categoryCard}>
      <View style={styles.categoryIcon}>{icon}</View>
      <Text style={styles.categoryTitle}>{title}</Text>
      <Text style={styles.categoryCount}>{count} quizzes</Text>
    </LinearGradient>
  </TouchableOpacity>
);

const QuizCard: React.FC<QuizCardProps> = ({
  title,
  description,
  category,
  difficulty,
  duration,
  participants,
  rating,
  image,
  onPress,
}) => {
  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'Easy':
        return colors.success;
      case 'Medium':
        return colors.warning;
      case 'Hard':
        return colors.error;
      default:
        return colors.text.secondary;
    }
  };

  return (
    <TouchableOpacity onPress={onPress} style={styles.quizCard}>
      <Image source={{ uri: image }} style={styles.quizImage} />
      <View style={styles.quizContent}>
        <View style={styles.quizHeader}>
          <Text style={styles.quizCategory}>{category}</Text>
          <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(difficulty) + '20' }]}>
            <Text style={[styles.difficultyText, { color: getDifficultyColor(difficulty) }]}>
              {difficulty}
            </Text>
          </View>
        </View>
        <Text style={styles.quizTitle} numberOfLines={2}>
          {title}
        </Text>
        <Text style={styles.quizDescription} numberOfLines={2}>
          {description}
        </Text>
        <View style={styles.quizFooter}>
          <View style={styles.quizStats}>
            <View style={styles.statItem}>
              <Clock color={colors.text.secondary} size={14} strokeWidth={2} />
              <Text style={styles.statText}>{duration}</Text>
            </View>
            <View style={styles.statItem}>
              <Users color={colors.text.secondary} size={14} strokeWidth={2} />
              <Text style={styles.statText}>{participants}</Text>
            </View>
            <View style={styles.statItem}>
              <Star color={colors.warning} size={14} strokeWidth={2} />
              <Text style={styles.statText}>{rating}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.playButton}>
            <Play color={colors.primary} size={16} strokeWidth={2} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default function QuizzesScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');

  const categories = [
    {
      title: 'Science',
      icon: <BookOpen color="#fff" size={24} strokeWidth={2} />,
      count: 45,
      gradient: ['#667eea', '#764ba2'],
      onPress: () => {},
    },
    {
      title: 'History',
      icon: <Trophy color="#fff" size={24} strokeWidth={2} />,
      count: 32,
      gradient: ['#f093fb', '#f5576c'],
      onPress: () => {},
    },
    {
      title: 'Technology',
      icon: <BookOpen color="#fff" size={24} strokeWidth={2} />,
      count: 28,
      gradient: ['#4facfe', '#00f2fe'],
      onPress: () => {},
    },
    {
      title: 'Arts',
      icon: <Trophy color="#fff" size={24} strokeWidth={2} />,
      count: 19,
      gradient: ['#43e97b', '#38f9d7'],
      onPress: () => {},
    },
  ];

  const quizzes = [
    {
      title: 'Advanced JavaScript Concepts',
      description: 'Test your knowledge of closures, promises, and async/await patterns in modern JavaScript.',
      category: 'Programming',
      difficulty: 'Hard' as const,
      duration: '25 min',
      participants: 1247,
      rating: 4.8,
      image: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=400',
      onPress: () => {},
    },
    {
      title: 'World Capitals Challenge',
      description: 'How well do you know the capitals of countries around the world? Test your geography skills!',
      category: 'Geography',
      difficulty: 'Medium' as const,
      duration: '15 min',
      participants: 892,
      rating: 4.6,
      image: 'https://images.pexels.com/photos/335393/pexels-photo-335393.jpeg?auto=compress&cs=tinysrgb&w=400',
      onPress: () => {},
    },
    {
      title: 'Basic Math Operations',
      description: 'Perfect for beginners! Practice addition, subtraction, multiplication, and division.',
      category: 'Mathematics',
      difficulty: 'Easy' as const,
      duration: '10 min',
      participants: 2156,
      rating: 4.9,
      image: 'https://images.pexels.com/photos/6238297/pexels-photo-6238297.jpeg?auto=compress&cs=tinysrgb&w=400',
      onPress: () => {},
    },
    {
      title: 'Renaissance Art History',
      description: 'Explore the masterpieces and artists of the Renaissance period in this comprehensive quiz.',
      category: 'Art History',
      difficulty: 'Medium' as const,
      duration: '20 min',
      participants: 634,
      rating: 4.7,
      image: 'https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg?auto=compress&cs=tinysrgb&w=400',
      onPress: () => {},
    },
  ];

  const filters = ['All', 'Easy', 'Medium', 'Hard', 'Popular', 'Recent'];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Discover Quizzes</Text>
          <Text style={styles.headerSubtitle}>Challenge yourself with thousands of quizzes</Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Search color={colors.text.secondary} size={20} strokeWidth={2} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search quizzes..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor={colors.text.secondary}
            />
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <Filter color={colors.primary} size={20} strokeWidth={2} />
          </TouchableOpacity>
        </View>

        {/* Filter Tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filtersContainer}
          contentContainerStyle={styles.filtersContent}
        >
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterTab,
                selectedFilter === filter && styles.activeFilterTab,
              ]}
              onPress={() => setSelectedFilter(filter)}
            >
              <Text
                style={[
                  styles.filterText,
                  selectedFilter === filter && styles.activeFilterText,
                ]}
              >
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Categories */}
        <View style={styles.categoriesContainer}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <View style={styles.categoriesGrid}>
            {categories.map((category, index) => (
              <Category key={index} {...category} />
            ))}
          </View>
        </View>

        {/* Featured Quizzes */}
        <View style={styles.quizzesContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Quizzes</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          {quizzes.map((quiz, index) => (
            <QuizCard key={index} {...quiz} />
          ))}
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
    paddingHorizontal: spacing.l,
    paddingVertical: spacing.l,
  },
  headerTitle: {
    fontSize: fontSize.xxl,
    fontFamily: 'Poppins-Bold',
    color: colors.text.primary,
  },
  headerSubtitle: {
    fontSize: fontSize.m,
    fontFamily: 'Inter-Regular',
    color: colors.text.secondary,
    marginTop: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.l,
    marginBottom: spacing.l,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.l,
    paddingHorizontal: spacing.m,
    paddingVertical: spacing.m,
    marginRight: spacing.m,
  },
  searchInput: {
    flex: 1,
    marginLeft: spacing.s,
    fontSize: fontSize.m,
    fontFamily: 'Inter-Regular',
    color: colors.text.primary,
  },
  filterButton: {
    width: 48,
    height: 48,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.l,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filtersContainer: {
    marginBottom: spacing.l,
  },
  filtersContent: {
    paddingHorizontal: spacing.l,
  },
  filterTab: {
    paddingHorizontal: spacing.l,
    paddingVertical: spacing.s,
    borderRadius: borderRadius.l,
    marginRight: spacing.s,
    backgroundColor: colors.surface,
  },
  activeFilterTab: {
    backgroundColor: colors.primary,
  },
  filterText: {
    fontSize: fontSize.m,
    fontFamily: 'Inter-Medium',
    color: colors.text.secondary,
  },
  activeFilterText: {
    color: '#fff',
  },
  categoriesContainer: {
    paddingHorizontal: spacing.l,
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: fontSize.l,
    fontFamily: 'Poppins-SemiBold',
    color: colors.text.primary,
    marginBottom: spacing.m,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryContainer: {
    width: (width - spacing.l * 3) / 2,
    marginBottom: spacing.m,
  },
  categoryCard: {
    borderRadius: borderRadius.l,
    padding: spacing.l,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 120,
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.m,
  },
  categoryTitle: {
    fontSize: fontSize.m,
    fontFamily: 'Poppins-SemiBold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 4,
  },
  categoryCount: {
    fontSize: fontSize.s,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  quizzesContainer: {
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
  quizCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.l,
    marginBottom: spacing.m,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  quizImage: {
    width: '100%',
    height: 160,
  },
  quizContent: {
    padding: spacing.m,
  },
  quizHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.s,
  },
  quizCategory: {
    fontSize: fontSize.s,
    fontFamily: 'Inter-Medium',
    color: colors.primary,
  },
  difficultyBadge: {
    paddingHorizontal: spacing.s,
    paddingVertical: 4,
    borderRadius: borderRadius.s,
  },
  difficultyText: {
    fontSize: fontSize.xs,
    fontFamily: 'Inter-SemiBold',
  },
  quizTitle: {
    fontSize: fontSize.l,
    fontFamily: 'Poppins-SemiBold',
    color: colors.text.primary,
    marginBottom: spacing.s,
  },
  quizDescription: {
    fontSize: fontSize.m,
    fontFamily: 'Inter-Regular',
    color: colors.text.secondary,
    lineHeight: fontSize.m * 1.4,
    marginBottom: spacing.m,
  },
  quizFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quizStats: {
    flexDirection: 'row',
    flex: 1,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: spacing.m,
  },
  statText: {
    fontSize: fontSize.s,
    fontFamily: 'Inter-Regular',
    color: colors.text.secondary,
    marginLeft: 4,
  },
  playButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary + '20',
    alignItems: 'center',
    justifyContent: 'center',
  },
});