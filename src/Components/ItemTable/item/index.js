import React from 'react';
import { connect } from 'react-redux';
import actions from '../../../Actions';
import NumberFormat from 'react-number-format';

const Item = props => {

	const symbol = props.state.currency.symbol;
	const convertSymbol = props.state.currency.convertSymbol;
	const convertValue = props.state.currency.convertValue;
	const item = props.item;

	const calculateDiscount = () => {
		return (item.cost * item.qty * (item.discount / 100))
	}

	const calculateTotal = () => {
		return item.cost * item.qty - calculateDiscount();
	}

	const removeFormatting = (string) => {
		return parseFloat(string.replace(symbol, ""));
	}

	return (
		<div className="row invoice-item">
			<div className="col-xs-1 remove-item-container">
			{!props.state.printMode && <button
					className="btn btn-danger"
					onClick={
						(e) => {
							props.dispatch(actions.item.remove(props.index))
						}}
				>[X]</button>}
			</div>
			<div className="col-xs-3 input-container">
				<input
					placeholder="Description"
					value={item.description}
					onChange={(e) => {
						props.dispatch(actions.item.update(props.index, 'description', e.target.value))
					}}
				/>
			</div>
			<div className="col-xs-2 input-container">
				<input
					size="4"
					placeholder="Quantity"
					value={item.qty}
					onChange={(e) => {
						props.dispatch(actions.item.update(props.index, 'qty', e.target.value))
					}}
				/>
			</div>
			<div className="col-xs-2 input-container">
				<NumberFormat
					size="6"
					placeholder="Cost"
					value={item.cost}
					prefix={symbol}
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
					value={item.discount}
					onChange={(e) => {
						props.dispatch(actions.item.update(props.index, 'discount', e.target.value))
					}}
				/>
			</div>
			<div className="col-xs-3 text-right input-container">
				<NumberFormat
					value={calculateTotal()}
					decimalScale={2}
					displayType="text"
					prefix={symbol}
				/>{!(convertSymbol === '') && <span> (
				<NumberFormat
					value={calculateTotal() * convertValue}
					decimalScale={2}
					displayType="text"
					prefix={convertSymbol}
				/>)</span>}
			</div>
		</div>
	)
}

const mapStatesToProps = state => ({ state })

export default connect(mapStatesToProps)(Item);