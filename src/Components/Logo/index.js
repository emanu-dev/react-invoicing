import React from "react";
import PropTypes from "prop-types";

const Logo = (props) => {
	const [hide, setHide] = React.useState(false);
	const [logo, setLogo] = React.useState('images/metaware_logo.png');

	const imgInp = React.useRef(null);

	React.useEffect(() => {
		console.log(hasLogo())
		if (hasLogo()) {
			setLogo(localStorage['logo']);
		}else{
			setLogo('images/metaware_logo.png');
		}
	}, [])

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
				setLogo(e.target.result);
				localStorage['logo'] = e.target.result;
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
		{!hide && <img src={logo} width={props.width} />}
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

export default Logo;