const mongoose = require('mongoose');

const potentialCustomerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    cellPhone: {
        type: String,
        required: true,
        trim: true
    },
    textField: { // This could be notes or any other additional text.
        type: String,
        trim: true
    },
    // ... Add any other fields as needed
});

const PotentialCustomer = mongoose.model('PotentialCustomer', potentialCustomerSchema);

module.exports = PotentialCustomer;
