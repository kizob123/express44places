"use strict";

var mysql = require('mysql');

var config = require('../db.config');

conn = mysql.createConnection(config);
module.exports = {
  login: function login(email, password, res) {
    console.log(password);
    var check_if_account_present = 'select PersonID from persons where email = ?';
    conn.query(check_if_account_present, [email], function (err, result) {
      if (err) {
        res.json({
          'error': "Connection error: can't connect to database. Try again."
        });
      }

      console.log(result);

      if (!result.length) {
        console.log("There is no account tied to '".concat(email, "'"));
        res.json({
          'error': "There is no account tied to '".concat(email, "'")
        });
      } else {
        var check_if_pass_correct = 'select password from persons where email = ? and password = ?';
        conn.query(check_if_pass_correct, [email, password], function (err2, result2) {
          if (err) {
            res.json({
              'error': "Connection error: can't connect to database. Try again."
            });
          }

          console.log(result2);

          if (!result2.length) {
            console.log('The password you entered is not matched to any email');
            res.json({
              'error': 'The password you entered is not matched to any email'
            });
          } else {
            var login = 'select fname, lname, email, password, business,phonenumber, routes from persons where email = ?';
            conn.query(login, [email], function (err, result3) {
              if (err) {
                res.json({
                  'error': "Connection error: can't connect to database. Try again."
                });
              }

              console.log(result3.length);

              if (!result3) {
                console.log('Something wrong. Try again');
                res.json({
                  'error': 'Something wrong. Try again'
                });
              } else {
                console.log(result3);
                res.json({
                  'data': result3
                });
              }
            });
          }
        });
      }
    });
  },
  register: function register(fname, lname, location, email, password, business, phone, routes, res) {
    var check_if_account_present = "select PersonID from \n                                            persons where email = ?";
    conn.query(check_if_account_present, [email], function (err, result) {
      if (err) {
        res.json({
          'error': "Connection error: can't connect to database. Try again."
        });
      }

      if (!result.length) {
        console.log(fname);
        var insert_account = "INSERT INTO persons \n                  (fname,lname,location,email,password,business,phonenumber,routes) \n                  values (?,?,?,\n                  ?,?,?,\n                  ?,?)";
        conn.query(insert_account, [fname, lname, location, email, password, business, phone, routes], function (err, result2) {
          if (err) {
            console.log(err);
            res.json({
              'error': 'Problem registering you. Please try again'
            });
          } else console.log('inserted');
        });
      } else {
        console.log('record exists');
        res.json({
          'error': 'there is an email ' + email + ' in our database'
        });
      }
    });
  }
};