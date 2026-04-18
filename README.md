

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


## Data Structure (Local JSON)

The app uses static JSON files to simulate backend responses. These are located in the `src/data` folder.

###  Users (`users.json`)

Used for local authentication:

```json
[
  {
    "id": 1,
    "username": "john",
    "password": "12345"
  }
]
```

**Fields:**

* `id` → unique identifier
* `username` → login username
* `password` → plain text (for demo purposes only)

---

###  Events (`events.json`)

Contains all event-related data displayed in the app:

```json
[
  {
    "id": 1,
    "title": "Tech Conference 2025",
    "date": "2025-10-10",
    "time": "10:00",
    "location": "Kolkata Convention Center",
    "description": "A full-day event covering AI, Web, and Mobile tech.",
    "price": 500,
    "image": "https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg",
    "category": "Technology"
  }
]
```

**Fields:**

* `id` → unique event identifier
* `title` → event name
* `date` & `time` → schedule
* `location` → venue details
* `description` → event summary
* `price` → ticket cost
* `image` → remote image URL (used in UI)
* `category` → used for filtering events


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
