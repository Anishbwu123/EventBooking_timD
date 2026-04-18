import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Toast from 'react-native-toast-message';
import { ArrowLeft, Minus, Plus } from 'lucide-react-native';
import { useBookings } from '../context/BookingContext';
import { COLORS, SPACING, SIZES } from '../theme/theme';
import Input from '../components/Input';
import Button from '../components/Button';

const BookingSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string()
    .matches(/^\d{10}$/, 'Phone number must be 10 digits')
    .required('Phone number is required'),
  tickets: Yup.number()
    .min(1, 'At least 1 ticket is required')
    .max(10, 'Maximum 10 tickets per booking')
    .required('Number of tickets is required'),
});

const BookingScreen = ({ route, navigation }: any) => {
  const { event } = route.params;
  const { addBooking } = useBookings();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleBooking = async (values: any) => {
    setIsSubmitting(true);

    setTimeout(async () => {
      const bookingData = {
        eventId: event.id,
        eventTitle: event.title,
        date: event.date,
        bookingTime: new Date().toLocaleString(),
        ...values,
      };

      await addBooking(bookingData);
      setIsSubmitting(false);

      Toast.show({
        type: 'success',
        text1: 'Booking Confirmed!',
        text2: `You've booked ${values.tickets} tickets for ${event.title}`,
      });

      navigation.navigate('MyBookings');
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <View style={styles.header}>
          <RNTouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <ArrowLeft size={24} color={COLORS.text} />
          </RNTouchableOpacity>
          <Text style={styles.headerTitle}>Booking Details</Text>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.eventInfo}>
            <Text style={styles.eventTitle}>{event.title}</Text>
            <Text style={styles.eventMeta}>
              {event.date} • {event.location.split(',')[0]}
            </Text>
          </View>

          <Formik
            initialValues={{
              name: '',
              email: '',
              phone: '',
              tickets: 1,
            }}
            validationSchema={BookingSchema}
            onSubmit={handleBooking}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              setFieldValue,
            }) => (
              <View style={styles.form}>
                <Input
                  label="Full Name"
                  placeholder="Enter your name"
                  icon="user"
                  value={values.name}
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  error={touched.name ? errors.name : undefined}
                />

                <Input
                  label="Email Address"
                  placeholder="Enter your email"
                  icon="mail"
                  keyboardType="email-address"
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  error={touched.email ? errors.email : undefined}
                />

                <Input
                  label="Phone Number"
                  placeholder="Enter 10-digit number"
                  icon="phone"
                  keyboardType="phone-pad"
                  value={values.phone}
                  onChangeText={handleChange('phone')}
                  onBlur={handleBlur('phone')}
                  error={touched.phone ? errors.phone : undefined}
                />

                <Text style={styles.label}>Number of Tickets</Text>
                <View style={styles.ticketSelector}>
                  <RNTouchableOpacity
                    onPress={() => {
                      if (values.tickets > 1) {
                        setFieldValue('tickets', values.tickets - 1);
                      }
                    }}
                    style={styles.ticketBtn}
                  >
                    <Minus size={20} color={COLORS.primary} />
                  </RNTouchableOpacity>

                  <Text style={styles.ticketCount}>{values.tickets}</Text>

                  <RNTouchableOpacity
                    onPress={() => {
                      if (values.tickets < 10) {
                        setFieldValue('tickets', Number(values.tickets) + 1);
                      }
                    }}
                    style={styles.ticketBtn}
                  >
                    <Plus size={20} color={COLORS.primary} />
                  </RNTouchableOpacity>
                </View>
                {touched.tickets && errors.tickets && (
                  <Text style={styles.errorText}>{errors.tickets}</Text>
                )}

                <View style={styles.summary}>
                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Price per ticket</Text>
                    <Text style={styles.summaryValue}>₹{event.price}</Text>
                  </View>
                  <View style={styles.summaryRow}>
                    <Text
                      style={[
                        styles.summaryLabel,
                        { fontWeight: '700', color: COLORS.text },
                      ]}
                    >
                      Total Amount
                    </Text>
                    <Text
                      style={[
                        styles.summaryValue,
                        {
                          fontWeight: '800',
                          color: COLORS.primary,
                          fontSize: 18,
                        },
                      ]}
                    >
                      ₹{event.price * values.tickets}
                    </Text>
                  </View>
                </View>

                <Button
                  title="Confirm Booking"
                  onPress={handleSubmit}
                  loading={isSubmitting}
                  style={styles.submitBtn}
                />
              </View>
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const TouchableOpacity = (props: any) => (
  <View {...props}>
    <Text>{props.children}</Text>
  </View>
);

import { TouchableOpacity as RNTouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backButton: {
    padding: SPACING.xs,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text,
    marginLeft: SPACING.md,
  },
  scrollContent: {
    padding: SPACING.lg,
  },
  eventInfo: {
    marginBottom: SPACING.xl,
    padding: SPACING.md,
    backgroundColor: 'rgba(99, 102, 241, 0.05)',
    borderRadius: SIZES.radius,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
  },
  eventMeta: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  form: {
    gap: SPACING.xs,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.sm,
    marginLeft: 2,
  },
  ticketSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.xl,
    backgroundColor: COLORS.background,
    padding: SPACING.sm,
    borderRadius: SIZES.radius,
    marginBottom: SPACING.lg,
  },
  ticketBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  ticketCount: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.text,
    minWidth: 40,
    textAlign: 'center',
  },
  summary: {
    marginTop: SPACING.md,
    padding: SPACING.lg,
    backgroundColor: COLORS.background,
    borderRadius: SIZES.radius,
    gap: SPACING.sm,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  summaryValue: {
    fontSize: 14,
    color: COLORS.text,
    fontWeight: '600',
  },
  submitBtn: {
    // marginTop: SPACING.xl,
    height: '10%',
  },
  errorText: {
    color: COLORS.error,
    fontSize: 12,
    marginTop: -SPACING.sm,
    marginBottom: SPACING.sm,
    textAlign: 'center',
  },
});

export default BookingScreen;
