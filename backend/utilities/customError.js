// Defining a CustomError class to manage errors more efficiently
class CustomError extends Error {
  // Constructor takes in a message and a status code
  constructor(message, statusCode) {
    super(message); // Pass the message to the Error base class
    this.statusCode = statusCode; // Set the status code property
  }
}

// Exporting the CustomError class for use in other files
module.exports = CustomError;