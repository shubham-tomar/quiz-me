import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity,
  Alert,
  ActivityIndicator
} from 'react-native';
import { useRouter } from 'expo-router';
import { colors, spacing, fontSize, borderRadius } from '../../../styles';
import { resetPassword } from '../../../services/supabase/auth';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  
  const handleResetPassword = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email');
      return;
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }
    
    setLoading(true);
    try {
      const { error } = await resetPassword(email);
      if (error) throw error;
      setSuccess(true);
    } catch (error: any) {
      Alert.alert('Error', error?.message || 'Failed to send reset password email');
    } finally {
      setLoading(false);
    }
  };
  
  const goToLogin = () => {
    router.push('/(screens)/(auth)/login');
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Reset Password</Text>
        
        {success ? (
          <View style={styles.successContainer}>
            <Text style={styles.successText}>
              Password reset email sent! Check your inbox for further instructions.
            </Text>
            <TouchableOpacity 
              style={styles.button}
              onPress={goToLogin}
            >
              <Text style={styles.buttonText}>Return to Login</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <Text style={styles.description}>
              Enter your email address and we'll send you a link to reset your password.
            </Text>
            
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"
                placeholderTextColor={colors.text.secondary}
                autoCapitalize="none"
                keyboardType="email-address"
                autoComplete="email"
                editable={!loading}
              />
            </View>
            
            <TouchableOpacity 
              style={styles.button}
              onPress={handleResetPassword}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Send Reset Link</Text>
              )}
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.linkButton}
              onPress={goToLogin}
              disabled={loading}
            >
              <Text style={styles.linkText}>Back to Login</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.l,
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
    padding: spacing.xl,
    borderRadius: borderRadius.l,
    backgroundColor: colors.background,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: fontSize.xxl,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: spacing.m,
  },
  description: {
    fontSize: fontSize.m,
    color: colors.text.secondary,
    marginBottom: spacing.l,
  },
  inputContainer: {
    marginBottom: spacing.m,
  },
  label: {
    fontSize: fontSize.s,
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
  },
  button: {
    height: 50,
    backgroundColor: colors.primary,
    borderRadius: borderRadius.m,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.m,
  },
  buttonText: {
    color: '#fff',
    fontSize: fontSize.m,
    fontWeight: '600',
  },
  linkButton: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.s,
  },
  linkText: {
    color: colors.primary,
    fontSize: fontSize.m,
  },
  successContainer: {
    alignItems: 'center',
    padding: spacing.m,
  },
  successText: {
    fontSize: fontSize.m,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: spacing.l,
  },
});
