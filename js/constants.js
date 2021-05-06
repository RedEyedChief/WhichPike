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
			title : "barebuh jerking/ (suc: 100)",
			description : "Пппппрривет.. Мы тут с друзьями вечеринку устраиваем. Будет выпивка и музыка. Нам есть 21, если что. Даже документы есть, честно. И вот мы тут подумали, нам бы девочек. Вы можете нам помочь?"
		},
		src : {
			img : "./img/dick.png"
		},
		status : "hidden",
		countdown : {
			dayWorkAppearTime : 1,
			initTime : null,
			startCounter : 30,
			currentCounter : 30,
			startWaiting : null
		},
		routes : {
			main : [ "spawn" , "point-1", "point-2", "point-5", "point-6" ]
		},
		generatedWays : {},
		uponArrival : {
			status : null,
			storyLine : null,
			displayWidget : null
		},
		required: {
				starsSum: 100
		},
		comrades : []
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
			title : "nudes/ (suc: 70)",
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
			currentCounter : 25,
			startWaiting : null
		},
		routes : {
			main : [ "spawn" , "point-1", "point-2", "point-3", "point-4" ]
		},
		generatedWays : {},
		uponArrival : {
			status : null,
			storyLine : null,
			displayWidget : null
		},
		required: {
			starsSum: 70
		},
		comrades : []
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
			title : "nudes/ (sucss: 50)",
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
			currentCounter : 15,
			startWaiting : null
		},
		routes : {
			main : [ "spawn" , "point-7" ]
		},
		generatedWays : {},
		uponArrival : {
			status : null,
			storyLine : null,
			displayWidget : null
		},
		required: {
			starsSum: 50
		},
		comrades : []
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

const MISSION_RESULTS = {
	success: {
		comrades: "unscathed",
		client: "payed"
	},
	terrible: {
		comrades: "scathed",
		client: "disappeared without paying"
	},
	neutral: {
		comrades: "unscathed",
		client: "disappeared without paying"
	},
	bad: {
		comrades: "scathed",
		client: "payed"
	}
}

const COMRADES = [
	{
		id : "c1",
		content : {
			name : "Kochi",
			power : 42,
			img : "./img/comrade-1.png"
		},
		domObjs : {
			comrade : null,
			modalBio : null
		},
		energyLevel : 5
	},
	{
		id : "c2",
		content : {
			name : "Yancey",
			power : 34,
			img : "./img/comrade-2.png"
		},
		domObjs : {
			comrade : null,
			modalBio : null
		},
		energyLevel : 4
	},
	{
		id : "c3",
		content : {
			name : "Purdy",
			power : 28,
			img : "./img/comrade-3.png"
		},
		domObjs : {
			comrade : null,
			modalBio : null
		},
		energyLevel : 1
	},
	{
		id : "c4",
		content : {
			name : "Yurdi",
			power : 15,
			img : "./img/comrade-4.png"
		},
		domObjs : {
			comrade : null,
			modalBio : null
		},
		energyLevel : 2
	}
]

const COPS = [
	{
		id : "cop1",
		status : "hidden",
		routes : {
			main : [ "copSpawn" , "cop-spawn-exit", "point-10", "point-5", "point-8", "point-9" ],
			backward : [ "copSpawn" , "cop-spawn-exit", "point-10" ],
			patrol : [ "point-10", "point-5", "point-8", "point-9" ]
		},
		generatedWays : {},
		car : {
			id : null,
			domObj : null
		},
		countdown : {
			dayWorkAppearTime : 1
		}
	},
	{
		id : "cop2",
		status : "hidden",
		routes : {
			main : [ "copSpawn" , "cop-spawn-exit", "point-10", "point-5", "point-7", "point-1" ],
			backward : [ "copSpawn" , "cop-spawn-exit", "point-10", "point-5", "point-7" ],
			patrol : [ "point-7", "point-1" ]
		},
		generatedWays : {},
		car : {
			id : null,
			domObj : null
		},
		countdown : {
			dayWorkAppearTime : 2
		}
	}
]

const MAX_COMRADE_ENERGY = 5;

const MISSION_STATUSES = {
	hidden: "hidden",
	active : "active",
	accepted : "accepted",
	wait : "wait",
	fight : "fight",
	pressed : "pressed",
	failed : "failed",
	done : "done",
	return : "return",
	past : "past",
	uponArrival : {
		manual: "manual",
		fake: "fake",
		self: "self",
		cops: "cops"
	}
}

const CAR_STATUSES = {
	hidden: "hidden",
	drive : "drive",
	wait : "wait",
	patrolling : "patrolling"
}

const COP_STATUSES = {
	hidden: "hidden",
	drive : "drive",
	wait : "wait",
	patrolling : "patrolling"
}

const POINT_STATUSES = {
	next: "next",
	current: "current",
	past: "past"
}
