$(document).click(function(){
	console.log('CLICK');

	if (!oneTimeClick) {

		oneTimeClick = true;
	}

});

$(document).keyup(function(e) {
  if (e.keyCode === 27) {	// esc
		console.log(' modals ', $('.modal'));
  	$('.modal').hide();
  	unPauseLoop();
  }
  else if (e.keyCode === 68) { // d
		console.log(' GLOBAL DEBUG ');
  	console.log('interfaceObjs', interfaceObjs);
  }
  else if (e.keyCode === 80) { // p
		console.log(' pauseLoop ');
		pauseLoop();
  }
  else if (e.keyCode === 85) { // u
		console.log(' pauseLoop ');
		unPauseLoop();
  }
  else if (e.keyCode === 37) {
		console.log(' LEFT ARROW ');
		checkHeroMovement('left');
  }
  else if (e.keyCode === 38) {
		console.log(' UP ARROW ');
		checkHeroMovement('up');
  }
  else if (e.keyCode === 39) {
		console.log(' RIGHT ARROW ');
		checkHeroMovement('right');
  }
  else if (e.keyCode === 40) {
		console.log(' DOWN ARROW ');
		checkHeroMovement('down');
  }

});

$('#build').click( function() {
	console.log('ZDR');

	// updatePause();
	pauseLoop();
	$('#building-modal').show();
});

$('.block-info').click(function() {
	alert($(this).data('info'));
});

$('#mission-flags').delegate('.mission-flag', 'click', function() {
	showQuestModal(this);
});

$('#calls').delegate('.call', 'click', function() {
	showQuestModal(this);
});

$('#mission-modals').delegate('.modal-common-comrade-field', 'click', function() {
	if (!$(this).attr('data-comrade')) return;

	removeActiveComrade(this);
	checkQuestStartButtons(this);
});

$('#mission-modals').delegate('.qmssb-bdsm-team-list-item', 'click', function() {
	$(this).toggleClass('qmssbbtli-active');
});

$('#mission-modals').delegate('.modal-empty-comrade-list-close-btn, .modal-comrade-list-close-btn', 'click', function() {
	const parent = $(this).closest('.modal');

	const comrades = parent.find('.modal-common-comrade-field.active-comrade');
	comrades.each((index, comrade) => {
		removeActiveComrade(comrade);
	});
	checkQuestStartButtons(this);
	closeModal(parent);

	if (parent.hasClass('mission-modal-reinforcement')) {
		const missionId = parent.attr('data-mission');
		const mission = interfaceObjs.missions[missionId];
		// mission.processInfo.waitReinforcement = false;
		mission.countdown.startWaiting = Date.now();
		mission.processInfo.stage = RF_STAGE.end;
		// //CONTINUE
		// mission.status = MISSION_STATUSES.fight;

		// policeDecision(missionId, copId);
	}
});

$('#mission-modals').delegate('.modal-comrade-list-accept-btn', 'click', function() {
	const parent = $(this).closest('.modal');
	closeModal(parent);

	if (parent.hasClass('mission-modal-reinforcement')) acceptReinforcement(parent);
	else if (parent.hasClass('mission-modal-start')) 		acceptMission(parent);
	else console.log(' SOMETHING SHOULD HAPPENN HERE ? ')
});

$('#messages-container').delegate('.message', 'click', function() {
	showModal();
	findModalByMissionData(this).show();
});

$('#mission-modals').delegate('.close-btn', 'click', function() {
	const parent = $(this).closest('.modal');
	if (parent.hasClass('mission-modal-result')) {
		findMessageByMissionData(parent).hide();
	}
	closeModal(parent);
});

$('#comrade-modals,#widget-modals').delegate('.close-btn', 'click', function() {
	const parent = $(this).closest('.modal');
	closeModal(parent);
});

$('#mission-modals-manual').delegate('.csb-0>.choose-story-item', 'click', function() {
	const storyParent = $(this).closest('.choose-story-block');

	storyParent.find('.csb-0').hide();
	storyParent.find('.'+$(this).data('csb')).show();
});

$('#mission-modals-manual').delegate('.choose-story-end', 'click', function() {
	if ($(this).hasClass('disabled')) return;
	const parent = $(this).closest('.modal');
	parent.hide();
	missionCalculation(parent.attr('data-mission'), $(this).attr('data-story-end'), true);
	// findModalByMissionData(this).show();
});

$('#mission-modals-result').delegate('.close-btn', 'click', function() {
	const parent = $(this).closest('.modal');
	parent.hide();
	missionDone(parent.attr('data-mission'));
});

$('#team-container').delegate('.comrade', 'click', function() {
	const missionModal = $('.mission-modal-start:visible, .mission-modal-reinforcement:visible');
	const isComradeUsed = $(this).find('.comrade-image').hasClass('comrade-image-used');
	const energyAmount = $(this).find('.comrade-energy-unit:not(.energy-unit-empty)');

	if (missionModal.length && !isComradeUsed && energyAmount.length) {
		engageComrade(missionModal, $(this));
	} else if (!missionModal.length){
		findModalBioByComradData(this).show();
	}

});

$('#widgets').delegate('#hide-widget', 'click', function() {
	$('.hiding-widget').toggleClass('hide');
});

$('#widgets').delegate('#menu-widget', 'click', function() {
	$('#menu-modal').show();
	showModal();
});

$('#menu-modal').delegate('.menu-btn', 'click', function() {
	const parent = $(this).closest('.modal');
	closeModal(parent);
});

$('#widgets').delegate('#achievements-widget', 'click', function() {
	$('#achievements-modal').show();
	showModal();
});

$('#widgets').delegate('#extra-widget', 'click', function() {
	$(this).toggleClass('extra-widget-active');
	$('.additional-widget').toggle();
});

$('#widgets').delegate('.additional-widget', 'click', function() {
	const modal = $(this).data('modal');
	$(`#${modal}-modal`).show();
	showModal();
});

$('.level').delegate('.stage-next', 'click', function() {
	const nextStage = $(this).data('next');
	$(`.${nextStage}`).show();
	$(this).closest('.stage').hide();

	if (nextStage === 'mission-stage') {
		missionTechStart();
	}
});

$('.all-team-list').delegate('.shift-item', 'click', function() {
	if ($(this).hasClass('comrade-busy')) return;
	const comradeId = $(this).attr('data-comrade');
	const clonedComrade = $(this).find('.comrade-exist').clone();
	const freeSlot = $('.choosed-team-list>.choosed-comrade-field.comrade-absent').first();
	clonedComrade.appendTo(freeSlot);
	freeSlot.removeClass('comrade-absent');
	$(this).addClass('comrade-busy');
	freeSlot.attr('data-comrade', comradeId);
	interfaceObjs.choosedComrades[comradeId] = comradeId;
});

$('.choosed-team-list').delegate('.choosed-comrade-field', 'click', function() {
	const comradeId = $(this).attr('data-comrade');
	$(`.shift-item[data-comrade=${comradeId}]`).removeClass('comrade-busy');
	$(this).empty();
	$(this).addClass('comrade-absent');
	$(this).attr('data-comrade', ' ');
	delete interfaceObjs.choosedComrades[comradeId];
});

$('.shift-stage .stage-next').click((event) => {
	const isChoosed = $('.choosed-comrade-field:not(.comrade-absent)').length;
	if (!isChoosed) {
		alert('CHOOSE SOME SLUTS');
		event.stopPropagation();
		return;
	}
	console.log(' interfaceObjs ', interfaceObjs);
});
