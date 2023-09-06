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
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address']
    },
    textField: { // This could be notes or any other additional text.
        type: String,
        require: true,
        trim: true
    },
    date:{
        type: Date,
        default: Date.now
    },
},
{
    timestamps: true
});

const PotentialCustomer = mongoose.model('PotentialCustomer', potentialCustomerSchema);

module.exports = PotentialCustomer;
