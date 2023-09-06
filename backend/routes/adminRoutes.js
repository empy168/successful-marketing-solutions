const express = require('express');
const adminController = require('../controllers/adminController');

const router = express.Router();

router.post('/create-user', adminController.createUser);
router.get('/view-all-users', adminController.viewAllUsers);
router.get('/view-all-potential-customers', adminController.getAllPotentialCustomers);

module.exports = router;