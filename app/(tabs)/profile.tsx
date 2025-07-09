import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import {
  User,
  Settings,
  Bell,
  Shield,
  HelpCircle,
  LogOut,
  Edit,
  Award,
  Trophy,
  Target,
  Calendar,
  ChevronRight,
  Moon,
  Globe,
  Volume2,
} from 'lucide-react-native';
import { colors, spacing, fontSize, borderRadius } from '../../styles/theme';

interface AchievementProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  earned: boolean;
  progress?: number;
}

interface SettingItemProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  onPress?: () => void;
  showArrow?: boolean;
  rightComponent?: React.ReactNode;
}

const Achievement: React.FC<AchievementProps> = ({
  title,
  description,
  icon,
  earned,
  progress,
}) => (
  <View style={[styles.achievementCard, !earned && styles.achievementLocked]}>
    <View style={[styles.achievementIcon, !earned && styles.achievementIconLocked]}>
      {icon}
    </View>
    <View style={styles.achievementContent}>
      <Text style={[styles.achievementTitle, !earned && styles.achievementTitleLocked]}>
        {title}
      </Text>
      <Text style={[styles.achievementDescription, !earned && styles.achievementDescriptionLocked]}>
        {description}
      </Text>
      {!earned && progress !== undefined && (
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>
          <Text style={styles.progressText}>{progress}%</Text>
        </View>
      )}
    </View>
  </View>
);

const SettingItem: React.FC<SettingItemProps> = ({
  icon,
  title,
  subtitle,
  onPress,
  showArrow = true,
  rightComponent,
}) => (
  <TouchableOpacity style={styles.settingItem} onPress={onPress}>
    <View style={styles.settingIcon}>{icon}</View>
    <View style={styles.settingContent}>
      <Text style={styles.settingTitle}>{title}</Text>
      {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
    </View>
    {rightComponent || (showArrow && (
      <ChevronRight color={colors.text.secondary} size={20} strokeWidth={2} />
    ))}
  </TouchableOpacity>
);

export default function ProfileScreen() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [sounds, setSounds] = useState(true);

  const achievements = [
    {
      title: 'First Quiz',
      description: 'Complete your first quiz',
      icon: <Trophy color={colors.warning} size={24} strokeWidth={2} />,
      earned: true,
    },
    {
      title: 'Perfect Score',
      description: 'Get 100% on any quiz',
      icon: <Target color={colors.success} size={24} strokeWidth={2} />,
      earned: true,
    },
    {
      title: 'Week Streak',
      description: 'Take quizzes for 7 days straight',
      icon: <Calendar color={colors.primary} size={24} strokeWidth={2} />,
      earned: false,
      progress: 57,
    },
    {
      title: 'Quiz Master',
      description: 'Complete 50 quizzes',
      icon: <Award color={colors.secondary} size={24} strokeWidth={2} />,
      earned: false,
      progress: 48,
    },
  ];

  const stats = [
    { label: 'Quizzes Taken', value: '24' },
    { label: 'Average Score', value: '87%' },
    { label: 'Best Streak', value: '12 days' },
    { label: 'Rank', value: '#12' },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {/* Profile Header */}
        <LinearGradient
          colors={['#667eea', '#764ba2']}
          style={styles.profileHeader}
        >
          <View style={styles.profileInfo}>
            <Image
              source={{
                uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200',
              }}
              style={styles.profileImage}
            />
            <View style={styles.profileDetails}>
              <Text style={styles.profileName}>John Doe</Text>
              <Text style={styles.profileEmail}>john.doe@example.com</Text>
              <Text style={styles.profileJoined}>Joined March 2024</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Edit color="#fff" size={20} strokeWidth={2} />
          </TouchableOpacity>
        </LinearGradient>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <Text style={styles.sectionTitle}>Your Stats</Text>
          <View style={styles.statsGrid}>
            {stats.map((stat, index) => (
              <View key={index} style={styles.statCard}>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Achievements */}
        <View style={styles.achievementsContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Achievements</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          {achievements.map((achievement, index) => (
            <Achievement key={index} {...achievement} />
          ))}
        </View>

        {/* Settings */}
        <View style={styles.settingsContainer}>
          <Text style={styles.sectionTitle}>Settings</Text>
          
          <View style={styles.settingsGroup}>
            <Text style={styles.groupTitle}>Preferences</Text>
            <SettingItem
              icon={<Moon color={colors.text.secondary} size={20} strokeWidth={2} />}
              title="Dark Mode"
              subtitle="Switch to dark theme"
              showArrow={false}
              rightComponent={
                <Switch
                  value={darkMode}
                  onValueChange={setDarkMode}
                  trackColor={{ false: colors.border.light, true: colors.primary }}
                  thumbColor={darkMode ? '#fff' : colors.text.secondary}
                />
              }
            />
            <SettingItem
              icon={<Bell color={colors.text.secondary} size={20} strokeWidth={2} />}
              title="Notifications"
              subtitle="Quiz reminders and updates"
              showArrow={false}
              rightComponent={
                <Switch
                  value={notifications}
                  onValueChange={setNotifications}
                  trackColor={{ false: colors.border.light, true: colors.primary }}
                  thumbColor={notifications ? '#fff' : colors.text.secondary}
                />
              }
            />
            <SettingItem
              icon={<Volume2 color={colors.text.secondary} size={20} strokeWidth={2} />}
              title="Sound Effects"
              subtitle="Audio feedback for interactions"
              showArrow={false}
              rightComponent={
                <Switch
                  value={sounds}
                  onValueChange={setSounds}
                  trackColor={{ false: colors.border.light, true: colors.primary }}
                  thumbColor={sounds ? '#fff' : colors.text.secondary}
                />
              }
            />
            <SettingItem
              icon={<Globe color={colors.text.secondary} size={20} strokeWidth={2} />}
              title="Language"
              subtitle="English"
              onPress={() => {}}
            />
          </View>

          <View style={styles.settingsGroup}>
            <Text style={styles.groupTitle}>Account</Text>
            <SettingItem
              icon={<User color={colors.text.secondary} size={20} strokeWidth={2} />}
              title="Edit Profile"
              subtitle="Update your personal information"
              onPress={() => {}}
            />
            <SettingItem
              icon={<Shield color={colors.text.secondary} size={20} strokeWidth={2} />}
              title="Privacy & Security"
              subtitle="Manage your privacy settings"
              onPress={() => {}}
            />
          </View>

          <View style={styles.settingsGroup}>
            <Text style={styles.groupTitle}>Support</Text>
            <SettingItem
              icon={<HelpCircle color={colors.text.secondary} size={20} strokeWidth={2} />}
              title="Help & Support"
              subtitle="Get help and contact support"
              onPress={() => {}}
            />
            <SettingItem
              icon={<LogOut color={colors.error} size={20} strokeWidth={2} />}
              title="Sign Out"
              onPress={() => {}}
              showArrow={false}
            />
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
  profileHeader: {
    padding: spacing.l,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: spacing.l,
  },
  profileDetails: {
    flex: 1,
  },
  profileName: {
    fontSize: fontSize.xl,
    fontFamily: 'Poppins-Bold',
    color: '#fff',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: fontSize.m,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 4,
  },
  profileJoined: {
    fontSize: fontSize.s,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.7)',
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsContainer: {
    padding: spacing.l,
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
    width: '48%',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.l,
    padding: spacing.l,
    alignItems: 'center',
    marginBottom: spacing.m,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statValue: {
    fontSize: fontSize.xxl,
    fontFamily: 'Poppins-Bold',
    color: colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: fontSize.s,
    fontFamily: 'Inter-Regular',
    color: colors.text.secondary,
    textAlign: 'center',
  },
  achievementsContainer: {
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
  achievementCard: {
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
  achievementLocked: {
    opacity: 0.6,
  },
  achievementIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.m,
  },
  achievementIconLocked: {
    backgroundColor: colors.text.secondary + '20',
  },
  achievementContent: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: fontSize.m,
    fontFamily: 'Poppins-SemiBold',
    color: colors.text.primary,
    marginBottom: 4,
  },
  achievementTitleLocked: {
    color: colors.text.secondary,
  },
  achievementDescription: {
    fontSize: fontSize.s,
    fontFamily: 'Inter-Regular',
    color: colors.text.secondary,
    marginBottom: spacing.s,
  },
  achievementDescriptionLocked: {
    color: colors.text.light,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    flex: 1,
    height: 4,
    backgroundColor: colors.border.light,
    borderRadius: 2,
    marginRight: spacing.s,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 2,
  },
  progressText: {
    fontSize: fontSize.s,
    fontFamily: 'Inter-Medium',
    color: colors.text.secondary,
  },
  settingsContainer: {
    paddingHorizontal: spacing.l,
    marginBottom: spacing.xl,
  },
  settingsGroup: {
    marginBottom: spacing.l,
  },
  groupTitle: {
    fontSize: fontSize.m,
    fontFamily: 'Inter-SemiBold',
    color: colors.text.secondary,
    marginBottom: spacing.s,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.l,
    padding: spacing.m,
    marginBottom: spacing.s,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.border.light,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.m,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: fontSize.m,
    fontFamily: 'Inter-SemiBold',
    color: colors.text.primary,
  },
  settingSubtitle: {
    fontSize: fontSize.s,
    fontFamily: 'Inter-Regular',
    color: colors.text.secondary,
    marginTop: 2,
  },
});