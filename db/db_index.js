const mysql = require('mysql');
const { promisify } = require('util');

exports.MODE_PRODUCTION = 'mode_production';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'pass',
  database: 'flashcards'
});

exports.promiseQuery = function(query) {
  return new Promise((resolve, reject) => {
    connection.query(query, (err, rows) => {
      if (err) {
        reject(err);
      }
      resolve(rows);
    })
  })
}

// exports.connection.query('SELECT * FROM messages', (err, rows, fields) => {
//   if (err) {
//     throw err;
//   }

//   // console.log(`rows: ${JSON.stringify(rows)}`);
//   // console.log(`fields: ${JSON.stringify(fields)}`);
// });

// exports.query('SELECT * FROM messages', (err, result) => {
//   if (err) throw err;
//   console.log(result[0].body);
// });

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".