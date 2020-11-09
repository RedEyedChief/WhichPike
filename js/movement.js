function reverseList(mission) {
	let pointIndex = 0;
	const newPoints = mission.points.filter(point => point.id !== "point-pause");

	console.log(' newPoints ', newPoints);
	for (let point of newPoints) {
		point.status = "next";
		console.log(' -- points -- for : ', newPoints);
		pointIndex++;
		/*if (pointIndex === points.length) {

			point.status = "past"
		}*/
	}

	console.log(' -- points -- END == ', newPoints);
	newPoints.reverse();
	mission.points = newPoints;
	// confirm('POPU MYL? ')
	/*console.log("1111");
	showQuestModal();*/
}

