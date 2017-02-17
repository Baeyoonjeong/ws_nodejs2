

var winston = require('winston');
var moment = require('moment');
//var path = ;

var logger = new (winston.Logger)({
    transports: [
      new (winston.transports.Console)({
        timestamp: function(){
          return moment().format("YYYY-MM-DD HH:mm:ss.SSS");
        }
      })
    ]
});
