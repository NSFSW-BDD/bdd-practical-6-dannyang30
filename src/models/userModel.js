const pool = require("../services/db");

var userModel = {
  selectAllUsers: (callback) => {
    //code...
    const SQLSTATMENT = `
            SELECT * FROM user;
            `;

    pool.query(SQLSTATMENT, callback);
  },

  selectUserById: (data, callback) => {
    //code...
    const SQLSTATMENT = `
            SELECT * FROM USER
            WHERE userid = ?;
        `;
    const VALUES = [data.userid];

    pool.query(SQLSTATMENT, VALUES, callback);
  },

  insertNewUser: (data, callback) => {
    //code...
    const SQLSTATMENT = `
            INSERT INTO user (username, email,role,password)
            VALUES (?,?,?,?);
        `;
    const VALUES = [data.username, data.email, data.role, data.password];

    pool.query(SQLSTATMENT, VALUES, callback);
  },

  updateUserById: (data, callback) => {
    //code...
    const SQLSTATMENT = `
            UPDATE user
            SET email=?, password=?
            WHERE userid=?;
        `;
    const VALUES = [data.email, data.password, data.userid];

    pool.query(SQLSTATMENT, VALUES, callback);
  },

  deleteUserById: (data, callback) => {
    //code...
    const SQLSTATMENT = `
            DELETE FROM user
            WHERE userid = ?
        `;
    const VALUES = [data.userid];

    pool.query(SQLSTATMENT, VALUES, callback);
  },
  //authetication
  loginUser: (data, callback) => {
    const SQLSTATMENT = `select * from user where email=? and password=?`;

    const VALUES = [data.email, data.password];

    pool.query(SQLSTATMENT, VALUES, callback);
  },
  
};

module.exports = userModel;
