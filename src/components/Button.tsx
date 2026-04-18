import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, SPACING, SIZES } from '../theme/theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  loading,
  disabled,
  style,
  textStyle,
  variant = 'primary',
}) => {
  const isOutline = variant === 'outline';

  const getColors = () => {
    switch (variant) {
      case 'secondary':
        return [COLORS.secondary, '#9333ea'];
      case 'danger':
        return [COLORS.error, '#dc2626'];
      case 'outline':
        return [COLORS.transparent, COLORS.transparent];
      default:
        return [COLORS.primary, '#4f46e5'];
    }
  };

  const Container = isOutline
    ? TouchableOpacity
    : (props: any) => (
        <TouchableOpacity {...props}>
          <LinearGradient
            colors={getColors()}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[styles.gradient, props.style]}
          >
            {props.children}
          </LinearGradient>
        </TouchableOpacity>
      );

  return (
    <Container
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.button,
        isOutline && styles.outlineButton,
        disabled && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={isOutline ? COLORS.primary : COLORS.white} />
      ) : (
        <Text
          style={[
            styles.text,
            isOutline && styles.outlineText,
            variant === 'danger' && styles.text,
            textStyle,
          ]}
        >
          {title}
        </Text>
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 52,
    borderRadius: SIZES.radius,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: SPACING.sm,
    overflow: 'hidden',
  },
  gradient: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  outlineButton: {
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    backgroundColor: 'transparent',
  },
  text: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
  outlineText: {
    color: COLORS.primary,
  },
  disabled: {
    opacity: 0.6,
  },
});

export default Button;
