import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Toast from 'react-native-toast-message';
import { PartyPopper } from 'lucide-react-native';
import { useAuth } from '../context/AuthContext';
import { COLORS, SPACING, SIZES } from '../theme/theme';
import Input from '../components/Input';
import Button from '../components/Button';
import users from '../data/users.json';

const LoginSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string()
    .min(5, 'Password must be at least 5 characters')
    .required('Password is required'),
});

const LoginScreen = () => {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (values: any) => {
    setIsLoading(true);
    setTimeout(async () => {
      const user = users.find(
        u => u.username === values.username && u.password === values.password,
      );

      if (user) {
        await login({ id: user.id, username: user.username });
        Toast.show({
          type: 'success',
          text1: 'Login Successful',
          text2: `Welcome back, ${user.username}!`,
        });
      } else {
        setIsLoading(false);
        Toast.show({
          type: 'error',
          text1: 'Login Failed',
          text2: 'Invalid username or password',
        });
      }
    }, 1000);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <PartyPopper size={44} color={COLORS.primary} />
          </View>
          <Text style={styles.title}>EventBook</Text>
          <Text style={styles.subtitle}>Discover and book amazing events</Text>
        </View>

        <Formik
          initialValues={{ username: '', password: '' }}
          validationSchema={LoginSchema}
          onSubmit={handleLogin}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View style={styles.form}>
              <Input
                label="Username"
                placeholder="Enter your username"
                icon="user"
                value={values.username}
                onChangeText={handleChange('username')}
                onBlur={handleBlur('username')}
                error={touched.username ? errors.username : undefined}
              />

              <Input
                label="Password"
                placeholder="Enter your password"
                icon="lock"
                secureTextEntry
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                error={touched.password ? errors.password : undefined}
              />

              <Button
                title="Login"
                onPress={handleSubmit}
                loading={isLoading}
                style={styles.button}
              />

              <View style={styles.footer}>
                <Text style={styles.footerText}>Don't have an account? </Text>
                <Text style={styles.linkText}>Sign Up</Text>
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    flexGrow: 1,
    padding: SPACING.xl,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: SPACING.xxl,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.md,
    elevation: 5,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },

  title: {
    fontSize: 32,
    fontWeight: '800',
    color: COLORS.text,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  form: {
    width: '100%',
  },
  button: {
    marginTop: SPACING.md,
    height: '18%',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: SPACING.lg,
  },
  footerText: {
    color: COLORS.textSecondary,
    fontSize: 14,
  },
  linkText: {
    color: COLORS.primary,
    fontWeight: '700',
    fontSize: 14,
  },
  hintContainer: {
    marginTop: SPACING.xxl,
    padding: SPACING.md,
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    borderRadius: SIZES.radius,
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.2)',
  },
  hintTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  hintText: {
    fontSize: 14,
    color: COLORS.text,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
});

export default LoginScreen;
