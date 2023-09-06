const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('../models/userModel');

exports.createUser = async (req, res, next) => {
  try {
    const { email, role } = req.body;

    // Create a new user with a pending status
    const newUser = await User.create({ email, role, status: 'pending' });

    // Create a setup token
    const setupToken = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Save the setup token in the user's document
    newUser.setupToken = setupToken;
    await newUser.save({ validateBeforeSave: false });

    // Send an email to the user with a link to set up their account (configure nodemailer transporter with your email credentials)
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'yourEmail@gmail.com', // your email
        pass: 'yourEmailPassword', // your email password
      },
    });

    let info = await transporter.sendMail({
      from: '"SMS Admin" <yourEmail@gmail.com>', // sender address
      to: email, // list of receivers
      subject: "Set Up Your Account", // Subject line
      text: `Click the link to set up your account: http://localhost:5000/setup-account?token=${setupToken}`, // plain text body
    });

    res.status(200).json({
      status: 'success',
      message: 'Setup link sent to user',
    });
  } catch (error) {
    next(new CustomError(error.message, 400));
  }
};


//View all users
exports.viewAllUsers = async (req, res, next) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      next(new CustomError(error.message, 400));
    }
  };
  