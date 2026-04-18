

---

# Event Booking App (React Native)

A React Native application built to simulate a real-world event booking flow, focusing on clean architecture, state management, and user experience.
The app uses local data and storage to replicate backend-driven behavior.

---

## Overview

This project demonstrates how a complete booking system can be implemented on the frontend, including authentication, event discovery, and booking management — all without relying on external APIs.

The goal was to focus on **code structure, usability, and scalability**, keeping the implementation practical and production-oriented.

---

## Key Features

- Local authentication using structured JSON data
- Persistent login using AsyncStorage
- Event listing with search and category filtering
- Detailed event screens with structured UI
- Booking system with form validation
- Booking management (view and cancel bookings)
- Favorites functionality for quick access
- Consistent UI with reusable components

---

## Tech Stack

- **React Native (CLI)**
- **TypeScript**
- **React Navigation (Stack + Bottom Tabs)**
- **Context API (state management)**
- **AsyncStorage (local persistence)**
- **Formik + Yup (form handling & validation)**

UI & utilities:

- react-native-linear-gradient
- react-native-vector-icons
- react-native-toast-message

---

## Project Structure

```text id="dcz1xv"
src/
├── assets/         # images and static assets
├── components/     # reusable UI components
├── context/        # global state (auth, bookings)
├── data/           # static JSON (users, events)
├── navigation/     # navigation setup
├── screens/        # app screens
├── theme/          # design system
└── utils/          # helpers and storage logic
```

---

## Demo Credentials

| Username | Password |
| -------- | -------- |
| john     | 12345    |
| alice    | qwerty   |

---

## Running the Project

```bash id="v96syq"
npm install
npm start
npm run android
```

---

## What this project highlights

- Ability to build a **complete feature flow** (auth → browse → book → manage)
- Strong understanding of **React Native architecture and navigation**
- Experience with **form handling and validation**
- Clean separation of concerns using **modular structure**
- Handling of **local persistence and session management**
- Focus on **user experience and maintainable UI components**

---

## About

This project was built as part of hands-on practice to strengthen real-world React Native development skills, with emphasis on writing maintainable code and building scalable UI patterns.
