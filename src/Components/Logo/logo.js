import React from "react";
import PropTypes from "prop-types";
import { connect } from 'react-redux';

import actions from '../../Actions';

const Logo = props => {
	const [hide, setHide] = React.useState(false);

	const imgInp = React.useRef(null);

	React.useEffect(() => {
		if (hasLogo()) {
			props.dispatch(actions.logo.set(localStorage['logo']))
		}else{
			localStorage['logo'] = props.state.logo;
		}
	}, [])

	React.useEffect(() => {
    localStorage['logo'] = props.state.logo;
	},[props.state.logo])

	const hasLogo = () => {
		return !(localStorage['logo'] === '' || localStorage['logo'] === null || localStorage['logo'] == undefined);
	};

	const toggleLogo = () => {
		setHide(!hide);
	}

	const editLogo = () => {
		imgInp.current.click();
	};

	const readUrl = (input) => {
		if (input.files && input.files[0]) {
			let reader = new FileReader();
			reader.onload = (e) => {
        if (Math.round((input.files[0].size/1024)/1024) > 3) {
          alert('Please select a file smaller than 3MB');
          return null;
        }else{
          props.dispatch(actions.logo.set(e.target.result))
        }
			}
			reader.readAsDataURL(input.files[0]);
		}
	};

	return (
		<div>
		<input
			type="file"
			ref={imgInp}
			id="imgInp"
			onChange={
				(e) => {
					readUrl(e.target)
				}} />
		{!hide && <img src={props.state.logo} width={props.width} />}
		<div>
			<a
				onClick={(e) => {
					e.preventDefault();
					editLogo()
				}}
				href='#'>Edit Logo </a>
			<a
				onClick={(e) => {
					e.preventDefault();
					toggleLogo(false)
				}}
				href='#'>{`${hide ? 'Show' : 'Hide'} `}logo</a>
		</div>
	</div>		
	)
};

Logo.propTypes = {
	width: PropTypes.number.isRequired,
};

const mapStatesToProps = state => ({ state })

export default connect(mapStatesToProps)(Logo);