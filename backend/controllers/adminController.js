const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');
const CustomError = require('../utilities/customError');
const transporter = require('../nodemailerConfig'); // Importing the nodemailer transporter

// Function to create a new user and send a setup link via email
exports.createUser = async (req, res, next) => {
  try {
    const { email, role } = req.body;

    const newUser = await User.create({ email, role, status: 'pending' });

    const setupToken = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    newUser.setupToken = setupToken;
    await newUser.save({ validateBeforeSave: false });

    // Sending the setup link to the user via email
    let info = await transporter.sendMail({
      from: '"SMS Admin" <youremail@gmail.com>', // Make sure to replace "youremail@gmail.com" with your actual email address
      to: email,
      subject: "Set Up Your Account",
      text: `Click the link to set up your account: http://localhost:5000/setup-account?token=${setupToken}`,
    });

    res.status(200).json({
      status: 'success',
      message: 'Setup link sent to user',
    });
  } catch (error) {
    next(new CustomError(error.message, 500));
  }
};

// Function to retrieve and send all users data
exports.viewAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    next(new CustomError(error.message, 500));
  }
};

// User Registration and login functionalities

// User Setup - where users set their username and password using the token from the setup link
exports.setupUser = async (req, res, next) => {
  try {
    const { setupToken, username, password } = req.body;

    // Verify the token and extract user ID
    const decodedToken = jwt.verify(setupToken, process.env.JWT_SECRET);

    // Find user by ID and update their username and password
    const user = await User.findById(decodedToken.userId);
    if (!user) {
      throw new CustomError('User not found', 400);
    }

    user.userName = username;
    user.password = password;
    user.status = 'Active';

    await user.save();

    res.status(200).json({
      status: 'success',
      message: 'User set up successfully',
    });
  } catch (error) {
    next(new CustomError(error.message, error.statusCode || 400));
  }
};

// User Login - where users can login to their account post setup
exports.userLogin = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // Find user by username and check password
    const user = await User.findOne({ userName: username });
    if (!user || !(await user.comparePassword(password))) {
      throw new CustomError('Invalid username or password', 400);
    }

    // Generate JWT token for the session
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({
      status: 'success',
      token,
    });
  } catch (error) {
    next(new CustomError(error.message, error.statusCode || 400));
  }
};
