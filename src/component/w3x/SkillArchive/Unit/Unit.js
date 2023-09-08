//import react
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

//import JSON
import UnitParams from '../../../../w3x/SkillArchive/json/UnitParams.json'
import AbilityParams from '../../../../w3x/SkillArchive/json/AbilityParams.json'
import AbilityMap from '../../../../w3x/SkillArchive/json/AbilityMap.json'

const AbilityJson = AbilityParams["params"]
const UnitJson = UnitParams["params"]
const SearchField = {
	NAME : ""
}

//유닛 디스크립션 (상세or아이콘)
function UnitDescription(props) {
	let json = {}
	let p = useParams()
	if (props.json===undefined) {
		//제이슨 없이 param으로 라우팅해서 컴포넨트 호출
		json = UnitJson.filter(item=>item["ID"]===p.id)[0]//UnitJson[UnitMap[p.id]]
	} else {
		//제이슨 줘서 컴포넨트 호출
		json = props.json
	}
	
	if (json===undefined) {
		json = {
			"ICON_PATH":"ReplaceableTextures/CommandButtons/btncancel.png",
			"ID":"???",
			"NAME":"Missing No.",
			"TOOLTIP":"<b><span style=\"color:#ff0000;\">Tooltip Missing</span></b>"
		}
	}
	if(props.viewMode===true) {
		//디테일모드
		let stl = {
			border:'2px solid #ffffff'
		}
		console.log("========================"+json["INITIAL_ABILITY1"]+"=======================")
		return <div className="unit-description description-box w3font" style={stl}>
			<div className="horizon-left vertical-center">
				<img className='w3icon' src={process.env.PUBLIC_URL+"/resource/"+json["ICON_PATH"]} alt={process.env.PUBLIC_URL+"/resource/replaceabletextures/commandbuttons/btncancel.png"}/>
				<div className='name-and-tags'>
					<div className="font24 white">#{json["ID"]} {json["NAME"]}</div>
				</div>
			</div>
			<br/>
			<div className="horizon-left vertical-top">
				<div className="tooltip white" >
					{json["TOOLTIP"]}
				</div>
			</div>
			<br/>
			{/*고유능력 아이콘*/}
			<div className="horizon-left vertical-center">
				<p className='white'>고유 능력 : </p>
				{json["INITIAL_ABILITY1"]!=="null"?
					<Link to={"/w3x/SkillArchive/Ability/"+json["INITIAL_ABILITY1"]} title={AbilityJson[AbilityMap[json["INITIAL_ABILITY1"]]]["NAME"]}>
						<img 
						className='w3icon' 
						src={process.env.PUBLIC_URL+"/resource/"+AbilityJson[AbilityMap[json["INITIAL_ABILITY1"]]]["ICON_PATH"]} 
						alt={process.env.PUBLIC_URL+"/resource/replaceabletextures/commandbuttons/btncancel.png"}
						/>
					</Link>
					:
					<></>
				}
				{json["INITIAL_ABILITY2"]!=="null"?
						<Link to={"/w3x/SkillArchive/Ability/"+json["INITIAL_ABILITY2"]} title={AbilityJson[AbilityMap[json["INITIAL_ABILITY2"]]]["NAME"]}>
							<img 
								className='w3icon' 
								src={process.env.PUBLIC_URL+"/resource/"+AbilityJson[AbilityMap[json["INITIAL_ABILITY2"]]]["ICON_PATH"]} 
								alt={process.env.PUBLIC_URL+"/resource/replaceabletextures/commandbuttons/btncancel.png"}
							/>
						</Link>
					:
					<></>
				}
			</div>
		</div>
	} else {
		//아이콘모드
		return <div className='w3x-icon'>
			<Link to={"/w3x/SkillArchive/Unit/"+json["ID"]} title={json["NAME"]}>
			<img src={process.env.PUBLIC_URL+"/resource/"+json["ICON_PATH"]} alt={process.env.PUBLIC_URL+"/resource/replaceabletextures/commandbuttons/btncancel.png"}/>
			</Link>
		</div>
	}

}

//유닛 디스크립션 묶음
function UnitDescriptions({state}) {
	return <>
		{state.unitJson.map(desc=>{
			return <UnitDescription key={desc.ID} json={desc} viewMode={state.viewMode}/>		
		})}
	</>
}

//유닛 디스크립션 한 개(상세)
function UnitDescriptionSingle() {
	var navigate = useNavigate()
	function goBack() {
		navigate(-1)
	}
	//유닛툴팁 상세
	//뒤로가기버튼
	return <>
		<div className='unit-single-container'>
			<UnitDescription viewMode={true}/>
			<div className='unit-single-back-div icon-button' onClick={goBack}>
				<i className="fa-solid fa-reply"></i>
			</div>
		</div>
	</>
} 

//유닛 검색창
function UnitSearchController({state}) {
	const viewMode = state.viewMode
	const modifyViewMode = state.modifyViewMode
	const searchField = state.searchField
	const modifySearchField = state.modifySearchField
	return <>
	{/*컨트롤러 */}
	<div className="controller w3font">
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
			<p>이름 : </p>
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

//유닛 디스크립션 관리자
function UnitDescriptionContainer({state}) {
	const viewMode = state.viewMode

	//viewmode에 따라 분기
	return <>
		<UnitSearchController state={state}/>
		{/*뷰모드 분기(상세설명들로 채우냐, 아이콘들로 채우냐) */}
		{viewMode===true?
			<div className="description-container">
				<UnitDescriptions state={state}/>
			</div>
			:
			<div className="grid8x">
				<UnitDescriptions state={state}/>
			</div>
		}
	</>
}

export function Unit(props) {
	const [viewMode,setViewMode] = useState(false)
	const [unitJson,setUnitJson] = useState(UnitJson)
	const [searchField,setSearchField] = useState(SearchField)
	const modifyViewMode = {
		set:(val) => {
			setViewMode(val)
		},
		toggle: ()=> {
			setViewMode(!viewMode)
		}
	}
	const modifyUnitJson = {
		clear:() => {
			setUnitJson(UnitJson)
		},
		query:(target,form) => {
			setUnitJson(target.filter(item =>
				/*유닛이름*/ 
				( form["NAME"]===""?true:
					item["NAME"].includes(form["NAME"]) 
				) 
			))
		}
	}
	const modifySearchField = {
		query : (field,val) =>{
			let sf = JSON.parse(JSON.stringify(searchField))
			sf[field] = val
			setSearchField(sf)
			modifyUnitJson.query(UnitJson,sf)
		},
		clear : () =>{
			setSearchField(SearchField)
			modifyUnitJson.clear()
		}
	}
	const state = {
		viewMode:viewMode,
		modifyViewMode:modifyViewMode,
		unitJson:unitJson,
		modifyUnitJson:modifyUnitJson,
		searchField:searchField,
		modifySearchField:modifySearchField
	}
	return <div className="unit-container">
	{props.isSingle===true?
		<UnitDescriptionSingle/>
		:
		<UnitDescriptionContainer 
			state={state}
		/>
	}
</div>
}