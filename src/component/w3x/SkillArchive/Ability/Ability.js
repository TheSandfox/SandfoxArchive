//import react
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

//import JSON
import AbilityParams from '../../../../w3x/SkillArchive/json/AbilityParams.json'
import AbilityTooltips from '../../../../w3x/SkillArchive/json/AbilityTooltips.json'
import CustomString from '../../../../w3x/SkillArchive/json/CustomString.json'
// import Config from '../../../../w3x/SkillArchive/json/Config.json'

//RefineAbilityJSON
const AbilityJson = []
let i = 0
let mapstring = '{'
while(i < AbilityParams["params"].length) {
	let originjson = AbilityParams["params"][i]
	let abilid = originjson["ID"]
	let newjson = JSON.parse(JSON.stringify(originjson))
	if (AbilityTooltips[abilid] !== undefined) {
		newjson["TOOLTIP"] = AbilityTooltips[abilid]["TOOLTIP"]
	}
	AbilityJson.push(newjson)
	//
	if(i===0) {
		mapstring = mapstring+'"'+originjson["ID"]+'":"'+String(i)+'"'
	} else {
		mapstring = mapstring+',"'+originjson["ID"]+'":"'+String(i)+'"'
	}
	i++
}
mapstring = mapstring + '}'
const AbilityMap = JSON.parse(mapstring)
const SearchField = {
	NAME : "",
	TIER : "",
	TAG : "",
	CAST_TYPE : ""
}

//어빌리티 설명박스
export function AbilityDescription(props) {
	let abiljson = {}
	let p = useParams()
	if (props.json===undefined) {
		//제이슨 없이 param으로 라우팅해서 컴포넨트 호출
		abiljson = AbilityJson[AbilityMap[p.id]]
	} else {
		//제이슨 줘서 컴포넨트 호출
		abiljson = props.json
	}
	
	if (abiljson===undefined) {
		abiljson = {
			"TIER":"0",
			"ICON_PATH":"ReplaceableTextures/CommandButtons/btncancel.png",
			"ID":"???",
			"NAME":"Missing No.",
			"TAG1":"null",
			"TAG2":"null",
			"TAG3":"null",
			"TAG4":"null",
			"TOOLTIP":"<b><span style=\"color:#ff0000;\">Tooltip Missing</span></b>",
			"CAST_TYPE":"null",
			"MANACOST":"0",
			"COOLDOWN_MAX":"0.0",
			"COOLDOWN_MIN":"0.0",
			"STAT_BONUS1":"CONFIG_STAT_CONSTANT",
			"STAT_BONUS2":"CONFIG_STAT_CONSTANT",
			"IS_WEAPON":"false",
		}
	}
	if(props.mode==='detail') {
		//디테일모드
		let stl = {
			border:'2px solid #'+CustomString["CONFIG_TIER_"+abiljson["TIER"]]["COLOR"]
		}
		return <div className="ability-description" style={stl}>
			<div className="top">
				<img src={process.env.PUBLIC_URL+"/resource/"+abiljson["ICON_PATH"]} alt={process.env.PUBLIC_URL+"/resource/replaceabletextures/commandbuttons/btncancel.png"}/>
				<div className='name-and-tags'>
					<div className="ability-name">#{abiljson["ID"]} {abiljson["NAME"]}</div>
					<div className="ability-tags">
						{abiljson["TAG1"]!=="null"?CustomString[abiljson["TAG1"]]["NAME"]:""}
						{abiljson["TAG2"]!=="null"?", "+CustomString[abiljson["TAG2"]]["NAME"]:""}
						{abiljson["TAG3"]!=="null"?", "+CustomString[abiljson["TAG3"]]["NAME"]:""}
						{abiljson["TAG4"]!=="null"?", "+CustomString[abiljson["TAG4"]]["NAME"]:""}
					</div>
				</div>
				<div className='cooldown-and-manacost'>
					<div>
						<img src={process.env.PUBLIC_URL+"/resource/ui/widgets/tooltips/human/"+(abiljson["IS_WEAPON"]==="true"?"tooltipattackrangeicon":"tooltipmanaicon")+".png"} alt={process.env.PUBLIC_URL+"/resource/replaceabletextures/commandbuttons/btncancel.png"}/>
						<p>{abiljson["IS_WEAPON"]==="true"?abiljson["WEAPON_RANGE"]:abiljson["MANACOST"]}</p>
					</div>
					<div>
						<img src={process.env.PUBLIC_URL+"/resource/ui/widgets/tooltips/human/tooltipcooldownicon.png"} alt={process.env.PUBLIC_URL+"/resource/replaceabletextures/commandbuttons/btncancel.png"}/>
						<p>{abiljson["IS_WEAPON"]==="true"?abiljson["WEAPON_DELAY"]:abiljson["COOLDOWN_MAX"]+"/("+abiljson["COOLDOWN_MIN"]+")"}</p>
					</div>
				</div>
			</div>
			<div className="bottom">
				<div className="cast-type">
					{abiljson["CAST_TYPE"]!=="null"?CustomString[abiljson["CAST_TYPE"]]["NAME"]:""}
				</div>
				<div className="tooltip" dangerouslySetInnerHTML={{__html:abiljson["TOOLTIP"]}}></div>
				<div className="statbonus">
					<p>스탯 보너스 : </p>
					<img 
						src={process.env.PUBLIC_URL+"/resource/"+CustomString[abiljson["STAT_BONUS1"]]["ICON"]}
						title={CustomString[abiljson["STAT_BONUS1"]]["NAME"]}
						alt={process.env.PUBLIC_URL+"/resource/replaceabletextures/commandbuttons/btncancel.png"}
					/>
					<img 
						src={process.env.PUBLIC_URL+"/resource/"+CustomString[abiljson["STAT_BONUS2"]]["ICON"]}
						title={CustomString[abiljson["STAT_BONUS2"]]["NAME"]}
						alt={process.env.PUBLIC_URL+"/resource/replaceabletextures/commandbuttons/btncancel.png"}
					/>
				</div>
			</div>
		</div>
	} else {
		//아이콘모드
		return <div className='ability-icon'>
			<Link to={"/w3x/SkillArchive/Ability/"+abiljson["ID"]} title={abiljson["NAME"]}>
			<img src={process.env.PUBLIC_URL+"/resource/"+abiljson["ICON_PATH"]} alt={process.env.PUBLIC_URL+"/resource/replaceabletextures/commandbuttons/btncancel.png"}/>
			</Link>
		</div>
	}

}

function AbilityDescriptions(props) {
	let mode = props.mode
	let abilityJson = props.abilityJson
	return <>
		{abilityJson.map(desc=>{
			if(desc.ID[0] !== "e") {
				return <AbilityDescription key={desc.ID} json={desc} mode={mode}/>		
			} else {
				return null
			}
		})}
	</>
}

function AbilityDescriptionSingle() {
	var navigate = useNavigate()
	function goBack() {
		navigate(-1)
	}
	//어빌툴팁 상세
	//뒤로가기버튼
	return <>
		<div className='ability-single-container'>
			<AbilityDescription mode='detail'/>
			<div className='ability-single-back-div' onClick={goBack}>
				<i className="fa-solid fa-reply"></i>
			</div>
		</div>
	</>
} 

function AbilityDescriptionContainer(props) {
	const [searchField,modifySearchField] = useState(SearchField)
	let viewMode = props.viewMode
	let setViewMode = props.viewModeModifier
	let abilityJsonModifier = props.abilityJsonModifier

	function modifier_modifySearchField(field,val) {
		let sf = JSON.parse(JSON.stringify(searchField))
		sf[field] = val
		modifySearchField(sf)
		abilityJsonModifier.query(AbilityJson,sf)
	}

	//viewmode에 따라 분기
	return <>
		{/*컨트롤러 */}
		<div className="ability-view-controller">
			{/*체크박스 */}
			<div className="ability-viewmode-switch">
				<p>상세보기</p>
				<input
					type="checkbox"
					checked={viewMode}
					onChange={(event)=>{setViewMode(event.target.checked)}}
				/>
			</div>
			{/*이름검색*/}
			<div>
				<p>이름 : </p>
				<input 
					type="text"
					value={searchField["NAME"]}
					onChange={(event)=>{modifier_modifySearchField("NAME",event.target.value)}}
				/>
			</div>
			{/*티어필터링*/}
			<div>
				<p>티어 : </p>
				<select 
					value={searchField["TIER"]}
					onChange={(event)=>{modifier_modifySearchField("TIER",event.target.value)}}
				>
					<option value="">전체</option>
					<option value="1">1</option>
					<option value="2">2</option>
					<option value="3">3</option>
					<option value="4">4</option>
					<option value="5">5</option>
				</select>
			</div>
			{/*태그검색*/}
			<div>
				<p>태그 : </p>
				<input 
					type="text"
					value={searchField["TAG"]}
					onChange={(event)=>{modifier_modifySearchField("TAG",event.target.value)}}
				/>
			</div>
			{/*캐스트타입검색*/}
			<div>
				<p>유형 : </p>
				<select
					value={searchField["CAST_TYPE"]}
					onChange={(event)=>{modifier_modifySearchField("CAST_TYPE",event.target.value)}}
				>
					<option value="">전체</option>
					<option value="지점 목표물">지점 목표물</option>
					<option value="유닛 목표물">유닛 목표물</option>
					<option value="즉시 사용">즉시 사용</option>
					<option value="끌어서 사용">끌어서 사용</option>
					<option value="지속효과">지속효과</option>
					<option value="무기">무기</option>
					<option value="장비">장비</option>
				</select>
			</div>
		</div>
		{/*뷰모드 분기(상세설명들로 채우냐, 아이콘들로 채우냐) */}
		{viewMode===true?
			<div className="ability-description-container">
				<AbilityDescriptions mode='detail' abilityJson={props.abilityJson} abilityJsonModifier={props.abilityJsonModifier}/>
			</div>
			:
			<div className="ability-icon-container">
				<AbilityDescriptions mode='icon' abilityJson={props.abilityJson} abilityJsonModifier={props.abilityJsonModifier}/>
			</div>
		}
	</>
}

export function Ability(props) {
	const [viewMode,setViewMode] = useState(false)
	const [abilityJson,modifyAbilityJson] = useState(AbilityJson)
	function modifier_setViewMode(val) {
		setViewMode(val)
	}
	const modifier_modifyAbilityJson = {
		generic:(val) => {
			modifyAbilityJson(val)
		},
		query:(target,form) => {
			modifyAbilityJson(target.filter(item =>
				/*어빌리티이름*/ 
				( form["NAME"]===""?true:
					item["NAME"].includes(form["NAME"]) 
				) &&
				/*어빌리티티어*/
				( form["TIER"]===""?true:
					item["TIER"].includes(form["TIER"]) 
				) &&
				/*어빌리티태그(좀무거움)*/
				( form["TAG"]===""?true:
					(CustomString[item["TAG1"]]!==undefined?CustomString[item["TAG1"]]["NAME"].includes(form["TAG"]):false)||
					(CustomString[item["TAG2"]]!==undefined?CustomString[item["TAG2"]]["NAME"].includes(form["TAG"]):false)||
					(CustomString[item["TAG3"]]!==undefined?CustomString[item["TAG3"]]["NAME"].includes(form["TAG"]):false)||
					(CustomString[item["TAG4"]]!==undefined?CustomString[item["TAG4"]]["NAME"].includes(form["TAG"]):false) 
				) &&
				/*캐스트타입*/
				( form["CAST_TYPE"]===""?true:
					/*(CustomString[item["CAST_TYPE"]]!==undefined?*/CustomString[item["CAST_TYPE"]]["NAME"].includes(form["CAST_TYPE"])/*:false)*/
				)
			))
		}
	}
	return <div className="ability-container">
		{props.mode==='single'?
			<AbilityDescriptionSingle/>
			:
			<AbilityDescriptionContainer 
				viewMode={viewMode} 
				viewModeModifier={modifier_setViewMode} 
				abilityJson={abilityJson} 
				abilityJsonModifier={modifier_modifyAbilityJson}
			/>
		}
	</div>
}