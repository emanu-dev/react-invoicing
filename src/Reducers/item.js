const newItem = {
	qty: 0,
	description: "",
	cost: 0,
	discount: 0,
}

const defaultItems = [{
	qty: 20,
	description: "Gadget",
	cost: 9.95,
	discount: 0,
}]

const itemReducer = (state = defaultItems, action) => {
	switch (action.type) {
		case 'SET':
			return action.itemList;
		case 'ADD':
			return [
				...state,
				newItem
			]
		case 'REMOVE':
			return [
				...state.slice(0, action.index),
				...state.slice(action.index + 1)
			]
		case 'UPDATE':
			return [
				...state.slice(0, action.index),
				state[action.index] = {
					...state[action.index],
					[action.key]: action.value
				},
				...state.slice(action.index + 1)
			]
		default:
			return state;
	}
}

export default itemReducer;