//import react
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

//import JSON
import AbilityParams from '../../../../w3x/SkillArchive/json/AbilityParams.json'
import AbilityTooltips from '../../../../w3x/SkillArchive/json/AbilityTooltips.json'
import CustomString from '../../../../w3x/SkillArchive/json/CustomString.json'
// import Config from '../../../../w3x/SkillArchive/json/Config.json'

const AbilityJson = AbilityParams["params"]
const SearchField = {
	NAME : "",
	TIER : "",
	TAG : "",
	CAST_TYPE : ""
}

//어빌리티 디스크립션 (상세or아이콘)
function AbilityDescription(props) {
	let abiljson = {}
	let p = useParams()
	if (props.json===undefined) {
		//제이슨 없이 param으로 라우팅해서 컴포넨트 호출
		abiljson = AbilityJson.filter(item=>item["ID"]===p.id)[0]//AbilityJson[AbilityMap[p.id]]
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
	if(props.viewMode==='detail') {
		//디테일모드
		let stl = {
			border:'2px solid #'+CustomString["CONFIG_TIER_"+abiljson["TIER"]]["COLOR"]
		}
		return <div className="ability-description w3font" style={stl}>
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
				<div className = "cast-type-and-custom-cost">
					<div className="cast-type">
						{abiljson["CAST_TYPE"]!=="null"?CustomString[abiljson["CAST_TYPE"]]["NAME"]:""}
					</div>
					<div className="custom-cost" dangerouslySetInnerHTML={{__html:
						AbilityTooltips[abiljson["ID"]]!==undefined?(
							AbilityTooltips[abiljson["ID"]]["CUSTOM_COST"]!==undefined?AbilityTooltips[abiljson["ID"]]["CUSTOM_COST"]:""
						):
						""
					}}>
					</div>
				</div>
				<div className="tooltip" dangerouslySetInnerHTML={{__html:
					AbilityTooltips[abiljson["ID"]]!==undefined?AbilityTooltips[abiljson["ID"]]["TOOLTIP"]:""
				}}>
				</div>
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

//어빌리티 디스크립션 묶음
function AbilityDescriptions(props) {
	let viewMode = props.viewMode
	let abilityJson = props.abilityJson
	return <>
		{abilityJson.map(desc=>{
			if(desc.ID[0] !== "e") {
				return <AbilityDescription key={desc.ID} json={desc} viewMode={viewMode}/>		
			} else {
				return null
			}
		})}
	</>
}

//어빌리티 디스크립션 한 개(상세)
function AbilityDescriptionSingle() {
	var navigate = useNavigate()
	function goBack() {
		navigate(-1)
	}
	//어빌툴팁 상세
	//뒤로가기버튼
	return <>
		<div className='ability-single-container'>
			<AbilityDescription viewMode='detail'/>
			<div className='ability-single-back-div icon-button' onClick={goBack}>
				<i className="fa-solid fa-reply"></i>
			</div>
		</div>
	</>
} 

//어빌리티 검색창
function AbilitySearchController(props) {
	const viewMode = props.viewMode
	const modifyViewMode = props.modifyViewMode
	const searchField = props.searchField
	const modifySearchField = props.modifySearchField

	return <>
	{/*컨트롤러 */}
	<div className="ability-view-controller w3font">
		{/*체크박스 */}
		<div className="ability-viewmode-switch rel">
			<p>상세보기</p>
			<input
				type="checkbox"
				checked={viewMode}
				onChange={(event)=>{modifyViewMode.set(event.target.checked)}}
			/>
		</div>
		{/*이름검색*/}
		<div className="rel">
			<p>이름 : </p>
			<input 
				type="text"
				value={searchField["NAME"]}
				onChange={(event)=>{modifySearchField.query("NAME",event.target.value)}}
			/>
		</div>
		{/*티어필터링*/}
		<div className="rel">
			<p>티어 : </p>
			<select 
				value={searchField["TIER"]}
				onChange={(event)=>{modifySearchField.query("TIER",event.target.value)}}
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
		<div className="rel">
			<p>태그 : </p>
			<input 
				type="text"
				value={searchField["TAG"]}
				onChange={(event)=>{modifySearchField.query("TAG",event.target.value)}}
			/>
		</div>
		{/*캐스트타입검색*/}
		<div className="rel">
			<p>유형 : </p>
			<select
				value={searchField["CAST_TYPE"]}
				onChange={(event)=>{modifySearchField.query("CAST_TYPE",event.target.value)}}
			>
				<option value="">전체</option>
				<option value="지점 목표물">지점 목표물</option>
				<option value="유닛 목표물">유닛 목표물</option>
				<option value="즉시 사용">즉시 사용</option>
				<option value="끌어서 사용">끌어서 사용</option>
				<option value="지속효과">지속효과</option>
				<option value="무기">무기</option>
				<option value="칭호">칭호</option>
			</select>
		</div>
		{/*버튼스페이스*/}
		<div className="button-space rel">
			{/*필터초기화*/}
			<div className="icon-button" title='필터 초기화' onClick={
				modifySearchField.clear
			}>
				<i class="fa-solid fa-arrows-rotate"></i>
			</div>
		</div>
	</div>
	</>
}

//어빌리티 디스크립션 관리자
function AbilityDescriptionContainer(props) {
	const [searchField,setSearchField] = useState(SearchField)
	const viewMode = props.viewMode
	const modifyViewMode = props.modifyViewMode
	const modifyAbilityJson = props.modifyAbilityJson

	const modifySearchField = {
		query : (field,val) =>{
			let sf = JSON.parse(JSON.stringify(searchField))
			sf[field] = val
			setSearchField(sf)
			modifyAbilityJson.query(AbilityJson,sf)
		},
		clear : () =>{
			setSearchField(SearchField)
			modifyAbilityJson.clear()
		}
	}

	//viewmode에 따라 분기
	return <>
		<AbilitySearchController viewMode={viewMode} modifyViewMode={modifyViewMode} searchField={searchField} modifySearchField={modifySearchField}/>
		{/*뷰모드 분기(상세설명들로 채우냐, 아이콘들로 채우냐) */}
		{viewMode===true?
			<div className="ability-description-container">
				<AbilityDescriptions viewMode='detail' abilityJson={props.abilityJson} modifyAbilityJson={props.modifyAbilityJson}/>
			</div>
			:
			<div className="ability-icon-container">
				<AbilityDescriptions viewMode='icon' abilityJson={props.abilityJson} modifyAbilityJson={props.modifyAbilityJson}/>
			</div>
		}
	</>
}

//어빌리티 메인 컨테이너
export function Ability(props) {
	const [viewMode,setViewMode] = useState(false)
	const [abilityJson,setAbilityJson] = useState(AbilityJson)
	const modifyViewMode = {
		set:(val) => {
			setViewMode(val)
		},
		toggle: ()=> {
			setViewMode(!viewMode)
		}
	}
	const modifyAbilityJson = {
		clear:() => {
			setAbilityJson(AbilityJson)
		},
		query:(target,form) => {
			setAbilityJson(target.filter(item =>
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
		{props.isSingle===true?
			<AbilityDescriptionSingle/>
			:
			<AbilityDescriptionContainer 
				viewMode={viewMode} 
				modifyViewMode={modifyViewMode} 
				abilityJson={abilityJson} 
				modifyAbilityJson={modifyAbilityJson}
			/>
		}
	</div>
}