var fs = require('fs');
var data = fs.readFileSync('db/result.json');
var results = JSON.parse(data);
console.log(results);

//console.log('server is starting');
var express = require('express');
var app = express();
var server = app.listen(3000, listening);

function listening() {
  console.log('listening. . . ');
}

app.use(express.static('website'));

app.get('/add/:NameOrEmail/:Dominance/:Influence/:Steadiness/:Compliance?', addResult);
function addResult(request, response) {

  //#region Get Time Stamp  
  let date_ob = new Date();

  // current date
  // adjust 0 before single digit date
  let date = ("0" + date_ob.getDate()).slice(-2);

  // current month
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

  // current year
  let year = date_ob.getFullYear();

  // current hours
  let hours = date_ob.getHours();

  // current minutes
  let minutes = date_ob.getMinutes();

  // current seconds
  let seconds = date_ob.getSeconds();

  //#endregion

  var data = request.params;
  data["Created"] = date + "-" + month + "-" + year + " " + hours + ":" + minutes + ":" + seconds;

  var reply;
  if (data.NameOrEmail === "") {
    var reply = {
      msg: 'Name or Email is required.'
    };
    response.send(reply);
  } else {
    results.push(data);
    fs.writeFile('result.json', JSON.stringify(results, null, 2), finished);
  }
}

function finished(err) {
  console.log('File added.');
}

app.get('/all', sendAll);
function sendAll(request, response) {
  response.send(results);
}

app.get('/search/:NameOrEmail/', searchWord);
function searchWord(request, response) {
  var NameOrEmail = request.params.NameOrEmail;
  var reply;

  results.forEach(function (resultItem) {
    if (resultItem.NameOrEmail == NameOrEmail) {
      reply = {
        Status: 'found',
        Created: resultItem.created,
        NameOrEmail: resultItem.NameOrEmail,
        Dominance: resultItem.Dominance,
        Influence: resultItem.Influence,
        Steadiness: resultItem.Steadiness,
        Compliance: resultItem.Compliance
      };
    } else {
      reply = {
        Status: 'not found',
        NameOrEmail: NameOrEmail
      };
    }
  });
  response.send(reply);
}