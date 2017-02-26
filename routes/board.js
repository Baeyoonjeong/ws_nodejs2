var express = require('express');
var router = express.Router();
var connection     = require('../config/database_mysql');

/* GET users listing. */
router.get('/', function(req, res, next) {
    // 그냥 board/ 로 접속할 경우 전체 목록 표시로 리다이렉팅
    console.log("board");
    res.redirect('/board/board_main');
});

//게시판 리스트
router.get('/board_main', function(req, res, next){
  if (req.isAuthenticated()) {
    connection.getConnection(function (err, connection) {
      var sqlSelectList = "SELECT TITLE,BODY,AUTHOR,VIEWS,NUMID,DATE_FORMAT(CREATEDAT,'%Y-%m-%d %H:%i:%s') CREATEDAT,DATE_FORMAT(UPDATEDAT,'%Y-%m-%d %H:%i:%s') UPDATEDAT FROM TB_BOARD";
      connection.query(sqlSelectList, function (err, rows) {
        if (err){
          console.error("err : " + err);
        }
        res.render('board', {user: req.session.passport.user, rows: rows});
        //res.render('board', {title: 'MeanStack Study'});    // 기본페이지
        connection.release();
      });
    });
  } else {
    res.redirect('/login');
  }
});

//게시판 등록
router.post('/insert', function(req, res) {
  console.log(req.body.title);
  var title  = req.body.title;
  var body   = req.body.body;
  var author = "session";
  var view   = 1;
  var numid  = 1;
  //console.log(">>>>>>param : " +JSON.stringify(param));
  connection.getConnection(function(err, conn){
    var sqlSelectList = "INSERT INTO TB_BOARD ( TITLE, BODY, AUTHOR, VIEWS, NUMID, CREATEDAT, UPDATEDAT) VALUES( ?, ?, ?, ?, ?,  SYSDATE(), SYSDATE() )";
    connection.query(sqlSelectList, [title, body, author, view, numid], function(err, rows){
        if(err){
          console.error(err);
          throw err;
        }
        res.send(200, 'success');
      });
  });
});

module.exports = router;
