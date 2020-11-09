function generatePoints() {
	const points = $('.point');

	for (let point of points) {
		const offsetSet = $(point).offset();
		interfaceObjs.points[point.id] = {
			id : point.id,
			x : offsetSet.left,
			y : offsetSet.top,
			/*dur : 2,
			status : point.id === 'spawn' ? "past" : "next"*/
		};
	}
}

function generateMissionPoints(mission) {
	for (let point of mission.route) {
		mission.points.push({
			...interfaceObjs.points[point],
			status : point === 'spawn' ? "past" : "next"
		})
	}

	console.log(' AFTER missions generation ', mission.points);

}

function generateMissions() {
	for (let mission of MISSIONS) {
		interfaceObjs.missions[mission.id] = mission;
		cloneElement($('#mission-flags>.template'), 'mission-flag', 'mission', mission);
		cloneElement($('#mission-modals-start>.template'), 'mission-modal-start', 'mission', mission);
		cloneElement($('#calls-container>.template'), 'mission-call', 'mission', mission);
		cloneElement($('#cars>.template'), 'mission-car', 'mission', mission);
		generateMissionPoints(mission);
		uponArrivalFlow(mission);

	}

	console.log(' ~~~ MISSIONS GENERED ~~~ ');

}

function generateComrads() {
	for (let comrad of COMRADS) {
		interfaceObjs.comrads[comrad.id] = comrad;
		cloneElement($('#team-container>.template'), 'comrad', 'comrad', comrad);
		cloneElement($('#comrad-modals-bio>.template'), 'comrad-modal-bio', 'comrad', comrad);
		// cloneElement($('#mission-modals-start>.template'), 'mission-modal-start', mission);

	}

	console.log(' ~~~ COMRADS GENERED ~~~ ');
}

function uponArrivalFlow(mission) {
	const missionStory = getRandomInt(4);
	// const missionStory = 0;
	mission.uponArrival.storyLine = missionStory;

	switch (missionStory) {
		case 0:
			console.log(' missionStory manual')
			mission.uponArrival.status = "manual";
			cloneElement($('#mission-modals-end-success>.template'), 'mission-modal-end-success', 'mission', mission);
			cloneElement($('#mission-modals-end-neutral>.template'), 'mission-modal-end-neutral', 'mission', mission);
			cloneElement($('#mission-modals-end-fail>.template'), 'mission-modal-end-fail', 'mission', mission);
			const modal = cloneElement($('#mission-modals-manual>.template'), 'mission-modal-manual', 'mission', mission);
			mission.uponArrival.displayWidget = modal;

			break;

		case 1:
			console.log(' missionStory fake')
			mission.uponArrival.status = "fake";
			mission.uponArrival.displayWidget = cloneElement($('#messages-container>.template'), 'mission-message', 'mission', mission);
			cloneElement($('#mission-modals-fake>.template'), 'mission-modal-one-action', 'mission', mission);
			break;

		case 2:
			console.log(' missionStory self')
			mission.uponArrival.status = "self";
			mission.uponArrival.displayWidget = cloneElement($('#messages-container>.template'), 'mission-message', 'mission', mission);
			cloneElement($('#mission-modals-self>.template'), 'mission-modal-one-action', 'mission', mission);
			break;

		case 3:
			console.log(' missionStory cops')
			mission.uponArrival.status = "cops";
			mission.uponArrival.displayWidget = cloneElement($('#messages-container>.template'), 'mission-message', 'mission', mission);
			cloneElement($('#mission-modals-cops>.template'), 'mission-modal-one-action', 'mission', mission);
			break;

		default : 
			console.error(' uponArrivalFlow -> missionStory is ABSENT');			
	}
}

function checkQuestStartButtons(elem) {
	const parent = $(elem).closest('.modal');
	// console.log(' into checkQuestStartButtons ', $(parent).find('.qmssbctli-active'), parent.find('.qmssbctli-active').length)

	if(parent.find('.qmssbctli-active').length) {
		parent.find('.qms-empty-list-close-btn').addClass('notDisplay');
		parent.find('.qms-buttons').removeClass('notDisplay');
	} else {
		parent.find('.qms-empty-list-close-btn').removeClass('notDisplay');
		parent.find('.qms-buttons').addClass('notDisplay');
	}
}

function showModal() {
	pauseLoop();
}

function closeModal() {
	unPauseLoop();
}


function showQuestStoryModal(mission) {
	console.log('INTO showQuestStoryModal ');
	mission.uponArrival.displayWidget.show();

	if (mission.uponArrival.status === "manual") pauseLoop();
}

function showQuestModal(mission) {
	showModal();
	console.log("INTO showQuestModal");

	$(mission).attr('data-modal-class', 'mission-modal-start');
	findModelByMissionData(mission).show();

}

// eic - element info collection | < mission, call ... >
function cloneElement(template, type, entityType, eic) {
	if (!template || !type || !entityType || !eic) console.error("template, type, entityType, eic  -  EXPECTED");

	const newElement = template.clone().removeClass('template');

	const dataAttr = entityType === "mission" ? 'data-mission' : 'data-comrad';
	newElement.attr(dataAttr, eic.id);

	switch (type) {
		case 'mission-flag':
			newElement.find('.mission-flag-countdown').text(eic.countdown.startCounter);
			newElement.css({
				"top" : eic.position.top + 'vh',
				"left" : eic.position.left + 'vw'
			});
			eic.domObjs.flag = newElement;
			break;

		case 'mission-modal-start' :
			newElement.find('.qmsdbta-content').text(eic.content.description);
			newElement.find('.qms-dscr-bl-image').css({
				"background-image" : `url(${eic.src.img})`
			});
			eic.domObjs.modalStart = newElement;
			break;

		case 'mission-call' :
			newElement.find('.call-text-block').text(eic.content.title);
			newElement.find('.call-mission-countdown').text(eic.countdown.currentCounter);
			eic.domObjs.call = newElement;
			break;

		case 'mission-car' :
			const newCarId = `car-${eic.id}`;

			newElement.attr('id', newCarId);
			newElement.css({
					"top" : (interfaceObjs.points.spawn.y-template.height())+'px',
					"left" : (interfaceObjs.points.spawn.x-template.width()/2)+'px'
				});

			eic.car.id = newCarId;
			eic.car.domObj = newElement;
			break;

		case 'mission-modal-manual':
			newElement.find('.story-line-end').attr('data-mission', eic.id);
			break;

		case 'mission-message':
			newElement.find('.message-text-block').text(eic.content.title);
			newElement.attr('data-modal-class', `mission-modal-${eic.uponArrival.status}`);
			break;

		case 'mission-modal-one-action':
			newElement.addClass(`mission-modal-${eic.uponArrival.status}`);
			break;

		case 'mission-modal-end-success':
			console.log('SWITCH: mission-modal-end-success');
			break;

		case 'mission-modal-end-neutral':
			console.log('SWITCH: mission-modal-end-neutral');
			break;comrad

		case 'mission-modal-end-fail':
			console.log('SWITCH: mission-modal-end-fail');
			break;

		case 'comrad':
			console.log('SWITCH: comrad');
			newElement.find('.comrad-title').text(eic.content.title);
			newElement.find('.comrad-power-counter').text(eic.content.power);
			newElement.find('.comrad-image').css({
				"background-image" : `url(${eic.content.img})`
			});
			break;

		case 'comrad-modal-bio':
			console.log('SWITCH: comrad-modal-bio');
			newElement.find('.comrad-modal-image').css({
				"background-image" : `url(${eic.content.img})`
			});
			break;

		default : 
			console.error(' cloneElement -> type is ABSENT');

	}

	newElement.appendTo(template.parent());

	if(eic.status === "demo" && type !== 'mission-car') newElement.removeClass('hide');

	return newElement;
}










