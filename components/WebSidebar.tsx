import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Animated, 
  ScrollView,
  Platform,
  ViewStyle,
  TextStyle,
  Dimensions,
  Pressable,
  PressableStateCallbackType,
  Alert
} from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, fontSize, borderRadius } from '../styles';
import { useAuth } from '../contexts/AuthContext';
import { signOut } from '../services/supabase/auth';

const SIDEBAR_WIDTH = 250;
const COLLAPSED_WIDTH = 60;
const ANIM_DURATION = 250;

// Define types for our navigation items
type NavItemType = 'link' | 'section' | 'nested';
type IoniconsName = keyof typeof Ionicons.glyphMap;

interface NavItemBase {
  type: NavItemType;
  icon: IoniconsName;
  label: string;
  id: string;
}

interface NavLink extends NavItemBase {
  type: 'link';
  path: string;
}

interface NavSection extends NavItemBase {
  type: 'section';
}

interface NavNested extends NavItemBase {
  type: 'nested';
  children: NavLink[];
  defaultExpanded?: boolean;
}

type NavItem = NavLink | NavSection | NavNested;

interface WebSidebarProps {
  onCollapsedChange?: (collapsed: boolean) => void;
}

// Create a typed navigation structure
const navStructure: NavItem[] = [
  {
    id: 'home',
    type: 'link',
    icon: 'home-outline',
    label: 'Home',
    path: '/',
  },
  {
    id: 'quizzes',
    type: 'nested',
    icon: 'list-outline',
    label: 'Quizzes',
    defaultExpanded: true,
    children: [
      {
        id: 'all-quizzes',
        type: 'link',
        icon: 'albums-outline',
        label: 'All Quizzes',
        path: '/quizzes',
      },
      {
        id: 'create-quiz',
        type: 'link',
        icon: 'add-circle-outline',
        label: 'Create Quiz',
        path: '/create-quiz',
      },
    ],
  },
  {
    id: 'resources',
    type: 'nested',
    icon: 'library-outline',
    label: 'Resources',
    defaultExpanded: false,
    children: [
      {
        id: 'documents',
        type: 'link',
        icon: 'document-text-outline',
        label: 'Documents',
        path: '/documents',
      },
      {
        id: 'videos',
        type: 'link',
        icon: 'videocam-outline',
        label: 'Videos',
        path: '/videos',
      },
    ],
  },
  {
    id: 'settings_section',
    type: 'section',
    label: 'Settings',
    icon: 'settings-outline' as IoniconsName,
  },
  {
    id: 'settings',
    type: 'link',
    icon: 'settings-outline',
    label: 'Settings',
    path: '/settings',
  },
  {
    id: 'help',
    type: 'link',
    icon: 'help-circle-outline',
    label: 'Help',
    path: '/help',
  },
];

export function WebSidebar({ onCollapsedChange }: WebSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<{[key: string]: boolean}>({});
  const { user } = useAuth();
  
  // Animated values
  const width = React.useRef(new Animated.Value(COLLAPSED_WIDTH)).current;
  const [sidebarWidth, setSidebarWidth] = useState(COLLAPSED_WIDTH);
  const insets = useSafeAreaInsets();
  
  const handleLogout = async () => {
    try {
      const { error } = await signOut();
      if (error) throw error;
      router.replace('/login');
    } catch (error: any) {
      Alert.alert('Error', error?.message || 'Failed to logout');
    }
  };

  const toggleSidebar = () => {
    const newCollapsedState = !isCollapsed;
    
    Animated.timing(width, {
      toValue: newCollapsedState ? COLLAPSED_WIDTH : SIDEBAR_WIDTH,
      duration: ANIM_DURATION,
      useNativeDriver: false,
    }).start();
    
    setIsCollapsed(newCollapsedState);
    
    // Notify parent component if callback exists
    if (onCollapsedChange) {
      onCollapsedChange(newCollapsedState);
    }
  };

  const toggleNestedItem = (itemId: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const isPathActive = (path: string) => {
    // Simple path comparison for now, could be enhanced for nested routes
    return pathname === path;
  };

  const renderNavItem = (item: NavItem, index: number) => {
    switch (item.type) {
      case 'link':
        return (
          <Pressable
            key={item.id}
            style={(state: PressableStateCallbackType) => [
              styles.navItem,
              isPathActive(item.path) && styles.activeNavItem,
              state.pressed && styles.navItemHovered
            ]}
            onPress={() => router.push(item.path)}
          >
              <View style={styles.iconContainer}>
                <Ionicons
                  name={item.icon as any}
                  size={22}
                  color={isPathActive(item.path) ? colors.primary : colors.text.secondary}
                />
              </View>
              
              {!isCollapsed && (
                <Text 
                  style={[
                    styles.navLabel,
                    isPathActive(item.path) && styles.activeNavLabel
                  ]}
                  numberOfLines={1}
                >
                  {item.label}
                </Text>
              )}
          </Pressable>
        );
        
      case 'section':
      // Only show section headers when not collapsed
      if (isCollapsed) return null;
      
      return (
        <View key={item.id} style={styles.sectionHeader}>
          <Text style={styles.sectionLabel}>{item.label}</Text>
        </View>
      );
        
      case 'nested':
      // Check if this item should be expanded
      const isExpanded = expandedItems[item.id] || false;
      
      return (
        <React.Fragment key={item.id}>
          <Pressable
            style={(state: PressableStateCallbackType) => [
              styles.navItem,
              item.children.some(child => isPathActive(child.path)) && styles.activeNavItem,
              state.pressed && styles.navItemHovered
            ]}
            onPress={() => toggleNestedItem(item.id)}
          >
              <View style={styles.iconContainer}>
                <Ionicons
                  name={item.icon as any}
                  size={22}
                  color={item.children.some(child => isPathActive(child.path)) 
                    ? colors.primary 
                    : colors.text.secondary}
                />
              </View>
              
              {!isCollapsed && (
                <>
                  <Text 
                    style={[
                      styles.navLabel,
                      item.children.some(child => isPathActive(child.path)) && styles.activeNavLabel
                    ]}
                    numberOfLines={1}
                  >
                    {item.label}
                  </Text>
                  
                  <Ionicons 
                    name={isExpanded ? 'chevron-down' : 'chevron-forward'} 
                    size={16} 
                    color={colors.text.secondary}
                    style={styles.chevron}
                  />
                </>
              )}
            </Pressable>
            
            {!isCollapsed && isExpanded && (
              <View style={styles.nestedContainer}>
                {item.children.map((child) => (
                  <Pressable
                    key={child.id}
                    style={(state: PressableStateCallbackType) => [
                      styles.nestedItem,
                      isPathActive(child.path) && styles.activeNavItem,
                      state.pressed && styles.navItemHovered
                    ]}
                    onPress={() => router.push(child.path)}
                  >
                    <View style={styles.nestedIconContainer}>
                      <Ionicons
                        name={child.icon}
                        size={18}
                        color={isPathActive(child.path) ? colors.primary : colors.text.secondary}
                      />
                    </View>
                    <Text 
                      style={[
                        styles.nestedLabel,
                        isPathActive(child.path) && styles.activeNavLabel
                      ]}
                      numberOfLines={1}
                    >
                      {child.label}
                    </Text>
                  </Pressable>
                ))}
              </View>
            )}
        </React.Fragment>
      );
    }
  };

  // Calculate sidebar width based on animation value
  const sidebarWidthAnim = width.interpolate({
    inputRange: [COLLAPSED_WIDTH, SIDEBAR_WIDTH],
    outputRange: [COLLAPSED_WIDTH, SIDEBAR_WIDTH],
  });
  
  // Notify parent of initial collapsed state on mount
  useEffect(() => {
    if (onCollapsedChange) {
      onCollapsedChange(isCollapsed);
    }
  }, []);

  return (
    <Animated.View 
      style={[
        styles.container,
        {
          width: sidebarWidthAnim,
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
        },
        isCollapsed && styles.mobileSidebar,
      ]}
      // Add testID for debugging
      testID="web-sidebar"
    >
      <View style={styles.header}>
        {!isCollapsed && (
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>Quiz</Text>
            <Text style={[styles.logoText, styles.logoTextAccent]}>Me</Text>
          </View>
        )}
        <Pressable 
          onPress={toggleSidebar} 
          style={(state: PressableStateCallbackType) => [
            styles.toggleButton,
            state.pressed && styles.toggleButtonHovered
          ]}
          hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
        >
          <Ionicons 
            name={isCollapsed ? 'chevron-forward' : 'chevron-back'} 
            size={20} 
            color={colors.text.secondary} 
          />
        </Pressable>
      </View>
      
      <ScrollView 
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.navContainer}>
          {navStructure.map((item, index) => renderNavItem(item, index))}
        </View>
      </ScrollView>
      
      {!isCollapsed && (
        <View style={styles.footer}>
          <Pressable 
            style={styles.profileButton}
            onPress={() => router.push('/(screens)/profile')}
          >
            <View style={styles.profileAvatar}>
              <Text style={styles.profileInitial}>{user?.email?.[0].toUpperCase() || 'U'}</Text>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName} numberOfLines={1}>{user?.user_metadata?.full_name || user?.user_metadata?.username || user?.email?.split('@')[0] || 'User'}</Text>
              <Text style={styles.profileEmail} numberOfLines={1}>{user?.email || 'user@example.com'}</Text>
            </View>
            <Ionicons name="chevron-forward-outline" size={16} color={colors.text.secondary} />
          </Pressable>
          
          <Pressable 
            style={styles.logoutButton}
            onPress={handleLogout}
          >
            <Ionicons name="log-out-outline" size={20} color={colors.text.primary} />
            <Text style={styles.logoutText}>Logout</Text>
          </Pressable>
        </View>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    height: '100%',
    overflow: 'hidden',
    borderRightWidth: 1,
    borderRightColor: colors.border.light,
    // Shadow for elevation
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  mobileSidebar: {
    position: 'absolute',
    zIndex: 1000,
  },
  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.l,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 22,
    fontWeight: '600',
    color: colors.text.primary,
  },
  logoTextAccent: {
    color: colors.primary,
    marginLeft: 2,
  },
  toggleButton: {
    padding: 6,
    borderRadius: borderRadius.round,
    backgroundColor: colors.border.light,
  },
  toggleButtonHovered: {
    backgroundColor: colors.primary + '20',
  },
  scrollContainer: {
    flex: 1,
  },
  navContainer: {
    paddingVertical: spacing.m,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: spacing.m,
    marginVertical: 2,
    marginHorizontal: spacing.s,
    borderRadius: borderRadius.m,
  },
  navItemHovered: {
    backgroundColor: colors.primary + '10',
  },
  activeNavItem: {
    backgroundColor: colors.primaryLight,
  },
  iconContainer: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navLabel: {
    marginLeft: spacing.m,
    fontSize: fontSize.m,
    color: colors.text.primary,
    flex: 1,
  },
  activeNavLabel: {
    fontWeight: '500',
    color: colors.primary,
  },
  chevron: {
    marginLeft: spacing.s,
  },
  nestedContainer: {
    borderLeftWidth: 1,
    borderLeftColor: colors.border.light,
    marginVertical: spacing.xs,
  },
  nestedItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: spacing.m,
    marginVertical: 2,
    marginLeft: spacing.l,
    marginRight: spacing.s,
    borderRadius: borderRadius.m,
  },
  nestedIconContainer: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nestedLabel: {
    marginLeft: spacing.m,
    fontSize: fontSize.s,
    color: colors.text.primary,
    flex: 1,
  },
  sectionHeader: {
    paddingVertical: 8,
    paddingHorizontal: spacing.l,
    marginTop: spacing.l,
    marginBottom: spacing.xs,
  },
  sectionLabel: {
    fontSize: fontSize.s,
    fontWeight: '500',
    color: colors.text.secondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
    paddingVertical: spacing.m,
    paddingHorizontal: spacing.l,
  },
  profileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.s,
    borderRadius: borderRadius.m,
    marginBottom: spacing.s,
  },
  profileAvatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInitial: {
    color: '#fff',
    fontSize: fontSize.l,
    fontWeight: '500',
  },
  profileInfo: {
    marginLeft: spacing.m,
    flex: 1,
  },
  profileName: {
    fontSize: fontSize.s,
    fontWeight: '500',
    color: colors.text.primary,
  },
  profileEmail: {
    fontSize: fontSize.xs,
    color: colors.text.secondary,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.s,
    borderRadius: borderRadius.m,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  logoutText: {
    marginLeft: spacing.s,
    fontSize: fontSize.s,
    color: colors.text.primary,
  },
});
