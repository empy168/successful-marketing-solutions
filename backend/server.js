// Load environment variables from .env file
require('dotenv').config(); 

// Import necessary modules
const express = require('express');

// Import database configuration
const dbConfig = require('./config/dbConfig.js');

// Import custom error middlewares
const errorHandler = require('./middlewares/errorHandler');
const CustomError = require('./utilities/customError.js');

// Import routes modules
const adminRoutes = require('./routes/adminRoutes');
const potentialCustomerRoutes = require('./routes/potentialCustomerRoutes');

// Initialize Express app
const app = express();

// Root route which responds with a greeting message
app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

// Invoke database configuration
dbConfig.connectDB();

// Middleware to parse JSON bodies
app.use(express.json());

// Use the defined routes for potential customers and admin
app.use('/api/potentialCustomers', potentialCustomerRoutes);
app.use('/admin', adminRoutes);

// Middleware to handle not found routes and pass a custom error to the next middleware
app.use((req, res, next) => {
  next(new CustomError('HTTP Route Not Found', 404));
});

// Middleware to handle errors using a custom error handler
app.use(errorHandler);

// Global error handling middleware which distinguishes between custom and internal errors
app.use((err, req, res, next) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  // Log the error to the console and respond with a generic message
  console.error(err);
  return res.status(500).json({ message: 'Internal server error' });
});

// Start the server and log the port it is running on
if (require.main === module) {
  // This means the script is being executed directly, so we start the server
  const PORT = process.env.PORT;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;