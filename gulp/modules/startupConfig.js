const browserSync = require('browser-sync').get('mainServer');

module.exports = function startupConfig(cb){
    global.isProd = false;
    return cb();
}