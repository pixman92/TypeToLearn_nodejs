// ===========Inits============

// init project
var express = require('express');
var app = express();
var prompt = require('prompt');
var firebase = require("firebase");
var admin = require('firebase-admin');
var $ = require("jquery");
var firebaseAuth = require("firebase-auth");

//=============firebase============
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCNWGJ75WnxPc_dlyS2bj06etO7fl2Jnp4",
    authDomain: "typetolearn-834bc.firebaseapp.com",
    databaseURL: "https://typetolearn-834bc.firebaseio.com",
    projectId: "typetolearn-834bc",
    storageBucket: "typetolearn-834bc.appspot.com",
    messagingSenderId: "1310947487"
  };
  firebase.initializeApp(config);

//========================================

app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});







//===============================
var obj = {};


function addObj() {
	//function to add obj
	//to firebase database
	var firebaseDB = firebase.database().ref(savedPath);
	firebaseDB.update(obj);
	// console.log(obj);
	consolePrint("obj", JSON.stringify(obj));
}


function createObj (dic, key) {
  //create a global obj
  // console.log("I ran");
  obj = {
  	[dic] : key
  }
  // console.log(obj);
  return obj;
}

function pathMe (path){
  var database = firebase.database().ref("/users/"+path);
  database.update(obj);
}

































// ==========================================
// Begin Forward Functioning programming
runConsoleMe();
prompt.start();
var array = [];
var first, second, third;
function runConsoleMe(){
	var current = ">>>";
	// var something = 'yes';
	prompt.get(['something'], function(err, result){
			// console.log(result.something);

			// if(result.something!="done"){	
			// 	console.log("done!");
			// }
			if(result.something=="2"){	//take in last 2 for array
				first = array[array.length-2];
				second = array[array.length-1];
				console.log("first: "+first+"\nsecond: "+
					second);
			}
			if(result.something=="3"){	//take in last 3 for array
				first = array[array.length-3];
				second = array[array.length-2];
				third = array[array.length-1];
				console.log("first: "+first+"\nsecond: "+
					second+"\nthird: " +third);
			}


			if(result.something!=undefined){
				array.push(result.something);
				// console.log(array[array.length-1]);
			}


			//=====================

			if (result.something == "addObj"){
				addObj();
			}
			if (result.something == "createObj"){
				createObj(first,second);
			}
			if (result.something == "pathMe"){
				pathMe(first);	
			}
			runConsoleMe();

	});
}

// ========================================
// listen for requests :)
var listener = app.listen(3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
