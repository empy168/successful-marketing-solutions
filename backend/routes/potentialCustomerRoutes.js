const express = require('express');
const {
    getAllPotentialCustomers,
    createPotentialCustomer
} = require('../controllers/potentialCustomerController');

const router = express.Router();

router.get('/', getAllPotentialCustomers);
router.post('/', createPotentialCustomer);

module.exports = router;