//import react
import { useParams } from 'react-router-dom'

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
			"CAST_TYPE":"null"
		}
	}
	let stl = {
		border:'2px solid #'+CustomString[abiljson["TIER"]]["COLOR"]
	}
	return <div className="ability-description-container" style={stl}>
		<div className="top">
			<img src={process.env.PUBLIC_URL+"/resource/"+abiljson["ICON_PATH"]} alt={process.env.PUBLIC_URL+"/resource/replaceabletextures/commandbuttons/btncancel.png"}/>
			<div>
				<div className="ability-name">#{abiljson["ID"]} {abiljson["NAME"]}</div>
				<div className="ability-tags">
					{abiljson["TAG1"]!=="null"?CustomString[abiljson["TAG1"]]["NAME"]:""}
					{abiljson["TAG2"]!=="null"?", "+CustomString[abiljson["TAG2"]]["NAME"]:""}
					{abiljson["TAG3"]!=="null"?", "+CustomString[abiljson["TAG3"]]["NAME"]:""}
					{abiljson["TAG4"]!=="null"?", "+CustomString[abiljson["TAG4"]]["NAME"]:""}
				</div>
			</div>
		</div>
		<div className="bottom">
			<div className="cast-type">
				{abiljson["CAST_TYPE"]!=="null"?CustomString[abiljson["CAST_TYPE"]]["NAME"]:""}
			</div>
			<div className="tooltip" dangerouslySetInnerHTML={{__html:abiljson["TOOLTIP"]}}></div>
		</div>
	</div>
}

export function AbilityDescriptionContainer() {

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