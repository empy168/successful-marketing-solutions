const CustomError = require('./customError');

function errorMiddleware(err, req, res, next) {
    let customError = { ...err };

    if (err.name === 'ValidationError') {
        customError = new CustomError(err.message, 400);
    }

    res.status(customError.statusCode || 500).json({
        success: false,
        message: customError.message || 'Server Error',
    });
}

module.exports = errorMiddleware;
