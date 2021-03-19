import React from 'react';
import { connect } from 'react-redux';

const Button = props => {
  return (
    <button className="btn btn-primary" onClick={props.onClick}>
      {props.children}
    </button>
  )
}

const mapStatesToProps = state => ({ state })

export default connect(mapStatesToProps)(Button);