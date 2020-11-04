$(document).click(function(){
	console.log('CLICK');
	startMoving = true;

	if (!oneTimeClick) {
		
		oneTimeClick = true;
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
	/*if ($(this).hasClass('mission-accepted')) 	{
		showQuestStoryModal();
	}
	else */										showQuestModal(this);
});

$('#calls').delegate('.call', 'click', function() {
	showQuestModal(this);
});

$('#mission-modals').delegate('.qmssb-common-team-list-item', 'click', function() {
	$(this).toggleClass('qmssbctli-active');
	checkQuestStartButtons();
});

$('#mission-modals').delegate('.qmssb-bdsm-team-list-item', 'click', function() {
	$(this).toggleClass('qmssbbtli-active');
});

$('#mission-modals').delegate('.qms-empty-list-close-btn, .qms-close-btn', 'click', function() {
	const parent = $(this).closest('.mission-modal-start');
	parent.hide();

	parent.find('.qms-squad-block li').removeClass('qmssbctli-active qmssbbtli-active');
	checkQuestStartButtons();
});

$('#mission-modals').delegate('.qms-accept-btn', 'click', function() {
	acceptMission(this);
});

$('#messages-container').delegate('.one-click-action', 'click', function() {
	$(this).closest('.modal').hide();
	$("#" + $(this).data('modal')).show();
});

//$('#mission-modals').delegate('.close-btn', 'click', function() {
$('.close-btn').click(function() {
	$(this).closest('.modal').hide();
});

/*$('#start-choosing').click(function() {
	const storyParent = $(this).closest('.choose-story');
	storyParent.find('.choose-story-intro').hide();
	storyParent.find('.csb-0').show();
});*/

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
  if (e.keyCode === 27) {	// esc
  	$('.modal').hide();
  	unPauseLoop();
  }
});