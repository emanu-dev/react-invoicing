import React from 'react';
import { connect } from 'react-redux';
import actions from '../../../Actions';
import NumberFormat from 'react-number-format';

const Item = props => {

	const prefix = props.state.currency.symbol;
	const convertedPrefix = props.state.currency.toConvertCurrency;
	const currencyConversionMultiplier = props.state.currency.currencyConversionMultiplier;

	const calculateDiscount = () => {
		return (props.item.cost * props.item.qty * (props.item.discount / 100))
	}

	const removeFormatting = (string) => {
		return parseFloat(string.replace(prefix, ""));
	}

	return (
		<div className="row invoice-item">
			<div className="col-xs-1 remove-item-container">
			{!props.state.printMode && <a
					className="btn btn-danger"
					href='#'
					onClick={
						(e) => {
							e.preventDefault();
							props.dispatch(actions.item.remove(props.index))
						}}
				>[X]</a>}
			</div>
			<div className="col-xs-3 input-container">
				<input
					placeholder="Description"
					value={props.item.description}
					onChange={(e) => {
						props.dispatch(actions.item.update(props.index, 'description', e.target.value))
					}}
				/>
			</div>
			<div className="col-xs-2 input-container">
				<input
					size="4"
					placeholder="Quantity"
					value={props.item.qty}
					onChange={(e) => {
						props.dispatch(actions.item.update(props.index, 'qty', e.target.value))
					}}
				/>
			</div>
			<div className="col-xs-2 input-container">
				<NumberFormat
					size="6"
					placeholder="Cost"
					value={props.item.cost}
					prefix={prefix}
					isNumericString={true}
					onChange={(e) => {
						props.dispatch(actions.item.update(props.index, 'cost', removeFormatting(e.target.value)))
					}}
				/>
			</div>
			<div className="col-xs-1 input-container">
				<input
					size="6"
					placeholder="%"
					value={props.item.discount}
					onChange={(e) => {
						props.dispatch(actions.item.update(props.index, 'discount', e.target.value))
					}}
				/>
			</div>
			<div className="col-xs-3 text-right input-container">
				<NumberFormat
					value={props.item.cost * props.item.qty - calculateDiscount()}
					decimalScale={2}
					displayType="text"
					prefix={prefix}
				/>{!(convertedPrefix === '') && <span> (
				<NumberFormat
					value={(props.item.cost * props.item.qty - calculateDiscount()) * currencyConversionMultiplier}
					decimalScale={2}
					displayType="text"
					prefix={convertedPrefix}
				/>)</span>}
			</div>
		</div>
	)
}

const mapStatesToProps = state => ({ state })

export default connect(mapStatesToProps)(Item);