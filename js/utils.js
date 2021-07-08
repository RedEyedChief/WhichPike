function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}

function findModalByMissionData(domObj) {
	if (!domObj) console.error("findModalByMissionData -> domObj  -  REQUIRED");

	const jqObj = $(domObj);
	return $(`.${jqObj.data('modal-class')}[data-mission=${jqObj.data('mission')}]`);
}

function findModalComradTemplateByMissionId(missionId) {
	if (!missionId) console.error("findModalComradTemplateByMissionId -> missionId  -  REQUIRED");

	return $(`.modal[data-mission=${missionId}] .involved-comrades-container>.template`);
}

function findModalResultComradTemplate(missionId) {
	if (!missionId) console.error("findModalResultComradTemplate -> missionId  -  REQUIRED");

	return $(`.mission-modal-result[data-mission=${missionId}] .involved-comrades-container>.template`);
}

function findModalResultByMissionId(missionId) {
	if (!missionId) console.error("findModalResultByMissionId -> missionId  -  REQUIRED");

	return $(`.mission-modal-result[data-mission=${missionId}]`);
}

function findMessageByMissionData(domObj) {
	if (!domObj) console.error("findMessageByMissionData -> domObj  -  REQUIRED");

	const jqObj = $(domObj);
	return $(`.message[data-mission=${jqObj.data('mission')}]`);
}

function findModalBioByComradData(domObj) {
	if (!domObj) console.error("findModalBioByComradData -> domObj  -  REQUIRED");

	const jqObj = $(domObj);
	return $(`.comrade-modal-bio[data-comrade=${jqObj.data('comrade')}]`);
}

function findModalByComradData(domObj) {
	if (!domObj) console.error("findModalByComradData -> domObj  -  REQUIRED");

	const jqObj = $(domObj);
	return $(`.modal[data-comrade=${jqObj.data('comrade')}]`);
}

function findComradByComradeId(comradeId) {
	if (!comradeId) console.error("findModalByComradeId -> comradeId  -  REQUIRED");

	return $(`.comrade[data-comrade=${comradeId}]`);
}

function removeActiveComrade(elem) {
	const comrade = $(elem);
	comrade.css({'background-image': 'none'});
	removeComradActivatedStatus(comrade.attr('data-comrade'));
	comrade.removeClass('active-comrade');
	comrade.attr('data-comrade', '');
}

function removeComradActivatedStatus(comradeId) {
	if (!comradeId) console.error("removeComradActivatedStatus -> comradeId  -  REQUIRED");
	findComradByComradeId(comradeId).find('.comrade-image').removeClass('comrade-image-used');
}

function getComradImagesByComradeId(comradeId) {
	if (!comradeId) console.error("removeComradActivatedStatus -> comradeId  -  REQUIRED");

	return $(`.comrade[data-comrade=${comradeId}] .comrade-image`);
}

function addComradesToMission(modal, mission) {
	if (!modal || !mission) console.error("addComradesToMission -> mission, modal  -  REQUIRED");

	const usedComrades = modal.find('.modal-common-comrade-field.active-comrade');
	let newComradesList = [];
	usedComrades.each((index, comrade) => {
		let comradeId = $(comrade).attr('data-comrade');
		mission.comrades.push(comradeId);
		newComradesList.push(comradeId);
		decreaseComradeEnergy(comradeId);
	});


	return newComradesList;
}

function addComradesToResultModal(newComrades, missionId) {
	if (!newComrades || !missionId) console.error("addComradesToResultModal -> missionId, newComrades  -  REQUIRED");

	const comradTemplate = findModalResultComradTemplate(missionId);
	for (const comradeId of newComrades) {
		cloneElement($(comradTemplate), 'filling-list', 'comrade', interfaceObjs.comrades[comradeId]);
	}
}

function decreaseComradeEnergy(comradeId) {
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

function checkComradesSpecialRequirements(mission, requirement, shouldBe) {
	console.log('INTO checkComradesSpecialRequirements: requirement, shouldBe ', requirement, shouldBe)
	for (let comradeId of mission.comrades) {
		if(interfaceObjs.comrades[comradeId][requirement] === shouldBe ||
		   interfaceObjs.comrades[comradeId][requirement][shouldBe]) {
			return true;
		}
	}

	return false
}

function arrayRemove(array, value) {
    return array.filter(elem => elem !== value);
}
