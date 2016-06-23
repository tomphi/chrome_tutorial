
//**************************
// EVENT : OnAlarm triggered
//**************************

chrome.alarms.onAlarm.addListener(function(alarm) {	

	// Acutal DateTime
	var dateActuelle = new Date(Date.now());

	// DateTime formated
	strDateActuelle = "It's time (" + dateActuelle.getDay() + "/" + dateActuelle.getMonth() + "/" + dateActuelle.getFullYear() + " " + dateActuelle.getHours() + ":" + dateActuelle.getMinutes() + ")";

	// Trigger an alert
	alert(strDateActuelle + ' --> "' + alarm.name + '"');

	// Clear the alarm
	chrome.alarms.clear(alarm.name);

});