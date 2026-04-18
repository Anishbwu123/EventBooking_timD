import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  RefreshControl,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Trash2, CheckCircle, Calendar } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';
import Toast from 'react-native-toast-message';
import { useBookings } from '../context/BookingContext';
import { useAuth } from '../context/AuthContext';
import { COLORS, SPACING, SIZES } from '../theme/theme';
import Button from '../components/Button';

const MyBookingsScreen = ({ navigation }: any) => {
  const { bookings, cancelBooking, refreshBookings } = useBookings();
  const { logout, user } = useAuth();
  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    useCallback(() => {
      refreshBookings();
    }, []),
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await refreshBookings();
    setRefreshing(false);
  };

  const handleCancelClick = (id: string, eventTitle: string) => {
    Alert.alert(
      'Cancel Booking',
      `Are you sure you want to cancel your booking for ${eventTitle}?`,
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Yes, Cancel',
          style: 'destructive',
          onPress: async () => {
            await cancelBooking(id);
            Toast.show({
              type: 'info',
              text1: 'Booking Cancelled',
              text2: `Your booking for ${eventTitle} has been removed.`,
            });
          },
        },
      ],
    );
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.eventInfo}>
          <Text style={styles.eventTitle}>{item.eventTitle}</Text>
          <Text style={styles.bookingId}>Booking ID: #{item.id.slice(-6)}</Text>
        </View>
        <TouchableOpacity
          onPress={() => handleCancelClick(item.id, item.eventTitle)}
          style={styles.cancelIcon}
        >
          <Trash2 size={20} color={COLORS.error} />
        </TouchableOpacity>
      </View>

      <View style={styles.divider} />

      <View style={styles.cardBody}>
        <View style={styles.infoRow}>
          <View style={styles.infoCol}>
            <Text style={styles.infoLabel}>DATE</Text>
            <Text style={styles.infoValue}>{item.date}</Text>
          </View>
          <View style={styles.infoCol}>
            <Text style={styles.infoLabel}>TICKETS</Text>
            <Text style={styles.infoValue}>{item.tickets} Person(s)</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.infoCol}>
            <Text style={styles.infoLabel}>NAME</Text>
            <Text style={styles.infoValue}>{item.name}</Text>
          </View>
          <View style={styles.infoCol}>
            <Text style={styles.infoLabel}>BOOKED ON</Text>
            <Text style={styles.infoValue}>
              {item.bookingTime.split(',')[0]}
            </Text>
          </View>
        </View>
      </View>

      <LinearGradient
        colors={[COLORS.primary, '#4f46e5']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.cardFooter}
      >
        <CheckCircle size={16} color={COLORS.white} />
        <Text style={styles.statusText}>Successfully Booked</Text>
      </LinearGradient>
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyIconBg}>
        <Calendar size={60} color={COLORS.primary} />
      </View>
      <Text style={styles.emptyTitle}>No Bookings Found</Text>
      <Text style={styles.emptySubtitle}>
        Looks like you haven't booked any events yet.
      </Text>
      <Button
        title="Browse Events"
        variant="outline"
        onPress={() => navigation.navigate('Home')}
        style={styles.browseBtn}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>My Bookings</Text>
          <Text style={styles.headerSubtitle}>Manage your tickets</Text>
        </View>
      </View>

      <FlatList
        data={bookings}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    padding: SPACING.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.text,
  },
  headerSubtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },

  listContent: {
    padding: SPACING.md,
    paddingBottom: SPACING.xl,
    flexGrow: 1,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radiusLg,
    marginBottom: SPACING.lg,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  cardHeader: {
    padding: SPACING.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  eventInfo: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
  },
  bookingId: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
    fontWeight: '500',
  },
  cancelIcon: {
    padding: SPACING.sm,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginHorizontal: SPACING.md,
  },
  cardBody: {
    padding: SPACING.md,
    gap: SPACING.md,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoCol: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.textSecondary,
    letterSpacing: 1,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
    marginTop: 2,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    gap: 6,
  },
  statusText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '700',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xxl,
  },
  emptyIconBg: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.text,
  },
  emptySubtitle: {
    fontSize: 15,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: SPACING.sm,
    lineHeight: 22,
  },
  browseBtn: {
    marginTop: SPACING.xl,
    width: 200,
  },
});

export default MyBookingsScreen;
