import React from 'react';
import { connect } from 'react-redux';
import Item from './item/item';
import InfoInput from '../InfoInput/Container';
import actions from '../../Actions';

const ItemTable = props => {

	let items = props.state.item;
	let tax = props.state.info.invoice.tax;

	React.useEffect(()=>{
		getItems();
	},[])

	React.useEffect(()=>{
		saveItems();
	}, [items]);

	const invoiceSubTotal = () => {
		var total = 0.00;
		items.forEach((item) => {
			total += (item.qty * item.cost - (item.cost * item.qty * (item.discount/100)));
		});
		
		return total;
	};

	const getItems = () => {
		if (localStorage['item'] === '' || localStorage['item'] === null || localStorage['item'] == undefined) {
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
				<div className="col-xs-2">Discount</div>
				<div className="col-xs-2 text-right">Total</div>
			</div>
			{items.map((item, index) => (
				<Item key={index} item={item} index={index}></Item>
			))}
			<div className="row invoice-item">
				<div className="col-xs-12 add-item-container">
					<a
						className="btn btn-primary"
						href='#'
						onClick={
							(e) => {
								e.preventDefault();
								props.dispatch(actions.item.add())
							}
						}
					>[+]</a>
				</div>
			</div>
			<div className="row">
				<div className="col-xs-10 text-right">Sub Total</div>
				<div className="col-xs-2 text-right">
					{invoiceSubTotal().toFixed(2)}
				</div>
			</div>
			<div className="row">
				<div className="col-xs-10 text-right">Tax(%): 
					<InfoInput 
					id="invoice__tax"
					type="text"
					info="invoice"
					name="tax"
					style={{ 
						width: "43px",
					}}
					/>
				</div>
				<div className="col-xs-2 text-right">
					{calculateTax().toFixed(2)}
				</div>
			</div>
			<div className="row">
				<div className="col-xs-10 text-right">Grand Total:</div>
				<div className="col-xs-2 text-right">
					{calculateGrandTotal().toFixed(2)}
				</div>
			</div>
		</div>
	)
}

const mapStatesToProps = state => ({ state })

export default connect(mapStatesToProps)(ItemTable);