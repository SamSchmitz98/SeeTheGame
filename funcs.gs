function rangeToList(range) {
  var result = [];
  var temp;
  for (var i = 0; i < range.length; i++){
    temp = range[i].toString();
    if (temp != ''){
      result.push(temp);
    }
  };
  return result;
}

function getTeamList(){
  var ss = SpreadsheetApp.openByUrl(url);
  var ws = ss.getSheetByName("Teams");
  var list = ws.getRange(1,1,ws.getRange("A1").getDataRegion().getLastRow(),1).getValues();
  var gamecounts = ws.getRange(1,2,ws.getRange("B1").getDataRegion().getLastRow(),1).getValues();
  list = rangeToList(list);
  gamecounts = rangeToList(gamecounts);
  var result = {list, gamecounts};
  return result;
}

function testFindGame(){
  var requirements = {};
  requirements.teams = ["Air Force", "Alabama"];
  findGame(requirements);
}

function findGame(requirements){
  var requirements = requirements;
  var ss = SpreadsheetApp.openByUrl(url);
  var ws = ss.getSheetByName("Teams");
  var gws = ss.getSheetByName("Games");
  if (requirements.teams == ""){
    requirements.teams = getTeamList(url, "Games").list.slice(1);
  }
  var rownums = [];
  var temp;
  var count = 0;
  for (var i = 1; i <= ws.getRange("A1").getDataRegion().getLastRow(); i++){
    if (requirements.teams.includes(ws.getRange("A"+i).getValue())){
      temp = rangeToList(ws.getRange(i, 1).getDataRegion(SpreadsheetApp.Dimension.COLUMNS).getValues()[0]);
        for (var c = 2; c < temp.length; c++){
          rownums.push(temp[c].toString());
        }
    count += 1;
      if (count == requirements.teams.length){
        break;
      }
    }
  }
  Logger.log(rownums);
  var num = rownums[Math.floor(Math.random() * rownums.length)];
  var row = gws.getRange(num, 1, 1, 9).getValues();
  var rowarray = [];
  for (var i = 0; i < row.length; i++) {
    rowarray.push(row[i]);
  }
  return rowarray;
}