import { Routes, Route } from "react-router-dom";
import SkillArchive from "./SkillArchive/SkillArchive";

export default function W3X() {
	return <Routes>
		<Route exact path="/" element={<div>유즈맵 소개페이지</div>}/>
		<Route path="/SkillArchive//*" element={<SkillArchive/>}/>
	</Routes>
}