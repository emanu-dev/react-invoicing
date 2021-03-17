import React from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";

const InfoInput = (props) => {

	const defaultInfo = {
		invoice: {
			tax: 13,
			invoice_number: 10,
		},
		customer_info: {
			name: "Mr. John Doe",
			web_link: "John Doe Designs Inc.",
			address1: "1 Infinite Loopab",
			address2: "Cupertino, California, US",
			postal: "90210"
		},
		company_info: {
			name: "Metaware Labs",
			web_link: "www.metawarelabs.com",
			address1: "123 Yonge Street",
			address2: "Toronto, ON, Canada",
			postal: "M5S 1B6"
		},
	};

	const [info, setInfo] = React.useState(defaultInfo);

	React.useEffect(() => {
		if (hasInfo) {
			const info = JSON.parse(localStorage['invoice']);
			setInfo({
				invoice: {
					tax: info.tax,
					invoice_number: info.invoice_number,
				},
				customer_info: info.customer_info,
				company_info: info.company_info,				
			})
		}
	}, [])

	React.useEffect(() => {
		const info = props.state.info;
		localStorage['invoice'] = JSON.stringify({
			tax: info.invoice.tax,
			invoice_number: info.invoice.invoice_number,
			customer_info: info.customer_info,
			company_info: info.company_info,
		})
	}, [props.state])

	const hasInfo = () => {
		return !(localStorage['invoice'] == '' || localStorage['invoice'] == null);
	};

	return (
		<div>
			{props.label && <label htmlFor={props.id}>{props.label}</label>}
			<input
				type={props.type}
				id={props.id}
				info={props.info}
				name={props.name}
				defaultValue={info[props.info][props.name]}
				onChange={
					(e) => {
						props.dispatch({ type: 'UPDATE', info: props.info, key: props.name, value: e.target.value })
						console.log(props.state)
					}
				}
			/>
		</div>
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