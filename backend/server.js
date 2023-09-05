const express = require('express');

const app = express();
const PORT = 5000;

app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

const mongoose = require('mongoose');

mongoose
  .connect('mongodb://127.0.0.1:27017/smsDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Could not connect to MongoDB', err));

app.use(express.json());

const potentialCustomerRoutes = require('./routes/potentialCustomerRoutes');
app.use('/api/potentialCustomers', potentialCustomerRoutes);

//non-existing routes
app.use((req, res, next) => {
  next(new CustomError('HTTP Route Not Found', 404));
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  
  // Log the error details (you might want to use a logging library/module for this in a real-world app)
  console.error(err);

  // If the error is not an instance of CustomError, send a generic error message
  return res.status(500).json({ message: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Make sure to import the CustomError class
const CustomError = require('./utilities/customError.js'); // Adjust the path to where your CustomError.js file is located
