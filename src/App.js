//import react
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

//import component
import Header from 'component/Header';
import Main from 'component/Main';
import W3X from 'component/w3x/W3X';

import './App.css';
import './css/mid.css';
import './css/main.css';
import './css/controller.css';

function App() {

	return (
		<BrowserRouter>
		<div className="App">
			<Header/>
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
