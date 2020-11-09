function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}

function findModelByMissionData(domObj) {
	if (!domObj) console.error("findModelByMissionData -> domObj  -  REQUIRED");

	const jqObj = $(domObj);
	return $(`.${jqObj.data('modal-class')}[data-mission=${jqObj.data('mission')}]`)
}

function findMessageByMissionData(domObj) {
	if (!domObj) console.error("findMessageByMissionData -> domObj  -  REQUIRED");

	const jqObj = $(domObj);
	return $(`.message[data-mission=${jqObj.data('mission')}]`)
}

function findModelByComradData(domObj) {
	if (!domObj) console.error("findModelByComradData -> domObj  -  REQUIRED");

	const jqObj = $(domObj);
	console.log(' INTO findModelByComradData ', jqObj.data('comrad'), $(`.comrad-modal-bio[data-comrad=${jqObj.data('comrad')}]`))
	return $(`.comrad-modal-bio[data-comrad=${jqObj.data('comrad')}]`)
}