const express = require('express');
const adminController = require('../controllers/adminController');

const router = express.Router();

// POST route to create a new user
router.post('/create-user', adminController.createUser);

// GET route to fetch all users
router.get('/view-all-users', adminController.viewAllUsers);

// GET route to fetch all potential customers
router.get('/view-all-potential-customers', potentialCustomerController.getAllPotentialCustomers);

// Export the router module
module.exports = router;