const MISSIONS = [
	{
		id : "m1",
		position : {
			top : 10,
			left : 20
		},
		domObjs : {
			flag : null,
			call : null,
			message : null,
			modalStart : null
		},
		content : {
			title : "barebuh jerking",
			description : "zaprevshye eggs and some dicks need terebonk"
		},
		src : {
			img : "./img/dick.png"
		},
		status : "hidden",
		countdown : {
			dayWorkAppearTime : 1,
			initTime : null,
			startCounter : 30,
			currentCounter : 30
		},
		car : {
			id : null,
			domObj : null
		},
		route : [ "spawn" , "point-1", "point-2", "point-5", "point-6" ],
		points : [],
		uponArrival : {
			status : null,
			storyLine : null,
			displayWidget : null
		}
	},
	{
		id : "m2",
		position : {
			top : 30,
			left : 82
		},
		domObjs : {
			flag : null,
			call : null,
			message : null,
			modalStart : null
		},
		content : {
			title : "nudes",
			description : "send nudes"
		},
		src : {
			img : "./img/tits.gif"
		},
		status : "hidden",
		countdown : {
			dayWorkAppearTime : 3,
			initTime : null,
			startCounter : 25,
			currentCounter : 25
		},
		car : {
			id : null,
			domObj : null
		},
		route : [ "spawn" , "point-1", "point-2", "point-3", "point-4" ],
		points : [],
		uponArrival : {
			status : null,
			storyLine : null,
			displayWidget : null
		}
	},
	{
		id : "m3",
		position : {
			top : 35,
			left : 4
		},
		domObjs : {
			flag : null,
			call : null,
			message : null,
			modalStart : null
		},
		content : {
			title : "nudes",
			description : "send nudes"
		},
		src : {
			img : "./img/tits.gif"
		},
		status : "hidden",
		countdown : {
			dayWorkAppearTime : 1,
			initTime : null,
			startCounter : 15,
			currentCounter : 15
		},
		car : {
			id : null,
			domObj : null
		},
		route : [ "spawn" , "point-7" ],
		points : [],
		uponArrival : {
			status : null,
			storyLine : null,
			displayWidget : null
		}
	}
]



const STORY_LINE = {
	index : "000",
	lines : [
		{
			text : "vzyauu",
			index : "100",
			lines : [
				{
					text : "aaaa124",
					index : "110",
					lines : [
						{
							text : "a1",
							end : "best"
						},
						{

							text : "a2",
							end : "good"
						},
						{

							text : "a4",
							end : "died"
						}
					]
				},
				{

					text : "vz3",
					end : "fail"
				},
				{

					text : "vzya3",
					end : "fail"
				}
			]
		},
		{
			text : "pryhavav",
			index : "200",
			lines : [
				{

					text : "pr2",
					end : "good"
				},
				{

					text : "pr3",
					end : "fail"
				},
				{
					text : "pryha14",
					index : "230",
					lines : [
						{
							text : "pryhavav1",
							end : "best"
						},
						{

							text : "pryhavav4",
							end : "died"
						}
					]
				}
			]
		},
		{
			text : "solodenko",
			index : "300",
			lines : [
				{

					text : "s4",
					end : "died"
				},
				{
					text : "solo34",
					index : "320",
					lines : [
						{
							text : "solodenko3",
							end : "fail"
						},
						{

							text : "solodenko4",
							end : "died"
						}
					]
				}
			]
		}
	]
}

const COMRADS = [
	{
		id : "c1",
		content : {
			name : "Kochi",
			power : 42,
			img : "./img/comrad-1.png"
		},
		domObjs : {
			teammate : null,
			modalBio : null
		}
	},
	{
		id : "c2",
		content : {
			name : "Yancey",
			power : 34,
			img : "./img/comrad-2.png"
		},
		domObjs : {
			teammate : null,
			modalBio : null
		}
	},
	{
		id : "c3",
		content : {
			name : "Purdy",
			power : 28,
			img : "./img/comrad-3.png"
		},
		domObjs : {
			teammate : null,
			modalBio : null
		}
	},
	{
		id : "c4",
		content : {
			name : "Yurdi",
			power : 5,
			img : "./img/comrad-4.png"
		},
		domObjs : {
			teammate : null,
			modalBio : null
		}
	}
]