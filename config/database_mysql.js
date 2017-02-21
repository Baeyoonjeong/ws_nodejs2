var mysql = require('mysql');

var dbConfig = {
  host : 'localhost',
  port : 3306,
  user : 'yjbae',
  password : '1111',
  database : 'test'
};

var pool = mysql.createPool(dbConfig);

// pool.getConnection(function(err, connection) {
//   // Use the connection
//   connection.query( 'SELECT * FROM TB_USER', function(err, rows) {
//     // And done with the connection.
//     connection.release();
//
//     // Don't use the connection here, it has been returned to the pool.
//   });
// });

module.exports = pool;
