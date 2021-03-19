import React from 'react';
import { connect } from 'react-redux';

import actions from '../../Actions';

import InfoInput from '../InfoInput';

const InfoArea = props => {

	const currencyList = props.state.currency.availableCurrency;

	const getInfo = () => {
		if (localStorage['info'] === '' || localStorage['info'] === null || localStorage['info'] === undefined) {
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

	React.useEffect(() => {
		getInfo();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	React.useEffect(() => {
		saveInfo();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.state.info])

	React.useEffect(() => {
		const originCurrencyObj = currencyList.find(
			(currency => currency.symbol === props.state.currency.symbol)
		)

		const conversionCurrencyObj = currencyList.find(
			(currency => currency.symbol === props.state.currency.toConvertCurrency)
		)

		if (conversionCurrencyObj === undefined) {
			props.dispatch(actions.currency.setConvert(1))
		} else {
			fetch(`https://free.currconv.com/api/v7/convert?q=${originCurrencyObj.code}_${conversionCurrencyObj.code}&compact=ultra&apiKey=882c8d5c37ab473b4691`)
				.then(res => res.json())
				.then(
					(result) => {
						props.dispatch(actions.currency.setConvert(result[`${originCurrencyObj.code}_${conversionCurrencyObj.code}`]))
					},
					(error) => {
						console.err(error)
					}
				)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.state.currency.symbol, props.state.currency.toConvertCurrency])

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
					{!props.state.printMode &&
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
					}
					{!props.state.printMode && <span> → </span>}
					{!props.state.printMode &&
						<select
							onChange={(e) => props.dispatch(actions.currency.updateConvert(e.target.value))}>
							<option value=''>Select currency to convert</option>
							{currencyList.map((currency, index) => (
								<option
									key={index}
									value={currency.symbol}>
									{currency.name}
								</option>
							))}
						</select>
					}
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
