const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5001;

// Connect to Database
connectDB();

const app = express();

// Initialize Middleware
app.use(cors());
app.use(express.json());

// --- Corrected API Route Definitions ---
app.use('/api/admins', require('./routes/adminRoutes'));
app.use('/api/blogs', require('./routes/blogRoutes'));
app.use('/api/publications', require('./routes/publicationRoutes'));
app.use('/api/events', require('./routes/eventRoutes'));

app.get('/', (req, res) => {
  res.send('Criminal Law Research Centre API is running!');
});

// --- NEW: Error Handling Middleware ---
// This should be the LAST piece of middleware.
// It will catch errors from express-async-handler.
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};
app.use(errorHandler);


app.listen(PORT, () => console.log(`Server started on port ${PORT}`));