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

function testFindGame(){	
  var requirements = {};	
  requirements.teams = ["Nebraska"];	
  findGame(requirements);	
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

function findGame(requirements){
  var requirements = requirements;
  var ss = SpreadsheetApp.openByUrl(url);
  var ws = ss.getSheetByName("Teams");
  var gws = ss.getSheetByName("Games");
  if (requirements.teams == ""){
    requirements.teams = getTeamList().list;
  }
  var num;
  if (requirements.teams.length != ws.getRange("A1").getDataRegion().getLastRow()){
    var rownums = [];
    var temp;
    var backedup = 0;
    for (var i = 1; i <= ws.getRange("A1").getDataRegion().getLastRow(); i++){
      Logger.log(requirements.teams[0] + " == " + ws.getRange("A" + i).getValue());
      if (requirements.teams[0] == (ws.getRange("A"+i).getValue())){
        temp = ws.getRange(i, 1).getDataRegion(SpreadsheetApp.Dimension.COLUMNS).getValues()[0];
          for (var c = 2; c < temp.length; c++){
            rownums.push(temp[c].toString());
          }
        requirements.teams.shift();
        if (requirements.teams.length == 0){
          break;
        }
        backedup = 0;
      } else if(backedup == 0){
        if (ws.getRange("A"+i).getValue().localeCompare(requirements.teams[0]) == -1){
          i += 9;
        } else {
          i -= 9;
          backedup = 1;
        }
      }
    }
    num = rownums[Math.floor(Math.random() * rownums.length)];
  } else {
    num = Math.floor(Math.random() * ws.getRange("A1").getDataRegion().getLastRow());
  }
  var row = gws.getRange(num, 1, 1, 9).getValues();
  var rowarray = [];
  for (var i = 0; i < row.length; i++) {
    rowarray.push(row[i]);
  }
  return rowarray;
}