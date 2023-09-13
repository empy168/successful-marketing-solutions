// Importing mongoose module
const mongoose = require('mongoose');

// Defining the schema for potential customers with various fields and their specifications
const potentialCustomerSchema = new mongoose.Schema({
    firstName: {
        type: String, // Data type: String
        required: true, // This field is mandatory
        trim: true // Removes whitespaces at the beginning and end
    },
    lastName: {
        type: String, // Data type: String
        required: true, // This field is mandatory
        trim: true // Removes whitespaces at the beginning and end
    },
    cellPhone: {
        type: String, // Data type: String
        required: true, // This field is mandatory
        trim: true // Removes whitespaces at the beginning and end
    },
    email: {
        type: String, // Data type: String
        required: true, // This field is mandatory
        unique: true, // Each entry must have a unique email
        match: [/.+\@.+\..+/, 'Please fill a valid email address'] // Regex to validate email format
    },
    textField: { 
        type: String, // Data type: String, this can store notes or additional texts
        require: true, // This field is mandatory
        trim: true // Removes whitespaces at the beginning and end
    },
    date:{
        type: Date, // Data type: Date
        default: Date.now // Default value: current date and time
    },
},
{
    timestamps: true // Enables automatic tracking of created and modified dates
});

// Creating a model based on the schema, which will be used to interact with the database
const PotentialCustomer = mongoose.model('PotentialCustomer', potentialCustomerSchema);

// Exporting the PotentialCustomer model to be used in other modules
module.exports = PotentialCustomer;