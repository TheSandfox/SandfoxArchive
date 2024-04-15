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
			<Header/>
			<Routes>
				<Route exact path="/" element={<Main/>}/>
				<Route path="/w3x/*" element={<W3X/>}/>
			</Routes>	
		</BrowserRouter>
	);
}

export default App;
