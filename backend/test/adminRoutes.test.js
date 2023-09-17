const request = require('supertest');
const expect = require('chai').expect;
const app = require('../server');

describe('Admin Routes', function () {
  
  it('should create a new user', function (done) {
    request(app)
      .post('/admin/create-user')
      .send({ 
        userName: 'Jose Mata',
        password: '12345',
        email: 'josemata@gmail.com',
        role: 'User',
        status: 'Pending',
        setupToken: 'token'
      })
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        expect(res.body).to.have.property('status').to.equal('success');
        expect(res.body).to.have.property('message').to.equal('Setup link sent to user');
        done();
      });
  });

  it('should retrieve all users', function (done) {
    request(app)
      .get('/admin/view-all-users')
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('should retrieve all potential customers', function (done) {
    request(app)
      .get('/admin/view-all-potential-customers')
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        expect(res.body).to.be.an('array'); // Assuming the response is an array of potential customers
        done();
      });
  });  

});
