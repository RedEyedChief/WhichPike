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
	return $(`.comrad-modal-bio[data-comrad=${jqObj.data('comrad')}]`);
}

function findModelByComradData(domObj) {
	if (!domObj) console.error("findModelByComradData -> domObj  -  REQUIRED");

	const jqObj = $(domObj);
	return $(`.modal[data-comrad=${jqObj.data('comrad')}]`);
}

function findComradByComradId(comradId) {
	if (!comradId) console.error("findModelByComradId -> comradId  -  REQUIRED");

	return $(`.comrad[data-comrad=${comradId}]`);
}

function removeActiveComrad(elem) {
	const comrad = $(elem);
	comrad.css({'background-image': 'none'});
	removeComradActivatedStatus(comrad.data('comrad'));
	comrad.removeClass('qmssbctli-active');
	comrad.attr('data-comrad', '');
}

function removeComradActivatedStatus(comradId) {
	if (!comradId) console.error("removeComradActivatedStatus -> comradId  -  REQUIRED");

	findComradByComradId(comradId).find('.comrad-image').removeClass('comrad-image-used');
}
