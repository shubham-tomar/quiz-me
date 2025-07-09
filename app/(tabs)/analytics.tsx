import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import {
  TrendingUp,
  TrendingDown,
  Target,
  Clock,
  Award,
  Users,
  Calendar,
  BarChart3,
  PieChart,
  Activity,
} from 'lucide-react-native';
import { colors, spacing, fontSize, borderRadius } from '../../styles/theme';

const { width } = Dimensions.get('window');

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: React.ReactNode;
  gradient: string[];
}

interface ChartCardProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  onPress: () => void;
}

interface PerformanceItemProps {
  title: string;
  category: string;
  score: number;
  improvement: number;
  date: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  changeType,
  icon,
  gradient,
}) => {
  const getChangeColor = () => {
    switch (changeType) {
      case 'positive':
        return colors.success;
      case 'negative':
        return colors.error;
      default:
        return colors.text.secondary;
    }
  };

  const getChangeIcon = () => {
    switch (changeType) {
      case 'positive':
        return <TrendingUp size={14} color={colors.success} strokeWidth={2} />;
      case 'negative':
        return <TrendingDown size={14} color={colors.error} strokeWidth={2} />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.metricCard}>
      <LinearGradient colors={gradient} style={styles.metricGradient}>
        <View style={styles.metricIcon}>{icon}</View>
      </LinearGradient>
      <View style={styles.metricContent}>
        <Text style={styles.metricTitle}>{title}</Text>
        <Text style={styles.metricValue}>{value}</Text>
        <View style={styles.metricChange}>
          {getChangeIcon()}
          <Text style={[styles.metricChangeText, { color: getChangeColor() }]}>
            {change}
          </Text>
        </View>
      </View>
    </View>
  );
};

const ChartCard: React.FC<ChartCardProps> = ({ title, subtitle, icon, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.chartCard}>
    <View style={styles.chartHeader}>
      <View style={styles.chartIcon}>{icon}</View>
      <View style={styles.chartInfo}>
        <Text style={styles.chartTitle}>{title}</Text>
        <Text style={styles.chartSubtitle}>{subtitle}</Text>
      </View>
    </View>
    <View style={styles.chartPlaceholder}>
      <Text style={styles.chartPlaceholderText}>Chart visualization</Text>
    </View>
  </TouchableOpacity>
);

const PerformanceItem: React.FC<PerformanceItemProps> = ({
  title,
  category,
  score,
  improvement,
  date,
}) => (
  <View style={styles.performanceItem}>
    <View style={styles.performanceHeader}>
      <View>
        <Text style={styles.performanceTitle}>{title}</Text>
        <Text style={styles.performanceCategory}>{category}</Text>
      </View>
      <Text style={styles.performanceDate}>{date}</Text>
    </View>
    <View style={styles.performanceFooter}>
      <View style={styles.scoreContainer}>
        <Text style={styles.scoreLabel}>Score:</Text>
        <Text style={styles.scoreValue}>{score}%</Text>
      </View>
      <View style={styles.improvementContainer}>
        {improvement > 0 ? (
          <TrendingUp size={16} color={colors.success} strokeWidth={2} />
        ) : improvement < 0 ? (
          <TrendingDown size={16} color={colors.error} strokeWidth={2} />
        ) : null}
        <Text
          style={[
            styles.improvementText,
            {
              color:
                improvement > 0
                  ? colors.success
                  : improvement < 0
                  ? colors.error
                  : colors.text.secondary,
            },
          ]}
        >
          {improvement > 0 ? '+' : ''}{improvement}%
        </Text>
      </View>
    </View>
  </View>
);

export default function AnalyticsScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState('Week');

  const periods = ['Week', 'Month', '3 Months', 'Year'];

  const metrics = [
    {
      title: 'Total Score',
      value: '87.5%',
      change: '+5.2%',
      changeType: 'positive' as const,
      icon: <Target color="#fff" size={24} strokeWidth={2} />,
      gradient: ['#667eea', '#764ba2'],
    },
    {
      title: 'Quizzes Taken',
      value: '24',
      change: '+12',
      changeType: 'positive' as const,
      icon: <Award color="#fff" size={24} strokeWidth={2} />,
      gradient: ['#f093fb', '#f5576c'],
    },
    {
      title: 'Study Time',
      value: '12.5h',
      change: '+2.3h',
      changeType: 'positive' as const,
      icon: <Clock color="#fff" size={24} strokeWidth={2} />,
      gradient: ['#4facfe', '#00f2fe'],
    },
    {
      title: 'Rank',
      value: '#12',
      change: '-3',
      changeType: 'negative' as const,
      icon: <Users color="#fff" size={24} strokeWidth={2} />,
      gradient: ['#43e97b', '#38f9d7'],
    },
  ];

  const charts = [
    {
      title: 'Performance Trend',
      subtitle: 'Your progress over time',
      icon: <BarChart3 color={colors.primary} size={24} strokeWidth={2} />,
      onPress: () => {},
    },
    {
      title: 'Category Breakdown',
      subtitle: 'Performance by subject',
      icon: <PieChart color={colors.secondary} size={24} strokeWidth={2} />,
      onPress: () => {},
    },
    {
      title: 'Activity Heatmap',
      subtitle: 'Daily study patterns',
      icon: <Activity color={colors.warning} size={24} strokeWidth={2} />,
      onPress: () => {},
    },
  ];

  const recentPerformance = [
    {
      title: 'JavaScript Advanced',
      category: 'Programming',
      score: 92,
      improvement: 8,
      date: '2 hours ago',
    },
    {
      title: 'World Geography',
      category: 'Geography',
      score: 78,
      improvement: -5,
      date: '1 day ago',
    },
    {
      title: 'Modern History',
      category: 'History',
      score: 85,
      improvement: 12,
      date: '2 days ago',
    },
    {
      title: 'Basic Mathematics',
      category: 'Math',
      score: 95,
      improvement: 3,
      date: '3 days ago',
    },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Analytics</Text>
          <Text style={styles.headerSubtitle}>Track your learning progress</Text>
        </View>

        {/* Period Selector */}
        <View style={styles.periodContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.periodScroll}
          >
            {periods.map((period) => (
              <TouchableOpacity
                key={period}
                style={[
                  styles.periodButton,
                  selectedPeriod === period && styles.activePeriodButton,
                ]}
                onPress={() => setSelectedPeriod(period)}
              >
                <Text
                  style={[
                    styles.periodText,
                    selectedPeriod === period && styles.activePeriodText,
                  ]}
                >
                  {period}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Metrics Grid */}
        <View style={styles.metricsContainer}>
          <Text style={styles.sectionTitle}>Overview</Text>
          <View style={styles.metricsGrid}>
            {metrics.map((metric, index) => (
              <MetricCard key={index} {...metric} />
            ))}
          </View>
        </View>

        {/* Charts */}
        <View style={styles.chartsContainer}>
          <Text style={styles.sectionTitle}>Detailed Analytics</Text>
          {charts.map((chart, index) => (
            <ChartCard key={index} {...chart} />
          ))}
        </View>

        {/* Recent Performance */}
        <View style={styles.performanceContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Performance</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          {recentPerformance.map((item, index) => (
            <PerformanceItem key={index} {...item} />
          ))}
        </View>

        {/* Insights */}
        <View style={styles.insightsContainer}>
          <Text style={styles.sectionTitle}>Insights</Text>
          <View style={styles.insightCard}>
            <LinearGradient
              colors={['#667eea', '#764ba2']}
              style={styles.insightGradient}
            >
              <View style={styles.insightIcon}>
                <TrendingUp color="#fff" size={24} strokeWidth={2} />
              </View>
              <View style={styles.insightContent}>
                <Text style={styles.insightTitle}>Great Progress!</Text>
                <Text style={styles.insightText}>
                  Your average score improved by 15% this month. Keep up the excellent work!
                </Text>
              </View>
            </LinearGradient>
          </View>

          <View style={styles.insightCard}>
            <LinearGradient
              colors={['#f093fb', '#f5576c']}
              style={styles.insightGradient}
            >
              <View style={styles.insightIcon}>
                <Target color="#fff" size={24} strokeWidth={2} />
              </View>
              <View style={styles.insightContent}>
                <Text style={styles.insightTitle}>Focus Area</Text>
                <Text style={styles.insightText}>
                  Consider spending more time on Geography topics to improve your overall performance.
                </Text>
              </View>
            </LinearGradient>
          </View>
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
  periodContainer: {
    marginBottom: spacing.l,
  },
  periodScroll: {
    paddingHorizontal: spacing.l,
  },
  periodButton: {
    paddingHorizontal: spacing.l,
    paddingVertical: spacing.s,
    borderRadius: borderRadius.l,
    marginRight: spacing.s,
    backgroundColor: colors.surface,
  },
  activePeriodButton: {
    backgroundColor: colors.primary,
  },
  periodText: {
    fontSize: fontSize.m,
    fontFamily: 'Inter-Medium',
    color: colors.text.secondary,
  },
  activePeriodText: {
    color: '#fff',
  },
  metricsContainer: {
    paddingHorizontal: spacing.l,
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: fontSize.l,
    fontFamily: 'Poppins-SemiBold',
    color: colors.text.primary,
    marginBottom: spacing.m,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  metricCard: {
    width: (width - spacing.l * 3) / 2,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.l,
    padding: spacing.m,
    marginBottom: spacing.m,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  metricGradient: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.m,
  },
  metricIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  metricContent: {
    flex: 1,
  },
  metricTitle: {
    fontSize: fontSize.s,
    fontFamily: 'Inter-Regular',
    color: colors.text.secondary,
    marginBottom: 2,
  },
  metricValue: {
    fontSize: fontSize.l,
    fontFamily: 'Poppins-Bold',
    color: colors.text.primary,
    marginBottom: 2,
  },
  metricChange: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metricChangeText: {
    fontSize: fontSize.s,
    fontFamily: 'Inter-Medium',
    marginLeft: 4,
  },
  chartsContainer: {
    paddingHorizontal: spacing.l,
    marginBottom: spacing.xl,
  },
  chartCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.l,
    padding: spacing.l,
    marginBottom: spacing.m,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  chartHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.m,
  },
  chartIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.m,
  },
  chartInfo: {
    flex: 1,
  },
  chartTitle: {
    fontSize: fontSize.m,
    fontFamily: 'Poppins-SemiBold',
    color: colors.text.primary,
  },
  chartSubtitle: {
    fontSize: fontSize.s,
    fontFamily: 'Inter-Regular',
    color: colors.text.secondary,
  },
  chartPlaceholder: {
    height: 120,
    backgroundColor: colors.border.light,
    borderRadius: borderRadius.m,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chartPlaceholderText: {
    fontSize: fontSize.m,
    fontFamily: 'Inter-Regular',
    color: colors.text.secondary,
  },
  performanceContainer: {
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
  performanceItem: {
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
  performanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.s,
  },
  performanceTitle: {
    fontSize: fontSize.m,
    fontFamily: 'Poppins-SemiBold',
    color: colors.text.primary,
  },
  performanceCategory: {
    fontSize: fontSize.s,
    fontFamily: 'Inter-Regular',
    color: colors.text.secondary,
  },
  performanceDate: {
    fontSize: fontSize.s,
    fontFamily: 'Inter-Regular',
    color: colors.text.secondary,
  },
  performanceFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scoreLabel: {
    fontSize: fontSize.s,
    fontFamily: 'Inter-Regular',
    color: colors.text.secondary,
    marginRight: 4,
  },
  scoreValue: {
    fontSize: fontSize.m,
    fontFamily: 'Inter-Bold',
    color: colors.text.primary,
  },
  improvementContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  improvementText: {
    fontSize: fontSize.s,
    fontFamily: 'Inter-Medium',
    marginLeft: 4,
  },
  insightsContainer: {
    paddingHorizontal: spacing.l,
    marginBottom: spacing.xl,
  },
  insightCard: {
    marginBottom: spacing.m,
    borderRadius: borderRadius.l,
    overflow: 'hidden',
  },
  insightGradient: {
    padding: spacing.l,
    flexDirection: 'row',
    alignItems: 'center',
  },
  insightIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.m,
  },
  insightContent: {
    flex: 1,
  },
  insightTitle: {
    fontSize: fontSize.l,
    fontFamily: 'Poppins-SemiBold',
    color: '#fff',
    marginBottom: 4,
  },
  insightText: {
    fontSize: fontSize.m,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: fontSize.m * 1.4,
  },
});