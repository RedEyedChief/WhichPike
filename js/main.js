let loopBrief = {};
let interfaceObjs = {
	missions: {},
	points: {},
	comrades : {},
	choosedComrades: {},
	cops : {},
	cars : {}
};
let isPaused = false;
let oneTimeClick = false;
let dayWorkTime = 0;
let lastActiveGameTime;
let stop = false;
let oneTime = true;
const START_STAGE = "gameLoop";
//const START_STAGE = "intro";

// MAIN
$(function() {
	if (START_STAGE === "intro") {
		$("#level1>.start-stage").show();
		$("#level1").show();

		generateShift();
	} else {
		$("#level1>.mission-stage").show();
		$("#level1").show();

		interfaceObjs.choosedComrades = {
			c1: "c1",
			c2: "c2",
			c3: "c3",
			c4: "c4",
			c5: "c5",
			c6: "c6"
		}

		missionTechStart();
	}
});

function missionTechStart() {
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
}

function preInitialization() {
	generatePoints();
	generateMissions();
	//generateCops();
	generateGlobalComrades();
	generateChoosedComrades();

	// --- lvl 2 draft
	generateRacePoints();
	generateHeroCar();
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
		carMovementCheck();
		// missionMovementCheck();
		// copMovementCheck();
	}

	loopBrief.frameId = window.requestAnimationFrame(gameLoop);
}
