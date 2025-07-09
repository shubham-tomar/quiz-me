import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Platform, Animated } from 'react-native';
import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { WebSidebar } from '../components/WebSidebar';
import { MobileSidebar } from '../components/MobileSidebar';
import { colors } from '../styles';

// Constants from Sidebar component for consistency
const SIDEBAR_WIDTH = 250;
const COLLAPSED_WIDTH = 60;

export default function RootLayout() {
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
        {Platform.OS === 'web' ? (
          <WebSidebar onCollapsedChange={handleSidebarCollapsedChange} />
        ) : (
          <MobileSidebar onCollapsedChange={handleSidebarCollapsedChange} />
        )}
        <Animated.View 
          style={[
            styles.content,
            Platform.OS === 'web' ? {
              marginLeft: contentMargin,
              width: Animated.subtract(dimensions.width, contentMargin)
            } : {
              // For mobile, we use full width
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