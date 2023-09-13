const request = require('supertest');
const express = require('express');
const CustomError = require('../utilities/customError');
const errorHandler = require('../middlewares/errorHandler');
const expect = require('chai').expect;

describe('Error Handler Middleware', function () {
  let app;

  beforeEach(function () {
    app = express();
    app.use((req, res, next) => {
      let error = new Error('Validation Error Message');
      error.name = 'ValidationError';
      next(error);
    });
    app.use(errorHandler);
  });

  it('should handle ValidationError correctly', function (done) {
    request(app)
      .get('/')
      .expect(400)
      .end(function (err, res) {
        if (err) return done(err);
        expect(res.body.message).to.equal('Validation Error Message');
        done();
      });
  });

  it('should handle generic errors correctly', function (done) {
    app = express();
    app.use((req, res, next) => {
      let error = new Error('Server Error');
      error.statusCode = 500; // Added the statusCode property here
      next(error);
    });
    app.use(errorHandler);

    request(app)
      .get('/')
      .expect(500)
      .end(function (err, res) {
        if (err) return done(err);
        expect(res.body.message).to.equal('Server Error');
        done();
      });
  });
});