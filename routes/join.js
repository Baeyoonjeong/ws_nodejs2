var express = require('express');
var router = express.Router();

/*GET Home page*/
router.get('/test', function(req, res, next){
  res.render('respong with a resource ');
});


module.exports = router;
