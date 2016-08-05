var express = require('express');
var app = express();

// "/" 로 GET 요청이 들어온 경우.
app.get('/', function(req, res) {
  // 요청에 대한 처리 여기에 작성

  //응답 보내기
  res.send('Welcome to Forest Middleman API Server');
});
