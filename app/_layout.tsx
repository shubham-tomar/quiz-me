import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Platform, useWindowDimensions } from 'react-native';
import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { WebSidebar } from '../components/WebSidebar';
import { MobileSidebar } from '../components/MobileSidebar';
import { colors } from '../styles';

// Constants from Sidebar component for consistency
const SIDEBAR_WIDTH = 250;
const COLLAPSED_WIDTH = 60;

export default function RootLayout() {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions(window);
    });
    return () => subscription.remove();
  }, []);

  const isMobile = dimensions.width < 768;
  
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
        <View 
          style={[
            styles.content,
            Platform.OS === 'web' && {
              position: 'absolute',
              left: isMobile ? 0 : (isSidebarCollapsed ? COLLAPSED_WIDTH : SIDEBAR_WIDTH),
              width: '100%'
            }
          ]}
        >
          <Stack
            screenOptions={{
              headerShown: false,
              animation: 'slide_from_right',
            }}
          />
        </View>
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
    right: 0,
    top: 0,
    bottom: 0,
  },
});