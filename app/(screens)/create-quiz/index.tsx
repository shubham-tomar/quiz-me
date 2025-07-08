import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  ScrollView,
  KeyboardAvoidingView,
  Platform
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
            <TouchableOpacity style={styles.pdfUploadBox}>
              <Ionicons name="cloud-upload-outline" size={48} color={colors.primary} />
              <Text style={styles.uploadText}>Drag and drop PDF here</Text>
              <Text style={styles.uploadSubtext}>or click to select from device</Text>
            </TouchableOpacity>
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
              <TouchableOpacity style={[common.button, { alignSelf: 'flex-start', marginTop: spacing.m }]}>
                <Text style={common.buttonText}>Fetch Content</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <SafeAreaView style={common.container} edges={['bottom']}>
      <View style={common.header}>
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
              <TouchableOpacity 
                style={common.dropdown}
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
              </TouchableOpacity>
              
              {dropdownOpen && (
                <View style={common.dropdownMenu}>
                  {contentSourceOptions.map((item) => (
                    <TouchableOpacity 
                      key={item.value} 
                      style={[
                        common.dropdownItem,
                        item.value === contentSource && styles.dropdownItemSelected
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
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
            
            {renderContentSourceInput()}
            
            <TouchableOpacity style={common.button}>
              <Text style={common.buttonText}>Generate Quiz</Text>
            </TouchableOpacity>
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