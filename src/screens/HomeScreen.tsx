import React, { useState, useMemo } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Alert,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  User,
  Search,
  X,
  MapPin,
  Calendar as CalendarIcon,
  FileQuestionIcon,
} from 'lucide-react-native';
import { COLORS, SPACING, SIZES } from '../theme/theme';
import EventCard from '../components/EventCard';
import events from '../data/events.json';
import { useAuth } from '../context/AuthContext';

const categories = ['All', 'Technology', 'Business', 'Entertainment', 'Food'];

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (text: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  selectedLocation: string;
  setSelectedLocation: (loc: string) => void;
  userName: string;
  onProfilePress: () => void;
}

const HomeHeader: React.FC<HeaderProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedDate,
  setSelectedDate,
  selectedLocation,
  setSelectedLocation,
  userName,
  onProfilePress,
}) => {
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const locations = [
    'All',
    'Kolkata',
    'Bangalore',
    'Delhi',
    'Mumbai',
    'Hyderabad',
  ];
  const months = [
    { label: 'All', value: 'All' },
    { label: 'Aug', value: '08' },
    { label: 'Sep', value: '09' },
    { label: 'Oct', value: '10' },
    { label: 'Nov', value: '11' },
    { label: 'Dec', value: '12' },
  ];

  const toggleLocation = () => {
    setShowLocationPicker(!showLocationPicker);
    setShowDatePicker(false);
  };

  const toggleDate = () => {
    setShowDatePicker(!showDatePicker);
    setShowLocationPicker(false);
  };

  return (
    <View style={styles.header}>
      <View style={styles.topRow}>
        <View>
          <Text style={styles.headerTitle}>Hello! {userName}</Text>
        </View>
        <TouchableOpacity
          style={styles.profileButton}
          onPress={onProfilePress}
          activeOpacity={0.7}
        >
          <User size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Search size={20} color={COLORS.textSecondary} />
        <TextInput
          placeholder="Search events..."
          placeholderTextColor={COLORS.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.searchInput}
        />
        <View style={styles.searchActions}>
          {searchQuery.length > 0 && (
            <TouchableOpacity
              onPress={() => setSearchQuery('')}
              style={styles.actionBtn}
            >
              <X size={18} color={COLORS.textSecondary} />
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={toggleLocation} style={styles.actionBtn}>
            <MapPin
              size={20}
              color={
                selectedLocation !== 'All'
                  ? COLORS.primary
                  : COLORS.textSecondary
              }
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleDate} style={styles.actionBtn}>
            <CalendarIcon
              size={20}
              color={
                selectedDate !== 'All' ? COLORS.primary : COLORS.textSecondary
              }
            />
          </TouchableOpacity>
        </View>
      </View>

      {showLocationPicker && (
        <View style={styles.dropdown}>
          <Text style={styles.dropdownTitle}>Select Location</Text>
          <View style={styles.dropdownList}>
            {locations.map(loc => (
              <TouchableOpacity
                key={loc}
                onPress={() => {
                  setSelectedLocation(loc);
                  setShowLocationPicker(false);
                }}
                style={[
                  styles.dropdownItem,
                  selectedLocation === loc && styles.dropdownItemActive,
                ]}
              >
                <Text
                  style={[
                    styles.dropdownItemText,
                    selectedLocation === loc && styles.dropdownItemTextActive,
                  ]}
                >
                  {loc}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {showDatePicker && (
        <View style={styles.dropdown}>
          <Text style={styles.dropdownTitle}>Select Month</Text>
          <View style={styles.dropdownList}>
            {months.map(m => (
              <TouchableOpacity
                key={m.value}
                onPress={() => {
                  setSelectedDate(m.value);
                  setShowDatePicker(false);
                }}
                style={[
                  styles.dropdownItem,
                  selectedDate === m.value && styles.dropdownItemActive,
                ]}
              >
                <Text
                  style={[
                    styles.dropdownItemText,
                    selectedDate === m.value && styles.dropdownItemTextActive,
                  ]}
                >
                  {m.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      <Text style={styles.filterLabel}>Category</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={categories}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => setSelectedCategory(item)}
            style={[
              styles.categoryItem,
              selectedCategory === item && styles.categoryItemActive,
            ]}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === item && styles.categoryTextActive,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        )}
        style={styles.categoryList}
        contentContainerStyle={styles.categoryContent}
      />
    </View>
  );
};

const HomeEmpty = () => (
  <View style={styles.emptyContainer}>
    <FileQuestionIcon size={64} color={COLORS.border} />
    <Text style={styles.emptyTitle}>No Events Found!!</Text>
  </View>
);

const HomeScreen = ({ navigation }: any) => {
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDate, setSelectedDate] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', style: 'destructive', onPress: logout },
    ]);
  };

  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      const matchesSearch = event.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === 'All' || event.category === selectedCategory;
      const matchesLocation =
        selectedLocation === 'All' || event.location.includes(selectedLocation);
      const matchesDate =
        selectedDate === 'All' || event.date.split('-')[1] === selectedDate;

      return matchesSearch && matchesCategory && matchesLocation && matchesDate;
    });
  }, [searchQuery, selectedCategory, selectedLocation, selectedDate]);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      <FlatList
        data={filteredEvents}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <EventCard
            event={item}
            onPress={() => navigation.navigate('EventDetails', { event: item })}
          />
        )}
        ListHeaderComponent={
          <HomeHeader
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            selectedLocation={selectedLocation}
            setSelectedLocation={setSelectedLocation}
            userName={user?.username || 'Guest'}
            onProfilePress={handleLogout}
          />
        }
        ListEmptyComponent={<HomeEmpty />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  listContent: {
    paddingBottom: SPACING.lg,
  },
  header: {
    padding: SPACING.md,
    paddingTop: SPACING.lg,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.lg,
    zIndex: 20,
  },
  greeting: {
    fontSize: 16,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.text,
  },
  profileButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    paddingHorizontal: SPACING.md,
    height: 52,
    elevation: 3,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    zIndex: 10,
  },
  searchInput: {
    flex: 1,
    marginLeft: SPACING.sm,
    fontSize: 16,
    color: COLORS.text,
  },
  searchActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionBtn: {
    padding: SPACING.xs,
    marginLeft: SPACING.xs,
  },
  dropdown: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    marginTop: SPACING.sm,
    padding: SPACING.md,
    elevation: 4,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  dropdownTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  dropdownList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dropdownItem: {
    paddingHorizontal: SPACING.md,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: 'rgba(226, 232, 240, 0.5)',
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  dropdownItemActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  dropdownItemText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  dropdownItemTextActive: {
    color: COLORS.white,
  },
  categoryList: {
    marginTop: SPACING.sm,
    marginHorizontal: -SPACING.md,
  },
  categoryContent: {
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.md,
  },
  categoryItem: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.white,
    marginRight: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  categoryItemActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  categoryTextActive: {
    color: COLORS.white,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
    marginTop: SPACING.md,
    marginBottom: SPACING.xs,
  },
  filterRow: {
    marginTop: SPACING.sm,
  },
  filterGroup: {
    marginBottom: SPACING.md,
  },
  subFilterList: {
    marginHorizontal: -SPACING.md,
    paddingHorizontal: SPACING.md,
  },
  filterChip: {
    paddingHorizontal: SPACING.md,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: 'rgba(226, 232, 240, 0.5)',
    marginRight: 8,
  },
  filterChipActive: {
    backgroundColor: COLORS.primary,
  },
  filterChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  filterChipTextActive: {
    color: COLORS.white,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 100,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text,
    marginTop: SPACING.md,
  },
  emptySubtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
});

export default HomeScreen;
