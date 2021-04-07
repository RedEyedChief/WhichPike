function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}

function findModelByMissionData(domObj) {
	if (!domObj) console.error("findModelByMissionData -> domObj  -  REQUIRED");

	const jqObj = $(domObj);
	return $(`.${jqObj.data('modal-class')}[data-mission=${jqObj.data('mission')}]`);
}

function findModelComradTemplateByMissionId(missionId) {
	if (!missionId) console.error("findModelComradTemplateByMissionId -> missionId  -  REQUIRED");

	return $(`.modal[data-mission=${missionId}] .involved-comrades-container>.template`);
}

function findMessageByMissionData(domObj) {
	if (!domObj) console.error("findMessageByMissionData -> domObj  -  REQUIRED");

	const jqObj = $(domObj);
	return $(`.message[data-mission=${jqObj.data('mission')}]`);
}

function findModelBioByComradData(domObj) {
	if (!domObj) console.error("findModelBioByComradData -> domObj  -  REQUIRED");

	const jqObj = $(domObj);
	return $(`.comrade-modal-bio[data-comrade=${jqObj.data('comrade')}]`);
}

function findModelByComradData(domObj) {
	if (!domObj) console.error("findModelByComradData -> domObj  -  REQUIRED");

	const jqObj = $(domObj);
	return $(`.modal[data-comrade=${jqObj.data('comrade')}]`);
}

function findComradByComradeId(comradeId) {
	if (!comradeId) console.error("findModelByComradeId -> comradeId  -  REQUIRED");

	return $(`.comrade[data-comrade=${comradeId}]`);
}

function removeActiveComrad(elem) {
	const comrade = $(elem);
	comrade.css({'background-image': 'none'});
	removeComradActivatedStatus(comrade.attr('data-comrade'));
	comrade.removeClass('active-comrade');
	comrade.attr('data-comrade', '');
}

function removeComradActivatedStatus(comradeId) {
	if (!comradeId) console.error("removeComradActivatedStatus -> comradeId  -  REQUIRED");
	console.log(' removeComradActivatedStatus ', comradeId);

	findComradByComradeId(comradeId).find('.comrade-image').removeClass('comrade-image-used');
}

function getComradImagesByComradeId(comradeId) {
	if (!comradeId) console.error("removeComradActivatedStatus -> comradeId  -  REQUIRED");

	return $(`.comrade[data-comrade=${comradeId}] .comrade-image`);
}

function 	addComradesToMission(modal, mission) {
	if (!modal || !mission) console.error("addComradesToMission -> mission, modal  -  REQUIRED");

	const usedComrades = modal.find('.modal-common-comrade-field.active-comrade');
	let newComradesList = [];
	usedComrades.each((index, comrade) => {
		let comradeId = $(comrade).attr('data-comrade');
		mission.comrades.push(comradeId);
		newComradesList.push(comradeId);
		decreaseComradeenergy(comradeId);
	});


	return newComradesList;
}

function addComradesToEndModals(newComrades, missionId) {
	if (!newComrades || !missionId) console.error("addComradesToEndModals -> missionId, newComrades  -  REQUIRED");

	const comradTemplates = findModelComradTemplateByMissionId(missionId);
	for (const template of comradTemplates) {
		for (const comradeId of newComrades) {
			cloneElement($(template), 'filling-list', 'comrade', interfaceObjs.comrades[comradeId]);
		}
	}
}

function decreaseComradeenergy(comradeId) {
	const comrade = findComradByComradeId(comradeId);
	const topChargedenergyUnit = comrade.find('.comrade-energy-unit:not(.energy-unit-empty)').first();
	topChargedenergyUnit.addClass('energy-unit-empty');
	interfaceObjs.comrades[comradeId].energyLevel -= 1;
}

function winnerDetermining(mission, cop) {
	//const winnerSide = getRandomInt(2);
	const winnerSide = 0;

	console.log(' winnerSide ', winnerSide);
	switch (winnerSide) {
		case 0:
			mission.status = MISSION_STATUSES.return;
			return "mission";
			break;
		case 1:
			mission.status = MISSION_STATUSES.failed;
			return "cop";
			break;
		default:
			alert(' winnerDetermining -> winnerSide is ABSENT');
	}
}

function individualEscapeCheck(mission) {
	console.log('TODO: individualEscapeCheck(mission)')
	return 0;
}
