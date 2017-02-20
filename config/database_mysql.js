var mysql = require('mysql');

var dbConfig = {
  host : 'localhost',
  port : 3306,
  user : 'root',
  password : '1111',
  database : 'test'
};

var pool = mysql.createPool(dbConfig);

pool.query('SELECT * FROM USER', function(err, rows, fields) {
  if (err) throw err;

  console.log('The solution is: ', rows);
});

module.exports = pool;
