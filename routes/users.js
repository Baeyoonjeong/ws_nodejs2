var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/login', function(req, res, next){
  console.log("/login"); // This returns an array
  res.render('login', {title: 'MeanStack Study', loginError: 'loginError'});    // 기본페이지
});

//페이지별로 로그인이 되었는지를 확인하고, 로그인이 되어 있을 경우 HTTP request에서 사용자 정보를 가지고 오는 코드
router.get('/login_success', function(req, res){
    console.log("/login_success");
    res.redirect('/board/');
    //res.send(req.user);
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
  console.log("req.body : " + JSON.stringify(req.body));
  var param = req.body;
  var user = new User();
  user.email = param.email;
  user.nickname = param.nickname;
  user.password = param.password;
  user.save(function(err, user) {
    var msg = '';
	  if (err) {
      console.error(err);
      msg = 'join fail';
    }
		res.send(msg).end();
  });
});



module.exports = router;
