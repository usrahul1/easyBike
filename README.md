# 🚲 EasyBike

**EasyBike** is a peer-to-peer bike rental web app. It allows students to list their bikes, discover available bikes near them, send rental requests, and communicate and call in real time with bike owners.

Hosted on:
- [https://easy-bike.vercel.app](https://easy-bike.vercel.app)
---

## ✨ Features

- 🔐 **Authentication** – Sign up and log in with Firebase Auth
- 🏍️ **List & Rent Bikes** – Users can list their bikes and rent others
- 💬 **Real-time Chat & Call** – Contact bike owners via chat or audio call using Socket.IO
- 📈 **Admin Dashboard** – See rental statistics, user locations, and demographics
- 🧾 **Rental History** – View past and current bike rentals
- 📦 **Responsive UI** – Optimized for desktop and mobile

---

## 🛠️ Tech Stack

### Frontend
- `React` + `TypeScript`
- `TailwindCSS` + `DaisyUI`
- `Vite` for fast builds
- `Socket.IO-client` for real-time chat
- `Axios` for API calls
- `React Router` for navigation

### Backend
- `Express.js` with `Node.js`
- `Firebase Admin SDK` for authentication and user data
- `MongoDB` with `Mongoose`
- `Socket.IO` for real-time features
- `Render.com` for hosting

---

## 📁 Environment Variables Setup

To run **EasyBike** locally or deploy it to Vercel/Render, you need to create `.env` files for both frontend and backend.

---

### ENV structure

### 📦 Frontend (`client/.env`)

> Used with **Vite + React**

```env
VITE_FIREBASE_API_KEY=YOUR_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN=YOUR_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID=YOUR_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET=YOUR_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID=YOUR_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID=YOUR_FIREBASE_APP_ID
VITE_FIREBASE_MEASUREMENT_ID=YOUR_FIREBASE_MEASUREMENT_ID

VITE_API_URL=http://localhost:3000/api
# or VITE_API_URL=https://your-backend-host/api when deployed
```

### 📦 Backend (`src/.env`)

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string

FIREBASE_TYPE=service_account
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY_ID=your_private_key_id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_KEY_CONTENT\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=your_firebase_client_email
FIREBASE_CLIENT_ID=your_firebase_client_id
FIREBASE_AUTH_URI=https://accounts.google.com/o/oauth2/auth
FIREBASE_TOKEN_URI=https://oauth2.googleapis.com/token
FIREBASE_AUTH_PROVIDER_CERT_URL=https://www.googleapis.com/oauth2/v1/certs
FIREBASE_CLIENT_CERT_URL=https://www.googleapis.com/robot/v1/metadata/x509/your_email_encoded
FIREBASE_UNIVERSE_DOMAIN=googleapis.com

```



## 📦 How to Run Locally

### Backend (ExpressJS)

```bash
cd backend
npm i
npm run dev
```
Frontend (React with TS)
```bash
cd frontend
npm install
npm run dev
```


## 👨‍💻 Contributions

 **Sai Rahul Urumu**  
  *Full Stack Developer – Implemented everything*  
  [LinkedIn Profile](https://www.linkedin.com/in/usrahul)


