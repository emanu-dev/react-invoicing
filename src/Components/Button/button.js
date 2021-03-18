import React from 'react';
import { connect } from 'react-redux';

const Button = props => {
  return (
    <a href="#" className="btn btn-primary" onClick={props.onClick}>
      {props.children}
    </a>
  )
}

const mapStatesToProps = state => ({ state })

export default connect(mapStatesToProps)(Button);