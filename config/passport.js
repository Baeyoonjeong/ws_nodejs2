var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var connection     = require('../config/database_mysql');
var flash = require("connect-flash");

module.exports = function (app) {

  // 인증 성공후 세션에 데이터 저장시 호출됨
  app.serializeUser(function (user, done) {
    console.log('serializeUser');
    done(null, user);
  });

  // 세션에 저장된 데이터 조회시 호출됨
  app.deserializeUser(function (user, done) {
    console.log('deserializeUser::', user);
    done(null, user);
  });

  // 로그인 라우팅시 미들웨어로 수행됨
  // 유저네임과 비밀번호를 체크함
  app.use('local-login',  new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    }, function(req, email, password, done){
      connection.getConnection(function(err, conn){
        var sqlSelectList = "SELECT * FROM TB_USER WHERE `EMAIL` = ?";
        connection.query(sqlSelectList, email, function(err, rows){
            console.log(rows[0]);
            var user = rows[0];
            if(err){
              return done(err);
            };
            if(!user){
              console.log(">>>No user found.");
              //return done(null, false, req.flash('loginError', 'No user found.'));
              return done(null, false); // create the loginMessage and save it to session as flashdata
            };
            // if(user.PASSWORD != password){
            //   console.log(">>>Password does not Match.");
            //   return done(null, false); // create the loginMessage and save it to session as flashdata
            // };
            return done(null, user);

          });
      });
    }
  ));
};
