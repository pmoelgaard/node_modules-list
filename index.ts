var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var async = require('async');

function NodeModulesList(callback) {

  var cwd = path.resolve();
  var nodeModulesPath = path.join(cwd, 'node_modules');

  async.waterfall([
      function (next) {
        fs.readdir(nodeModulesPath, function (err, files) {
          var files = _.filter(files, function (file) {
            var isSystem = _.startsWith(file, '.');
            var isDir = fs.statSync(path.join(nodeModulesPath, file)).isDirectory();
            return ! isSystem && isDir;
          });
          next(null, files);
        });
      },
      function (files, next) {
        async.map(
          files,
          function (file, nextFile) {
            var filePath = path.join(nodeModulesPath, file, 'package.json');
            fs.readFile(filePath, 'utf8', function (err, file) {
              file = JSON.parse(file);
              nextFile(null, file);
            });
          },
          function (err, files) {
            next(err, files);
          }
        )
      }
    ],
    function (err, files) {
      callback(err, files);
    })

}
export = NodeModulesList;
