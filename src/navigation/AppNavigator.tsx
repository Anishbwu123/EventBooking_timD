import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Home, Calendar } from 'lucide-react-native';
import { useAuth } from '../context/AuthContext';
import { COLORS } from '../theme/theme';

// Screens

import MyBookingsScreen from '../screens/MyBookingsScreen';
import HomeScreen from '../screens/HomeScreen';
import EventDetailsScreen from '../screens/EventDetailsScreen';
import BookingScreen from '../screens/BookingScreen';
import LoginScreen from '../screens/LoginScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="HomeScreen" component={HomeScreen} />
    <Stack.Screen name="EventDetails" component={EventDetailsScreen} />
    <Stack.Screen name="Booking" component={BookingScreen} />
  </Stack.Navigator>
);

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarHideOnKeyboard: true,
      tabBarIcon: ({ color, size }) => {
        if (route.name === 'Home') return <Home size={size} color={color} />;
        if (route.name === 'MyBookings') return <Calendar size={size} color={color} />;
        return null;
      },
      tabBarActiveTintColor: COLORS.primary,
      tabBarInactiveTintColor: COLORS.textSecondary,
      tabBarStyle: {
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
        backgroundColor: COLORS.white,
        elevation: 8,
        minHeight: 60,
      },
    })}
  >
    <Tab.Screen
      name="Home"
      component={HomeStack}
      options={{ title: 'Events' }}
    />
    <Tab.Screen
      name="MyBookings"
      component={MyBookingsScreen}
      options={{ title: 'My Bookings' }}
    />
  </Tab.Navigator>
);

const AppNavigator = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) return null; // Or a splash screen

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          <Stack.Screen name="Auth" component={LoginScreen} />
        ) : (
          <Stack.Screen name="Main" component={TabNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
