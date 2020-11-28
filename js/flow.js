function startMission(mission) {
	if (!mission) console.error("startMission -> mission  -  EXPECTED")
	mission.countdown.initTime = Date.now();
	mission.status = "active";

	showMission(mission.id);
}

function showMission(missionId) {
	if (!missionId) console.error("showMission -> missionId  -  EXPECTED")
	$(`.mission-flag[data-mission=${missionId}],` +
	  `.call[data-mission=${missionId}]`).show();
}

function acceptMission(modal) {
	if (!modal) console.error("acceptMission -> modal  -  EXPECTED")

	const missionId = modal.data('mission');
	const mission = interfaceObjs.missions[missionId];

	$(`.mission-car[data-mission=${missionId}]`).css({ "visibility": "visible" });
	mission.domObjs.flag.hide();
	mission.domObjs.call.hide();
	mission.status = "accepted";
	interfaceObjs.cars[mission.carId].status = 'driving';
	const newComrades = addComradesToMission(modal, mission);
	addComradesToEndModals(newComrades, missionId);
}

function missionCounterUpdate(mission) {
	let deltaTime = Date.now() - mission.countdown.initTime;
	let diffCounter = (deltaTime)/1000;
	let newCounter = mission.countdown.startCounter - Math.floor(diffCounter);
	/*console.log(' + DECREASE FLOW:  ');
	console.log(' ++ deltaTime ', deltaTime);
	console.log(' ++ diffCounter ', Math.floor(diffCounter));
	console.log(' ++ newCounter ', newCounter);
	console.log(' ++ mission.status ', mission.status);*/

	if (mission.countdown.currentCounter > newCounter) {
		mission.countdown.currentCounter = newCounter;
		$(`*[data-mission=${mission.id}] .mission-countdown`).text(newCounter);
	}

	if (newCounter <= 0) {
		mission.domObjs.flag.hide();
		mission.domObjs.call.hide();

		mission.status = "past";
	}
}

function interfaceCheck() {
	const timeTest = Math.floor(dayWorkTime/1000);
	for(let [key, mission] of Object.entries(interfaceObjs.missions)) {
		if (mission.status === "hidden" && timeTest === mission.countdown.dayWorkAppearTime) {
			startMission(mission);
		}

		const timeWaitingDiff = Math.floor((Date.now() - mission.countdown.startWaiting)/1000);
		if (mission.status === "wait" && timeWaitingDiff > 5 ) {
			showQuestStoryModal(mission);
			mission.status = "return";
			interfaceObjs.cars[mission.carId].status = 'driving';
		}

		if (mission.status !== "active") continue;
		missionCounterUpdate(mission);
	}

	for(let [key, cop] of Object.entries(interfaceObjs.cops)) {
		if (timeTest === cop.countdown.dayWorkAppearTime && cop.status === "hidden") {
			startPatrol(cop);
		}
	}

}

function dayWorkTimeUpdate() {
	newActiveGameTime = Date.now();
	dayWorkTime += newActiveGameTime - lastActiveGameTime;
	lastActiveGameTime = newActiveGameTime;
}

function pauseLoop() {
	isPaused = true;

	addPausePoint();
}

function unPauseLoop() {
	console.log(' unPauseLoop ')

	isPaused = false;

	lastActiveGameTime = Date.now();
}

function updatePause() {
	isPaused = !isPaused;
}

function copMovementCheck(copCar) {
		// console.log(' INTO copMovementCheck ', copCar);
		let pointIndex = 0;
		if (!['driving', 'patrolling'].includes(copCar.status)) return;

		checkNextCopPoint(copCar, pointIndex);
		findViolator(copCar);
}

function startPatrol(cop) {
	if (!cop) console.error("startPatrol -> cop  -  EXPECTED")
	cop.status = "patrolling";
	const copCar = interfaceObjs.cars[cop.carId];
	copCar.status = "driving";
	copCar.domObj.css({ "visibility": "visible" });
}

function acceptReinforcement(modal) {
	const missionId = modal.data('mission');
	const mission = interfaceObjs.missions[missionId];
	const newCar = generateReinforcementCar(mission);

	const newComrades = addComradesToMission(modal, mission);
	addComradesToEndModals(newComrades, missionId);
}

function carMovementCheck() {
	for(let [key, car] of Object.entries(interfaceObjs.cars)) {
		if (['hidden', 'wait'].includes(car.status)) continue;

		switch (car.fraction) {
			case 'own':
				missionCarMovementCheck(car);
				break;

			case 'cop':
				copMovementCheck(car);
				break;

	 		default :
				console.error(' carMovementCheck -> car.fraction is ABSENT');
		}

	}
}
