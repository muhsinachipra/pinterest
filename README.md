# Pinterest-Like App

This is a simple Pinterest-like app built using MongoDB, Node.js, React, and NestJS. The app allows users to like and tag pictures, follow and unfollow creators . It includes automated unit tests and a test coverage report. The project structure is split into a backend and frontend.

## Features
- **User Authentication:** Register, log in, and view user profiles.
- **Pins (Pictures):** Create, view, like, tag pins.
- **Creator (User):**  follow, and unfollow creators.
- **Automated Testing:** Unit tests and test coverage report using Jest.
- **Responsive Design:** Built with TailwindCSS for responsive styling.

## Project Structure
```
.
├── backend
│   ├── src
│   │   ├── guards        # Authentication guards
│   │   ├── pins          # Pin CRUD operations
│   │   ├── users         # User authentication and profiles
│   │   ├── utils         # Utility functions (token generation, file upload, etc.)
│   ├── test              # End-to-end tests
│   ├── .env              # Environment variables
│   └── package.json      # Backend dependencies
└── frontend
    ├── src
    │   ├── components    # UI components (Navbar, PinCard, etc.)
    │   ├── context       # Global state management (PinContext, UserContext)
    │   ├── pages         # App pages (Home, Login, PinPage, etc.)
    ├── public            # Static files (SVGs, assets)
    └── package.json      # Frontend dependencies
```

## Technologies Used
- **Frontend:**
  - React
  - Vite for development server and bundling
  - TailwindCSS for styling
- **Backend:**
  - NestJS for building scalable APIs
  - MongoDB for the database
  - JWT for authentication
  - Cloudinary for image upload and storage
- **Testing:**
  - Jest for unit tests
  - Test coverage report with Jest

## Setup Instructions

### Backend
1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables in a `.env` file:
   ```bash
   MONGO_URL=<your_mongodb_uri>
   JWT_SECRET=<your_jwt_secret>
   CLOUDINARY_CLOUD_NAME=<your_cloudinary_name>
   CLOUDINARY_API_KEY=<your_cloudinary_api_key>
   CLOUDINARY_API_SECRET=<your_cloudinary_api_secret>
   ```
4. Start the backend server:
   ```bash
   npm run start:dev
   ```

### Frontend
1. Navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend development server:
   ```bash
   npm run dev
   ```

## Running Tests
1. To run unit tests, navigate to the `backend` folder and run:
   ```bash
   npm run test
   ```
2. To generate a test coverage report:
   ```bash
   npm run test:cov
   ```

## Demo Video
A detailed walkthrough of the code and a demo of the app can be found in the Vimeo link provided below.

[Insert Vimeo Link Here]

## License
This project is licensed under the MIT License.
