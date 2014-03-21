
var assert = require('assert');

describe('require-all', function() {

  before(function() {
    makeNodeModules();
  });

  after(function() {
    clearNodeModules();
  });

  it('should require all ', function() {
    var requireAll = require('require-all');
    var libs = requireAll('test/lib');
    assert.equal(libs.lib1, 'kitty');
    assert.equal(libs.lib2, 'kat');
    assert.equal(libs.nested.lib3, 'lib3');
    assert.equal(libs.nested.caseMe, 'case-me');
  })
})


var fs = require('fs');
var root = __dirname + '/../'

function makeNodeModules() {
  fs.createReadStream(root + 'index.js').pipe(fs.createWriteStream(root + 'node_modules/require-all/index.js'));
  fs.createReadStream(root + 'package.json').pipe(fs.createWriteStream(root + 'node_modules/require-all/package.json'));
}

function clearNodeModules() {
  fs.unlinkSync(root + "node_modules/require-all/index.js");
  fs.unlinkSync(root + "node_modules/require-all/package.json");
}