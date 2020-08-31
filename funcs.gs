function removeDups(list) {
  var result = [];
  for (var i = 0; i < list.length; i++){
    if(!result.includes(list[i].toString())) {
      result.push(list[i].toString());
    }
  };
  Logger.log(result)
  return result;
}

function getTeamList(url, sheet){
  var ss = SpreadsheetApp.openByUrl(url);
  var ws = ss.getSheetByName(sheet);
  var list = ws.getRange(2,1,ws.getRange("A2").getDataRegion().getLastRow(),1).getValues();
  list = list.concat(ws.getRange(2,3,ws.getRange("C2").getDataRegion().getLastRow(),1).getValues());
  var gamecounts = {};
  for (var i = 1; i < list.length; i++){
    if (isNaN(gamecounts[list[i].toString()])){
      gamecounts[list[i].toString()] = 1;
    } else {
      gamecounts[list[i].toString()]++;
    }
  }
  list = removeDups(list);
  list = list.sort();
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