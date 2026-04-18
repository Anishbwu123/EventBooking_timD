import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Heart, Calendar, MapPin } from 'lucide-react-native';
import { COLORS, SPACING, SIZES } from '../theme/theme';
import { useBookings } from '../context/BookingContext';

const { width } = Dimensions.get('window');

interface EventCardProps {
  event: any;
  onPress: () => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onPress }) => {
  const { favorites, toggleFavorite } = useBookings();
  const isFavorite = favorites.includes(event.id);

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={styles.container}
    >
      <Image source={{ uri: event.image }} style={styles.image} />

      <TouchableOpacity
        style={styles.favoriteButton}
        onPress={() => toggleFavorite(event.id)}
      >
        <Heart
          size={20}
          color={isFavorite ? COLORS.error : COLORS.white}
          fill={isFavorite ? COLORS.error : 'transparent'}
        />
      </TouchableOpacity>

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.category}>{event.category}</Text>
          <Text style={styles.price}>₹{event.price}</Text>
        </View>

        <Text style={styles.title} numberOfLines={1}>
          {event.title}
        </Text>

        <View style={styles.footer}>
          <View style={styles.infoItem}>
            <Calendar size={14} color={COLORS.textSecondary} />
            <Text style={styles.infoText}>{event.date}</Text>
          </View>
          <View style={styles.infoItem}>
            <MapPin size={14} color={COLORS.textSecondary} />
            <Text style={styles.infoText} numberOfLines={1}>
              {event.location.split(',')[0]}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radiusLg,
    marginBottom: SPACING.md,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    marginHorizontal: SPACING.md,
  },
  image: {
    width: '100%',
    height: 180,
    backgroundColor: COLORS.border,
  },
  favoriteButton: {
    position: 'absolute',
    top: SPACING.md,
    right: SPACING.md,
    backgroundColor: 'rgba(0,0,0,0.3)',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    backdropFilter: 'blur(10px)',
  },
  content: {
    padding: SPACING.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  category: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.primary,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  infoText: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
});

export default EventCard;
