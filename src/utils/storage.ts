import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  USER_SESSION: '@user_session',
  BOOKINGS: '@bookings',
  FAVORITES: '@favorites',
};

export const storage = {
  //Here saving the Sessions//
  saveSession: async (user: any) => {
    try {
      await AsyncStorage.setItem(KEYS.USER_SESSION, JSON.stringify(user));
    } catch (e) {
      console.error('Error saving session', e);
    }
  },
  getSession: async () => {
    try {
      const session = await AsyncStorage.getItem(KEYS.USER_SESSION);
      return session ? JSON.parse(session) : null;
    } catch (e) {
      console.error('Error getting session', e);
      return null;
    }
  },
  clearSession: async () => {
    try {
      await AsyncStorage.removeItem(KEYS.USER_SESSION);
    } catch (e) {
      console.error('Error clearing session', e);
    }
  },

  //Here saving the Bookings//
  saveBooking: async (booking: any) => {
    try {
      const existing = await storage.getBookings();
      const updated = [...existing, { ...booking, id: Date.now().toString() }];
      await AsyncStorage.setItem(KEYS.BOOKINGS, JSON.stringify(updated));
      return updated;
    } catch (e) {
      console.error('Error saving booking', e);
      return null;
    }
  },
  getBookings: async () => {
    try {
      const bookings = await AsyncStorage.getItem(KEYS.BOOKINGS);
      return bookings ? JSON.parse(bookings) : [];
    } catch (e) {
      console.error('Error getting bookings', e);
      return [];
    }
  },
  deleteBooking: async (id: string) => {
    try {
      const existing = await storage.getBookings();
      const updated = existing.filter((b: any) => b.id !== id);
      await AsyncStorage.setItem(KEYS.BOOKINGS, JSON.stringify(updated));
      return updated;
    } catch (e) {
      console.error('Error deleting booking', e);
      return null;
    }
  },

  //Here saving the Favorites//
  toggleFavorite: async (eventId: number) => {
    try {
      const favorites = await storage.getFavorites();
      let updated;
      if (favorites.includes(eventId)) {
        updated = favorites.filter((id: number) => id !== eventId);
      } else {
        updated = [...favorites, eventId];
      }
      await AsyncStorage.setItem(KEYS.FAVORITES, JSON.stringify(updated));
      return updated;
    } catch (e) {
      console.error('Error toggling favorite', e);
      return null;
    }
  },
  getFavorites: async () => {
    try {
      const favorites = await AsyncStorage.getItem(KEYS.FAVORITES);
      return favorites ? JSON.parse(favorites) : [];
    } catch (e) {
      console.error('Error getting favorites', e);
      return [];
    }
  },
};
