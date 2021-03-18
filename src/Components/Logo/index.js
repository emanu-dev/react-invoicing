import React from "react";
import {Provider} from 'react-redux';
import Logo from './logo';
import store from '../../store';

const LogoContainer = props => {
	return (
		<Provider store={store}>
			<Logo
				{...props}
			/>
		</Provider>
	)
}

export default LogoContainer;