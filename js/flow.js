function startMission(mission) {
	if (!mission) console.error("startMission -> mission  -  EXPECTED")
	mission.countdown.initTime = Date.now();
	mission.status = "active";

	showMission(mission.id);
}

function showMission(missionId) {
	console.log('INSIDE showMission() ', missionId);

	if (!missionId) console.error("showMission -> missionId  -  EXPECTED")
	$(`.mission-flag[data-mission=${missionId}],` +
	  `.call[data-mission=${missionId}]`).show();
}

function acceptMission(btn) {
	console.log('acceptMission() ');

	const modal = $(btn).closest('.mission-modal-start');
	const missionId = modal.data('mission');
	const mission = interfaceObjs.missions[missionId];

	modal.hide();
	$(`.mission-car[data-mission=${missionId}]`).css({ "visibility": "visible" });
	mission.domObjs.flag.hide();
	mission.domObjs.call.hide();
	mission.status = "accepted";

	const usedComrades = modal.find('.qmssbctli-active');
	usedComrades.each((index, comrad) => {
		mission.comrades.push($(comrad).attr('data-comrad'));
	});

	const comradTemplates = findModelComradTemplateByMissionId(missionId);
	for (const template of comradTemplates) {
		for (const comradId of mission.comrades) {
			cloneElement($(template), 'filling-list', 'comrad', interfaceObjs.comrades[comradId]);
		}
	}
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
	for(let [key, mission] of Object.entries(interfaceObjs.missions)) {
		const timeTest = Math.floor(dayWorkTime/1000);
		if (timeTest === mission.countdown.dayWorkAppearTime && mission.status === "hidden") {
			startMission(mission);
		}

		if (mission.status !== "active") continue;
		missionCounterUpdate(mission);

	}

}

function movementCheck() {
	for(let [key, mission] of Object.entries(interfaceObjs.missions)) {
		if (!['accepted', 'return'].includes(mission.status)) continue;
		let pointIndex = 0;

		for (const point of mission.points) {
			pointIndex++;

			const carObjPosition = document.getElementById(mission.car.id).getBoundingClientRect();

			if (point.status === 'past') continue;
			else if (point.status === 'next') {
				point.status = 'current';

				const moveX = point.x - interfaceObjs.points.spawn.x;
				const moveY = point.y - interfaceObjs.points.spawn.y;

				const moveStr = 'translate(' + moveX + 'px, ' + moveY + 'px)';

				mission.car.domObj.css({
					"-webkit-transform": moveStr,
					"-moz-transform": moveStr,
					"-ms-transform": moveStr,
					"-o-transform": moveStr,
					"transform": moveStr
				});

				break;
			}
			if (point.status === 'current') {
				console.log('ZAVISAEM?');
				console.log('X ', Math.round(carObjPosition.left + mission.car.domObj.width()/2), ' - ', Math.round(point.x));
				console.log('Y ', Math.round(carObjPosition.top + mission.car.domObj.height()), ' - ', Math.round(point.y));
			}

			if (point.status === 'current' &&
				Math.round(point.x) === Math.round(carObjPosition.left + mission.car.domObj.width()/2) &&
				Math.round(point.y) === Math.round(carObjPosition.top + mission.car.domObj.height())) {

				point.status = 'past';

				// return path 		-- # move back animation TODO
				if (pointIndex === mission.points.length) {
					if (mission.status === "return") {
						mission.status = "past";
						mission.car.domObj.hide();
						console.log(' mission.comrades ', mission.comrades);
						for (const comrad of mission.comrades) {
							console.log(' comrad ', comrad);
							removeComradActivatedStatus(comrad);

						}
						break;
					}

					showQuestStoryModal(mission);
					mission.status = "return";
					reverseList(mission);
					console.log(' reversed points ', mission.points);
				}

			}

			if (point.status === 'current') {
				break;
			}
		}
	}
}

function dayWorkTimeUpdate() {
	newActiveGameTime = Date.now();
	dayWorkTime += newActiveGameTime - lastActiveGameTime;
	lastActiveGameTime = newActiveGameTime;
}


function addPausePoint() {
	for(let [key, mission] of Object.entries(interfaceObjs.missions)) {
		if (!['accepted', 'return'].includes(mission.status)) continue;

		const carObjPosition = document.getElementById(mission.car.id).getBoundingClientRect();
		const pausePoint = {
				id: "point-pause",
				x: carObjPosition.left + mission.car.domObj.width()/2,
				y: carObjPosition.top + mission.car.domObj.height(),
				status: "current"
		}

		const moveX = pausePoint.x - interfaceObjs.points.spawn.x;
		const moveY = pausePoint.y - interfaceObjs.points.spawn.y;

		const moveStr = 'translate(' + moveX + 'px, ' + moveY + 'px)';

		mission.car.domObj.css({
			"-webkit-transform": moveStr,
			"-moz-transform": moveStr,
			"-ms-transform": moveStr,
			"-o-transform": moveStr,
			"transform": moveStr
		});

		for (let [index, point] of mission.points.entries()) {
			if (point.status === "past") continue;
			else if (point.status === "current") {
				point.status = "next";
				mission.points.splice(index, 0 , pausePoint);
				break;
			}
		}
	}
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
