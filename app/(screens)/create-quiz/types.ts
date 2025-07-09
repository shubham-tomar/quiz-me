import type { PressableStateCallbackType } from 'react-native';

// Extended type for React Native Web's Pressable component
export interface ExtendedPressableStateCallbackType extends PressableStateCallbackType {
  hovered?: boolean;
  focused?: boolean;
}
