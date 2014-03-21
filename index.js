
var fs = require('fs');
var path = require('path');

function camelCase(string) {
  return string.replace( /-([a-z])/ig, function(all, letter) {
    return letter.toUpperCase();
  });
}

module.exports = function(directory) {
  var tree = {}; // init the tree
  function walk(dir, branch) {
    var files = fs.readdirSync(dir);
    files.forEach(function(file) {
      var name = path.basename(file, path.extname(file));
      name = camelCase(name);
      file = path.join(dir, file);
      var stat = fs.statSync(file);
      if (stat && stat.isDirectory()) {
        branch[name] = {};
        walk(file, branch[name]);
      } else {
        if (path.extname(file) === '.coffee' || path.extname(file) === '.js') {
          branch[name] = require(file);
        }
      }
    });
  }
  directory = path.resolve(__dirname, '../../', directory);
  walk(directory, tree);
  return tree;
}
