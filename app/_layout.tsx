import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Platform } from 'react-native';
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
        {isMobile ? (
          <MobileSidebar onCollapsedChange={handleSidebarCollapsedChange} />
        ) : (
          <WebSidebar onCollapsedChange={handleSidebarCollapsedChange} />
        )}
        <View 
          style={[
            styles.content,
            !isMobile && {
              position: 'absolute',
              left: isSidebarCollapsed ? COLLAPSED_WIDTH : SIDEBAR_WIDTH,
              width: `calc(100% - ${isSidebarCollapsed ? COLLAPSED_WIDTH : SIDEBAR_WIDTH}px)`
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
  },
  content: {
    flex: 1,
  },
});