//import react
import React, { useState } from 'react';
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom';

//import component
import TopBar from './component/TopBar';

//import JSON
import AbilityParams from './w3x/SkillArchive/json/AbilityParams.json'
import AbilityTooltips from './w3x/SkillArchive/json/AbilityTooltips.json'
import CustomString from './w3x/SkillArchive/json/CustomString.json'
import Config from './w3x/SkillArchive/json/Config.json'

//import logo from './logo.png';
import './App.css';
import './css/top-bar.css'
import './css/mid.css'
import './css/bottom-bar.css'
import './css/ability-description.css'

//RefineAbilityJSON
const AbilityJson = []
let i = 0
let tempstring = '{'
while(i < AbilityParams["params"].length) {
	let originjson = AbilityParams["params"][i]
	let abilid = originjson["ID"]
	let newjson = JSON.parse(JSON.stringify(originjson))
	if (AbilityTooltips[abilid] !== undefined) {
		newjson["TOOLTIP"] = AbilityTooltips[abilid]["TOOLTIP"]
	}
	AbilityJson.push(newjson)
	//
	if(i==0) {
		tempstring = tempstring+'"'+originjson["ID"]+'":"'+String(i)+'"'
	} else {
		tempstring = tempstring+',"'+originjson["ID"]+'":"'+String(i)+'"'
	}
	i++
}
tempstring = tempstring + '}'
const AbilityMap = JSON.parse(tempstring)

function App() {

	return (
		<BrowserRouter>
		<div className="App">
			<TopBar/>
			<div className="mid">
			<Routes>
				<Route exact path="/w3x/SkillArchive/Ability" element={<AbilityDescriptionContainer/>}/>
				<Route path="/w3x/SkillArchive/Ability/:id" element={<AbilityDescription/>}/>
			</Routes>
			</div>
			<div className="bottom-bar">

			</div>
			
		</div>
		</BrowserRouter>
	);
}

//어빌리티 설명박스
function AbilityDescription(props) {
	let abiljson = {}
	let p = useParams()
	if (props.json===undefined) {
		//제이슨 없이 param으로 라우팅해서 컴포넨트 호출
		abiljson = AbilityJson[AbilityMap[p.id]]
	} else {
		//제이슨 줘서 컴포넨트 호출
		abiljson = props.json
	}
	
	if (abiljson!==undefined) {
		let stl = {
			border:'2px solid #'+CustomString[abiljson["TIER"]]["COLOR"]
		}
		return <div className="ability-description-container" style={stl}>
			<div className="top">
				<img src={process.env.PUBLIC_URL+"/resource/"+abiljson.ICON_PATH} alt={process.env.PUBLIC_URL+"/resource/replaceabletextures/commandbuttons/btncancle.png"}/>
				<div>
					<div className="ability-name">#{abiljson.ID} {abiljson.NAME}</div>
					<div className="ability-tags">{abiljson.TAGS}</div>
				</div>
			</div>
			<div className="bottom">
				<div dangerouslySetInnerHTML={{__html:abiljson.TOOLTIP}}></div>
			</div>
		</div>
	} else {
		return <></>
	}
}

function AbilityDescriptionContainer() {

	return <>
		{AbilityJson.map(desc=>{
			if(desc.ID[0] !== "e") {
				return <AbilityDescription key={desc.ID} json={desc}/>
			} else {
				return null
			}
		})}
	</>
}

export default App;
