import React from 'react';
import { connect } from 'react-redux';
import actions from '../../../Actions';

const Item = props => {

	return (
		<div className="row invoice-item">
			<div className="col-xs-1 remove-item-container">
				<a
					className="btn btn-danger"
					href='#'
					onClick={
						(e) => {
							e.preventDefault();
							props.dispatch(actions.item.remove(props.index))
						}}
					>[X]</a>
			</div>
			<div className="col-xs-5 input-container">
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
				<input
					size="6"
					placeholder="Cost"
					value={props.item.cost.toFixed(2)}
					onChange={(e) => {
						props.dispatch(actions.item.update(props.index, 'cost', e.target.value))
					}}				
				/>
			</div>
			<div className="col-xs-2 text-right input-container">
				{props.item.cost * props.item.qty}
			</div>
		</div>
	)
}

const mapStatesToProps = state => ({ state })

export default connect(mapStatesToProps)(Item);