import { Routes, Route } from "react-router-dom";
import { Ability } from "./Ability/Ability";
import { Unit } from "./Unit/Unit";
import Nav from "./Nav";

export default function SkillArchive() {
	return <>
	<Nav />
	<Routes>
		<Route exact path="/" element={<div>K-스사막 소개페이지</div>}/>
		<Route exact path="/Ability" element={<Ability/>}/>
		<Route path="/Ability/:id" element={<Ability isSingle={true}/>}/>
		<Route exact path="/Unit" element={<Unit/>}/>
		<Route path="/Unit/:id" element={<Unit isSingle={true}/>}/>
	</Routes>
	</>
}