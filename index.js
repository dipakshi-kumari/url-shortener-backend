const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config/config');
const userRoutes = require('./routes/user');
const urlRoutes = require('./routes/url');
const swaggerSetup = require('./swagger/swagger');


const app = express();

// Middleware
app.use(bodyParser.json());
swaggerSetup(app);

// Connect to MongoDB
mongoose.connect(config.dbConnectionString)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/urls', urlRoutes);

// Start server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
