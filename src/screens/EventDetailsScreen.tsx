import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  Share,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ChevronLeft,
  Share2,
  Heart,
  Calendar,
  MapPin,
  DollarSign,
} from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, SPACING, SIZES } from '../theme/theme';
import { useBookings } from '../context/BookingContext';
import Button from '../components/Button';

const { width } = Dimensions.get('window');

const EventDetailsScreen = ({ route, navigation }: any) => {
  const insets = useSafeAreaInsets();
  const { event } = route.params;
  const { favorites, toggleFavorite } = useBookings();
  const isFavorite = favorites.includes(event.id);

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: event.image }} style={styles.image} />
          <LinearGradient
            colors={['rgba(0,0,0,0.6)', 'transparent', 'rgba(0,0,0,0.4)']}
            style={StyleSheet.absoluteFill}
          />

          <View style={[styles.navButtons, { paddingTop: insets.top + 10 }]}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.circleButton}
            >
              <ChevronLeft size={24} color={COLORS.white} />
            </TouchableOpacity>

            <View style={styles.rightNav}>
              <TouchableOpacity
                onPress={() => toggleFavorite(event.id)}
                style={styles.circleButton}
              >
                <Heart
                  size={20}
                  color={isFavorite ? COLORS.error : COLORS.white}
                  fill={isFavorite ? COLORS.error : 'transparent'}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.categoryContainer}>
            <Text style={styles.category}>{event.category}</Text>
          </View>

          <Text style={styles.title}>{event.title}</Text>

          <View style={styles.detailsList}>
            <View style={styles.detailItem}>
              <View
                style={[
                  styles.iconBox,
                  { backgroundColor: 'rgba(99, 102, 241, 0.1)' },
                ]}
              >
                <Calendar size={20} color={COLORS.primary} />
              </View>
              <View>
                <Text style={styles.detailValue}>{event.date}</Text>
                <Text style={styles.detailLabel}>{event.time}</Text>
              </View>
            </View>

            <View style={styles.detailItem}>
              <View
                style={[
                  styles.iconBox,
                  { backgroundColor: 'rgba(16, 185, 129, 0.1)' },
                ]}
              >
                <MapPin size={20} color={COLORS.success} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.detailValue} numberOfLines={2}>
                  {event.location}
                </Text>
              </View>
            </View>

            <View style={styles.detailItem}>
              <View
                style={[
                  styles.iconBox,
                  { backgroundColor: 'rgba(245, 158, 11, 0.1)' },
                ]}
              >
                <DollarSign size={20} color="#f59e0b" />
              </View>
              <View>
                <Text style={styles.detailValue}>₹{event.price}</Text>
                <Text style={styles.detailLabel}>Per ticket</Text>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About Event</Text>
            <Text style={styles.description}>{event.description}</Text>
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.footerPrice}>
          <Text style={styles.priceLabel}>Price</Text>
          <Text style={styles.priceValue}>₹{event.price}</Text>
        </View>
        <Button
          title="Book Now"
          onPress={() => navigation.navigate('Booking', { event })}
          style={styles.bookButton}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  imageContainer: {
    width: width,
    height: width * 0.9,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  navButtons: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.md,
  },
  rightNav: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  circleButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: SPACING.lg,
    marginTop: -SIZES.radiusLg,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: SIZES.radiusLg,
    borderTopRightRadius: SIZES.radiusLg,
  },
  categoryContainer: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    paddingHorizontal: SPACING.md,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: SPACING.sm,
  },
  category: {
    color: COLORS.primary,
    fontWeight: '700',
    fontSize: 12,
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: SPACING.xl,
  },
  detailsList: {
    gap: SPACING.lg,
    marginBottom: SPACING.xxl,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
  },
  detailLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  section: {
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  description: {
    fontSize: 15,
    lineHeight: 24,
    color: COLORS.textSecondary,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.white,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
    paddingBottom: Platform.OS === 'ios' ? 30 : 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    elevation: 10,
  },
  footerPrice: {
    flex: 1,
  },
  priceLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  priceValue: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.primary,
  },
  bookButton: {
    flex: 2,
    height: 54,
    marginVertical: 0,
  },
});

export default EventDetailsScreen;
