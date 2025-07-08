import { StyleSheet, TextStyle, ViewStyle, ImageStyle } from 'react-native';
import { colors, spacing, fontSize, fontWeight, borderRadius } from './theme';

interface Styles {
  // View styles
  container: ViewStyle;
  flexRow: ViewStyle;
  flexBetween: ViewStyle;
  flexCenter: ViewStyle;
  flexGrow: ViewStyle;
  contentContainer: ViewStyle;
  scrollContent: ViewStyle;
  card: ViewStyle;
  formContainer: ViewStyle;
  inputContainer: ViewStyle;
  header: ViewStyle;
  button: ViewStyle;
  buttonOutline: ViewStyle;
  dropdownSelected: ViewStyle;
  dropdown: ViewStyle;
  dropdownMenu: ViewStyle;
  dropdownItem: ViewStyle;
  
  // Text styles
  title: TextStyle;
  subtitle: TextStyle;
  sectionTitle: TextStyle;
  bodyText: TextStyle;
  label: TextStyle;
  buttonText: TextStyle;
  buttonOutlineText: TextStyle;
  headerTitle: TextStyle;
  
  // Input styles
  input: TextStyle;
  textArea: TextStyle;
}

export const common = StyleSheet.create<Styles>({
  // Layout styles
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flexBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  flexCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  flexGrow: {
    flexGrow: 1,
  },
  
  // Content containers
  contentContainer: {
    flex: 1,
    padding: spacing.l,
  },
  scrollContent: {
    flexGrow: 1,
    padding: spacing.l,
  },
  
  // Card styles
  card: {
    backgroundColor: colors.background,
    borderRadius: borderRadius.m,
    padding: spacing.l,
    marginVertical: spacing.m,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  
  // Form styles
  formContainer: {
    gap: spacing.l,
    marginBottom: spacing.xl,
  },
  inputContainer: {
    marginBottom: spacing.l,
  },
  label: {
    fontSize: fontSize.m,
    fontWeight: fontWeight.medium,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border.medium,
    borderRadius: borderRadius.m,
    padding: spacing.m,
    fontSize: fontSize.m,
    color: colors.text.primary,
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  
  // Button styles
  button: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.m,
    paddingHorizontal: spacing.xl,
    borderRadius: borderRadius.m,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: colors.text.white,
    fontSize: fontSize.m,
    fontWeight: fontWeight.semiBold,
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    paddingVertical: spacing.m,
    paddingHorizontal: spacing.xl,
    borderRadius: borderRadius.m,
    borderWidth: 1,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonOutlineText: {
    color: colors.primary,
    fontSize: fontSize.m,
    fontWeight: fontWeight.semiBold,
  },
  
  // Typography
  title: {
    fontSize: fontSize.xxxl,
    fontWeight: fontWeight.bold,
    color: colors.text.primary,
    marginBottom: spacing.s,
  },
  subtitle: {
    fontSize: fontSize.l,
    fontWeight: fontWeight.medium,
    color: colors.text.secondary,
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.semiBold,
    color: colors.text.primary,
    marginVertical: spacing.l,
  },
  bodyText: {
    fontSize: fontSize.m,
    color: colors.text.primary,
    lineHeight: fontSize.m * 1.5,
  },
  
  // Header styles
  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.l,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
    backgroundColor: colors.background,
  },
  headerTitle: {
    fontSize: fontSize.l,
    fontWeight: fontWeight.semiBold,
    color: colors.text.primary,
  },
  
  // Dropdown styles
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: colors.border.medium,
    borderRadius: borderRadius.m,
    padding: spacing.m,
    backgroundColor: colors.background,
  },
  dropdownSelected: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropdownMenu: {
    borderWidth: 1,
    borderColor: colors.border.medium,
    borderRadius: borderRadius.m,
    backgroundColor: colors.background,
    overflow: 'hidden',
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  }
});