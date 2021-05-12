const MISSION_TEMPLATE = {
	id : "mTemplate",
	position : {
		top : 35,
		left : 4
	},
	domObjs : {
		flag : null,
		call : null,
		message : null,
		startModal : null,
		resultModal : null
	},
	content : {
		title : "Some title",
		description : "Some nudes"
	},
	requirements: {
		cuntCount: 1
	},
	reward: {
		currency: 999,
		item: "pike"
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
	type: null,
	widgets: {},
	comrades : [],
	processInfo : {}
}

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
			startModal : null,
			resultModal : null
		},
		content : {
			title : "Приятный вечер",
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
		type: "self",
		widgets: {},
		requirements: {
				starsSum: 250
		},
		reward: {
			currency: 420,
			item: "pike"
		},
		comrades : [],
		processInfo : {}
	},
	{
		id : "m2",
		type: "manual",
		position : {
			top : 30,
			left : 82
		},
		domObjs : {
			flag : null,
			call : null,
			message : null,
			startModal : null,
			resultModal : null
		},
		content : {
			title : "Черный шоколад",
			description : "Алло! Я хочу сегодня чего-нибудь экзотического. Пришлите мне чёрную девушку, она станет рабыней моего полёта фантазий. Я хорошо заплачу.",
			arrivalDescription: '- Я заказывал черную девушку, а вы нахера приперлись, бляди?! \n - Поверь нам дорогуша, мы сможем удовлетворить тебя не хуже любого цвета девушки. Мммм.. \n - Вы блять меня за идиота держите?! Я сказал я же уточнял кто мне нужен! Ну сейчас вы у меня получите!',
			storyTree: {
				a11: {
					type: "final",
					text: "Отдаться клиенту",
					requirements: {
						starsSum: 500
					}
				},
				b11: {
					type: "final",
					text: "Показать кто здесь главный",
					requirements: {
						skills: "dominant"
					}
				},
				c11: {
					type: "final",
					text: "Врезать клиенту",
					requirements: {
						skills: "strong"
					}
				},
				d11: {
					type: "final",
					special: "skin",
					text: "Глазки открой",
					requirements: {
						skin: "black"
					}
				}
			}
		},
		requirements: null,
		reward: {
			currency: 666,
			item: "pike"
		},
		src : {
			img : "./img/tits.gif"
		},
		status : "hidden",
		countdown : {
			dayWorkAppearTime : 13,
			initTime : null,
			startCounter : 25,
			currentCounter : 25,
			startWaiting : null
		},
		routes : {
			main : [ "spawn" , "point-1", "point-2", "point-3", "point-4" ]
		},
		generatedWays : {},
		widgets: {},
		comrades : [],
		processInfo : {}
	},
	{
		id : "m3",
		type: "reinforcement",
		position : {
			top : 35,
			left : 4
		},
		domObjs : {
			flag : null,
			call : null,
			message : null,
			startModal : null,
			resultModal : null
		},
		content : {
			title : "Сырная вечеринка",
			description : "Алло! Мне нужно 2 острые пепперони, 2 с двойным сыром и одну с грибами. Адрес: Оушен Драйв, 13. Если приедите быстро, плачу двойную ставку. У меня тут целый дом голодных ротиков.",
			arrivalDescription: "Босс, у них тут сладострастная оргия в каждой комнате, нам не помешало бы подкрепление."
		},
		requirements: {
			cuntCount: 5
		},
		reward: {
			currency: 999,
			item: "pike"
		},
		src : {
			img : "./img/tits.gif"
		},
		status : "hidden",
		countdown : {
			dayWorkAppearTime : 21,
			initTime : null,
			startCounter : 15,
			currentCounter : 15,
			startWaiting : null
		},
		routes : {
			main : [ "spawn" , "point-7" ]
		},
		generatedWays : {},
		widgets: {},
		comrades : [],
		processInfo : {}
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
		verdict: "success",
		comrades: "unscathed",
		client: "payed"
	},
	terrible: {
		verdict: "fail",
		comrades: "scathed",
		client: "disappeared without paying"
	},
	neutral: {
		verdict: "fail",
		comrades: "unscathed",
		client: "disappeared without paying"
	},
	bad: {
		verdict: "fail",
		comrades: "scathed",
		client: "payed"
	}
}

const COMRADES = [
	{
		id : "c1",
		skin : "white",
		skills : {
			anal: "anal",
			deepthroat: "deepthroat",
			bigTits: "bigTits"
		},
		content : {
			name : "Kochi",
			power : 420,
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
		skin : "white",
		skills : {
			bigTits: "bigTits",
			strong: "strong"
		},
		content : {
			name : "Yancey",
			power : 140,
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
		skin : "white",
		skills : {
			strip: "amateur",
			deepthroat: "deepthroat"
		},
		content : {
			name : "Purdy",
			power : 280,
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
		skin : "black",
		skills : {
			anal: "anal"
		},
		content : {
			name : "Yurdi",
			power : 150,
			img : "./img/comrade-4.png"
		},
		domObjs : {
			comrade : null,
			modalBio : null
		},
		energyLevel : 2
	},
	{
		id : "c5",
		skin : "white",
		skills : {
			strip: "pro"
		},
		content : {
			name : "Yurec",
			power : 320,
			img : "./img/comrade-5.png"
		},
		domObjs : {
			comrade : null,
			modalBio : null
		},
		energyLevel : 4
	},
	{
		id : "c6",
		skin : "white",
		skills : {
			bigTits: "bigTits",
			costume: "maid",
			slave: "slave"
		},
		content : {
			name : "Turec",
			power : 270,
			img : "./img/comrade-6.png"
		},
		domObjs : {
			comrade : null,
			modalBio : null
		},
		energyLevel : 5
	},
	{
		id : "c7",
		skin : "white",
		skills : {
			bigTits: "bigTits",
			costume: "police",
			toys: "toys"
		},
		content : {
			name : "Anec",
			power : 350,
			img : "./img/comrade-7.png"
		},
		domObjs : {
			comrade : null,
			modalBio : null
		},
		energyLevel : 5
	},
	{
		id : "c8",
		skin : "white",
		skills : {
			bigTits: "bigTits",
			costume: "latex",
			toys: "toys",
			strong: "strong",
			dominant: "dominant"
		},
		content : {
			name : "Ivan",
			power : 550,
			img : "./img/comrade-8.png"
		},
		domObjs : {
			comrade : null,
			modalBio : null
		},
		energyLevel : 4
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
	past : "past"
}

const MISSION_TYPES = {
	regular: {
		manual: "manual",
		fake: "fake",
		self: "self",
		reinforcement: "reinforcement"
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

const RF_STAGE = {
	start: "start",
	end: "end",
	waiting: "waiting"
}

const MISSION_TYPE_ARRAY = [ 'manual', 'fake', 'self', 'reinforcement' ]
