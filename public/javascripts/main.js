var request = require('request');

var url = "http://forest.skhu.ac.kr";

request.get(url, function(err,res,html){
  if (!err) {
    $('#main').html(html);
    console.log(html);
  } else {
    $('#error').html(err);
  }
})
