exports.baseurl = "http://forest.skhu.ac.kr";

var trim = function(raw){
  return raw.toString().replace(/[\n\t\r]/g,"").replace(/  /g,'');
}
exports.trim = trim;

var isDuplicated = function(array, key, value){
  for(var i=0; i<array.length; i++){
    if(key==""){
      if(array[i]==value){
        return true;
      }
    }else{
      if(eval('array[i].'+key)==value){
        return true;
      }
    }
  }
  return false;
}

exports.isDuplicated = isDuplicated;

var getSemesterCode = function(semester){
  switch(semester){
    case "first":
      return "Z0101";
    case "second":
      return "Z0102";
    case "summer":
      return "Z0103";
    case "summer":
      return "Z0104";
    default:
      return "Z0101";
  }
}
exports.getSemesterCode = getSemesterCode;

var phFormTask = function(req, res, next, url, resurl, formid, btnid, formids, formvals, doParse){
    return new Promise(function(resolve, reject) {

    var jsdom = require('jsdom');
    console.log("==========phFormTask==========");
    var path = require('path');
    var childProcess = require('child_process');
    var phantomjs = require('phantomjs-prebuilt');
    var binPath = phantomjs.path;

    // Arguments
    var childArgs = [];
    childArgs.push('--ignore-ssl-errors=yes');
    childArgs.push(path.join(__dirname, 'ph_form.js'));
    childArgs.push(url);
    childArgs.push(resurl);
    childArgs.push(formid);
    childArgs.push(btnid);
    // Add form id and form values to childArgs
    childArgs.push(formids.length);
    for(var i=0; i<formids.length; i++){
      childArgs.push(formids[i]);
      childArgs.push(formvals[i]);
    }

    // Add cookie to childArgs
    for(var i=0; i<req.body.cookie.length; i++){
      childArgs.push(req.body.cookie[i].domain);
      childArgs.push(req.body.cookie[i].httponly);
      childArgs.push(req.body.cookie[i].name);
      childArgs.push(req.body.cookie[i].path);
      childArgs.push(req.body.cookie[i].secure);
      childArgs.push(req.body.cookie[i].value);
    }
    console.log(childArgs);
    childProcess.execFile(binPath, childArgs, function(err, stdout, stderr) {
      console.log(err, stdout, stderr);
      console.log("=====doParse : "+doParse+"=====");
      console.log("ERROR(err) : "+err);
      console.log("ERROR(stderr) : "+stderr);

      resolve(stdout)
      // // reject(err, stderr);
      // if(doParse==true){
      //   console.log("=====Preparing JSDOM=====");
      //   jsdom.env( stdout.toString(), ["http://code.jquery.com/jquery.js"],
      //     function (jsdomerr, window) {
      //       if(jsdomerr==undefined){
      //         // We can now parse some data from html page
      //         console.log("==========Now passing data to promise==========");
      //         console.log(stdout.toString());
      //         resolve([window, stdout.toString()]);
      //       }else{
      //         console.log("==========ERROR!==========");
      //         console.log(jsdomerr);
      //         // Error!
      //         reject(jsdomerr);
      //       }
      //     });
      // }else{
      //   console.log("=====doParse : "+doParse+" =====");
      //   resolve(stdout);
      // }
    });
  });
}
exports.phFormTask = phFormTask;
