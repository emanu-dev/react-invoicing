import React from 'react';
import { connect } from 'react-redux';

import Header from './Components/Header'
import InfoArea from './Components/InfoArea';
import ItemTable from './Components/ItemTable';
import ActionArea from './Components/ActionArea';
import Credits from './Components/Credits';
import './App.css';

const App = props => {
  return (
		<>
		<link
			rel="stylesheet"
			href="https://netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap.min.css"
		/>		
    <div className="invoice">
      <div className="container" width="800px" id="invoice">
        <Header />
        <InfoArea />
        <ItemTable />
        <ActionArea />
      </div>
      {!props.state.printMode && <Credits />}
    </div>
		</>
  );
}

const mapStatesToProps = state => ({ state })

export default connect(mapStatesToProps)(App);
