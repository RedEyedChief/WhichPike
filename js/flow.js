function startMission(mission) {
	if (!mission) console.error("startMission -> mission  -  EXPECTED")
	mission.countdown.initTime = Date.now();
	mission.status = MISSION_STATUSES.active;

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
	mission.status = MISSION_STATUSES.accepted;
	interfaceObjs.cars[mission.carId].status = CAR_STATUSES.drive;
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

		mission.status = MISSION_STATUSES.past;
	}
}

function interfaceCheck() {
	const timeTest = Math.floor(dayWorkTime/1000);
	for(let [key, mission] of Object.entries(interfaceObjs.missions)) {
		if (mission.status === MISSION_STATUSES.hidden && timeTest === mission.countdown.dayWorkAppearTime) {
			startMission(mission);
		}

		const timeWaitingDiff = Math.floor((Date.now() - mission.countdown.startWaiting)/1000);
		if (mission.status === MISSION_STATUSES.wait && timeWaitingDiff > 5 ) {
			showQuestStoryModal(mission);
			mission.status = MISSION_STATUSES.return;
			interfaceObjs.cars[mission.carId].status = CAR_STATUSES.drive;
		}
		else if (mission.status === MISSION_STATUSES.fight && timeWaitingDiff > 3 ) {
			policeDecision(mission.id, mission.copId);
		}

		if (mission.status !== MISSION_STATUSES.active) continue;
		missionCounterUpdate(mission);
	}

	for(let [key, cop] of Object.entries(interfaceObjs.cops)) {
		if (timeTest === cop.countdown.dayWorkAppearTime && cop.status === COP_STATUSES.hidden) {
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
		if (![CAR_STATUSES.drive, CAR_STATUSES.patrolling].includes(copCar.status)) return;

		checkNextCopPoint(copCar, pointIndex);
		findViolator(copCar);
}

function startPatrol(cop) {
	if (!cop) console.error("startPatrol -> cop  -  EXPECTED")
	cop.status = COP_STATUSES.patrolling;
	const copCar = interfaceObjs.cars[cop.carId];
	copCar.status = CAR_STATUSES.drive;
	copCar.domObj.css({ "visibility": "visible" });
}

function acceptReinforcement(modal) {
	// copCar.status = 'wait';
	const missionId = modal.data('mission');
	const mission = interfaceObjs.missions[missionId];
	interfaceObjs.cars['car-' + mission.copId].status = CAR_STATUSES.wait;
	const newCar = generateReinforcementCar(mission);

	const newComrades = addComradesToMission(modal, mission);
	addComradesToEndModals(newComrades, missionId);
}

function carMovementCheck() {
	for(let [key, car] of Object.entries(interfaceObjs.cars)) {
		if ([CAR_STATUSES.hidden, CAR_STATUSES.wait].includes(car.status)) continue;

		switch (car.fraction) {
			case 'family':
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

function policeDecision(missionId, copId) {
	const mission = interfaceObjs.missions[missionId];
	const cop = interfaceObjs.cops[copId];
	const winner = winnerDetermining(mission, cop);

	// TODO show modal which side won and what happened with your comrades
	alert("WINNER: " + winner);

	if (winner === "mission") {
		returnToHQ(mission);
	} else if (winner === "cop") {
		console.log("FUCK THE POLICE")
		const escapedAmount = individualEscapeCheck(mission);
		if (escapedAmount) returnToHQ(mission);
		else {
			interfaceObjs.cars[mission.carId].domObj.hide();
			if (mission.rfCarId) {
				interfaceObjs.cars[mission.rfCarId].domObj.hide();
			}
		}
		returnToDepartment(cop);
	}
	console.log('policeDecision(missionId, copId)', missionId, copId);
}

function returnToDepartment(cop) {
	const copCar = interfaceObjs.cars[cop.carId];
	copCar.status = CAR_STATUSES.drive;
	driveToHome(copCar.way);
}

function returnToHQ(mission) {
	mission.status = MISSION_STATUSES.return;
	interfaceObjs.cars[mission.carId].status = CAR_STATUSES.drive;
	if (mission.rfCarId) {
		interfaceObjs.cars[mission.rfCarId].domObj.hide();
	}
}
