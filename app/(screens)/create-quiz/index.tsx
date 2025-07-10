import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, KeyboardAvoidingView, Platform, Pressable, Alert, ActivityIndicator, ViewStyle, TextStyle, StyleProp, ColorValue } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import { common } from '../../../styles/common';
import { colors, spacing, fontSize, borderRadius } from '../../../styles';
import { generateQuiz, QuizQuestion } from '../../src/quiz-gen';
import { ExtendedPressableStateCallbackType } from './types';
import { useRouter } from 'expo-router';

type ContentSourceType = 'text' | 'pdf' | 'url';

interface DropdownItem {
  label: string;
  value: ContentSourceType;
  icon: 'document-text-outline' | 'document-outline' | 'globe-outline';
}

export default function CreateQuizScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [contentSource, setContentSource] = useState<ContentSourceType>('text');
  const [textContent, setTextContent] = useState('');
  const [pdfFile, setPdfFile] = useState(null);
  const [urlContent, setUrlContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedQuestions, setGeneratedQuestions] = useState<QuizQuestion[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownHovered, setDropdownHovered] = useState(false);
  const [generateButtonHovered, setGenerateButtonHovered] = useState(false);
  const [fetchButtonHovered, setFetchButtonHovered] = useState(false);
  const [pdfBoxHovered, setPdfBoxHovered] = useState(false);
  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null);

  const contentSourceOptions: DropdownItem[] = [
    { label: 'Text', value: 'text', icon: 'document-text-outline' as const },
    { label: 'PDF', value: 'pdf', icon: 'document-outline' as const },
    { label: 'Web URL', value: 'url', icon: 'globe-outline' as const }
  ];

  const selectedOption = contentSourceOptions.find(option => option.value === contentSource);

  const handleSelectContentSource = (item: DropdownItem) => {
    setContentSource(item.value);
    setDropdownOpen(false);
  };

  const router = useRouter();

  const handleGenerateQuiz = async () => {
    if (contentSource === 'text' && !textContent.trim()) {
      Alert.alert('Missing Content', 'Please enter text content to generate quiz questions.');
      return;
    }

    setLoading(true);
    setGeneratedQuestions([]);
    
    try {
      let result;
      if (contentSource === 'text') {
        result = await generateQuiz(textContent);
      } else if (contentSource === 'pdf' && pdfFile) {
        // For PDF content - not implemented yet
        Alert.alert('Not Implemented', 'PDF content source is not fully implemented yet.');
        setLoading(false);
        return;
      } else if (contentSource === 'url' && urlContent) {
        // For URL content - not implemented yet
        Alert.alert('Not Implemented', 'URL content source is not fully implemented yet.');
        setLoading(false);
        return;
      } else {
        Alert.alert('Error', 'Please provide content to generate quiz questions.');
        setLoading(false);
        return;
      }

      if (result.success && result.questions && result.questions.length > 0) {
        setGeneratedQuestions(result.questions);
        Alert.alert('Quiz Generated', `Successfully generated ${result.questions.length} questions! Click 'Take Quiz' to begin.`);
      } else {
        Alert.alert('Error', result.error || 'Failed to generate quiz questions. Please try again.');
      }
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderContentSourceInput = () => {
    switch (contentSource) {
      case 'text':
        return (
          <View style={common.inputContainer}>
            <Text style={common.label}>Text Content</Text>
            <TextInput
              style={[common.input, common.textArea, styles.textEditor as any]}
              multiline
              numberOfLines={10}
              textAlignVertical="top"
              placeholder="Enter the content for your quiz here..."
              value={textContent}
              onChangeText={setTextContent}
            />
          </View>
        );

      case 'pdf':
        return (
          <View style={common.inputContainer}>
            <Text style={common.label}>PDF Document</Text>
            <Pressable 
              style={({pressed, hovered}: ExtendedPressableStateCallbackType) => [
                styles.pdfUploadBox,
                hovered && Platform.OS === 'web' && {
                  borderColor: colors.primary,
                  backgroundColor: `${colors.primaryLight}DD`,
                } as ViewStyle
              ] as StyleProp<ViewStyle>}
            >
              <Ionicons name="cloud-upload-outline" size={48} color={colors.primary} />
              <Text style={styles.uploadText as StyleProp<TextStyle>}>Drag and drop PDF here</Text>
              <Text style={styles.uploadSubtext as StyleProp<TextStyle>}>or click to select from device</Text>
            </Pressable>
          </View>
        );

      case 'url':
        return (
          <View style={common.inputContainer}>
            <Text style={common.label}>Web URL</Text>
            <TextInput
              style={common.input}
              placeholder="Enter a URL to generate quiz from (e.g., https://example.com)"
              value={urlContent}
              onChangeText={setUrlContent}
              keyboardType="url"
              autoCapitalize="none"
            />
            {urlContent ? (
              <Pressable style={({hovered}: ExtendedPressableStateCallbackType) => [
                common.button, 
                { alignSelf: 'flex-start', marginTop: spacing.m },
                hovered && Platform.OS === 'web' && {
                  backgroundColor: `${colors.primary}E6`,
                  transform: [{scale: 1.02}]
                }
              ]}>
                <Text style={common.buttonText}>Fetch Content</Text>
              </Pressable>
            ) : null}
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={common.container} edges={['bottom']}>
      <View style={[common.header, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={common.headerTitle}>Create Quiz</Text>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={100}
      >
        <ScrollView style={{ flex: 1 }} contentContainerStyle={common.scrollContent}>
          <View style={common.formContainer}>
            <View style={common.inputContainer}>
              <Text style={common.label}>Quiz Title</Text>
              <TextInput
                style={common.input}
                value={title}
                onChangeText={setTitle}
                placeholder="Enter quiz title"
              />
            </View>

            <View style={common.inputContainer}>
              <Text style={common.label}>Description</Text>
              <TextInput
                style={[common.input, common.textArea]}
                value={description}
                onChangeText={setDescription}
                placeholder="Enter quiz description"
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>

            <View style={common.inputContainer}>
              <Text style={common.label}>Content Source</Text>
              <Pressable 
                style={({hovered}: ExtendedPressableStateCallbackType) => [
                  common.dropdown,
                  hovered && Platform.OS === 'web' && {
                    borderColor: colors.primary
                  }
                ]}
                onPress={() => setDropdownOpen(!dropdownOpen)}
              >
                <View style={common.dropdownSelected}>
                  <Ionicons name={selectedOption?.icon} size={20} color={colors.text.primary} />
                  <Text style={styles.dropdownSelectedText as StyleProp<TextStyle>}>{selectedOption?.label}</Text>
                </View>
                <Ionicons 
                  name={dropdownOpen ? 'chevron-up' : 'chevron-down'} 
                  size={20} 
                  color={colors.text.primary} 
                />
              </Pressable>

              {dropdownOpen && (
                <View style={common.dropdownMenu}>
                  {contentSourceOptions.map((item) => (
                    <Pressable 
                      key={item.value} 
                      style={({hovered}: ExtendedPressableStateCallbackType) => [
                        common.dropdownItem,
                        item.value === contentSource && styles.dropdownItemSelected,
                        hovered && Platform.OS === 'web' && {
                          backgroundColor: `${colors.primary}10`
                        } as ViewStyle
                      ] as StyleProp<ViewStyle>}
                      onPress={() => handleSelectContentSource(item)}
                    >
                      <Ionicons 
                        name={item.icon} 
                        size={20} 
                        color={item.value === contentSource ? colors.primary : colors.text.primary} 
                      />
                      <Text 
                        style={[
                          styles.dropdownItemText as StyleProp<TextStyle>,
                          item.value === contentSource && styles.dropdownItemTextSelected as StyleProp<TextStyle>
                        ]}
                      >
                        {item.label}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              )}
            </View>

            {renderContentSourceInput()}

            <Pressable 
              style={[common.button, styles.generateButton] as StyleProp<ViewStyle>} 
              onPress={handleGenerateQuiz}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={common.buttonText}>Generate Quiz</Text>
              )}
            </Pressable>

            {/* Display Take Quiz button when questions are generated */}
            {generatedQuestions.length > 0 && (
              <Pressable 
                style={[common.button, styles.takeQuizButton] as StyleProp<ViewStyle>}
                onPress={() => router.push({
                  pathname: '/quiz',
                  params: {
                    questions: encodeURIComponent(JSON.stringify(generatedQuestions))
                  }
                })}
              >
                <Text style={common.buttonText}>Take Quiz</Text>
              </Pressable>
            )}

            {/* Display number of generated questions if any */}
            {generatedQuestions.length > 0 && (
              <View style={styles.generatedResultsContainer as StyleProp<ViewStyle>}>
                <Text style={styles.generatedResultsText as StyleProp<TextStyle>}>
                  {generatedQuestions.length} questions generated!
                </Text>
                <Text style={styles.generatedResultsSubtext as StyleProp<TextStyle>}>
                  Check the console logs for details.
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}



const styles = StyleSheet.create({
  textEditor: {
    minHeight: 150,
    padding: spacing.m,
    fontFamily: 'System',
  },
  pdfUploadBox: {
    borderWidth: 1,
    borderColor: colors.border.medium,
    borderStyle: 'dashed' as 'dashed',
    borderRadius: borderRadius.m,
    padding: spacing.l,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    minHeight: 120,
  },
  uploadIcon: {
    marginBottom: spacing.s,
  },
  uploadText: {
    fontSize: fontSize.l,
    fontWeight: '500',
    color: colors.primary,
    marginTop: spacing.l,
  },
  uploadSubtext: {
    fontSize: fontSize.s,
    color: colors.text.secondary,
    marginTop: spacing.s,
  },
  dropdownButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownSelectedText: {
    fontSize: fontSize.m,
    marginLeft: spacing.s,
  },
  dropdownItemSelected: {
    backgroundColor: colors.primaryLight,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.s,
    paddingHorizontal: spacing.m,
  },
  dropdownItemText: {
    marginLeft: spacing.s,
    fontSize: fontSize.m,
    color: colors.text.primary,
  },
  dropdownItemTextSelected: {
    color: colors.primary,
    fontWeight: 'bold',
  },
  generateButton: {
    marginTop: spacing.l,
    backgroundColor: colors.primary,
  },
  generatedResultsContainer: {
    marginTop: spacing.l,
    padding: spacing.m,
    backgroundColor: colors.success + '20' as string,
    borderRadius: borderRadius.m,
    alignItems: 'center',
  },
  generatedResultsText: {
    fontSize: fontSize.l,
    fontWeight: 'bold',
    color: colors.success,
    marginBottom: spacing.xs,
  },
  generatedResultsSubtext: {
    fontSize: fontSize.s,
    color: colors.text.secondary,
  },
  disabledButton: {
    opacity: 0.7,
    backgroundColor: colors.textMedium,
  },
  takeQuizButton: {
    marginTop: spacing.m,
    backgroundColor: colors.secondary,
  },
});