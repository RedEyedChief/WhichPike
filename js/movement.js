function reverseList(points) {
	let pointIndex = 0;
	console.log(' -- points -- BEGIN == ', points);

	for (let point of points) {

		point.status = "next";
		console.log(' -- points -- for : ', points);

		if (pointIndex === points.length) {

			point.status = "past"
		}
	}

	console.log(' -- points -- END == ', points);
	points.reverse();
	// confirm('POPU MYL? ')
	/*console.log("1111");
	showQuestModal();*/
}

