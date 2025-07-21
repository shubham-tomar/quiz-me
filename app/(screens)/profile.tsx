import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, fontSize, borderRadius } from '../../styles';
import { useAuth } from '../../contexts/AuthContext';
import { getSession } from '../../services/supabase/auth';
import { supabase } from '../../services/supabase/client';

export default function ProfileScreen() {
  const { user, session, refreshUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [saving, setSaving] = useState(false);
  const router = useRouter();
  
  useEffect(() => {
    if (user) {
      loadUserProfile();
    }
  }, [user]);
  
  const loadUserProfile = async () => {
    try {
      setLoading(true);
      
      if (!user) return;
      
      // Get profile data from user metadata
      const metadata = getUserMetadata();
      setFullName(metadata.full_name || '');
      setUsername(metadata.username || '');
      
      // If no username is set, try to derive it from email
      if (!metadata.username && user.email) {
        const emailUsername = user.email.split('@')[0] || '';
        setUsername(emailUsername);
      }
    } catch (error: any) {
      console.error('Error loading profile:', error.message);
    } finally {
      setLoading(false);
    }
  };
  
  // Get user metadata from Supabase user object
  const getUserMetadata = () => {
    if (!user) return { full_name: '', username: '' };
    
    // Access user metadata from the user object
    const metadata = user.user_metadata || {};
    return {
      full_name: metadata.full_name || '',
      username: metadata.username || ''
    };
  };
  
  const handleSaveProfile = async () => {
    try {
      setSaving(true);
      
      if (!user) return;
      
      // Update user metadata with profile information
      const { error } = await supabase.auth.updateUser({
        data: {
          full_name: fullName,
          username: username,
          updated_at: new Date().toISOString()
        }
      });
      
      if (error) throw error;
      
      // Refresh user session to get updated metadata
      if (refreshUser) {
        await refreshUser();
      }
      
      Alert.alert('Success', 'Profile updated successfully');
    } catch (error: any) {
      console.error('Profile update error:', error);
      Alert.alert('Error', error.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };
  
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={100}
    >
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
        </View>
        
        {loading ? (
          <ActivityIndicator size="large" color={colors.primary} />
        ) : (
          <View style={styles.formContainer}>
            <View style={styles.profileIcon}>
              <Text style={styles.profileInitial}>{user?.email?.[0].toUpperCase() || 'U'}</Text>
            </View>
            
            <Text style={styles.emailText}>{user?.email}</Text>
            
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Full Name</Text>
              <TextInput
                style={styles.input}
                value={fullName}
                onChangeText={setFullName}
                placeholder="Enter your full name"
                placeholderTextColor={colors.text.secondary}
              />
            </View>
            
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Username</Text>
              <TextInput
                style={styles.input}
                value={username}
                onChangeText={setUsername}
                placeholder="Choose a username"
                placeholderTextColor={colors.text.secondary}
                autoCapitalize="none"
              />
            </View>
            
            <TouchableOpacity 
              style={styles.saveButton}
              onPress={handleSaveProfile}
              disabled={saving}
            >
              {saving ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.saveButtonText}>Save Changes</Text>
              )}
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={20} color={colors.text.primary} />
              <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
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
  scrollContent: {
    flexGrow: 1,
    padding: spacing.l,
    paddingTop: spacing.xxl,
  },
  header: {
    marginBottom: spacing.xl,
  },
  title: {
    fontSize: fontSize.xxl,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  formContainer: {
    padding: spacing.l,
    borderRadius: borderRadius.l,
    backgroundColor: colors.backgroundLight,
    alignItems: 'center',
  },
  profileIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.m,
  },
  profileInitial: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
  },
  emailText: {
    fontSize: fontSize.m,
    color: colors.text.secondary,
    marginBottom: spacing.xl,
  },
  inputContainer: {
    width: '100%',
    marginBottom: spacing.m,
  },
  label: {
    fontSize: fontSize.s,
    fontWeight: '500',
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },
  input: {
    backgroundColor: colors.background,
    height: 50,
    borderRadius: borderRadius.m,
    paddingHorizontal: spacing.m,
    fontSize: fontSize.m,
    color: colors.text.primary,
    borderWidth: 1,
    borderColor: colors.border.light,
    width: '100%',
  },
  saveButton: {
    height: 50,
    width: '100%',
    backgroundColor: colors.primary,
    borderRadius: borderRadius.m,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.m,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: fontSize.m,
    fontWeight: '600',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.m,
    marginTop: spacing.s,
  },
  backButtonText: {
    marginLeft: spacing.xs,
    color: colors.text.primary,
    fontSize: fontSize.m,
  },
});
