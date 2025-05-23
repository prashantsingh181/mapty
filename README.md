# 🗺️ Mapty

**Mapty** is a fully responsive web app built with vanilla JavaScript, HTML, and CSS. It allows users to log workouts on an interactive map using the Leaflet.js library. Each workout is stored locally and displayed both on the map and in a workout list for quick access.

<img width="1440" alt="Mapty Preview" src="https://github.com/user-attachments/assets/e217e456-94ec-44fe-a827-e885261c9337" />


## 🚀 Live Preview

👉 [Click here to view the live app](https://prashantsingh181.github.io/mapty/)

## 🚴 Features

- 📍 **Log Workouts by Clicking on the Map**
  - Four workout types: **Running**, **Cycling**, **Weightlifting**, and **Yoga**
  - Dynamic form fields based on selected workout type
- 🗺️ **Interactive Map**
  - Marker added for each workout
  - Click on a workout to **pan the map** to its location
- 💾 **Data Persistence**
  - All workouts are saved to `localStorage` and persist across sessions
- 📱 **Responsive Design**
  - Fully functional on mobile, tablet, and desktop screens

## 🛠️ Tech Stack

- **JavaScript (ES6+)**
- **HTML & CSS**
- **[Leaflet.js](https://leafletjs.com/)** for interactive maps
- **LocalStorage API** for data persistence

## 🧠 How It Works

1. User clicks on a location on the map.
2. A form appears to register a workout.
3. On form submission:
   - Workout details are added to the list.
   - A marker is added to the map.
4. Clicking on a workout scrolls the map to that workout's location.
5. All data is saved in localStorage.
