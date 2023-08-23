//import react
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

//import component
import TopBar from './component/TopBar';
import Nav from './component/Nav';
import Main from './component/Main';
import W3X from './component/w3x/W3X';

//import logo from './logo.png';
import './App.css';
import './css/top-bar.css'
import './css/mid.css'
import './css/bottom-bar.css'
import './css/ability-description.css'
import './css/nav.css'

function App() {

	return (
		<BrowserRouter>
		<div className="App">
			<TopBar/>
			<div className="mid">
				<Nav/>
				<div className="contents">
				<Routes>
					<Route exact path="/" element={<Main/>}/>
					<Route path="/w3x//*" element={<W3X/>}/>
				</Routes>
				</div>
			</div>
			<div className="bottom-bar">

			</div>
			
		</div>
		</BrowserRouter>
	);
}

export default App;
