import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import {
  FileText,
  Upload,
  Link,
  Zap,
  Settings,
  Eye,
  Save,
  ChevronDown,
  Image as ImageIcon,
  Video,
  Mic,
} from 'lucide-react-native';
import { colors, spacing, fontSize, borderRadius } from '../../styles/theme';

const { width } = Dimensions.get('window');

interface ContentSourceProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string[];
  onPress: () => void;
  isSelected: boolean;
}

interface QuickTemplateProps {
  title: string;
  description: string;
  questions: number;
  image: string;
  onPress: () => void;
}

const ContentSource: React.FC<ContentSourceProps> = ({
  icon,
  title,
  description,
  gradient,
  onPress,
  isSelected,
}) => (
  <TouchableOpacity onPress={onPress} style={styles.sourceContainer}>
    <LinearGradient
      colors={isSelected ? gradient : ['#f8f9fa', '#f8f9fa']}
      style={[styles.sourceCard, isSelected && styles.selectedSource]}
    >
      <View style={[styles.sourceIcon, { backgroundColor: isSelected ? 'rgba(255,255,255,0.2)' : colors.primary + '20' }]}>
        {React.cloneElement(icon as React.ReactElement, {
          color: isSelected ? '#fff' : colors.primary,
        })}
      </View>
      <Text style={[styles.sourceTitle, { color: isSelected ? '#fff' : colors.text.primary }]}>
        {title}
      </Text>
      <Text style={[styles.sourceDescription, { color: isSelected ? 'rgba(255,255,255,0.9)' : colors.text.secondary }]}>
        {description}
      </Text>
    </LinearGradient>
  </TouchableOpacity>
);

const QuickTemplate: React.FC<QuickTemplateProps> = ({
  title,
  description,
  questions,
  image,
  onPress,
}) => (
  <TouchableOpacity onPress={onPress} style={styles.templateCard}>
    <Image source={{ uri: image }} style={styles.templateImage} />
    <View style={styles.templateContent}>
      <Text style={styles.templateTitle} numberOfLines={1}>
        {title}
      </Text>
      <Text style={styles.templateDescription} numberOfLines={2}>
        {description}
      </Text>
      <Text style={styles.templateQuestions}>{questions} questions</Text>
    </View>
  </TouchableOpacity>
);

export default function CreateScreen() {
  const [selectedSource, setSelectedSource] = useState<string>('text');
  const [quizTitle, setQuizTitle] = useState('');
  const [quizDescription, setQuizDescription] = useState('');
  const [textContent, setTextContent] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('Medium');
  const [selectedCategory, setSelectedCategory] = useState('General');

  const contentSources = [
    {
      id: 'text',
      icon: <FileText size={24} strokeWidth={2} />,
      title: 'Text Content',
      description: 'Paste or type your content directly',
      gradient: ['#667eea', '#764ba2'],
    },
    {
      id: 'upload',
      icon: <Upload size={24} strokeWidth={2} />,
      title: 'Upload File',
      description: 'PDF, DOC, or TXT files supported',
      gradient: ['#f093fb', '#f5576c'],
    },
    {
      id: 'url',
      icon: <Link size={24} strokeWidth={2} />,
      title: 'Web URL',
      description: 'Extract content from any webpage',
      gradient: ['#4facfe', '#00f2fe'],
    },
    {
      id: 'ai',
      icon: <Zap size={24} strokeWidth={2} />,
      title: 'AI Generated',
      description: 'Let AI create questions for any topic',
      gradient: ['#43e97b', '#38f9d7'],
    },
  ];

  const quickTemplates = [
    {
      title: 'Programming Basics',
      description: 'Essential programming concepts and syntax',
      questions: 15,
      image: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=300',
      onPress: () => {},
    },
    {
      title: 'Science Quiz',
      description: 'General science knowledge test',
      questions: 20,
      image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=300',
      onPress: () => {},
    },
    {
      title: 'History Timeline',
      description: 'Important historical events and dates',
      questions: 12,
      image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=300',
      onPress: () => {},
    },
  ];

  const difficulties = ['Easy', 'Medium', 'Hard'];
  const categories = ['General', 'Science', 'History', 'Technology', 'Arts', 'Sports'];

  const renderContentInput = () => {
    switch (selectedSource) {
      case 'text':
        return (
          <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>Content</Text>
            <TextInput
              style={styles.textArea}
              multiline
              numberOfLines={8}
              placeholder="Paste your content here or start typing..."
              value={textContent}
              onChangeText={setTextContent}
              textAlignVertical="top"
            />
          </View>
        );
      case 'upload':
        return (
          <View style={styles.uploadSection}>
            <View style={styles.uploadArea}>
              <Upload color={colors.primary} size={48} strokeWidth={1.5} />
              <Text style={styles.uploadTitle}>Drop files here or click to browse</Text>
              <Text style={styles.uploadSubtitle}>Supports PDF, DOC, DOCX, TXT files up to 10MB</Text>
              <TouchableOpacity style={styles.browseButton}>
                <Text style={styles.browseButtonText}>Browse Files</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      case 'url':
        return (
          <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>Website URL</Text>
            <TextInput
              style={styles.input}
              placeholder="https://example.com/article"
              keyboardType="url"
              autoCapitalize="none"
            />
            <TouchableOpacity style={styles.fetchButton}>
              <Text style={styles.fetchButtonText}>Fetch Content</Text>
            </TouchableOpacity>
          </View>
        );
      case 'ai':
        return (
          <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>Topic Description</Text>
            <TextInput
              style={styles.textArea}
              multiline
              numberOfLines={4}
              placeholder="Describe the topic you want to create a quiz about..."
              textAlignVertical="top"
            />
            <View style={styles.aiOptions}>
              <View style={styles.aiOption}>
                <Text style={styles.aiOptionLabel}>Number of Questions</Text>
                <View style={styles.numberSelector}>
                  <TouchableOpacity style={styles.numberButton}>
                    <Text style={styles.numberButtonText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.numberValue}>10</Text>
                  <TouchableOpacity style={styles.numberButton}>
                    <Text style={styles.numberButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Create Quiz</Text>
          <Text style={styles.headerSubtitle}>Build engaging quizzes in minutes</Text>
        </View>

        {/* Quick Templates */}
        <View style={styles.templatesContainer}>
          <Text style={styles.sectionTitle}>Quick Templates</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.templatesScroll}
          >
            {quickTemplates.map((template, index) => (
              <QuickTemplate key={index} {...template} />
            ))}
          </ScrollView>
        </View>

        {/* Quiz Details */}
        <View style={styles.detailsContainer}>
          <Text style={styles.sectionTitle}>Quiz Details</Text>
          
          <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>Quiz Title</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter quiz title"
              value={quizTitle}
              onChangeText={setQuizTitle}
            />
          </View>

          <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>Description</Text>
            <TextInput
              style={[styles.input, styles.descriptionInput]}
              placeholder="Brief description of your quiz"
              value={quizDescription}
              onChangeText={setQuizDescription}
              multiline
              numberOfLines={3}
              textAlignVertical="top"
            />
          </View>

          <View style={styles.selectorsRow}>
            <View style={styles.selectorContainer}>
              <Text style={styles.inputLabel}>Difficulty</Text>
              <TouchableOpacity style={styles.selector}>
                <Text style={styles.selectorText}>{selectedDifficulty}</Text>
                <ChevronDown color={colors.text.secondary} size={20} strokeWidth={2} />
              </TouchableOpacity>
            </View>

            <View style={styles.selectorContainer}>
              <Text style={styles.inputLabel}>Category</Text>
              <TouchableOpacity style={styles.selector}>
                <Text style={styles.selectorText}>{selectedCategory}</Text>
                <ChevronDown color={colors.text.secondary} size={20} strokeWidth={2} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Content Source */}
        <View style={styles.sourceContainer}>
          <Text style={styles.sectionTitle}>Content Source</Text>
          <View style={styles.sourcesGrid}>
            {contentSources.map((source) => (
              <ContentSource
                key={source.id}
                icon={source.icon}
                title={source.title}
                description={source.description}
                gradient={source.gradient}
                onPress={() => setSelectedSource(source.id)}
                isSelected={selectedSource === source.id}
              />
            ))}
          </View>
        </View>

        {/* Content Input */}
        {renderContentInput()}

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.previewButton}>
            <Eye color={colors.text.secondary} size={20} strokeWidth={2} />
            <Text style={styles.previewButtonText}>Preview</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.saveButton}>
            <Save color="#fff" size={20} strokeWidth={2} />
            <Text style={styles.saveButtonText}>Save Draft</Text>
          </TouchableOpacity>

          <LinearGradient
            colors={['#667eea', '#764ba2']}
            style={styles.generateButton}
          >
            <TouchableOpacity style={styles.generateButtonInner}>
              <Zap color="#fff" size={20} strokeWidth={2} />
              <Text style={styles.generateButtonText}>Generate Quiz</Text>
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
  templatesContainer: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: fontSize.l,
    fontFamily: 'Poppins-SemiBold',
    color: colors.text.primary,
    marginBottom: spacing.m,
    paddingHorizontal: spacing.l,
  },
  templatesScroll: {
    paddingHorizontal: spacing.l,
  },
  templateCard: {
    width: 200,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.l,
    marginRight: spacing.m,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  templateImage: {
    width: '100%',
    height: 100,
  },
  templateContent: {
    padding: spacing.m,
  },
  templateTitle: {
    fontSize: fontSize.m,
    fontFamily: 'Poppins-SemiBold',
    color: colors.text.primary,
    marginBottom: 4,
  },
  templateDescription: {
    fontSize: fontSize.s,
    fontFamily: 'Inter-Regular',
    color: colors.text.secondary,
    marginBottom: spacing.s,
  },
  templateQuestions: {
    fontSize: fontSize.s,
    fontFamily: 'Inter-Medium',
    color: colors.primary,
  },
  detailsContainer: {
    paddingHorizontal: spacing.l,
    marginBottom: spacing.xl,
  },
  inputSection: {
    marginBottom: spacing.l,
  },
  inputLabel: {
    fontSize: fontSize.m,
    fontFamily: 'Inter-SemiBold',
    color: colors.text.primary,
    marginBottom: spacing.s,
  },
  input: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.m,
    padding: spacing.m,
    fontSize: fontSize.m,
    fontFamily: 'Inter-Regular',
    color: colors.text.primary,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  descriptionInput: {
    minHeight: 80,
  },
  textArea: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.m,
    padding: spacing.m,
    fontSize: fontSize.m,
    fontFamily: 'Inter-Regular',
    color: colors.text.primary,
    borderWidth: 1,
    borderColor: colors.border.light,
    minHeight: 120,
  },
  selectorsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  selectorContainer: {
    flex: 1,
    marginRight: spacing.m,
  },
  selector: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.m,
    padding: spacing.m,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  selectorText: {
    fontSize: fontSize.m,
    fontFamily: 'Inter-Regular',
    color: colors.text.primary,
  },
  sourceContainer: {
    marginBottom: spacing.xl,
  },
  sourcesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: spacing.l,
    justifyContent: 'space-between',
  },
  sourceContainer: {
    width: (width - spacing.l * 3) / 2,
    marginBottom: spacing.m,
  },
  sourceCard: {
    borderRadius: borderRadius.l,
    padding: spacing.l,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 140,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedSource: {
    borderColor: colors.primary,
  },
  sourceIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.m,
  },
  sourceTitle: {
    fontSize: fontSize.m,
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
    marginBottom: 4,
  },
  sourceDescription: {
    fontSize: fontSize.s,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
  },
  uploadSection: {
    paddingHorizontal: spacing.l,
    marginBottom: spacing.xl,
  },
  uploadArea: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.l,
    borderWidth: 2,
    borderColor: colors.border.light,
    borderStyle: 'dashed',
    padding: spacing.xxl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadTitle: {
    fontSize: fontSize.l,
    fontFamily: 'Poppins-SemiBold',
    color: colors.text.primary,
    marginTop: spacing.m,
    marginBottom: spacing.s,
  },
  uploadSubtitle: {
    fontSize: fontSize.m,
    fontFamily: 'Inter-Regular',
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: spacing.l,
  },
  browseButton: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.m,
    paddingVertical: spacing.m,
    paddingHorizontal: spacing.l,
  },
  browseButtonText: {
    fontSize: fontSize.m,
    fontFamily: 'Inter-SemiBold',
    color: '#fff',
  },
  fetchButton: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.m,
    paddingVertical: spacing.m,
    paddingHorizontal: spacing.l,
    alignSelf: 'flex-start',
    marginTop: spacing.m,
  },
  fetchButtonText: {
    fontSize: fontSize.m,
    fontFamily: 'Inter-SemiBold',
    color: '#fff',
  },
  aiOptions: {
    marginTop: spacing.m,
  },
  aiOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.m,
  },
  aiOptionLabel: {
    fontSize: fontSize.m,
    fontFamily: 'Inter-Medium',
    color: colors.text.primary,
  },
  numberSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.m,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  numberButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberButtonText: {
    fontSize: fontSize.l,
    fontFamily: 'Inter-SemiBold',
    color: colors.primary,
  },
  numberValue: {
    fontSize: fontSize.m,
    fontFamily: 'Inter-SemiBold',
    color: colors.text.primary,
    paddingHorizontal: spacing.m,
  },
  actionsContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.l,
    paddingBottom: spacing.xl,
    gap: spacing.m,
  },
  previewButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.m,
    paddingVertical: spacing.m,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  previewButtonText: {
    fontSize: fontSize.m,
    fontFamily: 'Inter-SemiBold',
    color: colors.text.secondary,
    marginLeft: spacing.s,
  },
  saveButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.text.secondary,
    borderRadius: borderRadius.m,
    paddingVertical: spacing.m,
  },
  saveButtonText: {
    fontSize: fontSize.m,
    fontFamily: 'Inter-SemiBold',
    color: '#fff',
    marginLeft: spacing.s,
  },
  generateButton: {
    flex: 2,
    borderRadius: borderRadius.m,
  },
  generateButtonInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.m,
  },
  generateButtonText: {
    fontSize: fontSize.m,
    fontFamily: 'Inter-SemiBold',
    color: '#fff',
    marginLeft: spacing.s,
  },
});