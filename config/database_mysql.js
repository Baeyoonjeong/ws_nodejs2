var mysql = require('mysql');

var dbConfig = {
    host : 'localhost',
    user : 'root',
    password : '1111',
    port : 3306,
    multipleStatements : true,
    database : 'test'
};

var pool = mysql.createPool(dbConfig);

pool.query('SELECT * FROM USER', function(err, rows, fields) {
  if (err) throw err;

  console.log('The solution is: ', rows);
});

module.exports = pool;
