const defaultInfo = {
	invoice: {
		tax: 13,
		invoice_number: 15,
	},
	customer_info: {
		name: "Mr. John Doe",
		web_link: "John Doe Designs Inc.",
		address1: "1 Infinite Loopab",
		address2: "Cupertino, California, US",
		postal: "90210"
	},
	company_info: {
		name: "Metaware Labs",
		web_link: "www.metawarelabs.com",
		address1: "123 Yonge Street",
		address2: "Toronto, ON, Canada",
		postal: "M5S 1B6"
	},
}

const infoReducer = (state = defaultInfo, action) => {
	switch (action.type) {
		case 'INFO-SET':
			return action.infoObject
		case 'INFO-UPDATE':
			return {
				...state,
				[action.info]: {
					...state[action.info],
					[action.key]: action.value
				}
			}
		default:
			return state;
	}
}

export default infoReducer;