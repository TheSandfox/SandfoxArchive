//import react
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

//import component
import TopBar from 'component/TopBar';
import Main from 'component/Main';
import W3X from 'component/w3x/W3X';

//import logo from './logo.png';
import './App.css';
import './css/top-bar.css'
import './css/mid.css'
import './css/bottom-bar.css'
import './css/ability.css'
import './css/unit.css'
import './css/nav.css'
import './css/main.css'

function App() {

	return (
		<BrowserRouter>
		<div className="App">
			<TopBar/>
			<div className="mid">
				<div className="contents">
				<Routes>
					<Route exact path="/" element={<Main/>}/>
					<Route path="/w3x//*" element={<W3X/>}/>
				</Routes>
				</div>
			</div>			
		</div>
		</BrowserRouter>
	);
	// <div className="bottom-bar">
	// </div>
}

export default App;
