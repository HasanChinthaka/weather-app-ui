# 🌦 Weather Project

[![Node.js Version](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen)](https://nodejs.org/)  
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)  
[![npm](https://img.shields.io/npm/v/npm?color=blue)](https://www.npmjs.com/)

This project consists of a **client** (frontend) and **server** (backend) setup.  
It integrates with **OpenWeatherMap** to fetch weather data and uses **Brevo** for email notifications.

---

## 📂 Environment File Setup

### 🖥 Client

1. Rename `example.env` → `.env`
2. Register on [OpenWeatherMap](https://openweathermap.org/) to obtain an API key.
3. Add your **OpenWeatherMap API key** to the `.env` file.

### ⚙️ Server

1. Rename `example.env` → `.env`
2. Add your **MongoDB connection link** and **project name** to the `.env` file.
3. Create an account on [Brevo](https://app.brevo.com/) and add SMTP server details to the `.env` file.
4. Set your Brevo account email as the `SENDER_MAIL`.

---

## 🚀 Running the Project

### 1️⃣ Install dependencies

Run this command **in both** the `client` and `server` folders:

````bash
npm install
````

### 2️⃣ Verify environment variables
Make sure the .env file in both the client and server folders is correctly configured.

### 3️⃣ Run the Server
From the server folder:

````bash
npm run server
````
### 4️⃣ Run the Client
From the client folder:

````bash
npm run dev
````

## 📋 Requirements

- **Node.js** (Latest LTS version recommended)
- **npm**
- **MongoDB**
- **OpenWeatherMap API key**
- **Brevo account** for SMTP setup


## 📁 Folder Structure
    project-root/
    │
    ├── client/       # Frontend application
    │   ├── src/
    │   └── .env
    │
    ├── server/       # Backend application
    │   ├── src/
    │   └── .env
    │
    └── README.md

## 📄 License
This project is licensed under the MIT License – feel free to use and modify as you wish.