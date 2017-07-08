// 베이스 URL
exports.baseurl = "http://forest.skhu.ac.kr";

var jsdom = require('jsdom');
var path = require('path');
var childProcess = require('child_process');
var phantomjs = require('phantomjs-prebuilt');
var binPath = phantomjs.path;

var get = (req, res, url, folderDir, fileDir, callbackFunc) => {

    var cookie = {};
    for( var i = 0; i < req.body.cookie.length; i++){
        cookie[i] = req.body.cookie[i];
    }

    var childArgs = [
    '--ignore-ssl-errors=yes',
    path.join(folderDir, fileDir),
        cookie[0].domain,
        cookie[0].httponly,
        cookie[0].name,
        cookie[0].path,
        cookie[0].secure,
        cookie[0].value,
        cookie[1].domain,
        cookie[1].httponly,
        cookie[1].name,
        cookie[1].path,
        cookie[1].secure,
        cookie[1].value,
        cookie[2].domain,
        cookie[2].httponly,
        cookie[2].name,
        cookie[2].path,
        cookie[2].secure,
        cookie[2].value,
        cookie[3].domain,
        cookie[3].httponly,
        cookie[3].name,
        cookie[3].path,
        cookie[3].secure,
        cookie[3].value,
        url
    ];

    // Execute Phantomjs script
    childProcess.execFile(binPath, childArgs, function(err, stdout, stderr) {
        jsdom.env( stdout, ["http://code.jquery.com/jquery.js"], callbackFunc);
    });
}

exports.get = get;