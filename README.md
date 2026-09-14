# 🌍 Wanderlust

A full-stack travel listing web application where users can discover, create, edit, and review travel destinations.

🔗 **Live Demo:** [Wanderlust](https://wanderlust-8ojh.onrender.com)

---

## 📌 About the Project

**Wanderlust** is a full-stack travel accommodation/listing platform built using **Node.js, Express.js, MongoDB, and EJS**.

The application allows users to:

* 👤 Create an account and log in
* 🏡 Browse travel listings
* ➕ Create new listings
* ✏️ Edit and update listings
* 🗑️ Delete listings
* ⭐ Add reviews and ratings
* 🔐 Authenticate users securely
* ☁️ Upload and manage listing images
* 💬 Display success and error messages
* 📱 Browse listings through a responsive interface

The project follows an MVC-style structure to keep the application organized and maintainable.

---

## 🚀 Features

### 👤 User Authentication

* User registration and login
* Session-based authentication
* Passport.js with Local Strategy
* Protected routes for authenticated users

### 🏡 Listing Management

* Create travel listings
* View individual listings
* Edit existing listings
* Delete listings
* Store listing information in MongoDB

### ⭐ Reviews

* Add reviews to listings
* Display reviews
* Delete reviews
* Rating support

### ☁️ Image Upload

* Image upload using Multer
* Cloudinary integration for image storage

### 🔒 Security & Validation

* Server-side validation using Joi
* Authentication middleware
* Session management
* Flash messages for user feedback
* Custom error handling

---

## 🛠️ Tech Stack

### Frontend

* HTML5
* CSS3
* EJS
* EJS-Mate
* Bootstrap

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose
* MongoDB Atlas

### Authentication

* Passport.js
* Passport Local
* Passport Local Mongoose
* Express Session

### Image Storage

* Cloudinary
* Multer
* Multer Storage Cloudinary

### Other Technologies

* Axios
* Joi
* Method Override
* Connect Flash
* Connect Mongo

---

## 📂 Project Structure

```text
project2/
│
├── controllers/        # Application controllers
├── init/               # Database initialization / seed files
├── models/             # Mongoose database models
├── public/             # CSS, JavaScript and static assets
├── routes/             # Express routes
├── utils/              # Utility functions and custom errors
├── views/              # EJS templates
│
├── app.js              # Main application entry point
├── cloudConfig.js      # Cloudinary configuration
├── middleware.js       # Custom middleware
├── schema.js           # Joi validation schemas
├── package.json        # Project dependencies and scripts
├── package-lock.json   # Dependency lock file
└── .gitignore          # Ignored files and folders
```

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/Ananya12345678987/project2.git
```

### 2. Navigate into the project

```bash
cd project2
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env` file in the project root.

```env
ATLASDB_URL=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET=your_cloudinary_api_secret
```

> Never commit your `.env` file or expose database and API credentials publicly.

### 5. Start the application

```bash
npm start
```

The application runs locally on:

```text
http://localhost:8080
```

---

## 🌐 Deployment

The application is deployed using **Render**.

🔗 **Live Application:**
https://wanderlust-8ojh.onrender.com

The application uses environment variables on the deployment platform for database and cloud-storage configuration.

---

## 🔐 Environment Variables

The application requires environment variables for services such as:

| Variable                | Purpose                  |
| ----------------------- | ------------------------ |
| `ATLASDB_URL`           | MongoDB Atlas connection |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name    |
| `CLOUDINARY_KEY`        | Cloudinary API key       |
| `CLOUDINARY_SECRET`     | Cloudinary API secret    |

Make sure these values are configured locally in `.env` and in the deployment platform's environment settings.

---

## 🎯 Learning Outcomes

This project demonstrates practical experience with:

* Full-stack web development
* RESTful routing
* MVC architecture
* CRUD operations
* MongoDB database integration
* User authentication and authorization
* Session management
* Image uploading
* Cloudinary integration
* Form validation
* Error handling
* Deployment using Render
* Git and GitHub workflow

---

## 🔮 Future Improvements

Possible future enhancements include:

* 🗺️ Interactive maps and location search
* 🔎 Advanced listing search and filtering
* ❤️ Wishlist/favorites
* 📍 Location-based recommendations
* 📱 Improved mobile responsiveness
* 💳 Online booking and payment
* 🔔 User notifications
* 👤 Enhanced user profiles

---

## 👩‍💻 Author

**Ananya Gowda**

GitHub: [@Ananya12345678987](https://github.com/Ananya12345678987)

---

## ⭐ Support

If you find this project useful, consider giving the repository a ⭐ on GitHub!
