$(function() {
	const custle = $('#custle-chr');
	const custleOffsetX = custle.offset().left;
	const enemy = $('.enemy-template');
	const distance = custleOffsetX - enemy.width();
	// const distance = 500;
	moveStr = 'translateX(' + distance + 'px)';
	

	const spawn = $('#enemy-spawn');
	const enemyTemplate = $('.enemy-template');

	custle.on('touchstart click', function(e){
		e.preventDefault();
		attack();
	});

	setInterval(() => {
		createEnemy(spawn, enemyTemplate, moveStr);
	}, 3000);
});

function attack() {
	const enemies = $('.enemy:not(.enemy-template, .enemy-killed)');
	let closestEnemy;
	enemies.each(function(index) {
		if (!closestEnemy || $(this).offset().left > closestEnemy.offset().left)
			closestEnemy = $(this);
	});

	//console.log('------------');
	closestEnemy.addClass('enemy-killed');
	closestEnemy.fadeOut('slow');
}

function createEnemy(spawn, enemyTemplate, moveStr) {
	const newEnemy = enemyTemplate.clone().removeClass('enemy-template');
	console.log('new enemy', newEnemy);
	newEnemy.appendTo(spawn);
	setTimeout(() => {
		newEnemy.css({
			"-webkit-transform": moveStr,
			"-moz-transform": moveStr,
			"-ms-transform": moveStr,
			"-o-transfrom": moveStr,
			"transform": moveStr
		});
	},500);
}