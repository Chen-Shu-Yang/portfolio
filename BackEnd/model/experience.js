//= ======================================================
//              Imports
//= ======================================================
// intialising pool
const pool = require('../controller/databaseConfig');

//= ======================================================
//              Functions / Objects
//= ======================================================
const Experience = {

  //= ======================================================
  //              Features / Class
  //= ======================================================
  // get all class of services
  getAllExp(callback) {
    // sql query statement
    const sql = 'SELECT * FROM heroku_ac264b924247888.csy_experiences;';
    // pool query
    pool.query(sql, (err, result) => {
      // error
      if (err) {
        console.log(err);
        return callback(err);
      }
      // result accurate

      return callback(null, result); // if
    });
  },
  // get class of service by id
  getAExp(id, callback) {
    // sql query statement
    const sql = 'SELECT * FROM heroku_ac264b924247888.csy_experiences where EXP_ID=?;';

    const values = [id];
    // pool query
    pool.query(sql, values, (err, result) => {
      // error
      if (err) {
        console.log(err);
        return callback(err);
      }
      // result accurate

      return callback(null, result);
    });
  },
};

//= ======================================================
//              Exports
//= ======================================================
module.exports = Experience;