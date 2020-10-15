let BATTLE_DISTANCE = 0;
let loopBrief = {};
let custle;
let interfaceObjs = {
	cars: []
};
let isPaused = false;

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

		gameLoop(performance.now());
	});

	$('#build').click( function() {
		updatePause();
		$('#building-modal').show();
	});

	$('.block-info').click(function() {
		alert($(this).data('info'));
	})

	$(document).keyup(function(e) {
	  if (e.keyCode === 27) $('#building-modal').hide();   // esc
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
	console.log('ENTER interfaceObjs.cars[0].pointList ', interfaceObjs.cars[0]);
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

function reverseList(pointList) {
	let pointIndex = 0;

	for (const point of pointList) {
		point.status = "next";

		if (pointIndex === pointList.length)
			point.status = "past"
	}

	pointList.reverse();
	confirm('POPU MYL? ')
}

function updatePause() {
	isPaused = !isPaused;
}

/*function driveCheck() {
	for (car of interfaceObjs.cars) {
		// console.log(2, car, car.animationList);
		let animationIndex = 0;
		for (animation of car.animationList) {
			// console.log(3);

			// console.log('---- animation. ', animationIndex, animation.status );

			if (animation.status === 'past') continue;

			// const carObjPosition = car.obj.position();
			const carObjPosition = document.getElementById('test').getBoundingClientRect();


			console.log("~~~ ", animationIndex, car.prevPosition.x, carObjPosition.left, car.prevPosition.x === carObjPosition.left );

			if (animation.status === 'current' && car.prevPosition.x !== carObjPosition.left && car.prevPosition.y !== carObjPosition.top) {
				car.prevPosition.x = carObjPosition.left;
				car.prevPosition.y = carObjPosition.top;
				break;
			} else if (animation.status === 'current' && car.prevPosition.x === carObjPosition.left && car.prevPosition.y === carObjPosition.top && animationIndex + 1 < car.animationList.length) {
				animation.status = 'past';
				const nextAnimationIndex = animationIndex + 1
				console.log(' animationIndex ', animationIndex, nextAnimationIndex, car.animationList.length);
				car.animationList[nextAnimationIndex].status = 'current';

				const newStr = 'translate(' + car.animationList[nextAnimationIndex].x + 'vw, ' + car.animationList[nextAnimationIndex].y + 'vw)';
				car.obj.css({
					"-webkit-transform": newStr,
					"-moz-transform": newStr,
					"-ms-transform": newStr,
					"-o-transform": newStr,
					"transform": newStr
				});
			}

			animationIndex++;

		}

	}
}*/


function gameLoop() {
	// console.log("# ", interfaceObjs.cars[0].obj.position());
	// console.log("@ ", document.getElementById('test').getBoundingClientRect());
	// driveCheck();

	if (!isPaused) {
		moveCheck();
	}

	loopBrief.frameId = window.requestAnimationFrame(gameLoop);
}
/*
function checkArrows() {
	const allArrows = $('.arrow:not(.arrow-template, .arrow-hidden)');
	const allEnemies = $('.enemy:not(.enemy-template, .enemy-killed)');
	console.log('all ARROWS ', allArrows.length);

	for (arrow of allArrows) {
		const arrowObj = $(arrow);
		if(arrowObj.offset().left + arrowObj.width() < 0) {
			arrowObj.addClass('arrow-hidden');
		};

		let index = 0;
		for (enemy of allEnemies) {
			const enemyObj = $(enemy);
			console.log('+++++ ', index , arrowObj.offset().left, enemyObj.offset().left + enemyObj.width())
			if(arrowObj.offset().left < enemyObj.offset().left + enemyObj.width()) {
				arrowObj.addClass('arrow-hidden');
				enemyObj.addClass('enemy-killed');
				enemyObj.fadeOut('slow');
				break;
			};
			index++
		}
	}
}

function battleCheck() {
	checkArrows();
}

function gameLoop(currentTime) {
	battleCheck();
	loopBrief.frameId = window.requestAnimationFrame(gameLoop);
}

function attack() {

	const arrowSpawn = $('#arrow-spawn');
	const arrowTemplate = $('.arrow-template');
	const newArrow = arrowTemplate.clone().removeClass('arrow-template');
	console.log('new arrow', newArrow);
	newArrow.appendTo(arrowSpawn);
	const flyDistance = -BATTLE_DISTANCE - newArrow.width()*2;
	const flyStr = 'translateX(' + flyDistance + 'px)';

	setTimeout(() => {
		newArrow.css({
			"-webkit-transform": flyStr,
			"-moz-transform": flyStr,
			"-ms-transform": flyStr,
			"-o-transform": flyStr,
			"transform": flyStr
		});
	},100);

}

function createEnemy(spawn, enemyTemplate, moveStr) {
	const newEnemy = enemyTemplate.clone().removeClass('enemy-template');
	console.log('new enemy', newEnemy);
	newEnemy.appendTo(spawn);
	console.log('moveStr ', moveStr);
	setTimeout(() => {
		newEnemy.css({
			"-webkit-transform": moveStr,
			"-moz-transform": moveStr,
			"-ms-transform": moveStr,
			"-o-transform": moveStr,
			"transform": moveStr
		});
	},500);
}*/
