const chai = require('chai');
const { connectDB, mongoose } = require('../config/dbConfig'); 
const should = chai.should();

describe('Database Connection', function() {

  it('should connect to the database successfully', function(done) {
    connectDB().then(() => {
      mongoose.connection.readyState.should.equal(1); // 1 indicates connected
      done();
    }).catch(done);
  });

  it('should handle database connection error', function(done) {
    this.timeout(10000);

    connectDB('invalidURL').then(() => {
      done(new Error("Should not connect successfully"));
    }).catch((err) => {
      should.exist(err);
      done();
    });
  });
  
});