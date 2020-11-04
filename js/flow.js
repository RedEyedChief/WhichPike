function startMission(missionId) {
	if (!missionId) console.error("missionId  -  EXPECTED")
	interfaceObjs.missions[missionId].countdown.initTime = Date.now();
	interfaceObjs.missions[missionId].status = "active";

	showMission(missionId);
}

function showMission(missionId) {
	$(`.mission-flag[data-mission=${missionId}],` +
	  `.call[data-mission=${missionId}]`).css({ "visibility": "visible" });
}

function acceptMission(btn) {
	console.log('acceptMission() ');

	const modal = $(btn).closest('.mission-modal-start');
	const missionId = modal.data('mission');
	modal.hide();

	$(`.mission-car[data-mission=${missionId}]`).css({ "visibility": "visible" });
	interfaceObjs.missions[missionId].domObjs.flag.hide();
	interfaceObjs.missions[missionId].domObjs.call.hide();

	interfaceObjs.missions[missionId].status = "accepted";

	// $('#'+modal.data('mission')).addClass('mission-accepted');

}

function interfaceCheck() {
	for(let [key, mission] of Object.entries(interfaceObjs.missions)) {
		if (mission.status !== "active") continue;
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
			console.log(' - decrease counter  ', newCounter);
			$(`*[data-mission=${mission.id}] .mission-countdown`).text(newCounter);

			// $(mission.domObjs.flag).find('.mission-flag-countdown').text(newCounter);
		}

		// if (newCounter <= 0) mission.status = "past";
		if (newCounter <= 0) {
			mission.domObjs.flag.hide();
			mission.domObjs.call.hide();

			mission.status = "past";
		}



	}

}

function movementCheck() {
	// console.log('ENTER interfaceObjs.cars[0].points ', interfaceObjs.cars[0]);

	for(let [key, mission] of Object.entries(interfaceObjs.missions)) {
		if (mission.status === ! 'aceep') continue;
		console.log(' into check -> mission ', mission);
		let pointIndex = 0;

		for (const point of mission.points) {
			pointIndex++;

			const carObjPosition = document.getElementById(mission.car.id).getBoundingClientRect();

			if (point.status === 'past') continue;
			else if (point.status === 'next') {
				point.status = 'current';

				/*console.log('+ X ', interfaceObjs.spawn.x , point.x, carObjPosition.left, car.obj.width());
				console.log('+ Y ', point.y, carObjPosition.top, car.obj.height());
				console.log('car.obj.width() ', car.obj.width()); */

				const moveX = point.x - interfaceObjs.spawn.x;
				const moveY = point.y - interfaceObjs.spawn.y;

				const moveStr = 'translate(' + moveX + 'px, ' + moveY + 'px)';

				// console.log(' car obj ', mission, mission.car.domObj)
				mission.car.domObj.css({
					"-webkit-transform": moveStr,
					"-moz-transform": moveStr,
					"-ms-transform": moveStr,
					"-o-transform": moveStr,
					"transform": moveStr
				});

				console.log('moveStr ', moveStr);

				break;
			}

			//console.log("~~~ ", pointIndex, Math.round(point.x), Math.round(carObjPosition.left +  car.obj.width()/2), Math.round(point.x) === Math.round(carObjPosition.left +  car.obj.width()/2) );

			/*console.log("Math.round(carObjPosition.left) ", Math.round(carObjPosition.left));
			console.log("Math.round(point.x) ", Math.round(point.x));
			console.log("Math.round(point.y) ", Math.round(point.y));
			console.log("Math.round(carObjPosition.top) ", Math.round(carObjPosition.top));

			console.log("if:  ", Math.round(carObjPosition.left + car.obj.width()/2), ' === ', Math.round(point.x), ' &&  ', Math.round(point.y) , ' === ',Math.round(carObjPosition.top + car.obj.height()));
*/
			if (point.status === 'current' &&
				Math.round(point.x) === Math.round(carObjPosition.left + mission.car.domObj.width()/2) &&
				Math.round(point.y) === Math.round(carObjPosition.top + mission.car.domObj.height())) {

				point.status = 'past';
				console.log("new point ", point.status);

				// return path 		-- # move back animation TODO
				if (pointIndex === mission.points.length) {
					showQuestStoryModal();

					// confirm('POPU MYL? ')
					// reverseList(car.points);
				}


				//alert('get finish');
			} /*else if (point.status === 'current' && Math.round(point.x) !== Math.round(carObjPosition.left + car.obj.width()/2) && Math.round(point.y) !== Math.round(carObjPosition.top + car.obj.height())) {
				// console.log("direction: ", point.status);
				break;
			}*/

			if (point.status === 'current') {
				break;
			}
		}
	}
}
