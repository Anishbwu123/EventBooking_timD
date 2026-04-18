import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { User, Lock, Mail, Phone, Eye, EyeOff } from 'lucide-react-native';

const IconMap: any = {
  user: User,
  lock: Lock,
  mail: Mail,
  phone: Phone,
  eye: Eye,
  'eye-off': EyeOff,
};
import { COLORS, SPACING, SIZES } from '../theme/theme';

interface InputProps {
  label?: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  onBlur?: (e: any) => void;
  error?: string;
  secureTextEntry?: boolean;
  icon?: string;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  style?: ViewStyle;
}

const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  onBlur,
  error,
  secureTextEntry,
  icon,
  keyboardType = 'default',
  style,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View
        style={[
          styles.inputContainer,
          isFocused && styles.focused,
          error && styles.errorBorder,
        ]}
      >
        {icon && (
          (() => {
            const IconComp = IconMap[icon];
            return IconComp ? (
              <IconComp
                size={20}
                color={isFocused ? COLORS.primary : COLORS.textSecondary}
                style={styles.icon}
              />
            ) : null;
          })()
        )}
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={COLORS.textSecondary}
          value={value}
          onChangeText={onChangeText}
          onBlur={(e) => {
            setIsFocused(false);
            onBlur && onBlur(e);
          }}
          onFocus={() => setIsFocused(true)}
          secureTextEntry={secureTextEntry && !showPassword}
          keyboardType={keyboardType}
          style={styles.input}
        />
        {secureTextEntry && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeIcon}
          >
            {showPassword ? (
              <EyeOff size={20} color={COLORS.textSecondary} />
            ) : (
              <Eye size={20} color={COLORS.textSecondary} />
            )}
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.md,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.xs,
    marginLeft: 2,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: SIZES.radius,
    paddingHorizontal: SPACING.md,
    height: 52,
  },
  focused: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.white,
  },
  errorBorder: {
    borderColor: COLORS.error,
  },
  icon: {
    marginRight: SPACING.sm,
  },
  input: {
    flex: 1,
    color: COLORS.text,
    fontSize: 16,
    height: '100%',
  },
  eyeIcon: {
    padding: SPACING.xs,
  },
  errorText: {
    color: COLORS.error,
    fontSize: 12,
    marginTop: 4,
    marginLeft: 2,
  },
});

export default Input;
