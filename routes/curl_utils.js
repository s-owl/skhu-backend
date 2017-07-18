// javascript로 만들어진 iconv-lite
const iconv = require('iconv-lite');
iconv.skipDecodeWarning = true;

const jsdom = require('jsdom');

// 자식 프로세스로 커맨드라인 실행 환경 설정
let exec = require('child_process').exec,
    child;
const childProcess = require('child_process');

function get (req, res, url) {
  return new new Promise(function(resolve, reject) {


    // cURL 옵션설정
    // const C_method = `GET`;
    // const C_header = `Content-Type: application/json;`;
    // const C_userAgent = `Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/6.0)`;
    // const C_url = url;
    // const C_cookies = req.body.cookie;

    // 명령줄 작성
    // const command = `curl -X ${C_method} --cookie "${C_cookies[0].name}=${C_cookies[0].value}; ${C_cookies[1].name}=${C_cookies[1].value}; ${C_cookies[2].name}=${C_cookies[2].value}; ${C_cookies[3].name}=${C_cookies[3].value}" -H "${C_header}" --user-agent "${C_userAgent}" ${C_url}`;
    //
    // // 몸체
    // let body = '';
    //
    // // cURL 실행
    // child = exec(command);
    //
    // // euc-kr 문서를 binary 형태로 출력
    // child.stdout.setEncoding('binary');
    //
    // // 이 코드는 아래 주석과 같다.
    // child.stdout.on('data', (chunk) => {
    //     this.body += chunk;
    // });

    /*
    res.on('data', (chunkBuffer) => {
        body += chunkBuffer.toString('utf8');
    });
    */

    // 마지막 euc-kr 형태로 decode 후 callbackFunc에 의해 파싱 후 서버로 전송
    // child.stdout.on('end', () => {
    //     let decodedBody = iconv.decode(this.body, 'euc-kr');
    //     jsdom.env( decodedBody, ["http://code.jquery.com/jquery.js"]).then((window)=>{}).catch((err)=>{console.log(err)});
    // });

/////////
    let cookieParam = "";
    for(let item in  req.body.cookie){
      cookieParam += `${item.name}=${item.value}`;
    }

    const cmdLine = `curl -X GET --cookie ${cookieParam} ${url}`;
    // Execute curl command
    childProcess.exec(cmdLine, (err, stdout, stderr)=>{
      if(err==undefined){
        jsdom.env( stdout, ["http://code.jquery.com/jquery.js"],
          (err, window)=>{
            if(err == undefined){
              resolve(window);
            }else{
              reject(err)
            }
          });
      }else {
        reject(err);
      }
      console.log(err, stdout, stderr);
      // pass cookies to the client
    })
});
};

exports.get = get;
