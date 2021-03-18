import React from 'react';
import Header from './Components/Header'
import InfoArea from './Components/InfoArea';
import ItemTable from './Components/ItemTable';
import ActionArea from './Components/ActionArea';
import Credits from './Components/Credits';
import './App.css';

function App() {
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
      <Credits />
    </div>
		</>
  );
}

export default App;
