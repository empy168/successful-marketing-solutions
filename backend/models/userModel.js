// Importing necessary modules
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Defining the schema for the User model with necessary fields and their properties
const userSchema = new mongoose.Schema({
    userName:{
        type: String, // Data type: String
        required: true, // This field is mandatory
        unique: true // Each username must be unique
    },
    password:{
        type: String, // Data type: String
        required: true, // This field is mandatory
    },
    email:{
        type: String, // Data type: String
        required: true, // This field is mandatory
        unique: true // Each email must be unique
    },
    role:{
        type: String, // Data type: String
        enum: ['Admin','User'], // Allowed values: 'Admin' or 'User'
        required: true // This field is mandatory
    },
    status:{
        type: String, // Data type: String
        enum:['Pending','Active'], // Allowed values: 'Pending' or 'Active'
        default: 'Pending' // Default value: 'Pending'
    },
    setupToken:{
        type: String // Data type: String, used to store setup token, if any
    },
});

// Pre-save hook to hash the password using bcrypt if it's modified
userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
      this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

// Method to compare the given password with the hashed password in the database
userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

// Exporting the User model to be used in other modules
module.exports = mongoose.model('User', userSchema);
