
var express = require('express');
var mysql = require('mysql');
var connection     = require('../config/database_mysql');
var router = express.Router();


/* GET users listing. */
router.get('/', function(req, res, next) {
    // 그냥 board/ 로 접속할 경우 전체 목록 표시로 리다이렉팅
    res.redirect('/board_list');
});

//게시판 리스트
router.get('/board_main', function(req, res, next){
  if (req.isAuthenticated()) {
    connection.getConnection(function (err, connection) {
      // Use the connection
      var sqlSelectList = "SELECT TITLE,BODY,AUTHOR,VIEWS,NUMID,DATE_FORMAT(CREATEDAT,'%Y-%m-%d %H:%i:%s') CREATEDAT,DATE_FORMAT(UPDATEDAT,'%Y-%m-%d %H:%i:%s') UPDATEDAT FROM To_BOARD";
      connection.query(sqlSelectList, function (err, rows) {
        if (err) console.error("err : " + err);

        res.render('board_list', {user: req.session.passport.user, rows: rows});
        connection.release();
        // Don't use the connection here, it has been returned to the pool.
      });
    });
  } else {
      res.redirect('/login');
  }
});

//게시판 등록
router.post('/board_insert', function(req, res) {
  console.log("req.body : " + JSON.stringify(req.body));
  var param = req.body;
  //var board = new Board();

  var title = param.title;
  var body = param.body;
  var author = param.author;
  var datas = [title,body,author];

  connection.getConnection(function (err, connection) {
    // Use the connection
    var sqlForInsertBoard = "INSERT INTO BOARD ( TITLE, BODY, NUMID, AUTHOR, CREATEDAT, UPDATEDAT ) VALUES(?, ?, 1, ?, NOW(), NOW())";
    connection.query(sqlForInsertBoard,datas, function (err, rows) {
       if (err) console.error("err : " + err);
       console.log("rows : " + JSON.stringify(rows));

       res.redirect('/board/board_main');
       connection.release();
       // Don't use the connection here, it has been returned to the pool.
    });
  });
});

module.exports = router;
