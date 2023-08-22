import { Routes, Route } from "react-router-dom";
import {AbilityDescription, AbilityDescriptionContainer} from "./Ability/AbilityDescription";

export default function SkillArchive() {
	return <Routes>
		<Route exact path="/" element={<div>K-스사막 소개페이지</div>}/>
		<Route exact path="/Ability" element={<AbilityDescriptionContainer/>}/>
		<Route path="/Ability/:id" element={<AbilityDescription/>}/>
	</Routes>
}