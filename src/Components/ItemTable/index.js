import React from 'react';
import { connect } from 'react-redux';
import NumberFormat from 'react-number-format';

import Item from './item';
import InfoInput from '../InfoInput';
import actions from '../../Actions';

const ItemTable = props => {

	const items = props.state.item;
	const tax = props.state.info.invoice.tax;
	const symbol = props.state.currency.symbol;
	const convertSymbol = props.state.currency.convertSymbol;
	const convertValue = props.state.currency.convertValue;

	React.useEffect(()=>{
		getItems();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	},[])

	React.useEffect(()=>{
		saveItems();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [items]);

	const getItems = () => {
		if (localStorage['item'] === '' || localStorage['item'] === null || localStorage['item'] === undefined) {
			saveItems();
		}else{
			props.dispatch(actions.item.set(
				JSON.parse(localStorage['item'])
			))
		}
	}

	const saveItems = () => {
		localStorage['item'] = JSON.stringify(items)
	}
	
	const invoiceSubTotal = () => {
		var total = 0.00;
		items.forEach((item) => {
			total += (item.qty * item.cost - (item.cost * item.qty * (item.discount/100)));
		});
		
		return total;
	};
	
	const calculateTax = () => {
		return ((tax * invoiceSubTotal()) / 100);
	};

	const calculateGrandTotal = () => {
		return calculateTax() + invoiceSubTotal();
	};

	return (
		<div className="items-table">
			<div className="row header">
				<div className="col-xs-1">&nbsp;</div>
				<div className="col-xs-3">Description</div>
				<div className="col-xs-2">Quantity</div>
				<div className="col-xs-2">Cost $</div>
				<div className="col-xs-2">Discount %</div>
				<div className="col-xs-2 text-right">Total</div>
			</div>
			{items.map((item, index) => (
				<Item key={index} item={item} index={index}></Item>
			))}
			<div className="row invoice-item">
			{!props.state.printMode &&
			<div className="col-xs-12 add-item-container">
					<button className="btn btn-primary" onClick={() => {props.dispatch(actions.item.add())}}
					>[+]</button>
				</div>}
			</div>
			<div className="row">
				<div className="col-xs-9 text-right">Sub Total</div>
				<div className="col-xs-3 text-right">
					<NumberFormat value={invoiceSubTotal()} decimalScale={2} displayType="text" prefix={symbol} />					
				{!(convertSymbol === '') && <span> (
					<NumberFormat value={invoiceSubTotal() * convertValue} decimalScale={2} displayType="text" prefix={convertSymbol}
					/>)
					</span>}
				</div>
			</div>
			<div className="row">
				<div className="col-xs-9 text-right">Tax(%): 
					<InfoInput id="invoice__tax" type="text" info="invoice" name="tax" style={{ width: "38px" }} />
				</div>
				<div className="col-xs-3 text-right">
					<NumberFormat value={calculateTax()} decimalScale={2} displayType="text" prefix={symbol} />
					{!(convertSymbol === '') && <span> (
					<NumberFormat value={calculateTax() * convertValue} decimalScale={2} displayType="text" prefix={convertSymbol}/>
					)</span>}
				</div>
			</div>
			<div className="row">
				<div className="col-xs-9 text-right">Grand Total:</div>
				<div className="col-xs-3 text-right">
					<NumberFormat value={calculateGrandTotal()} decimalScale={2} displayType="text" prefix={symbol}/>
					{!(convertSymbol === '') && <span> (
					<NumberFormat value={calculateGrandTotal() * convertValue} decimalScale={2} displayType="text" prefix={convertSymbol}
					/>)</span>}
				</div>
			</div>
		</div>
	)
}

const mapStatesToProps = state => ({ state })

export default connect(mapStatesToProps)(ItemTable);