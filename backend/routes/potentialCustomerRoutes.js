const express = require('express');

// Importing the required methods from the potential customer controller
const {
    getAllPotentialCustomers,
    createPotentialCustomer
} = require('../controllers/potentialCustomerController');

const router = express.Router();

// Route to get all potential customers
router.get('/', getAllPotentialCustomers);

// Route to create a new potential customer
router.post('/', createPotentialCustomer);

// Exporting the router module
module.exports = router;