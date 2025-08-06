// server.js
const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Connect Database
connectDB();

const app = express();

// Init Middleware
app.use(express.json({ extended: false }));

app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => res.send('API Running'));

// Define Routes
const authRoutes = require('./routes/authRouts'); // <-- Corrected typo
const postsRoutes = require('./routes/postRoutes'); // <-- Added for new routes

app.use('/api/auth', authRoutes);
app.use('/api/posts', postsRoutes); // <-- Added for new routes

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

