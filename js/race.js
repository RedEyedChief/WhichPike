const MAP_MATRIX = {
    a11: {
        x: 200,
        y: 600,
        id: "a11",
        directions: {
            right: "b11"
        }
    },
    a12: {
        x: 250,
        y: 500,
        id: "a12",
        directions: {
            up: "a13",
            right: "b12"
        }
    },
    a13: {
        x: 300,
        y: 400,
        id: "a13",
        directions: {
            down: "a12",
            right: "b13"
        }
    },
    b11: {
        x: 300,
        y: 600,
        id: "b11",
        directions: {
            up: "b12",
            left: "a11",
            right: "c11"
        }
    },
    b12: {
        x: 350,
        y: 500,
        id: "b12",
        directions: {
            down: "b11",
            left: "a12",
            right: "c12"
        }
    },
    b13: {
        x: 400,
        y: 400,
        id: "b13",
        directions: {
            left: "a13",
            right: "c13"
        }
    },
    c11: {
        x: 400,
        y: 600,
        id: "c11",
        directions: {
            up: "c12",
            left: "b11"
        }
    },
    c12: {
        x: 450,
        y: 500,
        id: "c12",
        directions: {
            down: "c11",
            left: "b12",
            up: "c13"
        }
    },
    c13: {
        x: 500,
        y: 400,
        id: "c13",
        directions: {
            left: "b13",
            down: "c12"
        }
    }
};

const HERO = {
    position : 'b12',
    spawn: 'b12'
}


function generateRacePoints() {
    const parent = $('#lv2-points-list');
    const pointTemplate = parent.find('.template').clone().removeClass('template');

    for (let [index, point] of Object.entries(MAP_MATRIX)) {
        let newPoint = pointTemplate.clone();
        newPoint.attr('id', index);
        newPoint.css({
                "top" : point.y+'px',
                "left" : point.x+'px',
                "visibility": "visible"
            });
        newPoint.addClass('lv2-point');
        newPoint.appendTo(parent);
    }
}

function generateHeroCar() {
    const parent = $('#lv2-points-list');
    const newPoint = parent.find('.template').clone().removeClass('template');
    newPoint.attr('id', 'hero-car');
    newPoint.css({
            "top" : MAP_MATRIX.b12.y+'px',
            "left" : MAP_MATRIX.b12.x+'px',
            "visibility": "visible"
        });
    newPoint.addClass('lv2-hero-car');
    HERO.obj = newPoint;
    newPoint.appendTo(parent);
}

function checkHeroMovement(direction) {
    console.log(' current position ', HERO.position);
    console.log(' check move -- direction ', direction);
    console.log(' check move -- ', MAP_MATRIX[HERO.position].directions);
    const currentPoint = MAP_MATRIX[HERO.position];
    if(!currentPoint.directions[direction]) {
        HERO.obj.addClass('wrong-way');
        return
    }

    const heroPosition = document.getElementById('hero-car').getBoundingClientRect();
    if( Math.round(heroPosition.left) !== Math.round(currentPoint.x) ||
        Math.round(heroPosition.top) !== Math.round(currentPoint.y)) {
            console.log(' wrong way! ');

            return;
    }

    const newPoint = MAP_MATRIX[currentPoint.directions[direction]];
    HERO.position = newPoint.id;
    HERO.obj.removeClass('wrong-way');
    const moveX = newPoint.x - MAP_MATRIX[HERO.spawn].x;
    const moveY = newPoint.y - MAP_MATRIX[HERO.spawn].y;
    const moveStr = 'translate(' + moveX + 'px, ' + moveY + 'px)';

    HERO.obj.css({
        "-webkit-transform": moveStr,
        "-moz-transform": moveStr,
        "-ms-transform": moveStr,
        "-o-transform": moveStr,
        "transform": moveStr
    });


    console.log(' SUCCESS: some movements ');
    console.log(' new movements ', newPoint.directions);

}
