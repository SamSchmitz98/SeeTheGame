function rangeToList(range) {
  var result = [];
  var temp;
  for (var i = 0; i < range.length; i++){
    temp = range[i].toString();
    if (temp != ''){
      result.push(temp);
    }
  };
  Logger.log(result)
  return result;
}

function getTeamList(url){
  var ss = SpreadsheetApp.openByUrl(url);
  var ws = ss.getSheetByName("Teams");
  var list = ws.getRange(1,1,ws.getRange("A1").getDataRegion().getLastRow(),1).getValues();
  var gamecounts = ws.getRange(1,2,ws.getRange("B1").getDataRegion().getLastRow(),1).getValues();
  Logger.log(gamecounts);
  list = rangeToList(list);
  gamecounts = rangeToList(gamecounts);
  Logger.log(gamecounts);
  var result = {list, gamecounts};
  return result;
}

function findGame(requirements){
  var requirements = requirements;
  var ss = SpreadsheetApp.openByUrl(url);
  var ws = ss.getSheetByName("Test");
  var gws = ss.getSheetByName("Games");
  if (requirements.teams == ""){
    requirements.teams = getTeamList(url, "Games").list.slice(1);
  }
  var rownums = [];
  for (var i = 1; i < gws.getRange("A2").getDataRegion().getLastRow(); i++){
    if (requirements.teams.includes(gws.getRange("A"+(i+1)).getValue()) || requirements.teams.includes(gws.getRange("C"+(i+1)).getValue())){
      rownums.push((i+1).toString());
    }
  }
  var num = rownums[Math.floor(Math.random() * rownums.length)];
  var row = gws.getRange(num, 1, 1, 9).getValues();
  var rowarray = [];
  for (var i = 0; i < row.length; i++) {
    rowarray.push(row[i]);
  }
  return rowarray;
}