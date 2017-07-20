const Iconv = require('iconv').Iconv; // 인코딩 변환 모듈
const iconv = new Iconv('EUC-KR','UTF-8//TRANSLIT//IGNORE');
const jsdom = require('jsdom');
const childProcess = require('child_process');

function get (req, res, url) {
    return new Promise((resolve, reject) => {

        let cookieObj = req.body.cookie;
        let cookieParam = "";
        for(let i = 0; i < cookieObj.length; i++) {
            cookieParam += `${cookieObj[i].name}=${cookieObj[i].value};`;
        }

        const cmdLine = `curl -X GET --cookie "${cookieParam}"`
        +` -H "Content-Type: application/json;"`
        +` --user-agent "Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/6.0)" -s ${url}`;
        // console.log(cmdLine);

        // Execute curl command
        childProcess.exec(cmdLine, { encoding: null }, (err, stdout, stderr) => {
            if(err == undefined) {
                let buffer = new Buffer(stdout, 'binary');
                let converted = iconv.convert(buffer).toString();
                jsdom.env( converted, ["http://code.jquery.com/jquery.js"], (err, window) => {
                    if(err == undefined) {
                        resolve(window);
                    } else {
                        reject(err)
                    }
                });
            } else {
                reject(err);
            }
            console.log(err, stdout, stderr);
            // pass cookies to the client
        });
    });
};

exports.get = get;
