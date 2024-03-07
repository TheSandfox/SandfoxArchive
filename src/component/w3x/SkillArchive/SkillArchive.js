import { Routes, Route } from "react-router-dom";
import { Ability } from "./Ability/Ability";
import { Unit } from "./Unit/Unit";
import { useState } from "react";
import Nav from "component/Nav";
import Remote from "component/Remote";

const LocalFavoritePrefix = "w3x_sa_ability_favorite_";

export default function SkillArchive() {
	const [favorite,setFavorite] = useState({});
	const modifyFavorite = {
		isFavorite: (id)=> {
			return localStorage.getItem(LocalFavoritePrefix+id)!==null;
		},
		add: (id)=> {
			localStorage.setItem(LocalFavoritePrefix+id,'true');
			setFavorite({});
		},
		remove: (id)=> {
			localStorage.removeItem(LocalFavoritePrefix+id);
			setFavorite({});
		},
		toggle: (id)=> {
			if (localStorage.getItem(LocalFavoritePrefix+id)!==null) {
				localStorage.removeItem(LocalFavoritePrefix+id);
			} else {
				localStorage.setItem(LocalFavoritePrefix+id,'true');
			}
			setFavorite({});
		}
	}
	const state = {
		favorite: favorite,
		modifyFavorite: modifyFavorite
	}
	return <>
		<Nav form={[
			{
				route:"/w3x/SkillArchive/Ability",
				img:"BTNSpellBookBLS.png",
				title:"스킬 정보"
			},
			{
				route:"/w3x/SkillArchive/Unit",
				img:"btnfootman.png",
				title:"유닛 정보"
			}
		]}/>
		<div className="mid">
			<Routes>
				<Route exact path="/" element={<div>K-스사막 소개페이지</div>}/>
				<Route exact path="/Ability" element={<Ability state={state}/>}/>
				<Route path="/Ability/:id" element={<Ability isSingle={true} state={state}/>}/>
				<Route exact path="/Unit" element={<Unit state={state}/>}/>
				<Route path="/Unit/:id" element={<Unit isSingle={true} state={state}/>}/>
			</Routes>
		</div>
		<Remote />
	</>
}