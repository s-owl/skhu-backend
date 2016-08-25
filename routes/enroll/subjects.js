var utils = require('../utils');

var run = function(req, res, next){
  console.log("POST /subjects");

  var url = utils.baseurl+"/GATE/SAM/LECTURE/S/SSGS09S.ASPX?&maincd=O&systemcd=S&seq=1";
  var data =""
  try{
    data = {
      "CSMenuButton1$List.x":"41",
"CSMenuButton1$List.y":"12",
      "ScriptManager1":"ScriptManager1|CSMenuButton1$List",
      "txtYy" : req.body.data.year,
      "ddlHaggi" : utils.getSemesterCode(req.body.data.semester),
      "ddlSosog" : getDepartCode(req.body.data.depart),
      "txtPermNm" : req.body.data.professor,
      "__ASYNCPOST" : true,
      "__VIEWSTATE":"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MDEyMF9VMDEwMTIwF1UwMTAwMDBfVTAxMDEzMF9VMDEwMTMwF1UwMTAwMDBfVTAxMDE0MF9VMDEwMTQwF1UwMTAwMDBfVTAxMDE1MF9VMDEwMTUwF1UwMTAwMDBfVTAxMDE2MF9VMDEwMTYwF1UwMTAwMDBfVTAxMDE4MF9VMDEwMTgwF1UwMTAwMDBfVTAxMDE4MV9VMDEwMTgxF1UwMTAwMDBfVTAxMDIxMF9VMDEwMjEwF1UwMTEwMDBfVTAxMTAwMF9VMDExMDAwF1UwMTEwMDBfVTAxMTExMF9VMDExMTEwF1UwMTExNTBfVTAxMTE1MF9VMDExMTUwF1UwMTExNTBfVTAxMTE2MF9VMDExMTYwF1UwMTIwMDBfVTAxMjAwMF9VMDEyMDAwF1UwMTIwMDBfVTAxMjExMF9VMDEyMTEwF1UwMTIwMDBfVTAxMjEyMF9VMDEyMTIwF1UwMTMxMDBfVTAxMzEwMF9VMDEzMTAwF1UwMTMxMDBfVTAxMzExMF9VMDEzMTEwF1UwMTQwMDBfVTAxNDAwMF9VMDE0MDAwF1UwMTQwMDBfVTAxNDEwMF9VMDE0MTAwF1UwMTQwMDBfVTAxNDIwMF9VMDE0MjAwF1UwMjAwMDBfVTAyMDAwMF9VMDIwMDAwF1UwMjAwMDBfVTAyMDIwMF9VMDIwMjAwF1UwMjAwMDBfVTAyMDMwMF9VMDIwMzAwF1UwMjAwMDBfVTAyMDQwMF9VMDIwNDAwF1UwMjAwMDBfVTAyMDUwMF9VMDIwNTAwF1UwMzAwMDBfVTAzMDAwMF9VMDMwMDAwF1UwMzAwMDBfVTAzMDEwMF9VMDMwMTAwF1UwMzAwMDBfVTAzMDIwMF9VMDMwMjAwF1UwMzAwMDBfVTAzMDIwMF9VMDMwMjAxF1UwMzAwMDBfVTAzMDIwMF9VMDMwMjAyF1UwMzAwMDBfVTAzMDIwMF9VMDMwMjAzF1UwMzAwMDBfVTAzMDMwMF9VMDMwMzAwF1UwMzAwMDBfVTAzMDcwMF9VMDMwNzAwF1UwMzAwMDBfVTAzMDcwMF9VMDMwNzAxF1UwMzAwMDBfVTAzMDgwMF9VMDMwODAwF1UwNDAwMDBfVTA0MDAwMF9VMDQwMDAwF1UwNDAwMDBfVTA0MDUwMF9VMDQwNTAwF1UwNTAwMDBfVTA1MDAwMF9VMDUwMDAwF1UwNTAwMDBfVTA1MDMwMF9VMDUwMzAwF1UwNTAwMDBfVTA1MDQwMF9VMDUwNDAwF1UwNTAwMDBfVTA1MDUwMF9VMDUwNTAwF1UwNTAwMDBfVTA1MDYwMF9VMDUwNjAwF1UwMDEwMDBfVTAwMTAwMF9VMDAxMDAwF1UwMDEwMDBfVTAwMTEwMF9VMDAxMTAwF1UwMDEwMDBfVTAwMTIwMF9VMDAxMjAwFCsDMGdnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2RkAgsPD2QWAh8IBTFqYXZhc2NyaXB0OnJldHVybiBFbnRlcktleVByZXNzKCdDU01lbnVCdXR0b24xJyk7ZAIND2QWAmYPZBYCAgEPZBYCAgMPFgIfBgUCMjBkAhEPD2QWAh4Ib25zY3JvbGwFOGRvY3VtZW50LmFsbFsnQ29yZVNjcm9sbDFfdmFsdWUnXS52YWx1ZSA9IHRoaXMuc2Nyb2xsVG9wZAITDw8WAh4EX0NTS2dkFgICAQ8PFgIfDGhkZAIVDw8WAh4HVmlzaWJsZWhkZBgBBR5fX0NvbnRyb2xzUmVxdWlyZVBvc3RCYWNrS2V5X18WAgUSQ1NNZW51QnV0dG9uMSRMaXN0BRZDb3JlRm9vdGVyMSRidG5SZXF1ZXN0cDhOC/lo6EMJcCBu30nmXwLYNolvScC9zC5his40UK4=",
      "__VIEWSTATEGENERATOR":"138708B7",
      "__EVENTVALIDATION" : "/wEWOgKv6rDACwKE9tCKBQKP+9acCwLGufufDALZufufDALYufufDALDufufDALS84PPDAKG9tnYBgKI/dH4BgKI/dmcBQKI/cG8BQKI/dngBwKI/dGABwKI/dmkBgKI/dnIBAKCtfbFDwKKptH4BgLv4Oe6DALx79/aDQLh+a/TCALh+a+/CAK7jOmfCAK9i+G/CAK9i+nTCALYrpjxBALYrpiRBALCtLmdAgLEs7mdAgLG5L6dAgKv6dX2CAKz2dX2CAKxotX2CAK3ydX2CALB09X2CAKgpL7ICAKqo77ICAKklL7ICALB4p2/DQLypvr/DAKPvdjiAgKqnb7ICAK6+b/ICALX152/DQKw4L/ICALxz4ObCgKLsoObCgKahY35DQKc/pL5DQKi5ZL5DQKs6JL5DQKu0ZL5DQKki5+HDgKukp+HDgKo+5yHDgKL4c6OAQLquZnfBQLfn7yOBkWpM/EyR1P4DbAA00yOddeGwW2mRk3lT4ek/ur1tP5z"

    };

      console.log(JSON.stringify(data));
    }catch(exception){
      console.log(exception);
    }

  utils.post(req, res, next, url, true, data)
  .then(function(window, rawData){
    // Parse subjects data
    var jsonSubjects = [];
    window.$("#dgList > tbody > tr")
      .each(function(index, element){
        if(index>=1){
          jsonSubjects.push({
            "type" : window.$( element ).children("td:eq(0)").text(),
            "grade" : window.$( element ).children("td:eq(1)").text(),
            "code" : window.$( element ).children("td:eq(2)").text(),
            "class" : window.$( element ).children("td:eq(3)").text(),
            "subject" : window.$( element ).children("td:eq(4)").text(),
            "credits" : window.$( element ).children("td:eq(5)").text(),
            "tutor" : window.$( element ).children("td:eq(6)").text(),
            "grade_restriction" : window.$( element ).children("td:eq(7)").text(),
            "depart_restriction" : window.$( element ).children("td:eq(8)").text(),
            "time_location" : window.$( element ).children("td:eq(9)").text(),
            "note": window.$( element ).children("td:eq(10)").text(),
            "headcounts": window.$( element ).children("td:eq(11)").text()
          });
        }
      });
    res.send(JSON.stringify({
      "subjects" : jsonSubjects
    }));
  });

}

module.exports = run;

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
