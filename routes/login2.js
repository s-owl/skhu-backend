//OK! Let't work around using phantomjs!

var request = require('request');
var phantom = require('phantom');

var run = function(req, res, next){
  phantom.create().then(function(ph) {
    ph.createPage().then(function(page) {
        // use page
        page.setting('javascriptEnabled', 'true');
        page.setting('userAgent', 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/6.0)');
        page.open("https://forest.skhu.ac.kr/Gate/UniLogin.aspx");
        page.evaluate(function(studentId, studentPw){
          //run these on web site
          document.getElementById('txtID').value = studentId;
          document.getElementById('txtPW').value = studentPw;
          document.getElementById('form1').submit();
        },req.body.studentid, req.body.studentpw)
        ph.exit();
    });
});

}

module.exports = run;
