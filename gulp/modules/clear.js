const del = require('del');

module.exports = function clear(cb){
    del('./build/*');
    return cb();
}