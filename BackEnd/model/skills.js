//= ======================================================
//              Imports
//= ======================================================
// intialising pool
const pool = require('../controller/databaseConfig');

//= ======================================================
//              Functions / Objects
//= ======================================================
const Skill = {
  //= ======================================================
  //              Features / Class
  //= ======================================================
  getAllSkills(callback) {
    // sql query statement
    const sql = 'SELECT * FROM heroku_ac264b924247888.csy_skills ORDER BY SKILL_PERC DESC;';
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
};

//= ======================================================
//              Exports
//= ======================================================
module.exports = Skill;