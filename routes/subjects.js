var utils = require('./utils');

var run = function(req, res, next){
  console.log("POST /main");

  var url = utils.baseurl+"/GATE/SAM/LECTURE/S/SSGS09S.ASPX?&maincd=O&systemcd=S&seq=1";
  var data = "txtYy=" + req.body.data.year + "&ddlHaggi=" + getSemesterCode(req.body.data.semester) \
    + "&ddlSosog=" + getDepartCode(req.body.data.depart) + "&txtPermNm=" + req.body.data.professor;

  utils.get(req, res, next, url, true)
  .then(function(window, rawData){
    // Parse credits data
    var jsonAttendance = [];
    window.$("#dgList > tbody > tr")
      .each(function(index, element){
        if(index>=1){
          jsonAttendance.push({
            "type" : utils.trim(window.$( element ).children("td:eq(0)").text()),
            "grade" : utils.trim(window.$( element ).children("td:eq(1)").text()),
            "code" : utils.trim(window.$( element ).children("td:eq(2)").text()),
            "class" : utils.trim(window.$( element ).children("td:eq(3)").text()),
            "subject" : utils.trim(window.$( element ).children("td:eq(4)").text()),
            "tutor" : utils.trim(window.$( element ).children("td:eq(5)").text()),
            "grade_restriction" : utils.trim(window.$( element ).children("td:eq(6)").text()),
            "depart_restriction" : utils.trim(window.$( element ).children("td:eq(7)").text()),
            "note":,
            "headcounts":
          });
        }
      });
    res.send(JSON.stringify({
      "credits" : jsonCredits,
      "attendance" : jsonAttendance
    }));
  });

}

module.exports = run;

function getSemesterCode(semester){
  switch(semester){
    case "first":
      return "Z0101";
    case "second":
      return "Z0102";
    case "summer":
      return "Z0103";
    case "summer":
      return "Z0104":
    default:
      return "Z0101";
  }

  function getDepartCode(semester){
    switch(semester){
      case "all":
        return "XXXXXXX_XXXXXXX_XXXXXXX";
      case "liberal":
        return "U010000_U010000_U010000";
      case "liberal_depart":
        return "U010000_U010110_U010110";
      case "liberal_required":
        return "U010000_U010120_U010120";
      case "liberal_humanities":
        return "U010000_U010130_U010130";
      case "liberal_social":
        return "U010000_U010140_U010140";
      case "liberal_natural":
        return "U010000_U010150_U010150";
      case "liberal_option":
        return "U010000_U010160_U010160";
      case "liberal_welfare":
        return "U010000_U010180_U010180";
      case "liberal_service":
        return "U010000_U010181_U010181";
      case "liberal_consulting":
        return "U010000_U010210_U010210";
      case "edu":
        return "U011000_U011000_U011000";
      case "edu_depart":
        return "U011000_U011110_U011110";
      case "lifelong_edu":
        return "U011150_U011150_U011150";
      case "lifelong_edu_depart":
        return "U011150_U011160_U011160";
      case "overseas":
        return "U012000_U012000_U012000";
      case "overseas_edu":
        return "U012000_U012110_U012110";
      case "overseas_china":
        return "U012000_U012120_U012120";
      case "exchange":
        return "U013100_U013100_U013100";
      case "exchange_japan":
        return "U013100_U013110_U013110";
      case "philosophy":
        return "U014000_U014000_U014000";
      case "culture":
        return "U014000_U014100_U014100";
      case "ngo":
        return "U014000_U014200_U014200";
      case "humanities":
        return "U020000_U020000_U020000";
      case "theology":
        return "U020000_U020200_U020200";
      case "english":
        return "U020000_U020300_U020300";
      case "japanese":
        return "U020000_U020400_U020400";
      case "chinese":
        return "U020000_U020500_U020500";
      case "social":
        return "U030000_U030000_U030000";
      case "social_welfare":
        return "U030000_U030100_U030100";
      case "social_sciense":
        return "U030000_U030200_U030200";
      case "social_sciense_politics":
        return "U030000_U030200_U030201";
      case "social_sciense_economics":
        return "U030000_U030200_U030202";
      case "social_sciense_social":
        return "U030000_U030200_U030203";
      case "broadcasting":
        return "U030000_U030300_U030300";
      case "business":
        return "U030000_U030700_U030700";
      case "business_distribution":
        return "U030000_U030700_U030701";
      case "social_digital_contents":
        return "U030000_U030800_U030800";
      case "natural":
        return "U040000_U040000_U040000";
      case "natural_digital_contents":
        return "U040000_U040500_U040500";
      case "engineering":
        return "U050000_U050000_U050000";
      case "sw_engineering":
        return "U050000_U050300_U050300";
      case "info_communication":
        return "U050000_U050400_U050400";
      case "glocal_it":
        return "U050000_U050500_U050500";
      case "computer_engineering":
        return "U050000_U050600_U050600";
      case "exchange_univ":
        return "U001000_U001000_U001000";
      case "exchange_catholic_univ":
        return "U001000_U001100_U001100";
      case "exchange_hanshin_univ":
        return "U001000_U001200_U001200";
      default:
        return "XXXXXXX_XXXXXXX_XXXXXXX";
    }
}
