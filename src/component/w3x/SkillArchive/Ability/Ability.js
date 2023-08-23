//import react
import { useParams, Link } from 'react-router-dom'
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
			border:'2px solid #'+CustomString[abiljson["TIER"]]["COLOR"]
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
			<Link to={"/w3x/SkillArchive/Ability/"+abiljson["ID"]}>
			<img src={process.env.PUBLIC_URL+"/resource/"+abiljson["ICON_PATH"]} alt={process.env.PUBLIC_URL+"/resource/replaceabletextures/commandbuttons/btncancel.png"}/>
			</Link>
		</div>
	}

}

function AbilityDescriptions({mode}) {
	return <>
		{AbilityJson.map(desc=>{
			if(desc.ID[0] !== "e") {
				return <AbilityDescription key={desc.ID} json={desc} mode={mode}/>		
			} else {
				return null
			}
		})}
	</>
}

function AbilityDescriptionSingle() {
	return <>
		<div className='ability-single-container'>
			<AbilityDescription mode='detail'/>
			<Link className='ability-single-back-anchor' to='/w3x/SkillArchive/Ability'>
				<div className='ability-single-back-div'>
					<i className="fa-solid fa-reply"></i>
				</div>
			</Link>
		</div>
	</>
} 

function AbilityDescriptionContainer() {
	let [viewMode,setViewMode] = useState(false)
	//viewmode에 따라 분기
	return <>
		<div className="ability-viewmode-switch">
			<input
				type="checkbox"
				checked={viewMode}
				onChange={(event)=>{setViewMode(event.target.checked)}}
			/>
		</div>
		{viewMode===true?
			<div className="ability-description-container">
				<AbilityDescriptions mode='detail'/>
			</div>
			:
			<div className="ability-icon-container">
				<AbilityDescriptions mode='icon'/>
			</div>
		}
	</>
}

export function Ability(props) {
	return <div className="ability-container">
		{props.mode==='single'?
			<AbilityDescriptionSingle/>
			:
			<AbilityDescriptionContainer/>
		}
	</div>
}