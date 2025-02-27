const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const propertyRoutes = require('./routes/PropertyRoutes');
const emailRoutes = require('./routes/emailRoutes');
const profileRoutes = require('./routes/profileRoutes');
const accountSettingsRoutes = require('./routes/accountSettingsRoutes'); // New route
const passwordChangeRoutes = require('./routes/passwordChangeRoutes'); // New route
const contactRoutes = require('./routes/contactRoutes'); // Import contact routes
const errorHandler = require('./middlewares/errorHandler');

dotenv.config();
connectDB(); // Connect to MongoDB

const app = express();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/emails', emailRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/account-settings', accountSettingsRoutes); // New route for account settings
app.use('/api/password-change', passwordChangeRoutes); // New route for password change
app.use('/api/contact', contactRoutes); // Add contact routes

// Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));