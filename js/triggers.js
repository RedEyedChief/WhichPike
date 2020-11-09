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
	$(this).toggleClass('qmssbctli-active');
	checkQuestStartButtons(this);
});

$('#mission-modals').delegate('.qmssb-bdsm-team-list-item', 'click', function() {
	$(this).toggleClass('qmssbbtli-active');
});

$('#mission-modals').delegate('.qms-empty-list-close-btn, .qms-close-btn', 'click', function() {
	const parent = $(this).closest('.mission-modal-start');
	parent.hide();

	parent.find('.qms-squad-block li').removeClass('qmssbctli-active qmssbbtli-active');
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
	const imagePath = $(this).css('background-image');
	console.log(' comrad click ', imagePath);
	if (missionModal) {

	}
	findModelByComradData(this).show();

});

















