function reverseList(pointsList) {
	console.log(' pointsList ', pointsList);
	const newPoints = pointsList.filter((value, index) => {
		console.log(' key, point ', value, index);

		return value.id !== "point-pause";
	});
	console.log(' newPoints ', newPoints);

	for (let point of newPoints) {
		point.status = "next";
	}

	newPoints.reverse();
	return newPoints;
}

function refreshCopPoints(copCar) {
	for (let point of copCar.way) {
		point.status = "next";
	}
}

function checkNextCopPoint(copCar, pointIndex) {
	for(let [key, point] of Object.entries(copCar.way)) {
		pointIndex++;
		const copObjPosition = document.getElementById(copCar.id).getBoundingClientRect();

		if (point.status === 'past') continue;
		else if (point.status === 'next') {
			point.status = 'current';

			const moveX = point.x - interfaceObjs.points.copSpawn.x;
			const moveY = point.y - interfaceObjs.points.copSpawn.y;

			const moveStr = 'translate(' + moveX + 'px, ' + moveY + 'px)';

			copCar.domObj.css({
				"-webkit-transform": moveStr,
				"-moz-transform": moveStr,
				"-ms-transform": moveStr,
				"-o-transform": moveStr,
				"transform": moveStr
			});

			break;
		}

		if (point.status === 'current' &&
			Math.round(point.x) === Math.round(copObjPosition.left + copCar.domObj.width()/2) &&
			Math.round(point.y) === Math.round(copObjPosition.top + copCar.domObj.height())) {

			point.status = 'past';

			// return path 		-- # move back animation TODO
			if (pointIndex === copCar.way.length && copCar.status === 'driving') {
				copCar.status = 'patrolling';
				copCar.way = interfaceObjs.cops[copCar.copId].generatedWays.patrol;
				break;
			}
			else if (pointIndex === copCar.way.length && copCar.status === 'patrolling') {
				refreshCopPoints(copCar);
			}

		}

		if (point.status === 'current') {
			break;
		}
	}
}

function findViolator(copCar) {
	for(let [key, car] of Object.entries(interfaceObjs.cars)) {
		const isDefaultCarAndWaiting =
			car.position === "default" &&
			car.fraction === "own" &&
			car.status === "wait";
		if (!isDefaultCarAndWaiting) continue;

		const mission = interfaceObjs.missions[car.missionId];
		if (mission.status === 'pressed') continue;

		const copObjPosition = document.getElementById(copCar.id).getBoundingClientRect();
		const carObjPosition = document.getElementById(car.id).getBoundingClientRect();
		const extraAreaSize = 50;
		const carAreaSize = {
			top: carObjPosition.top - extraAreaSize,
			left: carObjPosition.left - extraAreaSize,
			right: carObjPosition.left + car.domObj.width()/2 + extraAreaSize,
			bottom: carObjPosition.top + car.domObj.height() + extraAreaSize
		}

		const copAreaSize = {
			top: copObjPosition.top,
			left: copObjPosition.left,
			right: copObjPosition.left + copCar.domObj.width()/2,
			bottom: copObjPosition.top + copCar.domObj.height()
		}

		if (
			((copAreaSize.left > carAreaSize.left && copAreaSize.left < carAreaSize.right) &&
			 ((copAreaSize.top > carAreaSize.top && copAreaSize.top < carAreaSize.bottom) ||
			  (copAreaSize.bottom > carAreaSize.top && copAreaSize.bottom < carAreaSize.bottom))) ||
			((copAreaSize.right > carAreaSize.left && copAreaSize.right < carAreaSize.right) &&
			 ((copAreaSize.top > carAreaSize.top && copAreaSize.top < carAreaSize.bottom) ||
			  (copAreaSize.bottom > carAreaSize.top && copAreaSize.bottom < carAreaSize.bottom)))
		) {
			mission.status = 'pressed';
			createModalReinforcement(mission);
		}
	}
}

function addPausePoint() {
	for(let [key, car] of Object.entries(interfaceObjs.cars)) {
		if (['hidden', 'wait'].includes(car.status)) continue;

		const carObjPosition = document.getElementById(car.id).getBoundingClientRect();
		const pausePoint = {
				id: "point-pause",
				x: carObjPosition.left + car.domObj.width()/2,
				y: carObjPosition.top + car.domObj.height(),
				status: "current"
		}

		const spawnPoint = car.fraction === 'own' ? 'spawn' : 'copSpawn';

		const moveX = pausePoint.x - interfaceObjs.points[spawnPoint].x;
		const moveY = pausePoint.y - interfaceObjs.points[spawnPoint].y;

		const moveStr = 'translate(' + moveX + 'px, ' + moveY + 'px)';

		car.domObj.css({
			"-webkit-transform": moveStr,
			"-moz-transform": moveStr,
			"-ms-transform": moveStr,
			"-o-transform": moveStr,
			"transform": moveStr
		});

		for (let [index, point] of car.way.entries()) {
			if (point.status === "past") continue;
			else if (point.status === "current") {
				point.status = "next";
				car.way.splice(index, 0 , pausePoint);
				break;
			}
		}
	}
}

function missionCarMovementCheck(car) {
		console.log(' INTO missionCarMovementCheck ');

		if (['hidden', 'wait'].includes(car.status)) return;
		let pointIndex = 0;

		for (const point of car.way) {
			pointIndex++;

			const carObjPosition = document.getElementById(car.id).getBoundingClientRect();

			if (point.status === 'past') continue;
			else if (point.status === 'next') {
				point.status = 'current';

				const moveX = point.x - interfaceObjs.points.spawn.x;
				const moveY = point.y - interfaceObjs.points.spawn.y;

				const moveStr = 'translate(' + moveX + 'px, ' + moveY + 'px)';

				car.domObj.css({
					"-webkit-transform": moveStr,
					"-moz-transform": moveStr,
					"-ms-transform": moveStr,
					"-o-transform": moveStr,
					"transform": moveStr
				});

				break;
			}

			if (point.status === 'current' &&
				Math.round(point.x) === Math.round(carObjPosition.left + car.domObj.width()/2) &&
				Math.round(point.y) === Math.round(carObjPosition.top + car.domObj.height())) {

				point.status = 'past';

				// return path 		-- # move back animation TODO
				if (pointIndex === car.way.length) {
					const mission = interfaceObjs.missions[car.missionId];
					if (mission.status === "return") {
						mission.status = "past";
						car.domObj.hide();
						car.status = 'hidden';
						for (const comrade of mission.comrades) {
							removeComradActivatedStatus(comrade);
						}
						break;
					} else if (mission.status === "pressed") {
						alert('unfinished flow!');
					}

					mission.status = "wait";
					car.status = 'wait';
					mission.countdown.startWaiting = Date.now();
					car.way = reverseList(car.way);
				}

			}

			if (point.status === 'current') {
				break;
			}
		}
}
