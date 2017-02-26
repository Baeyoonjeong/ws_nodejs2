var express = require('express');
var router = express.Router();
var passport = require('passport');
var connection     = require('../config/database_mysql');

router.get('/login', function(req, res, next){
  console.log("/login"); // This returns an array
  res.render('login', {title: 'MeanStack Study'});    // 기본페이지
});

//페이지별로 로그인이 되었는지를 확인하고, 로그인이 되어 있을 경우 HTTP request에서 사용자 정보를 가지고 오는 코드
router.get('/login_success', function(req, res){
    console.log("/login_success");
    res.redirect('/board/');
    res.send(req.user);
});

router.route('/login').post(
  passport.authenticate('local-login', {
    successRedirect : '/users/login_success',          // 로그인이 성공하면 profile로 가고
    failureRedirect : '/login',     // 실패하면 login으로 다시 간다.
    failureFlash : true
  })
);

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/login');
});

//회원가입
router.post('/join', function(req, res) {
  var email = req.body.email;
  var nickname = req.body.nickname;
  var password = req.body.password;
  //console.log(">>>>>>param : " +JSON.stringify(param));
  connection.getConnection(function(err, conn){
    var sqlSelectList = "INSERT INTO TB_USER ( EMAIL ,NICKNAME ,PASSWORD ,REGDT) VALUES( ?, ?, ?, SYSDATE())";
    connection.query(sqlSelectList, [email, nickname, password], function(err, rows){
        if(err){
          console.error(err);
          throw err;
        }
        console.log(query);
        res.send(200, 'success');
      });
  });






});

module.exports = router;
