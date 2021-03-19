import React from 'react';
import { connect } from 'react-redux';
import Button from '../Button';
import actions from '../../Actions';

const ActionArea = props => {

  const clearLocalStorage = () => {
   	let confirmClear = window.confirm('Are you sure you would like to clear the invoice?');
   	if (confirmClear) {
      props.dispatch(actions.info.reset());
      props.dispatch(actions.item.reset());
      props.dispatch(actions.logo.reset());
   	}
   };

  const setPrintMode = (toggle) => {
    props.dispatch(actions.printMode.set(toggle))
  }

  return (
		<div className="row noPrint actions">
      {props.state.printMode &&
			<Button onClick={() => window.print()}>Print</Button>}
			<Button onClick={
        (e) => {
          e.preventDefault()
          clearLocalStorage()
        }
        }>Reset</Button>
			{!props.state.printMode ? <Button onClick={() => setPrintMode(true)}>Turn On Print Mode</Button> : <Button onClick={() => setPrintMode(false)}>Turn Off Print Mode</Button>}
		</div>
  )
}

const mapStatesToProps = state => ({ state })

export default connect(mapStatesToProps)(ActionArea);