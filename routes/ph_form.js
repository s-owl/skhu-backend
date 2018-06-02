const system = require("system");
const webPage = require("webpage");
const page = webPage.create();

let submited = false;

const url = system.args[1];
const resurl = system.args[2];
const formid = system.args[3];
const btnid = system.args[4];

const formlen = system.args[5];
const formids = [];
const formvals = [];

const cookiestart = 6+(formlen*2);

// Get form ids and values
for(var i=6; i<cookiestart; i+=2){
	formids.push(system.args[i]);
	formvals.push(system.args[i+1]);
}

// Set userAgent as IE
page.settings.userAgent = "Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/6.0)";
page.settings.javascriptEnabled = true;

// Add cookie to the phantom client
for(var i=cookiestart; i<=system.args.length; i+=6){
	phantom.addCookie({
		"domain":system.args[i],
		"httponly":system.args[i+1],
		"name":system.args[i+2],
		"path":system.args[i+3],
		"secure":system.args[i+4],
		"value":system.args[i+5]
	});
}

// Load page
page.open(url, (status) => {
});

// If Page is fully loaded
page.onLoadFinished = function(status) {
	if(submited==false){
		for(let i=0; i<formids.length; i++){
			page.evaluate((fid, fval) => {
				document.querySelector("#"+fid).value = fval;
			}, formids[i], formvals[i]);
		}
		page.evaluate((fmid) => {
			document.querySelector("#"+fmid).submit();
		}, formid);
		submited = true;
	}else{
		if(btnid==0||btnid=="0"){
			console.log(page.content);
			phantom.exit();
		}else{
			page.evaluate((btnid) => {
				document.querySelector("#"+btnid).click();
			}, btnid);
		}
	}
};


// Error Handling
page.onError = function(msg, trace) {

	const msgStack = ["ERROR: " + msg];

	if (trace && trace.length) {
		msgStack.push("TRACE:");
		trace.forEach((t) => {
			msgStack.push(" -> " + t.file + ": " + t.line + (t.function ? " (in function \"" + t.function +"\")" : ""));
		});
	}

	// console.error(msgStack.join('\n'));
	// phantom.exit();
};

page.onResourceRequested = function(requestData, networkRequest) {
	// console.log('Request (#' + requestData.id + '): ' + JSON.stringify(requestData));
	const url="https://forest.skhu.ac.kr/Gate/Common/JavaScript/CoreSecurity.js";
	if(requestData.url==url){
		// console.log("Aborting resource request for "+url);
		networkRequest.abort();
	}
};

page.onResourceReceived = function(response){
	if(response.url == resurl && submited == true){
		// Wait for data to be displayed on the page.
		// For one sec maybe?
		setTimeout(() => {
			// Pass page content to node server with "console.log"
			console.log(page.content);
			// OK, Done.
			phantom.exit();
		}, 1000);
	}
};
