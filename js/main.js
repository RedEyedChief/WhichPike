let loopBrief = {};
let interfaceObjs = {
	cars: [],
	missions: {},
	points: {},
	comrads : {}
};
let isPaused = false;
let oneTimeClick = false;
let dayWorkTime = 0;
let lastActiveGameTime;
let stop = false;

// MAIN
$(function() {
	lastActiveGameTime = Date.now();
	loopBrief.lastTick = performance.now();
	loopBrief.tickLength = 50;

	/*const spawn = $('#spawn');
	interfaceObjs.spawn = {
		obj: spawn,
		x: spawn.offset().left,
		y: spawn.offset().top
	}*/

	preInitialization();

	gameLoop(performance.now()); 	// #start


	
});

function preInitialization() {
	generatePoints();
	generateMissions();
	generateComrads();
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


function gameLoop() {
	if (!isPaused && !stop) {
		dayWorkTimeUpdate();	
		interfaceCheck();
		movementCheck();
	}

	loopBrief.frameId = window.requestAnimationFrame(gameLoop);
}























