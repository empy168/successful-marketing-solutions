const transporter = require('../config/nodemailerConfig');
const PotentialCustomer = require('../models/PotentialCustomerModel');
const CustomError = require('../utilities/customError');

// Initialize nodemailer transporter to handle email sending
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // This should be the email address you use to send emails
    pass: process.env.EMAIL_PASS, // This should be the password for the email address you are using to send emails
  },
});

// Function to get all potential customers from the database
exports.getAllPotentialCustomers = async (req, res, next) => {
  try {
    // Fetch all potential customers from the database
    const potentialCustomers = await PotentialCustomer.find();
    // Sending a successful response back to the client with the list of customers
    res.status(200).json(potentialCustomers);
  } catch (err) {
    // Handling any errors that occur and passing them to the next middleware
    next(new CustomError(err.message, 500));
  }
};

// Function to create a new potential customer in the database
exports.createPotentialCustomer = async (req, res, next) => {
  try {
    // Creating a new potential customer in the database
    const newCustomer = await PotentialCustomer.create(req.body);

    // Sending an acknowledgement email to the customer's email address
    await sendAcknowledgementEmail(newCustomer.email);

    // Sending a successful response back to the client with the details of the new customer
    res.status(201).json(newCustomer);
  } catch (err) {
    // Handling any errors that occur and passing them to the next middleware
    next(new CustomError(err.message, 400));
  }
};

// Helper function to send acknowledgment email
async function sendAcknowledgementEmail(email) {
  try {
    // Sending an email using the nodemailer transporter we initialized earlier
    await transporter.sendMail({
      from: '"Your Company" <yourcompanyemail@gmail.com>', // Sender email address (replace with your company's email)
      to: email, // Recipient email address (the customer's email)
      subject: "Thank you for your submission", // Subject of the email
      text: "Thank you for submitting your details. We will get back to you shortly.", // Body of the email
    });
  } catch (error) {
    // Logging any errors that occur during the email sending process
    console.error('Failed to send acknowledgment email:', error);
  }
}

// User Dashboard function to fetch and display potential customers on the dashboard
exports.getDashboard = async (req, res, next) => {
  try {
    // Fetch list of all potential customers
    const potentialCustomers = await PotentialCustomer.find();
    // Sending a successful response back to the client with the list of potential customers
    res.status(200).json({
      status: 'success',
      data: potentialCustomers,
    });
  } catch (error) {
    // Handling any errors that occur and passing them to the next middleware
    next(new CustomError(error.message, error.statusCode || 400));
  }
};

// Function to mark a potential customer as followed up
exports.markAsFollowedUp = async (req, res, next) => {
  try {
    // Fetching the customer ID from the request parameters
    const { id } = req.params;

    // Updating the customer's followedUp status in the database
    const potentialCustomer = await PotentialCustomer.findByIdAndUpdate(id, { followedUp: true }, { new: true });
    if (!potentialCustomer) {
      // Handling the case where the customer is not found in the database
      throw new CustomError('Potential customer not found', 400);
    }

    // Sending a successful response back to the client with the updated customer details
    res.status(200).json({
      status: 'success',
      data: potentialCustomer,
    });
  } catch (error) {
    // Handling any errors that occur and passing them to the next middleware
    next(new CustomError(error.message, error.statusCode || 400));
  }
};

// Function to delete a potential customer from the database
exports.deletePotentialCustomer = async (req, res, next) => {
  try {
    // Fetching the customer ID from the request parameters
    const { id } = req.params;

    // Deleting the customer from the database
    await PotentialCustomer.findByIdAndDelete(id);

    // Sending a successful response back to the client indicating the customer has been deleted
    res.status(200).json({
      status: 'success',
      message: 'Potential customer deleted',
    });
  } catch (error) {
    // Handling any errors that occur and passing them to the next middleware
    next(new CustomError(error.message, error.statusCode || 400));
  }
};
