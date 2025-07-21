import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Platform, Animated, ActivityIndicator } from 'react-native';
import { Stack, useSegments, useRouter, SplashScreen } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { WebSidebar } from '../components/WebSidebar';
import { MobileSidebar } from '../components/MobileSidebar';
import { colors } from '../styles';
import { AuthProvider, useAuth } from '../contexts/AuthContext';

// Constants from Sidebar component for consistency
const SIDEBAR_WIDTH = 250;
const COLLAPSED_WIDTH = 60;

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

// This component handles navigation based on auth state
function AuthNavigation({ children }: { children: React.ReactNode }) {
  const { session, loading } = useAuth();
  const segments = useSegments() as string[];
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    const inAuthGroup = segments[0] === '(screens)' && segments.length > 1 && segments[1] === '(auth)';

    if (!session && !inAuthGroup) {
      // Redirect to login if not authenticated and not in auth group
      router.replace('/(screens)/(auth)/login');
    } else if (session && inAuthGroup) {
      // Redirect to home if authenticated and in auth group
      router.replace('/');
    }

    // Hide splash screen once navigation is determined
    SplashScreen.hideAsync();
  }, [session, segments, loading]);

  // Show loading indicator while determining auth state
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return <>{children}</>;
}

// Content component that handles sidebar and layout
function AppContent() {
  const { session } = useAuth();
  // Animation value for smooth transitions
  const [contentMargin] = useState(new Animated.Value(COLLAPSED_WIDTH));
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions(window);
    });
    return () => subscription.remove();
  }, []);

  const isMobile = dimensions.width < 768;
  
  // Run animation when sidebar state changes
  useEffect(() => {
    Animated.timing(contentMargin, {
      toValue: isMobile ? 0 : (isSidebarCollapsed ? COLLAPSED_WIDTH : SIDEBAR_WIDTH),
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, [isSidebarCollapsed, isMobile]);
  
  // Handle sidebar collapsed state changes
  const handleSidebarCollapsedChange = (collapsed: boolean) => {
    setIsSidebarCollapsed(collapsed);
  };

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        {session && Platform.OS === 'web' ? (
          <WebSidebar onCollapsedChange={handleSidebarCollapsedChange} />
        ) : session && (
          <MobileSidebar onCollapsedChange={handleSidebarCollapsedChange} />
        )}
        <Animated.View 
          style={[
            styles.content,
            Platform.OS === 'web' && session ? {
              marginLeft: contentMargin,
              width: Animated.subtract(dimensions.width, contentMargin)
            } : {
              // For mobile or unauthenticated, we use full width
              width: dimensions.width
            }
          ]}
        >
          <Stack
            screenOptions={{
              headerShown: false,
              animation: 'slide_from_right',
            }}
          />
        </Animated.View>
      </View>
    </SafeAreaProvider>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <AuthNavigation>
        <AppContent />
      </AuthNavigation>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colors.background,
    position: 'relative',
  },
  content: {
    flex: 1,
    minHeight: '100%',
    backgroundColor: colors.background,
  },
});

// Add web-specific styles if on web platform
if (Platform.OS === 'web') {
  // @ts-ignore - transition is valid in React Native Web but not in React Native types
  styles.content.transition = 'margin-left 0.25s ease, width 0.25s ease';
}