import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Pressable
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { common, colors, spacing, fontSize, borderRadius } from '../../../styles';

type ContentSourceType = 'text' | 'pdf' | 'url';

interface DropdownItem {
  label: string;
  value: ContentSourceType;
  icon: 'document-text-outline' | 'document-outline' | 'globe-outline';
}

export default function CreateQuizScreen() {
  const [quizTitle, setQuizTitle] = useState('');
  const [quizDescription, setQuizDescription] = useState('');
  const [contentSource, setContentSource] = useState<ContentSourceType>('text');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [textContent, setTextContent] = useState('');
  const [urlContent, setUrlContent] = useState('');
  
  // Hover states for web platform
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
  
  const renderContentSourceInput = () => {
    switch (contentSource) {
      case 'text':
        return (
          <View style={common.inputContainer}>
            <Text style={common.label}>Text Content</Text>
            <TextInput
              style={[common.input, common.textArea, styles.textEditor]}
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
              style={({hovered}) => [
                styles.pdfUploadBox,
                hovered && Platform.OS === 'web' && {
                  borderColor: colors.primary,
                  backgroundColor: `${colors.primaryLight}DD`,
                }
              ]}
            >
              <Ionicons name="cloud-upload-outline" size={48} color={colors.primary} />
              <Text style={styles.uploadText}>Drag and drop PDF here</Text>
              <Text style={styles.uploadSubtext}>or click to select from device</Text>
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
              <Pressable style={({hovered}) => [
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
    <SafeAreaView style={common.container} edges={Platform.OS === 'web' ? ['bottom'] : ['top', 'bottom']}>
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
                value={quizTitle}
                onChangeText={setQuizTitle}
                placeholder="Enter quiz title"
              />
            </View>
            
            <View style={common.inputContainer}>
              <Text style={common.label}>Description</Text>
              <TextInput
                style={[common.input, common.textArea]}
                value={quizDescription}
                onChangeText={setQuizDescription}
                placeholder="Enter quiz description"
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>
            
            <View style={common.inputContainer}>
              <Text style={common.label}>Content Source</Text>
              <Pressable 
                style={({hovered}) => [
                  common.dropdown,
                  hovered && Platform.OS === 'web' && {
                    borderColor: colors.primary
                  }
                ]}
                onPress={() => setDropdownOpen(!dropdownOpen)}
              >
                <View style={common.dropdownSelected}>
                  <Ionicons name={selectedOption?.icon} size={20} color={colors.text.primary} />
                  <Text style={styles.dropdownSelectedText}>{selectedOption?.label}</Text>
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
                      style={({hovered}) => [
                        common.dropdownItem,
                        item.value === contentSource && styles.dropdownItemSelected,
                        hovered && Platform.OS === 'web' && {
                          backgroundColor: `${colors.primary}10`
                        }
                      ]}
                      onPress={() => handleSelectContentSource(item)}
                    >
                      <Ionicons 
                        name={item.icon} 
                        size={20} 
                        color={item.value === contentSource ? colors.primary : colors.text.primary} 
                      />
                      <Text 
                        style={[
                          styles.dropdownItemText,
                          item.value === contentSource && styles.dropdownItemTextSelected
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
            
            <Pressable style={({hovered}) => [
              common.button,
              hovered && Platform.OS === 'web' && {
                backgroundColor: `${colors.primary}E6`,
                transform: [{scale: 1.02}]
              }
            ]}>
              <Text style={common.buttonText}>Generate Quiz</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}



const styles = StyleSheet.create({
  textEditor: {
    minHeight: 200,
    padding: spacing.l,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  pdfUploadBox: {
    borderWidth: 2,
    borderColor: colors.primary,
    borderStyle: 'dashed',
    borderRadius: borderRadius.m,
    padding: spacing.xxl,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primaryLight,
    minHeight: 200,
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
  dropdownSelectedText: {
    fontSize: fontSize.m,
    marginLeft: spacing.s,
  },
  dropdownItemSelected: {
    backgroundColor: colors.primaryLight,
  },
  dropdownItemText: {
    fontSize: fontSize.m,
    marginLeft: spacing.s,
  },
  dropdownItemTextSelected: {
    fontWeight: '500',
    color: colors.primary,
  },
});