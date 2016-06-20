$(document).ready(function() {
	
	$('body').append("<p>Acitivty extension can set alarms at your demand.</p>");
	$('body').append('<input type="button" id="BtnAlarmSetter" value="Set an alarm" />');
	
	$('#BtnAlarmSetter').click(function() {
		
		// Alarm name
		var alarmName = prompt("Nom de l'alarme : ");

		// Date setting
		var dateTimeToSet = prompt("Date et heure pour cette alarme (format : AAAA-MM-JJ-hh-mm) : ");
		var arrayValues = dateTimeToSet.split('-');
		var dateFormated = arrayValues[0] + "-" + arrayValues[1] + "-" + arrayValues[2] + "T" + arrayValues[3] + ":" + arrayValues[4] + ":00"; 
		var durationToSet = Date.parse(dateFormated);

		var dateActuelle = new Date(Date.now());

		// Calcul du delai en minutes
		var delay = (durationToSet - Date.now())/60000 + dateActuelle.getTimezoneOffset();

		// EN MODE DEBUG
		console.log("date saisie : " + dateFormated);
		console.log("date saisie en ms : " + durationToSet);
		console.log("date actuelle en ms : " + Date.now());
		console.log(alarmName + " sonnera dans " + delay + " minutes");

		// Création de l'alarme
		var myAlarm = chrome.alarms.create(alarmName, {delayInMinutes: delay});

		//On ajoute une notification de l'alarme dans le corps de la page popup
		$('body').append('<p>Nouvelle alarme : ' + alarmName + ' Sonnera le ' + arrayValues[0] + "-" + arrayValues[1] + "-" + arrayValues[2] + ' &agrave; ' + arrayValues[3] + ":" + arrayValues[4] + '</p>');

		// Fermeture de la fenêtre popup après un timer de 5s
		window.setTimeout(function() {
			window.close();
		}, 5000);

	});

});