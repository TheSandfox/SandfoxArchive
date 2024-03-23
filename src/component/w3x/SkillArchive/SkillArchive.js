import { Routes, Route } from "react-router-dom";
import { Ability } from "./Ability/Ability";
import { Unit } from "./Unit/Unit";
import { useState } from "react";
import Nav from "component/Nav";

const LocalAbilityFavoritePrefix = "w3x_sa_ability_favorite_";
const LocalUnitFavoritePrefix = "w3x_sa_unit_favorite_";

export default function SkillArchive() {
	const [abilityFavorite,setAbilityFavorite] = useState({});
	const [unitFavorite,setUnitFavorite] = useState({});
	const modifyAbilityFavorite = class {
		isFavorite(id) {
			return localStorage.getItem(LocalAbilityFavoritePrefix+id)!==null;
		}
		refresh() {
			setAbilityFavorite({});
		}
		add(id) {
			localStorage.setItem(LocalAbilityFavoritePrefix+id,'true');
			this.refresh();
		}
		remove(id) {
			localStorage.removeItem(LocalAbilityFavoritePrefix+id);
			this.refresh();
		}
		toggle(id) {
			if (this.isFavorite(id)) {
				this.remove(id);
			} else {
				this.add(id);
			}
			//remove, add 내에서 리프레시
		}
	};
	const modifyUnitFavorite = class {
		isFavorite(id) {
			return localStorage.getItem(LocalUnitFavoritePrefix+id)!==null;
		}
		refresh() {
			setUnitFavorite({});
		}
		add(id) {
			localStorage.setItem(LocalUnitFavoritePrefix+id,'true');
			this.refresh();
		}
		remove(id) {
			localStorage.removeItem(LocalUnitFavoritePrefix+id);
			this.refresh();
		}
		toggle(id) {
			if (this.isFavorite(id)) {
				this.remove(id);
			} else {
				this.add(id);
			}
			//remove, add 내에서 리프레시
		}
	};
	const state = {
		abilityFavorite: abilityFavorite,
		modifyAbilityFavorite: new modifyAbilityFavorite(),
		unitFavorite: unitFavorite,
		modifyUnitFavorite: new modifyUnitFavorite()
	};
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
	</>
}