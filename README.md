# BookMySeat

<div align="center">

![BookMySeat](https://img.shields.io/badge/BookMySeat-Movie%20Booking%20Platform-111827?style=for-the-badge)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=000)
![Vite](https://img.shields.io/badge/Vite-Fast%20Frontend-646CFF?style=for-the-badge&logo=vite&logoColor=fff)
![Node.js](https://img.shields.io/badge/Node.js-Express%20API-339933?style=for-the-badge&logo=nodedotjs&logoColor=fff)

</div>

BookMySeat is a full-stack cinema ticket booking platform with a React client and an Express + MongoDB backend. It supports user authentication, theatre and show browsing, seat selection, Razorpay payments, admin content management, and ticket generation.

## Highlights

- Modern React 19 + Vite frontend with route-based booking flows.
- Firebase Authentication with token-protected API calls.
- Admin dashboard for movies, theatres, screens, shows, and banners.
- Seat locking, booking confirmation, and payment verification.
- Razorpay integration for payments.
- Ticket download support with PDF and QR code generation.
- Cloudinary-based media uploads for banners and movie assets.

## Tech Stack

### Frontend

- React 19
- Vite
- Tailwind CSS 4
- React Router DOM
- Axios
- Firebase Auth
- React Hot Toast
- React Responsive Carousel
- Lucide React and React Icons

### Backend

- Node.js
- Express 5
- MongoDB and Mongoose
- Firebase Admin
- Cloudinary
- Razorpay
- Multer
- PDFKit
- QRCode
- CORS

## Project Structure

```text
BookMySeat/
├── client/
│   ├── src/
│   │   ├── AdminPages/
│   │   ├── components/
│   │   ├── config/
│   │   ├── contexts/
│   │   ├── pages/
│   │   └── services/
│   ├── package.json
│   └── vercel.json
└── server/
	├── config/
	├── controllers/
	├── middleware/
	├── models/
	├── routes/
	├── utils/
	└── index.js
```

## Core Features

### User Experience

- Browse featured banners and currently showing movies.
- View movie details, theatre listings, and available seats.
- Sign in with Firebase before booking.
- Complete bookings through Razorpay.
- Download booking tickets after confirmation.

### Admin Experience

- Add and manage movies.
- Add and manage theatres.
- Create screens and shows.
- Upload and remove banners.
- Manage the content that powers the public booking flow.

## Getting Started

### Prerequisites

- Node.js 18 or newer
- MongoDB database
- Firebase project
- Cloudinary account
- Razorpay account

### Clone the repository

```bash
git clone https://github.com/Vivek-Bisht7/BookMySeat.git
cd BookMySeat
```

### Install dependencies

Install the client and server dependencies separately.

```bash
cd client
npm install

cd ../server
npm install
```

## Environment Variables

### Client: `client/.env`

```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

### Server: `server/.env`

```env
PORT=5000
FRONTEND_URL=http://localhost:5173
MONGODB_URI=your_mongodb_connection_string
CLOUDINARY_NAME=your_cloudinary_cloud_name
CLOUDINARY_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET=your_cloudinary_api_secret
FIREBASE_SERVICE_ACCOUNT={"type":"service_account",...}
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

## Running Locally

### Start the backend

```bash
cd server
node index.js
```

The server exposes a health endpoint at `/health`.

### Start the frontend

```bash
cd client
npm run dev
```

Open the local Vite URL shown in the terminal, usually `http://localhost:5173`.

## Available Client Scripts

From the `client/` directory:

```bash
npm run dev      # Start the development server
npm run build    # Build the production bundle
npm run lint     # Run ESLint
npm run preview  # Preview the production build locally
```

## API Overview

The backend is organized by feature modules and exposes routes under `/api`.

- `/api/user` - user and auth-related operations
- `/api/movie` - movie management and retrieval
- `/api/theatre` - theatre management
- `/api/screen` - screen management
- `/api/show` - show management
- `/api/banner` - banner management
- `/api/booking` - booking, payment, ticket, and seat-related actions

## Deployment Notes

- The client is Vercel-ready through `client/vercel.json`.
- Make sure `VITE_API_BASE_URL` points to the deployed backend API.
- Set `FRONTEND_URL` on the server so CORS allows the deployed client origin.
- Keep Firebase, Cloudinary, MongoDB, and Razorpay credentials configured in the deployment environment.

## Suggested Usage Flow

1. Sign in with Firebase.
2. Browse movies and choose a theatre.
3. Select seats and create a payment order.
4. Complete payment through Razorpay.
5. Verify the booking and download the ticket.

## Contributing

If you want to extend the project:

1. Create a feature branch.
2. Make focused changes in either `client/` or `server/`.
3. Run the relevant client or server checks.
4. Open a pull request with a clear summary and screenshots if the UI changed.

## Notes

- The server package currently does not define a dedicated `start` script, so `node index.js` is the default launch command.
- Add a license file if you plan to publish the repository publicly.