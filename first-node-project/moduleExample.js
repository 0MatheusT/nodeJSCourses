var url = 'http://mylogger.io/log';

function log(name) {
  console.log(name);
}

/* This line use the default module of Node to export
the method log on module moduleExample.js */
module.exports = log;
