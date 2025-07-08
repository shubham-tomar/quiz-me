import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Animated, 
  ScrollView,
  Platform,
  ViewStyle,
  TextStyle
} from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, fontSize } from '../styles';

const SIDEBAR_WIDTH = 250;
const COLLAPSED_WIDTH = 60;

// Define proper interfaces with correct types
interface SidebarStyles {
  sidebar: ViewStyle;
  header: ViewStyle;
  logo: TextStyle;
  toggleButton: ViewStyle;
  menuContainer: ViewStyle;
  menuItem: ViewStyle;
  activeMenuItem: ViewStyle;
  menuLabel: TextStyle;
  activeMenuLabel: TextStyle;
}

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();
  const [animation] = useState(new Animated.Value(0));

  // Define the valid routes as a type
  type AppRoutes = '/' | '/(screens)/create-quiz';

  // Use the typed routes in our menu items
  const menuItems = [
    { icon: 'home-outline', label: 'Home', path: '/' as AppRoutes },
    { icon: 'add-circle-outline', label: 'Create Quiz', path: '/(screens)/create-quiz' as AppRoutes },
  ];

  const toggleSidebar = () => {
    const toValue = isCollapsed ? 0 : 1;
    
    Animated.timing(animation, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
    
    setIsCollapsed(!isCollapsed);
  };

  const sidebarWidth = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [SIDEBAR_WIDTH, COLLAPSED_WIDTH],
  });

  const dynamicStyles = {
    sidebar: {
      width: sidebarWidth,
      paddingTop: Platform.OS === 'web' ? 0 : insets.top,
    } as any, // Use 'any' to avoid type issues with animated styles
  };

  return (
    <Animated.View 
      style={[
        styles.sidebar,
        dynamicStyles.sidebar,
      ]}
    >
      <View style={styles.header}>
        {!isCollapsed && <Text style={styles.logo}>QuizMe</Text>}
        <TouchableOpacity onPress={toggleSidebar} style={styles.toggleButton}>
          <Ionicons 
            name={isCollapsed ? 'chevron-forward' : 'chevron-back'} 
            size={24} 
            color="#fff" 
          />
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.menuContainer}>
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.path}
            style={[
              styles.menuItem,
              pathname === item.path && styles.activeMenuItem,
            ]}
            onPress={() => router.push(item.path as any)}
          >
            <Ionicons 
              name={item.icon} 
              size={24} 
              color={pathname === item.path ? colors.primary : colors.text.primary} 
            />
            
            {!isCollapsed && (
              <Text 
                style={[
                  styles.menuLabel,
                  pathname === item.path && styles.activeMenuLabel,
                ]}
              >
                {item.label}
              </Text>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </Animated.View>
  );
}

// Use StyleSheet.create with proper types
const styles = StyleSheet.create<SidebarStyles>({
  sidebar: {
    height: '100%',
    backgroundColor: colors.surface,
    borderRightWidth: 1,
    borderRightColor: colors.border.light,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 100,
  },
  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.l,
    backgroundColor: colors.primary,
  },
  logo: {
    color: '#ffffff',
    fontSize: fontSize.l,
    fontWeight: '700', // Using string literal instead of fontWeight.bold
  },
  toggleButton: {
    padding: spacing.xs,
  },
  menuContainer: {
    flex: 1,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.m,
    paddingHorizontal: spacing.l,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  activeMenuItem: {
    backgroundColor: colors.primaryLight,
  },
  menuLabel: {
    marginLeft: spacing.l,
    fontSize: fontSize.m,
    color: colors.text.primary,
  },
  activeMenuLabel: {
    color: colors.primary,
    fontWeight: '600', // Using string literal instead of fontWeight.semiBold
  },
});