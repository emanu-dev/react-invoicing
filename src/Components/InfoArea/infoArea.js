import React from 'react';
import { connect } from 'react-redux';

import actions from '../../Actions';

import InfoInput from '../InfoInput/Container';

const InfoArea = props => {

	const [info, setInfo] = React.useState(props.state.info);
	const currencyList = [
		{
			name: 'British Pound (£)',
			symbol: '£'
		},
		{
			name: 'Canadian Dollar ($)',
			symbol: 'CAD $ '
		},
		{
			name: 'Euro (€)',
			symbol: '€'
		},
		{
			name: 'Indian Rupee (₹)',
			symbol: '₹'
		},
		{
			name: 'Norwegian krone (kr)',
			symbol: 'kr '
		},
		{
			name: 'US Dollar ($)',
			symbol: '$'
		}
	]

	React.useEffect(() => {
		getInfo();
	}, [])

	React.useEffect(() => {
		saveInfo();
	}, [info])

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
		localStorage['info'] = JSON.stringify(info)
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
					<select>
						{currencyList.map((currency, index) => (
							<option key={index} defaultValue={currency.symbol}>{currency.name}</option>
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
