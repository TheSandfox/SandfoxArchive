import { Routes, Route } from "react-router-dom";
import {Ability} from "./Ability/Ability";

export default function SkillArchive() {
	return <Routes>
		<Route exact path="/" element={<div>K-스사막 소개페이지</div>}/>
		<Route exact path="/Ability" element={<Ability/>}/>
		<Route path="/Ability/:id" element={<Ability isSingle={true}/>}/>
	</Routes>
}