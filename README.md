# StudioSpace — Studio Booking Platform

StudioSpace is a modern studio booking platform where users can explore studios, view details, and book suitable spaces for their creative projects. Studio owners can manage their studio listings, while administrators can manage platform activities through role-based access control.

## 🌐 Live Website

**Live Demo:** https://studiospace-client-9p5k.vercel.app/

## ✨ Key Features

- **User Authentication:** Secure registration and login powered by Better Auth.
- **Explore Studios:** Browse available studios and discover suitable spaces.
- **Search & Filter:** Find studios based on different criteria and categories.
- **Featured Studios:** Discover recently added or featured studio listings.
- **Studio Details:** View detailed information about individual studios.
- **Studio Management:** Add, edit, and delete studio listings.
- **My Listings:** Manage your own studio listings from a dedicated page.
- **Studio Booking:** Book studios and manage personal bookings.
- **User Dashboard:** Access relevant account and platform information.
- **Profile Management:** View and update user profile information.
- **Role-Based Access Control:** Support for Admin, Sub-admin, and regular User roles.
- **Responsive Design:** Optimized for desktop, tablet, and mobile devices.
- **Dark & Light Mode:** Switch between different visual themes.

## 🛠️ Technologies Used

### Frontend
- Next.js
- React.js
- JavaScript
- Tailwind CSS
- React Icons
- React Toastify
- Next Themes

### Authentication
- Better Auth
- JWT Authentication
- Role-Based Access Control (RBAC)

### Backend & Database
- Node.js
- Express.js
- MongoDB

### Deployment
- Vercel — Frontend Hosting
- Render — Backend Hosting
- MongoDB Atlas — Database Hosting

## 📦 Installation & Setup

Follow these steps to run the client application locally.

### 1. Clone the Repository

```bash
git clone https://github.com/Ahbab2006/studiospace-client
```

### 2. Navigate to the Project Directory

```bash
cd studiospace-client
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env.local` file in the root directory and add the following variables:

```env
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=your_better_auth_secret
MONGODB_URI=your_mongodb_connection_string
NEXT_PUBLIC_API_URL=http://localhost:5000/api
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

**Important:** Replace the placeholder values with your actual credentials. Never commit your environment variables or secret credentials to GitHub.

### 5. Start the Development Server

```bash
npm run dev
```

Open your browser and visit:

```text
http://localhost:3000
```

## 🔐 User Roles & Permissions

StudioSpace uses role-based access control to manage platform access.

| Role | Access |
|---|---|
| Admin | Full administrative access |
| Sub-admin | Access to assigned permissions |
| User | Browse studios and manage personal bookings |

## 📁 Project Structure

```text
studiospace-client/
│
├── public/
│
├── src/
│   ├── app/
│   │   ├── api/
│   │   ├── login/
│   │   ├── register/
│   │   ├── dashboard/
│   │   ├── my-listings/
│   │   ├── my-bookings/
│   │   ├── add-studio/
│   │   ├── edit-studio/
│   │   └── page.js
│   │
│   ├── components/
│   ├── lib/
│   └── ...
│
├── .env.local
├── package.json
└── README.md
```

## 🔗 Backend Repository

The backend is maintained in a separate repository and provides REST API services for studio management, bookings, and database operations.

**Backend:** Express.js + MongoDB

## 🎯 Project Goal

The goal of StudioSpace is to make studio discovery and booking easier by providing a centralized platform for users, studio owners, and administrators.

---

**Developed with ❤️ using Next.js, React, Node.js, Express.js, and MongoDB.**