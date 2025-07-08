import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Sidebar } from '../components/Sidebar';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Sidebar />
        <View style={styles.content}>
          <Stack
            screenOptions={{
              headerShown: false,
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
  },
  content: {
    flex: 1,
    marginLeft: 60, // Width of collapsed sidebar
  },
});