import React from 'react';
import { connect } from 'react-redux';

import actions from '../../Actions';

import InfoInput from '../InfoInput';

const InfoArea = props => {

	const currencyList = props.state.currency.availableCurrency;

	React.useEffect(() => {
		getInfo();
	}, [])

	React.useEffect(() => {
		saveInfo();
	}, [props.state.info])

	const getInfo = () => {
		if (localStorage['info'] === '' || localStorage['info'] === null || localStorage['info'] == undefined) {
			saveInfo();
		} else {
			props.dispatch(actions.info.set(
				JSON.parse(localStorage['info'])
			))
		}
	}

	const saveInfo = () => {
		localStorage['info'] = JSON.stringify(props.state.info)
	}

	return (
		<div className="row infos">
			<div className="col-xs-6">
				<div className="input-container">
					<InfoInput id='customer-info__name' type='text' info='customer_info' name='name'>
					</InfoInput>
				</div>
				<div className="input-container">
					<InfoInput id='customer-info__web_link' type='text' info='customer_info' name='web_link'>
					</InfoInput>
				</div>
				<div className="input-container">
					<InfoInput id='customer-info__address1' type='text' info='customer_info' name='address1'>
					</InfoInput>
				</div>
				<div className="input-container">
					<InfoInput id='customer-info__address2' type='text' info='customer_info' name='address2'>
					</InfoInput>
				</div>
				<div className="input-container">
					<InfoInput id='customer_info__postal' type='text' info='customer_info' name='postal'>
					</InfoInput>
				</div>
				<div className="input-container">
					<select 
						onChange={(e) => props.dispatch(actions.currency.update(e.target.value))}>
						{currencyList.map((currency, index) => (
							<option 
							key={index} 
							value={currency.symbol}>
								{currency.name}
							</option>
						))}
					</select>
				</div>
			</div>
			<div className="col-xs-6 right">
				<div className="input-container">
					<InfoInput id='company_info__name' type='text' info='company_info' name='name'>
					</InfoInput>
				</div>
				<div className="input-container">
					<InfoInput id='company_info__web_link' type='text' info='company_info' name='web_link'>
					</InfoInput>
				</div>
				<div className="input-container">
					<InfoInput id='company_info__address1' type='text' info='company_info' name='address1'>
					</InfoInput>
				</div>
				<div className="input-container">
					<InfoInput id='company_info__address2' type='text' info='company_info' name='address2'>
					</InfoInput>
				</div>
				<div className="input-container">
					<InfoInput id='company_info__postal' type='text' info='company_info' name='postal'>
					</InfoInput>
				</div>
			</div>
		</div>
	)
}

const mapStatesToProps = state => ({ state })

export default connect(mapStatesToProps)(InfoArea);
