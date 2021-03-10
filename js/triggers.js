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
  else if (e.keyCode === 68) {
		console.log(' GLOBAL DEBUG ');
  	console.log('interfaceObjs', interfaceObjs);
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

	removeActiveComrad(this);
	checkQuestStartButtons(this);
});

$('#mission-modals').delegate('.qmssb-bdsm-team-list-item', 'click', function() {
	$(this).toggleClass('qmssbbtli-active');
});

$('#mission-modals').delegate('.modal-empty-comrade-list-close-btn, .modal-comrade-list-close-btn', 'click', function() {
	const parent = $(this).closest('.modal');

	const comrades = parent.find('.modal-common-comrade-field.active-comrade');
	comrades.each((index, comrade) => {
		removeActiveComrad(comrade);
	});
	checkQuestStartButtons(this);
	closeModal(parent);

	if (parent.hasClass('mission-modal-reinforcement')) {
		const missionId = parent.attr('data-mission');
		const copId = parent.attr('data-cop');
		policeDecision(missionId, copId);
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
	findModelByMissionData(this).show();
});

$('#mission-modals').delegate('.close-btn', 'click', function() {
	const parent = $(this).closest('.modal');
	if (parent.hasClass('mission-modal-one-action')) {
		findMessageByMissionData(parent).hide();
	}
	closeModal(parent);
});

$('#comrade-modals,#widget-modals').delegate('.close-btn', 'click', function() {
	const parent = $(this).closest('.modal');
	closeModal(parent);
});

/*$('#start-choosing').click(function() {
	const storyParent = $(this).closest('.choose-story');
	storyParent.find('.choose-story-intro').hide();
	storyParent.find('.csb-0').show();
});*/

$('#mission-modals-manual').delegate('.csb-0>.story-line', 'click', function() {
	const storyParent = $(this).closest('.choose-story');

	storyParent.find('.csb-0').hide();
	storyParent.find('.'+$(this).data('csb')).show();
});

$('#mission-modals-manual').delegate('.story-line-end', 'click', function() {
	$(this).closest('.modal').hide();
	findModelByMissionData(this).show();
});

$('#team-container').delegate('.comrade', 'click', function() {
	const missionModal = $('.mission-modal-start:visible, .mission-modal-reinforcement:visible');
	const isComradeUsed = $(this).find('.comrade-image').hasClass('comrade-image-used');
	const energyAmount = $(this).find('.comrade-energy-unit:not(.energy-unit-empty)');

	if (missionModal.length && !isComradeUsed && energyAmount.length) {
		engageComrad(missionModal, $(this));
	} else if (!missionModal.length){
		findModelBioByComradData(this).show();
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
