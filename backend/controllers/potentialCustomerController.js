const PotentialCustomer = require('../models/PotentialCustomerModel');
const CustomError = require('../utilities/customError');

exports.getAllPotentialCustomers = async (req, res, next) => {
    try {
        const potentialCustomers = await PotentialCustomer.find();
        res.status(200).json(potentialCustomers);
    } catch (err) {
        next(new CustomError(err.message, 500));
    }
};

exports.createPotentialCustomer = async (req, res, next) => {
    try {
        const newCustomer = await PotentialCustomer.create(req.body);
        res.status(201).json(newCustomer);
    } catch (err) {
        next(new CustomError(err.message, 400));
    }
};