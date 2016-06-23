$(document).ready(function() {


	//**********************
	// EVENT : On page ready
	//**********************
	
	// Array that will contain active alarms
	var activeAlarms = [];

	// GotAll function : to get all active alarms
	function gotAll(alarms) {
		
		// If there are active alarms
		if (alarms.length > 0) {

			// Get these alarms
			for (var alarm of alarms) {
				// Push alarm object properties into activeAlarms array
				activeAlarms.push([alarm.name, alarm.scheduledTime]);
			}

			// Show list of active alarms
			$('.activeAlarms').show();
			$('h3').text('Alarmes actives :');

			// Get current DateTime
			var dateActuelle = new Date(Date.now());

			// Create the <li> list elements
			for (var i = 0; i < activeAlarms.length; i++) {

				// TODO : Format this into a proper date to render inside the list !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
				var alarmDateTime = activeAlarms[i][1];

				// Calcule timezone offset delay in minutes
				var delay = Math.round((alarmDateTime - Date.now())/60000);

				// Create list element with active alarms info :
				$('ul.activeAlarms').append('<li id="alarm_' + i + '">"' + activeAlarms[i][0] +'" dans ' + delay + ' minutes</li>');

				// TODO : Create a button alongside each <li> which clear the alarm if clicked !!!!!!!!!!!!!!!
			
			}

		} else {

			$('h3').text("Pas d'alarmes actives.");
		
		}

	}

	// Hide New Alarm settings
	$('.newAlarmSettings').hide();
	
	// Hide list of active alarms
	$('.activeAlarms').hide();
	$('h3').text("Pas d'alarmes actives.");

	// Call the active alarms getter
	chrome.alarms.getAll(gotAll);


	//**********************************
	// EVENT : Click on New Alarm button
	//**********************************

	$('#BtnNewAlarm').click(function() {

		// Hide the New Alarm button
		$('#BtnNewAlarm').hide();

		// Show New Alarm settings
		$('.newAlarmSettings').show();
	});

	
	//*************************************
	// EVENT : Click on Alarm Setter button
	//*************************************

	$('#BtnAlarmSetter').click(function() {
		
		// Get New Alarm input info
		var alarmName = $('#AlarmNameSetter').val();
		var dateTimeToSet = $('#AlarmDateTimeSetter').val();

		// If there is input : TEST HERE IS CURRENTLY LACKLUSTER --> SHOULD MAYBE TEST A REGEXP TO VALIDATE DATETIME FORMAT
		if (alarmName != "" && dateTimeToSet != "") {
			// DEBUG MODE
			console.log("nom de l'alarme : " + alarmName);
			console.log("date et heure : " + dateTimeToSet);

			// Set target duration before alarm triggering
			var arrayValues = dateTimeToSet.split('-');
			var dateFormated = arrayValues[0] + "-" + arrayValues[1] + "-" + arrayValues[2] + "T" + arrayValues[3] + ":" + arrayValues[4] + ":00"; 
			var durationToSet = Date.parse(dateFormated);

			// Get current DateTime
			var dateActuelle = new Date(Date.now());

			// Calcule timezone offset delay in minutes
			var delay = (durationToSet - Date.now())/60000 + dateActuelle.getTimezoneOffset();

			// DEBUG MODE
			console.log("date saisie : " + dateFormated);
			console.log("date saisie en ms : " + durationToSet);
			console.log("date actuelle en ms : " + Date.now());
			console.log(alarmName + " sonnera dans " + delay + " minutes");

			// Create the new alarm
			var myAlarm = chrome.alarms.create(alarmName, {delayInMinutes: delay});

			// Add a notification at the end of the popup
			$('body').append('<label class="notification">"' + alarmName + '" sonnera le ' + arrayValues[0] + "-" + arrayValues[1] + "-" + arrayValues[2] + ' &agrave; ' + arrayValues[3] + ":" + arrayValues[4] + '</label>');

			// Hide the New Alarm settings
			$('.newAlarmSettings').hide();

			// Show the New Alarm button
			$('#BtnNewAlarm').show();

			// Close the popup window after a 10s timer
			window.setTimeout(function() {
				window.close();
			}, 10000);
		}
		// Else
		else {

			// DEBUG MODE
			console.log("User input is not valid data");

			// Ask the user for valid data input
			alert("Veuillez saisir un nom et une DateHeure valides.");
		}
		
	});

});