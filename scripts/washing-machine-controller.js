function objectWashingOptions(node) {
	this.node = node;
	this.svg = document.getElementById("washingMachine").contentDocument;
	this.arrayHoursMinutes;
	this.period;
	this.initValueObject = {
		switchNode: false,
		program: []
	};
	this.init();
}



objectWashingOptions.prototype.init = function () {

	if (this.node.name === 'status') {
		this.activeteObjectForms();

	} else if (this.node.name === 'switch') {
		this.activateSwitch();
	} else if (this.node.name === 'program') {
		this.SelectProgram();
	} else if (this.node.name === 'submit') {
		this.submitForm();

	} else if (this.node.name === 'startNew') {
		this.restoreObjectForms();

	} else if (this.node.name === 'pause') {
		this.stopTimer();

	} else if (this.node.name === 'restore') {
		this.restoreTimer();
		
	} else if (this.node.name === 'agree') {
		this.actionModal();
		
	} else if (this.node.name === 'disagree') {
		this.popupHide();	
	}

}


objectWashingOptions.prototype.initValue = function (node) {

	if (node.name === 'switch') {
		this.initValueObject.switchNode = node.checked;
	} else if (node.name === 'program') {
		this.initValueObject.program.push(node.checked);
	}

}


objectWashingOptions.prototype.activeteObjectForms = function () {
	
	var elements = document.querySelectorAll('#panel input:not([name="status"])');
	washMachineModel.status = document.forms.washingOptions.status;

	for (var i = 0; i < elements.length; i++) {
		this.initValue(elements[i]);
		if (this.node.checked) {
			elements[i].disabled = false;

		} else {
			elements[i].disabled = true;
		}
	}

	this.updateActiveteObjectFormsView();
}

objectWashingOptions.prototype.activateSwitch = function () {

	washMachineModel.stausSwitch = this.node.checked;

	this.updateSwitchView();

}

objectWashingOptions.prototype.SelectProgram = function () {

	var programsList = document.querySelectorAll('input[name = program]');

	for (var i = 0; i < programsList.length; i++) {

		if (programsList[i].id === this.node.id) {
			this.updateSelectProgramView(i);
		}
	}
}




objectWashingOptions.prototype.submitForm = function () {
	event.preventDefault();

	
	if (!washMachineModel.stausSwitch) {
		this.actionModal();

	} else {
		this.submitFormAllOptions();
	}


}
objectWashingOptions.prototype.submitFormAllOptions = function () {
	var outputTimer = document.getElementById('panel');
	var outputActions = document.getElementById('panel-in-process');
	var outputActionsHeader = document.querySelector('#panel-in-process > h3');
	var programName = document.querySelector('input[name="program"]:checked').id;
	var arrayHoursMinutes = washMachineModel.washingOptions[programName].time.split(':');
	var outputTimer = document.getElementById('panel');
	var timerSeconds = document.getElementById('seconds');
	var timerHours = document.getElementById('hours');
	var timerMinutes = document.getElementById('minutes');


	outputTimer.classList.add('hide');
	outputActions.classList.remove('hide');
	outputActionsHeader.innerHTML = 'Program ' + programName + ' is running';
	timerSeconds.innerHTML = '04';
	timerHours.innerHTML = arrayHoursMinutes[0];
	timerMinutes.innerHTML = arrayHoursMinutes[1];
	washMachineModel.statusWashing = 'process';


	setTimeout(window.timerGlobal, 1000);
	objectWashingOptions.updateAnimateView()


}

objectWashingOptions.prototype.stopTimer = function () {
	this.node.disabled = true;
	washMachineModel.statusWashing = 'pause';
	document.querySelector('input[name="restore"]').disabled = false;

	this.updateStatusView();
	objectWashingOptions.updateAnimateView();
	window.timerGlobal()
}


objectWashingOptions.prototype.restoreTimer = function () {

	washMachineModel.animate = false;
	this.node.disabled = true;
	document.querySelector('input[name="pause"]').disabled = false;
	washMachineModel.statusWashing = 'process';

	this.updateStatusView();
	objectWashingOptions.updateAnimateView()
	window.timerGlobal()
}



objectWashingOptions.prototype.restoreObjectForms = function () {

	var message = document.querySelector('p.message');

	washMachineModel.animate = false;
	message.parentNode.removeChild(message);
	document.getElementById('panel-in-process').classList.add('hide');
	document.getElementById('panel').classList.remove('hide');
	document.querySelector('input[name="startNew"]').classList.add('hide');
	document.querySelector('input[name="pause"]').classList.remove('hide');
	document.querySelector('input[name="restore"]').classList.remove('hide');

	this.defaultView();
}




objectWashingOptions.statusOnChange = function () {

	if (washMachineModel.statusWashing === 'finished') {
		document.querySelector('input[name="pause"]').classList.add('hide');
		document.querySelector('input[name="restore"]').classList.add('hide');
		document.querySelector('input[name="startNew"]').classList.remove('hide');
		
		this.updateAnimateView();

	}

}



objectWashingOptions.prototype.actionModal = function () {

	if (!washMachineModel.modalStatus) {
		this.popupMasterView();
		
	}else{
		this.popupHide();		
		this.submitFormAllOptions();
	}


}


