var express = require('express');
var router = express.Router();
var passport = require('passport');


/*GET Home page*/
router.get('/', function(req, res, next){
  res.render('login', {title: 'Express'});    // 기본페이지
});

router.get('/login', function(req, res, next){
  console.log(">>>>>>로그인다");
  res.render('login', {email: req.flash("email")[0], loginError:req.flash('loginError')});    // 기본페이지
});

router.route('/login').post(
  passport.authenticate('local-login', {
    successRedirect:'/login',   // 로그인이 성공하면 profile로 가고
    failureRedirect:'/login',     // 실패하면 login으로 다시 간다.
    failureFlash:true
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
