const jsdom = require("jsdom");
const path = require("path");
const childProcess = require("child_process");
const phantomjs = require("phantomjs-prebuilt");
const binPath = phantomjs.path;

const professorList = (req, res, next) => {
	console.log("POST /class/timetable/professorList");
	console.log("REMOTE IP : " + req.ip);
	console.log("REMOTE IPS : " + req.ips);

	const cookie = {};
	for( let i = 0; i<req.body.cookie.length; i++){
		cookie[i] = req.body.cookie[i];
	}
	//console.log(cookie[0].domain);
	// Arguments
	const childArgs = [
		"--ignore-ssl-errors=yes",
		path.join(__dirname, "ph_professorList.js"),
		req.body.rblSearch,
		req.body.search,
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
		cookie[3].value
	];

	// Execute Phantomjs script
	childProcess.execFile(binPath, childArgs, (err, stdout, stderr) => {
		console.log(err);
		console.log(stdout);
		console.log(stderr);
		jsdom.env( stdout, ["http://code.jquery.com/jquery.js"],
			(err, window) => {
				if(err==undefined){
					const professorList = [];
					window.$("#dgList > tbody > tr")
						.each((index, element) => {
							professorList.push({
								// 담당교수조회 그대로 javascript포함된 a 태그를 반환함
								"code" : window.$( element ).children("td:eq(0)").text(),
								"name" : window.$( element ).children("td:eq(1)").text(),
								"occupations" : window.$( element ).children("td:eq(2)").text(),
								"rank" : window.$( element ).children("td:eq(3)").text(),
								"belong" : window.$( element ).children("td:eq(4)").text()
							});
						});
					res.send(JSON.stringify({
						"professorList" : professorList
					}));
				}
			});
	});
};

exports.professorList = professorList;
// module.exports = professorList;

const professorTimetable = (req, res, next) => {
	console.log("POST /class/timetable/professorTimetable");
	console.log("REMOTE IP : " + req.ip);
	console.log("REMOTE IPS : " + req.ips);

	const cookie = {};
	for( let i = 0; i<req.body.cookie.length; i++){
		cookie[i] = req.body.cookie[i];
	}
	//console.log(cookie[0].domain);

	// Arguments
	const childArgs = [
		"--ignore-ssl-errors=yes",
		path.join(__dirname, "ph_professorTimetable.js"),
		req.body.year,
		req.body.semester,
		req.body.staffNo,
		req.body.staffName,
		req.body.occupationsCode,
		req.body.jobCode,
		req.body.UniversityCode,
		req.body.departmentCode,
		req.body.belongCode,
		req.body.socialNo,
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
		cookie[3].value
	];

	// Execute Phantomjs script
	childProcess.execFile(binPath, childArgs, (err, stdout, stderr) => {
		console.log(err);
		console.log(stdout);
		console.log(stderr);
		jsdom.env( stdout, ["http://code.jquery.com/jquery.js"],
			(err, window) => {
				if(err==undefined){
					const professorTimetable = [[],[],[],[],[],[]];
					window.$("#tblTimeSheet > tbody > tr")
						.each((index, element) => {
							if(index>0){
								console.log("==================================");
								for(let i=0; i<6;i++){
									const items = window.$( element ).children(`td.TT_ItemCell:eq(${i})`)
										.html().split("<div class=\"TT_TimeItemValue\"><b>");
									items.forEach((rawitem) => {
										const item = rawitem.replace("</div>","");
										console.log(item);
									});
								}
							}
							proTimatable.push({
								"item" : window.$( element ).children("td:eq(0)").text(),
								"item2" : window.$( element ).text(),
								"item3" : window.$( element ).children("td:eq(1)").text(),
								"item4" : window.$( element ).children("td:eq(2)").text(),
								"item5" : window.$( element ).children("td:eq(3)").text(),
								"item6" : window.$( element ).children("td:eq(4)").text(),
								"item7" : window.$( element ).children("td:eq(5)").text()
							});
						});
					res.send(JSON.stringify({
						"monday" : professorTimetable[0],
						"tuesday" : professorTimetable[1],
						"wednsday" : professorTimetable[2],
						"thursday" : professorTimetable[3],
						"friday" : professorTimetable[4],
						"saturday" : professorTimetable[5]
					}));
				}
			});
		// pass cookies to the client
		// res.send(stdout);
	});
};
exports.professorTimetable = professorTimetable;
