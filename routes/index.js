var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/login');
});

router.get('/login', function(req, res, next) {
  res.render('login', {title: 'MeanStack Study', loginError: 'loginError'});    // 기본페이지
});

module.exports = router;
