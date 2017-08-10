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

app.get("/code/:language/:num", function (request, response) {
	//http request to print out code

	if(request.params.language=="html"){
		getFromFirebase("/html/beginner/"+request.params.num, function() {
			// console.log("hello");
			response.send("HTML rules!\n"+fromFirebase);
		});
	}
	if(request.params.language=="javascript"){
		getFromFirebase("/javascript/beginner/"+request.params.num, function() {
			// console.log("hello");
			response.send("JavaScript rules!\n"+fromFirebase);
		});
	}
	if(request.params.language=="python"){
		// getFromFirebase("/python/beginner/0", function () {
		// 	response.send("python rules!" + fromFirebase);
		// });
		getFromFirebase("/python/beginner/"+request.params.num, function () {
			response.send("python rules!" + fromFirebase);
		});

	}

})




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

var fromFirebase;

function getFromFirebase (pathToCode, callback) {
	//function to get data from firebase,
	//save to variable,
	//send to response express route
	var firebaseDB = firebase.database().ref('/users/code/'+pathToCode);
	firebaseDB.once("value", function(snapshot){
		console.log(snapshot.val());
		fromFirebase = snapshot.val();
		callback();
	});
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
			if (result.something == "getFromFirebase"){
				getFromFirebase(first);
			}
			runConsoleMe();

	});
}

// ========================================
// listen for requests :)
var listener = app.listen(3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
