# 🎯 Target75 – Smart Attendance Tracker

**Target75** is a full-stack web application built with the MERN stack that helps students keep track of their subject attendance, visualize progress, and aim for the golden 75% attendance mark. It supports marking daily attendance, undoing mistakes, and persisting data securely with authentication via Google.
Designed specifically for students — especially those using iOS devices —  who currently lack a reliable attendance tracker on the App Store. 

## ✨ Features

- 📌 Add and manage multiple subjects
- ✅ Mark attendance as Present, Absent, or No Class
- 🔁 Undo last marked attendance
- 📊 Real-time calculation of total classes and attendance %
- 🔐 Secure Google Authentication via Firebase
- 🚫 Rate limiting to prevent API abuse
- ☁️ Deployed on Render and accessible across all your devices - simply login to your Google account!

## 🔧 Tech Stack

### Frontend
- React + Vite
- TailwindCSS
- Firebase Authentication
- Axios for API calls
- React Hot Toast for notifications

### Backend
- Node.js + Express.js
- MongoDB with Mongoose
- Firebase Admin SDK for verifying tokens
- Upstash Redis (for rate limiting) and caching
- Deployed via Render

##  Try It Live
👉 [**Target75 Web App**](https://target75.onrender.com)
(Please allow a few seconds for the app to load — it's hosted on Render's free tier, which may take time to spin up.)

## 🔑 Authentication

Google Sign-In is implemented using Firebase Authentication. The backend verifies Firebase tokens using Firebase Admin SDK to secure all protected routes.
So you can use this application across all devices with your Google account!

## 📁 Project Structure (Simplified)
```text
/frontend
├── src
│   ├── components
│   ├── pages
│   ├── lib/axios.js
│   └── main.jsx

/backend
├── src
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── config/
│   └── middleware/
└── server.js


