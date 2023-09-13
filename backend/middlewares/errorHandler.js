const CustomError = require('../utilities/customError.js');

// ErrorHandler Middleware function to handle errors globally across the application
function errorHandler(err, req, res, next) {
    // Creating a copy of the error object to potentially customize it further
    let customError = { ...err };

    // If the error is a validation error, create a new CustomError instance with a 400 status code
    if (err.name === 'ValidationError') {
        customError = new CustomError(err.message, 400);
    }

    // Determine the status code for the response, defaulting to 500 (Internal Server Error) if not specified
    const statusCode = customError.statusCode || 500;

    // Log the error message and stack trace to the console
    console.error(customError.message, err.stack);

    // Send the error response, including the stack trace only in non-production environments
    res.status(statusCode).json({
        success: false,
        message: customError.message || 'Server Error',
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
}

// Export the errorHandler middleware for use in other modules
module.exports = errorHandler;
