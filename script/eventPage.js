chrome.alarms.onAlarm.addListener(function(alarm) {	

	// Trigger an alert
	alert(alarm.name + ' is on !!!');

	// Clear the alarm
	chrome.alarms.clear(alarm.name);

});