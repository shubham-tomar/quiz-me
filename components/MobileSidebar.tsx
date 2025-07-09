import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Animated, 
  ScrollView,
  TouchableOpacity,
  Pressable,
  Dimensions
} from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, fontSize, borderRadius } from '../styles';

const SIDEBAR_WIDTH = 250;
const ANIM_DURATION = 250;

// Define types for our navigation items
type NavItemType = 'link' | 'section' | 'nested';

interface NavItemBase {
  type: NavItemType;
  icon: string;
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

interface MobileSidebarProps {
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

export function MobileSidebar({ onCollapsedChange }: MobileSidebarProps) {
  // In mobile, we default to collapsed (hidden)
  const [isCollapsed, setIsCollapsed] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<{[key: string]: boolean}>({});
  const insets = useSafeAreaInsets();
  
  // Animated values
  const translateX = React.useRef(new Animated.Value(-SIDEBAR_WIDTH)).current;
  const overlayOpacity = React.useRef(new Animated.Value(0)).current;
  
  // Screen dimensions
  const { width: screenWidth } = Dimensions.get('window');

  // Initialize expanded state based on defaultExpanded
  useEffect(() => {
    const initialExpandedState: {[key: string]: boolean} = {};
    
    navStructure.forEach(item => {
      if (item.type === 'nested' && item.defaultExpanded) {
        initialExpandedState[item.id] = true;
      }
    });
    
    setExpandedItems(initialExpandedState);
  }, []);

  const toggleSidebar = () => {
    const newCollapsedState = !isCollapsed;
    
    if (newCollapsedState) {
      // Collapsing - animate out
      Animated.parallel([
        Animated.timing(translateX, {
          toValue: -SIDEBAR_WIDTH,
          duration: ANIM_DURATION,
          useNativeDriver: true,
        }),
        Animated.timing(overlayOpacity, {
          toValue: 0,
          duration: ANIM_DURATION,
          useNativeDriver: true,
        })
      ]).start();
    } else {
      // Expanding - animate in
      Animated.parallel([
        Animated.timing(translateX, {
          toValue: 0,
          duration: ANIM_DURATION,
          useNativeDriver: true,
        }),
        Animated.timing(overlayOpacity, {
          toValue: 0.5,
          duration: ANIM_DURATION,
          useNativeDriver: true,
        })
      ]).start();
    }
    
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
    return pathname === path;
  };

  const renderNavItem = (item: NavItem) => {
    switch (item.type) {
      case 'link':
        return (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.navItem,
              isPathActive(item.path) && styles.activeNavItem,
            ]}
            onPress={() => {
              router.push(item.path as any);
              toggleSidebar(); // Auto-collapse after navigation
            }}
          >
            <View style={styles.iconContainer}>
              <Ionicons
                name={item.icon as any}
                size={24}
                color={isPathActive(item.path) ? colors.primary : colors.text.secondary}
              />
            </View>
            <Text 
              style={[
                styles.navLabel,
                isPathActive(item.path) && styles.activeNavLabel
              ]}
              numberOfLines={1}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        );
        
      case 'section':
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
            <TouchableOpacity
              style={[
                styles.navItem,
                item.children.some(child => isPathActive(child.path)) && styles.activeNavItem,
              ]}
              onPress={() => toggleNestedItem(item.id)}
            >
              <View style={styles.iconContainer}>
                <Ionicons
                  name={item.icon as any}
                  size={24}
                  color={item.children.some(child => isPathActive(child.path)) 
                    ? colors.primary 
                    : colors.text.secondary}
                />
              </View>
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
            </TouchableOpacity>
            
            {isExpanded && (
              <View style={styles.nestedContainer}>
                {item.children.map((child) => (
                  <TouchableOpacity
                    key={child.id}
                    style={[
                      styles.nestedItem,
                      isPathActive(child.path) && styles.activeNavItem,
                    ]}
                    onPress={() => {
                      router.push(child.path as any);
                      toggleSidebar(); // Auto-collapse after navigation
                    }}
                  >
                    <View style={styles.nestedIconContainer}>
                      <Ionicons
                        name={child.icon as any}
                        size={20}
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
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </React.Fragment>
        );
    }
  };

  // Only render the toggle button when collapsed
  if (isCollapsed) {
    return (
      <View style={[styles.toggleButtonContainer, { paddingTop: insets.top }]}>
        <Pressable 
          onPress={toggleSidebar} 
          style={styles.toggleButton}
          hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}
        >
          <Ionicons name="menu" size={24} color={colors.text.primary} />
        </Pressable>
      </View>
    );
  }

  // Full sidebar when expanded
  return (
    <>
      {/* Overlay to capture taps outside sidebar */}
      <Animated.View 
        style={[
          styles.overlay,
          { opacity: overlayOpacity }
        ]}
        pointerEvents={isCollapsed ? 'none' : 'auto'}
      >
        <TouchableOpacity
          style={{ width: '100%', height: '100%' }}
          onPress={toggleSidebar}
          activeOpacity={1}
        />
      </Animated.View>
      
      {/* Sidebar drawer */}
      <Animated.View 
        style={[
          styles.container,
          {
            transform: [{ translateX }],
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
            paddingLeft: insets.left,
          }
        ]}
      >
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>Quiz</Text>
            <Text style={[styles.logoText, styles.logoTextAccent]}>Me</Text>
          </View>
          <TouchableOpacity 
            onPress={toggleSidebar} 
            style={styles.closeButton}
            hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}
          >
            <Ionicons name="close" size={24} color={colors.text.secondary} />
          </TouchableOpacity>
        </View>
        
        <ScrollView 
          style={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.navContainer}>
            {navStructure.map(item => renderNavItem(item))}
          </View>
        </ScrollView>
        
        <View style={styles.footer}>
          <TouchableOpacity style={styles.profileButton}>
            <View style={styles.profileAvatar}>
              <Text style={styles.profileInitial}>U</Text>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName} numberOfLines={1}>User Name</Text>
              <Text style={styles.profileEmail} numberOfLines={1}>user@example.com</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'black',
    zIndex: 998,
  },
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: SIDEBAR_WIDTH,
    backgroundColor: colors.background,
    zIndex: 999,
    borderRightWidth: 1,
    borderRightColor: colors.border.light,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 8,
  },
  toggleButtonContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    paddingHorizontal: spacing.l,
    paddingVertical: spacing.m,
  },
  toggleButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
    borderWidth: 1,
    borderColor: colors.border.light,
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
  closeButton: {
    padding: 8,
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
    paddingVertical: 12,  // Larger touch target for mobile
    paddingHorizontal: spacing.l,
    marginVertical: 4,
    borderRadius: borderRadius.m,
  },
  activeNavItem: {
    backgroundColor: colors.primaryLight,
  },
  iconContainer: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navLabel: {
    marginLeft: spacing.m,
    fontSize: fontSize.l,  // Larger font for mobile
    color: colors.text.primary,
    flex: 1,
  },
  activeNavLabel: {
    fontWeight: '500',
    color: colors.primary,
  },
  chevron: {
    marginLeft: spacing.m,
  },
  nestedContainer: {
    borderLeftWidth: 1,
    borderLeftColor: colors.border.light,
    marginVertical: spacing.xs,
  },
  nestedItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,  // Larger touch target for mobile
    paddingHorizontal: spacing.l,
    marginVertical: 2,
    marginLeft: spacing.l,
    marginRight: spacing.s,
    borderRadius: borderRadius.m,
  },
  nestedIconContainer: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nestedLabel: {
    marginLeft: spacing.m,
    fontSize: fontSize.m,
    color: colors.text.primary,
    flex: 1,
  },
  sectionHeader: {
    paddingVertical: 10,
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
    padding: spacing.m,
  },
  profileAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
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
    fontSize: fontSize.m,
    fontWeight: '500',
    color: colors.text.primary,
  },
  profileEmail: {
    fontSize: fontSize.s,
    color: colors.text.secondary,
  },
});
