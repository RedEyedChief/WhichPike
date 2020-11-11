$(document).click(function(){
	console.log('CLICK');

	if (!oneTimeClick) {

		oneTimeClick = true;
	}

});

$(document).keyup(function(e) {
  if (e.keyCode === 27) {	// esc
  	$('.modal').hide();
  	unPauseLoop();
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

$('#mission-modals').delegate('.qmssb-common-team-list-item', 'click', function() {
	if (!$(this).attr('data-comrad')) return;

	removeActiveComrad(this);
	checkQuestStartButtons(this);
});

$('#mission-modals').delegate('.qmssb-bdsm-team-list-item', 'click', function() {
	$(this).toggleClass('qmssbbtli-active');
});

$('#mission-modals').delegate('.qms-empty-list-close-btn, .qms-close-btn', 'click', function() {
	const parent = $(this).closest('.mission-modal-start');
	parent.hide();

	const comrades = parent.find('.qmssbctli-active');
	comrades.each((index, comrad) => {
		removeActiveComrad(comrad);
		//findComradByComradData(comrad).find('.comrad-image').removeClass('comrad-image-used');
	});
	// parent.find('.qms-squad-block li').removeClass('qmssbctli-active qmssbbtli-active');
	checkQuestStartButtons(this);
	closeModal();
});

$('#mission-modals').delegate('.qms-accept-btn', 'click', function() {
	closeModal();
	acceptMission(this);
});

$('#messages-container').delegate('.message', 'click', function() {
	showModal();
	findModelByMissionData(this).show();
});

$('#mission-modals').delegate('.close-btn', 'click', function() {
	const parent = $(this).closest('.modal');
	if (parent.hasClass('mission-modal-one-action')) {
		console.log(' start to hide message ');
		findMessageByMissionData(parent).hide();
	}
	parent.hide();
	closeModal();
});

$('#comrad-modals').delegate('.close-btn', 'click', function() {
	const parent = $(this).closest('.modal');
	parent.hide();
	closeModal();
});

/*$('#start-choosing').click(function() {
	const storyParent = $(this).closest('.choose-story');
	storyParent.find('.choose-story-intro').hide();
	storyParent.find('.csb-0').show();
});*/

$('#mission-modals-manual').delegate('.csb-0>.story-line', 'click', function() {
	const storyParent = $(this).closest('.choose-story');
	console.log('LETS CHOOSE', storyParent);

	storyParent.find('.csb-0').hide();
	storyParent.find('.'+$(this).data('csb')).show();
});

$('#mission-modals-manual').delegate('.story-line-end', 'click', function() {
	$(this).closest('.modal').hide();
	console.log(' modal-end ', $(this).data('modal-class'), $(this).data('mission'));
	findModelByMissionData(this).show();
});

$('#team-container').delegate('.comrad', 'click', function() {
	const missionModal = $('.mission-modal-start:visible');
	console.log(' missionModal ', missionModal);

	const comrad = $(this);
	const comradImage = comrad.find('.comrad-image');
	const samecomrades = missionModal.find(`.qmssb-common-team-list-item[data-comrad="${comrad.data('comrad')}"]`);
	const freeSlot = missionModal.find('.qmssb-common-team-list-item:not(.qmssbctli-active)').first();
	if (missionModal.length && !samecomrades.length && freeSlot && !comradImage.hasClass('comrad-image-used')) {
		const imagePath = comradImage.css('background-image');
		const newSquadSlot = freeSlot;
		newSquadSlot.css({'background-image': imagePath});
		newSquadSlot.addClass('qmssbctli-active');
		newSquadSlot.attr('data-comrad', comrad.data('comrad'));
		comradImage.addClass('comrad-image-used');
		checkQuestStartButtons(freeSlot);
	}
	else if (!missionModal.length) {
		console.log(' SHOW MODEL ');
		findModelBioByComradData(this).show();
	}

});
