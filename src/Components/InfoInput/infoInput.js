import React from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import actions from '../../Actions';

const InfoInput = (props) => {
	return (
		<>
			{props.label && <label htmlFor={props.id}>{props.label}</label>}
			<input
				type={props.type}
				id={props.id}
				info={props.info}
				name={props.name}
				value={props.state.info[props.info][props.name]}
				style={props.style}
				onChange={
					(e) => {
						props.dispatch(actions.info.update(props.info, props.name, e.target.value))
					}
				}
			/>
		</>
	)
}

InfoInput.propTypes = {
	type: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	info: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired
};

const mapStatesToProps = state => ({ state })

export default connect(mapStatesToProps)(InfoInput);