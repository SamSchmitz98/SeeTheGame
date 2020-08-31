var url = "https://docs.google.com/spreadsheets/d/1jSxZJZLt94UTgXrne3mddSEatm8pvDOqVjMhhCE21QI/edit#gid=0";
var primarycolor = "blue";
var boxtextcolor = "black";
var Route = {};
Route.path = function(route, callback){
  Route[route] = callback;
}

function doGet(e) {

  Route.path("game", loadGame);
  Route.path("home", loadHome);
  
  if(Route[e.parameters.v]) {
  return Route[e.parameters.v]();
  } else {
    return loadHome();
  }
}

function loadGame(){
  return render("game");
}

function loadHome(){
  htmlListArray = getTeamList(url, "Games");
  return render("home",{teams: htmlListArray});
}
