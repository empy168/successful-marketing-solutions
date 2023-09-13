// Import nodemailer package for email sending
const nodemailer = require('nodemailer');

// Load environment variables from .env file
require('dotenv').config();

// Configure nodemailer transport using Gmail service and environment variables for authentication
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Email username from .env file
    pass: process.env.EMAIL_PASS,  // Email password from .env file
  },
});

// Export the configured transporter for use in other modules
module.exports = transporter;
