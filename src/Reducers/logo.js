const defaultLogo = 'images/metaware_logo.png';

const logoReducer = (state = defaultLogo, action) => {
	switch (action.type) {
		case 'SET-LOGO':
			return action.logo;
    case 'RESET-LOGO':
        return defaultLogo;
		default:
			return state;
	}
}

export default logoReducer;