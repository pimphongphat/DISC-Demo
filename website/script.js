function setup() {
  console.log('running');

  var button = select('#submit');
  button.mousePressed(submitResult);
}

function submitResult() {
  var NameOrEmail = select('#NameOrEmail').value();
  var Dominance = select('#D').value();
  var Influence = select('#I').value();
  var Steadiness = select('#S').value();  
  var Compliance = select('#C').value();    

  loadJSON('add/' + NameOrEmail + '/' + Dominance + '/'+Influence+'/'+Steadiness+'/'+Compliance, finished);

  function finished(data) {
    console.log(data);
  }
}
