

function generatePoints(mission) {
	const points = $('.point');

	for (let point of points) {
		const offsetSet = $('#'+point.id).offset();
		mission.points.push({
			id : point.id,
			obj : point,
			x : offsetSet.left,
			y : offsetSet.top,
			dur : 2,
			status : point.id === 'spawn' ? "past" : "next"
		});
	}
}

function generateMissions() {
	// const missions = $('.mission');

	for (let mission of MISSIONS) {

		// let countdownTime = $(mission).find('.mission-flag-countdown').text();

		interfaceObjs.missions[mission.id] = mission;
		cloneElement($('#mission-flags>.template'), 'mission-flag', mission);
		cloneElement($('#mission-modals>.template'), 'mission-modal-start', mission);
		cloneElement($('#calls-container>.template'), 'mission-call', mission);
		cloneElement($('#cars>.template'), 'mission-car', mission);
		generatePoints(mission);
	}

	console.log(' ~~~ MISSIONS GENERED ~~~ ');

}

/*function addCar() {
	const newCar = $('.car-template').clone().removeClass('car-template');
	console.log("interfaceObjs.spawn ", interfaceObjs);
	console.log("interfaceObjs.spawn.y, newCar.height() ", interfaceObjs.spawn.y, newCar.height());

	newCar.attr('id', 'test');

	// TODO: Y position: spawn.y - height
	newCar.appendTo($('#characters'));
	newCar.css({
					"top" : (interfaceObjs.spawn.y-newCar.height())+'px',
					"left" : (interfaceObjs.spawn.x-newCar.width()/2)+'px'
				});

	// console.log('point position ', interfaceObjs.cars[0].points[0].x, interfaceObjs.cars[0].points[0].y);

	interfaceObjs.cars[0] = {};
	interfaceObjs.cars[0].obj = newCar;
}*/

function checkQuestStartButtons() {
	if($('.qmssbctli-active').length) {
		$('.qms-empty-list-close-btn').addClass('notDisplay');
		$('.qms-buttons').removeClass('notDisplay');
	} else {
		$('.qms-empty-list-close-btn').removeClass('notDisplay');
		$('.qms-buttons').addClass('notDisplay');
	}
}


function showQuestStoryModal() {
	$('#mission-modal-story').show();
}

function showQuestModal(mission) {
	console.log("22222 showQuestModal");

	// updatePause();  

	// storyBlocksBuild(storyLine);
	// $('#mission-modal').show();
	console.log("mission  ", $(mission).data('mission'), $(`.mission-modal-start[data-mission=${$(mission).data('mission')}]`));

	$(`.mission-modal-start[data-mission=${$(mission).data('mission')}]`).show();

}

// eic - element info collection | < mission, call ... >
function cloneElement(template, type, eic) {
	if (!template || !type || !eic) console.error("template, type, eic  -  EXPECTED")

	const newElement = template.clone().removeClass('template');

	newElement.attr('data-mission', eic.id);

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
			console.log('SWITCH: mission-car');
			const newCarId = `car-${eic.id}`;

			newElement.attr('id', newCarId);
			newElement.css({
					"top" : (interfaceObjs.spawn.y-template.height())+'px',
					"left" : (interfaceObjs.spawn.x-template.width()/2)+'px'
				});

			eic.car.id = newCarId;
			eic.car.domObj = newElement;
			break;

			

		default : 
			console.error(' cloneElement -> type is ABSENT');

	}

	newElement.appendTo(template.parent());

	if(eic.status === "demo" && type !== 'mission-car') newElement.removeClass('hide');
}














