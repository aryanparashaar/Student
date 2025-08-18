// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const studentRoutes = require('./routes/studentRoutes');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); // to serve resume files

// Connect to MongoDB
mongoose.connect('mongodb+srv://aryanparashaar:studentprofile@cluster0.wtxmguy.mongodb.net',)
.then(() => console.log('✅ Database connected to MongoDB'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// API routes
app.use('/api/students', studentRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});

const adminRoutes = require('./routes/adminRoutes');
app.use('/api/admin', adminRoutes);


app.get('/', (req, res) => {
  res.send('Student Registration Backend is Running ✅');
});
