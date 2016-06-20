$(document).ready(function() {
	
	$('body').append("<p>Acitivty extension can set alarms at your demand.</p>");
	$('body').append('<input type="button" id="BtnAlarmSetter" value="Set an alarm" />');
	
	$('#BtnAlarmSetter').click(function() {
		
		// Alarm setting
		var durationToSet = parseInt(prompt("Enter a duration (in minutes) after which an alarm will be set : "));
	
		// EN MODE DEBUG
		console.log(durationToSet);

		// Création de l'alarme
		var myAlarm = chrome.alarms.create('Alarm_test', {delayInMinutes: durationToSet});

		// Fermeture de la fenêtre popup
		window.close();
	});

});