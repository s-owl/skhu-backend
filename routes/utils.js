var trim = function(raw){
  return raw.toString().replace(/[\n\t\r]/g,"").replace(/ /g,'');
}

exports.trim = trim;
