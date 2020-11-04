let BATTLE_DISTANCE = 0;
let loopBrief = {};
let custle;
let interfaceObjs = {
	cars: [],
	missions: {}
};
let isPaused = false;
let oneTimeClick = false;
let dayWorkTime = 0;
let lastActiveGameTime;
let startMoving = false;
let stop = false;

// MAIN
$(function() {
	lastActiveGameTime = Date.now();
	loopBrief.lastTick = performance.now();
	loopBrief.tickLength = 50;

	const spawn = $('#spawn');
	interfaceObjs.spawn = {
		obj: spawn,
		x: spawn.offset().left,
		y: spawn.offset().top
	}

	preInitialization();

	gameLoop(performance.now()); 	// #start


	
});

function preInitialization() {
	generateMissions();
}

// DELETE ? 			TODO
/*
function storyBlocksBuild(storyBlock) {
	if (storyBlock.lines) {
		const blockWrap = $('#mission-modal>.template').clone().removeClass('template');
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
		blockWrap.appendTo($('#mission-modal'));


	}
}*/

function addPausePoint() {
	const carObjPosition = document.getElementById('test').getBoundingClientRect();

	const pausePoint = {
			id: "point-pause",
			obj: undefined,
			x: carObjPosition.left + interfaceObjs.cars[0].obj.width()/2,
			y: carObjPosition.top + interfaceObjs.cars[0].obj.height(),
			dur: 2,
			status: "current"
	}

	const moveX = pausePoint.x - interfaceObjs.spawn.x;
	const moveY = pausePoint.y - interfaceObjs.spawn.y;

	const moveStr = 'translate(' + moveX + 'px, ' + moveY + 'px)';

	interfaceObjs.cars[0].obj.css({
		"-webkit-transform": moveStr,
		"-moz-transform": moveStr,
		"-ms-transform": moveStr,
		"-o-transform": moveStr,
		"transform": moveStr
	});

	for (let [index, point] of interfaceObjs.cars[0].points.entries()) {
		if (point.status === "past") continue;
		else if (point.status === "current") {
			point.status = "next";
			interfaceObjs.cars[0].points.splice(index, 0 , pausePoint);
		}
	}
}

function pauseLoop() {
	isPaused = true;

	addPausePoint();
}

function unPauseLoop() {
	isPaused = false;

	lastActiveGameTime = Date.now();
}

function updatePause() {
	isPaused = !isPaused;
}

function gameLoop() {
	newActiveGameTime = Date.now();
	dayWorkTime += newActiveGameTime - lastActiveGameTime;
	lastActiveGameTime = newActiveGameTime;

	if (dayWorkTime > 3000 && interfaceObjs.missions.m3.status === "hidden") {
		console.log(' startMission("m3") ');
		startMission("m3");
	}

	if (!isPaused && !stop) {
		interfaceCheck();

		if(startMoving) {
			movementCheck();
		}
	}

	loopBrief.frameId = window.requestAnimationFrame(gameLoop);
}
























