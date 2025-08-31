const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Connect Database
connectDB();

const app = express();

// Import Routes
const authRoutes = require('./routes/authRouts'); // Corrected import name
const postsRoutes = require('./routes/postRoutes');
const friendRoutes = require('./routes/friendRoutes'); // Removed redundancy
const userRoutes = require('./routes/userRoutes');

// Init Middleware
app.use(express.json({ extended: false }));

// Serve static files like images
app.use('/uploads', express.static('uploads'));

// Test route
app.get('/', (req, res) => res.send('API Running'));

// Define Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/friends', friendRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
