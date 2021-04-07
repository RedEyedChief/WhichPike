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

function generateCarPoints(entity) {
	const firstPointId = entity.routes.main[0];
	for(let [key, route] of Object.entries(entity.routes)) {
		entity.generatedWays[key] = [];

		for (let point of route) {
			entity.generatedWays[key].push({
				...interfaceObjs.points[point],
				status : point === firstPointId ? "past" : "next"
			})
		}
	}

	console.log(' POINTS GENERED ', entity);
}

function generateMissions() {
	for (let mission of MISSIONS) {
		interfaceObjs.missions[mission.id] = mission;
		generateCarPoints(mission);
		cloneElement($('#mission-flags>.template'), 'mission-flag', 'mission', mission);
		cloneElement($('#mission-modals-start>.template'), 'mission-modal-start', 'mission', mission);
		cloneElement($('#calls-container>.template'), 'mission-call', 'mission', mission);
		cloneElement($('#mission-cars>.template'), 'mission-car', 'mission', mission);
		generateUponArrivalFlow(mission);
	}
}

function generateCops() {
	for (let cop of COPS) {
		interfaceObjs.cops[cop.id] = cop;
		generateCarPoints(cop);
		cloneElement($('#cop-cars>.template'), 'cop-car', 'cop', cop);
	}
}

function generateComrades() {
	for (let comrade of COMRADES) {
		interfaceObjs.comrades[comrade.id] = comrade;
		cloneElement($('#team-container>.template'), 'comrade', 'comrade', comrade);
		cloneElement($('#comrade-modals-bio>.template'), 'comrade-modal-bio', 'comrade', comrade);
	}
}

function generateUponArrivalFlow(mission) {
	const missionStory = getRandomInt(3);
	//const missionStory = 0;
	mission.uponArrival.storyLine = missionStory;
	const messageTemplate = $('#messages-container>.template');

	switch (missionStory) {
		case 0:
			mission.uponArrival.status = MISSION_STATUSES.uponArrival.manual;
			cloneElement($('#mission-modals-end-success>.template'), 'mission-modal-end-success', 'mission', mission);
			cloneElement($('#mission-modals-end-neutral>.template'), 'mission-modal-end-neutral', 'mission', mission);
			cloneElement($('#mission-modals-end-fail>.template'), 'mission-modal-end-fail', 'mission', mission);
			const modal = cloneElement($('#mission-modals-manual>.template'), 'mission-modal-manual', 'mission', mission);
			mission.uponArrival.displayWidget = modal;

			break;

		case 1:
			mission.uponArrival.status = MISSION_STATUSES.uponArrival.fake;
			mission.uponArrival.displayWidget = cloneElement(messageTemplate, 'mission-message', 'mission', mission);
			cloneElement($('#mission-modals-fake>.template'), 'mission-modal-one-action', 'mission', mission);
			break;

		case 2:
			mission.uponArrival.status = MISSION_STATUSES.uponArrival.self;
			mission.uponArrival.displayWidget = cloneElement(messageTemplate, 'mission-message', 'mission', mission);
			cloneElement($('#mission-modals-self>.template'), 'mission-modal-one-action', 'mission', mission);
			break;

		/*case 3:
			mission.uponArrival.status = MISSION_STATUSES.uponArrival.cops;
			mission.uponArrival.displayWidget = cloneElement(messageTemplate, 'mission-message', 'mission', mission);
			cloneElement($('#mission-modals-cops>.template'), 'mission-modal-one-action', 'mission', mission);
			break; */

		default :
			console.error(' generateUponArrivalFlow -> missionStory is ABSENT');
	}
}

function checkQuestStartButtons(elem) {
	const parent = $(elem).closest('.modal');
	// console.log(' into checkQuestStartButtons ', $(parent).find('.active-comrade'), parent.find('.active-comrade').length)

	if(parent.find('.active-comrade').length) {
		parent.find('.modal-empty-comrade-list-close-btn').addClass('notDisplay');
		parent.find('.modal-mission-btns').removeClass('notDisplay');
	} else {
		parent.find('.modal-empty-comrade-list-close-btn').removeClass('notDisplay');
		parent.find('.modal-mission-btns').addClass('notDisplay');
	}
}

function showModal(modal) {
	if(modal) modal.show();

	pauseLoop();
}

function closeModal(modal) {
	console.log('WHAT HAPPENED? ', modal);
	modal.hide();
	unPauseLoop();
}


function showQuestStoryModal(mission) {
	console.log('INTO showQuestStoryModal ');
	showModal(mission.uponArrival.displayWidget);

	if (mission.uponArrival.status === MISSION_STATUSES.uponArrival.manual) {
		console.log(' @@@@ GET RECT?')
		//pauseLoop();
	}
	else if (mission.uponArrival.status === MISSION_STATUSES.uponArrival.cops) {
		for (const comradId of mission.comrades) {
			const comradImages = getComradImagesByComradId(comradId);
			console.log(' comradImages ', comradImages);

			for (const comradImage of comradImages) {
				$(comradImage).find('.comrade-image-extra-action').addClass('comrade-image-cops')
			}
		}
	}
}

function showQuestModal(mission) {
	showModal();
	console.log("INTO showQuestModal");

	$(mission).attr('data-modal-class', 'mission-modal-start');
	findModelByMissionData(mission).show();

}

// eic - element info collection | < mission, call, car ... >
function cloneElement(template, type, entityType, eic) {
	if (!template || !type || !entityType || !eic) console.error("template, type, entityType, eic  -  EXPECTED");

	const newElement = template.clone().removeClass('template');

	const dataAttr = 'data-' + entityType;
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

			eic.carId = newCarId;
			interfaceObjs.cars[newCarId] = {
						id 		: newCarId,
				domObj 		: newElement,
				missionId : eic.id,
				way				: eic.generatedWays.main,
				status		: 'hidden',
				fraction	: 'family',
				type : 'default'
			}
			break;

		case 'cop-car' :
			const newCopCarId = `car-${eic.id}`;

			newElement.attr('id', newCopCarId);
			newElement.css({
					"top" : (interfaceObjs.points.copSpawn.y-template.height())+'px',
					"left" : (interfaceObjs.points.copSpawn.x-template.width()/2)+'px'
				});

			eic.carId = newCopCarId;
			interfaceObjs.cars[newCopCarId] = {
						 id : newCopCarId,
				 domObj : newElement,
					copId : eic.id,
						way : eic.generatedWays.main,
				 status : 'hidden',
				 fraction	: 'cop',
				 type : 'default'
			}
			break;

		case 'reinforcement-car':
			const newRfCarId = `rf-car-${eic.id}`;

			newElement.attr('id', newRfCarId);
			newElement.css({
					"top" : (interfaceObjs.points.spawn.y-template.height())+'px',
					"left" : (interfaceObjs.points.spawn.x-template.width()/2)+'px',
					"visibility": "visible"
				});

			eic.rfCarId = newRfCarId;
			interfaceObjs.cars[newRfCarId] = {
						id 		: newRfCarId,
				domObj 		: newElement,
				missionId : eic.id,
				way				: eic.generatedWays.main,
				status		: 'drive',
				fraction	: 'family',
				type  : 'reinforcement'
			}
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
			break;comrade

		case 'mission-modal-end-fail':
			console.log('SWITCH: mission-modal-end-fail');
			break;

		case 'comrade':
			newElement.find('.comrade-title').text(eic.content.name);
			newElement.find('.comrade-power-counter').text(eic.content.power);
			newElement.find('.comrade-image').css({
				"background-image" : `url(${eic.content.img})`
			});

			const fatigueLevel = MAX_COMRADE_energy - eic.energyLevel;
			if (fatigueLevel) {
				const energyUnits = newElement.find('.comrade-energy-unit');
				let loopIndex = 1;
				for (unit of energyUnits) {
					$(unit).addClass('energy-unit-empty');
					if(loopIndex === fatigueLevel) break;
					loopIndex++;
				}
			}

			eic.domObjs.comrade = newElement;
			break;

		case 'comrade-modal-bio':
			newElement.find('.comrade-modal-image').css({
				"background-image" : `url(${eic.content.img})`
			});
			eic.domObjs.modalBio = newElement;
			break;

		case 'filling-list':
			newElement.find('.comrade-title').text(eic.content.name);
			newElement.find('.comrade-power-counter').text(eic.content.power);
			newElement.find('.comrade-image').css({
				"background-image" : `url(${eic.content.img})`
			});
			break;

		case 'reinforcement-modal':
			newElement.attr('data-cop', eic.copId);
			break;

		default :
			console.error(' cloneElement -> type is ABSENT');

	}

	newElement.appendTo(template.parent());

	// if(eic.status === "demo" && type !== 'mission-car') newElement.removeClass('hide');

	return newElement;
}


function createModalReinforcement(mission) {
	const newModal = cloneElement($('#mission-modals-reinforcement>.template'), 'reinforcement-modal', 'mission', mission);
	for (let comradId of mission.comrades) {
		engageComrad(newModal, interfaceObjs.comrades[comradId].domObjs.comrade, false);
	}

	newModal.show();
	showModal();
}

function engageComrad(missionModal, comrade, isDefault = true) {
	const comradField = isDefault ? '.modal-common-comrade-field' : '.existed-comrade'
	const comradImage = comrade.find('.comrade-image');
	const sameComrades = missionModal.find(`${comradField}[data-comrade="${comrade.data('comrade')}"]`);
	const freeSlot = missionModal.find(`${comradField}:not(.active-comrade)`).first();
	if (!sameComrades.length && freeSlot) {
		const imagePath = comradImage.css('background-image');
		const newSquadSlot = freeSlot;
		newSquadSlot.css({'background-image': imagePath});
		newSquadSlot.addClass('active-comrade');
		newSquadSlot.attr('data-comrade', comrade.data('comrade'));
		comradImage.addClass('comrade-image-used');
		checkQuestStartButtons(freeSlot);
	}
}

function generateReinforcementCar(mission) {
	const newCar = cloneElement($('#mission-cars>.template'), 'reinforcement-car', 'mission', mission);
	generateUponArrivalReinforcementFlow(mission);

	return newCar;
}

function generateUponArrivalReinforcementFlow(mission) {
	// interfaceObjs.cars[mission.rfCarId].domObj.hide();
}
