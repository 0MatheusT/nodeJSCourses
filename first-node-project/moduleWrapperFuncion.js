(function (exports, require, module, __filename, __dirname) { 
  
  var url = 'http://mylogger.io/log';

  function log(name) {
    console.log(name);
  }

  module.exports = log;

})