let BATTLE_DISTANCE = 0;
let loopBrief = {};
let custle;
let interfaceObjs = {
	cars: []
};
let isPaused = false;
let oneTimeClick = false;
const storyLine = {
	index : "000",
	lines : [
		{
			text : "vzyauu",
			index : "100",
			lines : [
				{
					text : "aaaa124",
					index : "110",
					lines : [
						{
							text : "a1",
							end : "best"
						},
						{

							text : "a2",
							end : "good"
						},
						{

							text : "a4",
							end : "died"
						}
					]
				},
				{

					text : "vz3",
					end : "fail"
				},
				{

					text : "vzya3",
					end : "fail"
				}
			]
		},
		{
			text : "pryhavav",
			index : "200",
			lines : [
				{

					text : "pr2",
					end : "good"
				},
				{

					text : "pr3",
					end : "fail"
				},
				{
					text : "pryha14",
					index : "230",
					lines : [
						{
							text : "pryhavav1",
							end : "best"
						},
						{

							text : "pryhavav4",
							end : "died"
						}
					]
				}
			]
		},
		{
			text : "solodenko",
			index : "300",
			lines : [
				{

					text : "s4",
					end : "died"
				},
				{
					text : "solo34",
					index : "320",
					lines : [
						{
							text : "solodenko3",
							end : "fail"
						},
						{

							text : "solodenko4",
							end : "died"
						}
					]
				}
			]
		}
	]
}

$(function() {
	loopBrief.lastTick = performance.now();
	loopBrief.tickLength = 50;

	const spawn = $('#spawn');
	interfaceObjs.spawn = {
		obj: spawn,
		x: spawn.offset().left,
		y: spawn.offset().top
	}

	preInitialization();


	$(document).click(function(){
		console.log('CLICK');

		if (!oneTimeClick) {
			// #start
			//gameLoop(performance.now());
			oneTimeClick = true;
		}
		
	});

	$('#build').click( function() {
		console.log('ZDR');

		updatePause();
		$('#building-modal').show();
	});

	$('.block-info').click(function() {
		alert($(this).data('info'));
	});

	$('.mission').click(function() {
		console.log(' condition ')
		if ($(this).hasClass('mission-accepted')) 	{
			showQuestStoryModal();
		}
		else 										showQuestModal();

	});

	$('.qmssb-common-team-list-item').click(function() {
		$(this).toggleClass('qmssbctli-active');
		checkQuestStartButtons();
	});

	$('.qmssb-bdsm-team-list-item').click(function() {
		$(this).toggleClass('qmssbbtli-active');
	});

	$('.qms-empty-list-close-btn, .qms-close-btn').click(function() {
		$(this).closest('#quest-modal-start').hide();
	});

	$('.qms-accept-btn').click(function() {
		$(this).closest('#quest-modal-start').hide();
		$('#m1').addClass('mission-accepted');
	});

	$('.one-click-action').click(function() {
		$(this).closest('.modal').hide();
		$("#" + $(this).data('modal')).show();
	});

	$('.close-btn').click(function() {
		$(this).closest('.modal').hide();
	});

	$('#start-choosing').click(function() {
		const storyParent = $(this).closest('.choose-story');
		storyParent.find('.choose-story-intro').hide();
		storyParent.find('.csb-0').show();
	});

	$('.csb-0>.story-line').click(function() {
		const storyParent = $(this).closest('.choose-story');
		storyParent.find('.csb-0').hide();
		storyParent.find('.'+$(this).data('csb')).show();
	});

	$('.story-line-end').click(function() {
		$(this).closest('.modal').hide();
		$('#'+$(this).data('csm')).show();
	});

	$(document).keyup(function(e) {
	  if (e.keyCode === 27) $('.modal').hide();   // esc
	});

	//const custle = $('#custle-chr');
	/*custle = $('#custle-chr');
	const custleOffsetX = custle.offset().left;
	const enemy = $('.enemy-template');
	BATTLE_DISTANCE = custleOffsetX;
	// const distance = 500;
	moveStr = 'translateX(' + (BATTLE_DISTANCE - enemy.width()) + 'px)';


	const spawn = $('#enemy-spawn');
	const enemyTemplate = $('.enemy-template');

	custle.on('touchstart click', function(e){
		e.preventDefault();
		attack();
	});

	setInterval(() => {
		createEnemy(spawn, enemyTemplate, moveStr);
	}, 3000);

	loopBrief.lastTick = performance.now();
	loopBrief.tickLength = 50;

	gameLoop(performance.now());*/
});

function checkQuestStartButtons() {
	if($('.qmssbctli-active').length) {
		$('.qms-empty-list-close-btn').addClass('hide');
		$('.qms-buttons').removeClass('hide');
	} else {
		$('.qms-empty-list-close-btn').removeClass('hide');
		$('.qms-buttons').addClass('hide');
	}
}

function addCar() {
	/*interfaceObjs.cars[0] = {
		id: "test",
		obj: $('#test'),
		point: 1,
		animationList: [
			{
				x: 10,
				y: 7,
				dur: 2,
				status: "current"
			},
			{
				x: 14,
				y: 2,
				dur: 7,
				status: "next"
			}
		],
		prevPosition : {
			x: 0,
			y: 0
		}
	};

	const transformStr = 'translate(10vw, 7vw)';

	interfaceObjs.cars[0].obj.css({
		"-webkit-transform": transformStr,
		"-moz-transform": transformStr,
		"-ms-transform": transformStr,
		"-o-transform": transformStr,
		"transform": transformStr
	});*/
	const newCar = $('.car-template').clone().removeClass('car-template');
	console.log("interfaceObjs.spawn ", interfaceObjs);
	console.log("interfaceObjs.spawn.y, newCar.height() ", interfaceObjs.spawn.y, newCar.height());

	newCar.attr('id', 'test');

	// TODO: Y position: spawn.y - height
	newCar.appendTo($('#characters'));
	newCar.css({
					"top": (interfaceObjs.spawn.y-newCar.height())+'px',
					"left": (interfaceObjs.spawn.x-newCar.width()/2)+'px'
				});

	// console.log('point position ', interfaceObjs.cars[0].pointList[0].x, interfaceObjs.cars[0].pointList[0].y);

	interfaceObjs.cars[0] = {};
	interfaceObjs.cars[0].obj = newCar;
}

function generatePoints() {
	const points = $('.point');
	interfaceObjs.cars[0].pointList = [];

	for (const point of points) {
		console.log('OF ', point)

		const offsetSet = $('#'+point.id).offset();
		console.log()
		interfaceObjs.cars[0].pointList.push({
			id: point.id,
			obj: point,
			x: offsetSet.left,
			y: offsetSet.top,
			dur: 2,
			status: point.id === 'spawn' ? "past" : "next"
		});
	}

	/*const pointObj1 = $('#point-1');
	const pointObj2 = $('#point-2');

	interfaceObjs.cars[0].pointList = [
		{
			id: "point-1",
			obj: pointObj1,
			x: pointObj1.offset().left,
			y: pointObj1.offset().top,
			dur: 2,
			status: "next"
		},
		{
			id: "point-2",
			obj: pointObj2,
			x: pointObj2.offset().left,
			y: pointObj2.offset().top,
			dur: 2,
			status: "next"
		}
	]*/
}

function preInitialization() {
	addCar();

	generatePoints();
}

function moveCheck() {
	// console.log('ENTER interfaceObjs.cars[0].pointList ', interfaceObjs.cars[0]);
	for (const car of interfaceObjs.cars) {
		let pointIndex = 0;

		//console.log('car.pointList ', car.pointList);
		for (const point of car.pointList) {
			pointIndex++;
			// console.log("STATUSES ", car.pointList[0].status, car.pointList[1].status);
			const carObjPosition = document.getElementById('test').getBoundingClientRect();
			//console.log("~~~ ", point.id, point.status);
			if (point.status === 'past') continue;
			else if (point.status === 'next') {
				point.status = 'current';

		/*console.log(' - BEFORE car.pointList ', car.pointList);
				point.status = 'QWW';
		console.log(' - AFTER car.pointList ', car.pointList);*/

				/*console.log('+ X ', interfaceObjs.spawn.x , point.x, carObjPosition.left, car.obj.width());
				console.log('+ Y ', point.y, carObjPosition.top, car.obj.height());*/
				console.log('car.obj.width() ', car.obj.width());
				const moveX = point.x - interfaceObjs.spawn.x;
				const moveY = point.y - interfaceObjs.spawn.y;

				const moveStr = 'translate(' + moveX + 'px, ' + moveY + 'px)';

				car.obj.css({
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
			if (point.status === 'current' && Math.round(point.x) === Math.round(carObjPosition.left + car.obj.width()/2) && Math.round(point.y) === Math.round(carObjPosition.top + car.obj.height())) {
				point.status = 'past';
				console.log("new point ", point.status);

				if (pointIndex === car.pointList.length) {
					reverseList(car.pointList);
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

function storyBlocksBuild(storyBlock) {
	if (storyBlock.lines) {
		const blockWrap = $('#quest-modal>.template').clone().removeClass('template');
		blockWrap.attr('data-index', storyBlock.index);
		const blockBlank = blockWrap.find('.template').clone().removeClass('template');
		for (let line of storyBlock.lines) {
			const newBlock = blockBlank.clone();
			console.log(' line.index ', line.index);
			if (line.index) {
				newBlock.attr('data-next-block', line.index);
			}
			newBlock.text(line.text);
			newBlock.appendTo(blockWrap);
		}
		blockWrap.appendTo($('#quest-modal'));


	}
}

function showQuestStoryModal() {
	$('#quest-modal-story').show();
}

function showQuestModal() {
	console.log("22222");
	// updatePause();  

	// storyBlocksBuild(storyLine);
	// $('#quest-modal').show();
	$('#quest-modal-start').show();

}

function reverseList(pointList) {
	let pointIndex = 0;
	console.log(' -- pointList -- BEGIN == ', pointList);

	for (let point of pointList) {

		point.status = "next";
		console.log(' -- pointList -- for : ', pointList);

		if (pointIndex === pointList.length) {

			point.status = "past"
		}
	}

	console.log(' -- pointList -- END == ', pointList);
	pointList.reverse();
	confirm('POPU MYL? ')
	/*console.log("1111");
	showQuestModal();*/
}

function updatePause() {
	isPaused = !isPaused;
}

function gameLoop() {
	// console.log("# ", interfaceObjs.cars[0].obj.position());
	// console.log("@ ", document.getElementById('test').getBoundingClientRect());
	// driveCheck();

	if (!isPaused) {
		moveCheck();
	}

	loopBrief.frameId = window.requestAnimationFrame(gameLoop);
}