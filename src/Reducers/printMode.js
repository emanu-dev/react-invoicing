const printModeReducer = (state = false, action) => {
	switch (action.type) {
		case 'SET-PRINTMODE':
			return action.toggle;
		default:
			return state;
	}
}

export default printModeReducer;