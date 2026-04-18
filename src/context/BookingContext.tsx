import React, { createContext, useContext, useState, useEffect } from 'react';
import { storage } from '../utils/storage';

interface Booking {
  id: string;
  eventId: number;
  eventTitle: string;
  date: string;
  tickets: number;
  bookingTime: string;
  name: string;
  email: string;
  phone: string;
}

interface BookingContextType {
  bookings: Booking[];
  favorites: number[];
  isLoading: boolean;
  addBooking: (booking: Omit<Booking, 'id'>) => Promise<void>;
  cancelBooking: (id: string) => Promise<void>;
  toggleFavorite: (eventId: number) => Promise<void>;
  refreshBookings: () => Promise<void>;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    const [savedBookings, savedFavorites] = await Promise.all([
      storage.getBookings(),
      storage.getFavorites(),
    ]);
    setBookings(savedBookings);
    setFavorites(savedFavorites);
    setIsLoading(false);
  };

  const addBooking = async (bookingData: Omit<Booking, 'id'>) => {
    const updated = await storage.saveBooking(bookingData);
    if (updated) setBookings(updated);
  };

  const cancelBooking = async (id: string) => {
    const updated = await storage.deleteBooking(id);
    if (updated) setBookings(updated);
  };

  const toggleFavorite = async (eventId: number) => {
    const updated = await storage.toggleFavorite(eventId);
    if (updated) setFavorites(updated);
  };

  const refreshBookings = async () => {
    const updated = await storage.getBookings();
    setBookings(updated);
  };

  return (
    <BookingContext.Provider
      value={{
        bookings,
        favorites,
        isLoading,
        addBooking,
        cancelBooking,
        toggleFavorite,
        refreshBookings,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBookings = () => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBookings must be used within a BookingProvider');
  }
  return context;
};
