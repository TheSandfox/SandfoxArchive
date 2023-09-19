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
	CAST_TYPE : "",
	DAMAGE_TYPE : "",
	ATTACK_TYPE : ""
}

//어빌리티 위젯 
export function AbilityWidget({json}) {
	return <div className={'w3x-icon rel'}>
		<Link to={"/w3x/SkillArchive/Ability/"+json["ID"]} title={json["NAME"]}>
			<img src={process.env.PUBLIC_URL+"/resource/"+json["ICON_PATH"]} alt='...'/>
			<div className={'border-fill tier'+json["TIER"]}></div>
			{/*무기어빌리티면 무기아이콘 표시*/}
			{json["IS_WEAPON"]==="true"?
				<img
					className={'bottom-right abs icon-24x'}
					src={process.env.PUBLIC_URL+"/resource/ui/widgets/tooltips/human/tooltipweaponicon.png"}
					alt='...'
				/>
				:
				<></>
			}
		</Link>
	</div>
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
	if(props.viewMode===true) {
		//디테일모드
		let stl = {
			border:'2px solid #'+CustomString["CONFIG_TIER_"+abiljson["TIER"]]["COLOR"]
		}
		return <div className="ability-description description-box w3font" style={stl}>
			<div className="top">
				<img src={process.env.PUBLIC_URL+"/resource/"+abiljson["ICON_PATH"]} alt={process.env.PUBLIC_URL+"/resource/replaceabletextures/commandbuttons/btncancel.png"}/>
				<div className='name-and-tags'>
					<div className="ability-name">{/*#{abiljson["ID"]} */}{abiljson["NAME"]}</div>
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
						alt='...'
					/>
					<img 
						src={process.env.PUBLIC_URL+"/resource/"+CustomString[abiljson["STAT_BONUS2"]]["ICON"]}
						title={CustomString[abiljson["STAT_BONUS2"]]["NAME"]}
						alt='...'
					/>
				</div>
			</div>
		</div>
	} else {
		//아이콘모드
		return <AbilityWidget json={abiljson}/>
		// <div className={'w3x-icon rel'}>
		// 	<Link to={"/w3x/SkillArchive/Ability/"+abiljson["ID"]} title={abiljson["NAME"]}>
		// 		<img src={process.env.PUBLIC_URL+"/resource/"+abiljson["ICON_PATH"]} alt='...'/>
		// 		<div className={'border-fill tier'+abiljson["TIER"]}></div>
		// 		{/*무기어빌리티면 무기아이콘 표시*/}
		// 		{abiljson["IS_WEAPON"]==="true"?
		// 			<img
		// 				className={'bottom-right abs icon-24x'}
		// 				src={process.env.PUBLIC_URL+"/resource/ui/widgets/tooltips/human/tooltipweaponicon.png"}
		// 				alt='...'
		// 			/>
		// 			:
		// 			<></>
		// 		}
		// 	</Link>
		// </div>
	}

}

//어빌리티 디스크립션 묶음
function AbilityDescriptions({state}) {
	return <>
		{state.abilityJson.map(desc=>{
			return <AbilityDescription key={desc.ID} json={desc} viewMode={state.viewMode}/>		
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
			<AbilityDescription viewMode={true}/>
			<div className='ability-single-back-div icon-button' onClick={goBack}>
				<i className="fa-solid fa-reply"></i>
			</div>
		</div>
	</>
} 

//어빌리티 검색창
function AbilitySearchController({state}) {
	const viewMode = state.viewMode
	const modifyViewMode = state.modifyViewMode
	const searchField = state.searchField
	const modifySearchField = state.modifySearchField
	return <>
	{/*컨트롤러 */}
	<div className="controller w3font shadow">
		{/*체크박스 */}
		<div className="rel horizon-left vertical-top h64">
			<div className={viewMode?"icon-button":"icon-button hover"} title='아이콘으로 보기' onClick={viewMode?()=>{modifyViewMode.set(false)}:()=>{}}>
				<i className="fa-solid fa-border-all"></i>
			</div>
			<div className={viewMode?"icon-button hover":"icon-button"} title='상세 보기' onClick={viewMode?()=>{}:()=>{modifyViewMode.set(true)}}>
				<i className="fa-solid fa-bars"></i>
			</div>
		</div>
		{/*이름검색*/}
		<div className="rel h24 horizon-left vertical-center">
			<p>이름</p>
			<p> : </p>
			<input 
				type="text"
				value={searchField["NAME"]}
				onChange={(event)=>{modifySearchField.query("NAME",event.target.value)}}
			/>
			<div className="text-button"
				onClick={()=>{modifySearchField.query("NAME","")}}
			>
				<i className="fa-solid fa-xmark"></i>
			</div>
		</div>
		{/*티어필터링*/}
		<div className="rel h24 horizon-left vertical-center">
			<p>티어</p>
			<p> : </p>
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
				<option value="0">0</option>
			</select>
			<div className="text-button"
				onClick={()=>{modifySearchField.query("TIER","")}}
			>
				<i className="fa-solid fa-xmark"></i>
			</div>
		</div>
		{/*태그검색*/}
		<div className="rel h24 horizon-left vertical-center">
			<p>태그</p>
			<p> : </p>
			<input 
				type="text"
				value={searchField["TAG"]}
				onChange={(event)=>{modifySearchField.query("TAG",event.target.value)}}
			/>
			<div className="text-button"
				onClick={()=>{modifySearchField.query("TAG","")}}
			>
				<i className="fa-solid fa-xmark"></i>
			</div>
		</div>
		{/*캐스트타입검색*/}
		<div className="rel h24 horizon-left vertical-center">
			<p>시전 유형</p>
			<p> : </p>
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
			</select>
			<div className="text-button"
				onClick={()=>{modifySearchField.query("CAST_TYPE","")}}
			>
				<i className="fa-solid fa-xmark"></i>
			</div>
		</div>
		{/*피해 유형*/}
		<div className="rel h24 horizon-left vertical-center">
			<p>피해 유형</p>
			<p> : </p>
			<select
				value={searchField["DAMAGE_TYPE"]}
				onChange={(event)=>{modifySearchField.query("DAMAGE_TYPE",event.target.value)}}
			>
				<option value="">전체</option>
				<option value="물리">물리</option>
				<option value="마법">마법</option>
				<option value="미분류">미분류</option>
			</select>
			<div className="text-button"
				onClick={()=>{modifySearchField.query("DAMAGE_TYPE","")}}
			>
				<i className="fa-solid fa-xmark"></i>
			</div>
		</div>
		{/*공격 유형*/}
		<div className="rel h24 horizon-left vertical-center">
			<p>공격 유형</p>
			<p> : </p>
			<select
				value={searchField["ATTACK_TYPE"]}
				onChange={(event)=>{modifySearchField.query("ATTACK_TYPE",event.target.value)}}
			>
				<option value="">전체</option>
				<option value="기본">기본공격</option>
				<option value="스킬">스킬공격</option>
				<option value="미분류">미분류</option>
			</select>
			<div className="text-button"
				onClick={()=>{modifySearchField.query("ATTACK_TYPE","")}}
			>
				<i className="fa-solid fa-xmark"></i>
			</div>
		</div>
		{/*버튼스페이스*/}
		<div className="rel horizon-center vertical-bottom h64">
			{/*필터초기화*/}
			<div className="icon-button" title='필터 초기화' onClick={
				modifySearchField.clear
			}>
				<i className="fa-solid fa-arrows-rotate"></i>
			</div>
		</div>
	</div>
	</>
}

//어빌리티 디스크립션 관리자
function AbilityDescriptionContainer({state}) {
	const viewMode = state.viewMode

	//viewmode에 따라 분기
	return <>
		<AbilitySearchController state={state}/>
		{/*뷰모드 분기(상세설명들로 채우냐, 아이콘들로 채우냐) */}
		{viewMode===true?
			<div className="description-container">
				<AbilityDescriptions state={state}/>
			</div>
			:
			<div className="grid8x">
				<AbilityDescriptions state={state}/>
			</div>
		}
	</>
}

//어빌리티 메인 컨테이너
export function Ability(props) {
	const [viewMode,setViewMode] = useState(false)
	const [abilityJson,setAbilityJson] = useState(AbilityJson)
	const [searchField,setSearchField] = useState(SearchField)
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
				) &&
				/*데미지 타입*/
				( form["DAMAGE_TYPE"]===""?true:
					(CustomString[item["DAMAGE_TYPE"]]!==undefined?CustomString[item["DAMAGE_TYPE"]]["NAME"].includes(form["DAMAGE_TYPE"]):false)
				) &&
				/*공격 타입*/
				( form["ATTACK_TYPE"]===""?true:
					(CustomString[item["ATTACK_TYPE"]]!==undefined?CustomString[item["ATTACK_TYPE"]]["NAME"].includes(form["ATTACK_TYPE"]):false)
				)
			))
		}
	}
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
	const state = {
		viewMode:viewMode,
		modifyViewMode:modifyViewMode,
		abilityJson:abilityJson,
		modifyAbilityJson:modifyAbilityJson,
		searchField:searchField,
		modifySearchField:modifySearchField
	}
	return <div className="ability-container">
		{props.isSingle===true?
			<AbilityDescriptionSingle/>
			:
			<AbilityDescriptionContainer 
				state={state}
			/>
		}
	</div>
}