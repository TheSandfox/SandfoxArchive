//import react
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

//import JSON
import AbilityParams from '../../../../w3x/SkillArchive/json/AbilityParams.json'
import AbilityMap from '../../../../w3x/SkillArchive/json/AbilityMap.json'
import AbilityMix from '../../../../w3x/SkillArchive/json/AbilityMix.json'
import AbilityTooltips from '../../../../w3x/SkillArchive/json/AbilityTooltips.json'
import CustomString from '../../../../w3x/SkillArchive/json/CustomString.json'
// import Config from '../../../../w3x/SkillArchive/json/Config.json'

const AbilityJson = AbilityParams["params"]
const AbilityMixJson = AbilityMix["params"]
const SearchField = {
	NAME : "",
	TIER : "",
	TAG : "",
	CAST_TYPE : "",
	DAMAGE_TYPE : "",
	ATTACK_TYPE : "",
	STAT_BONUS1 : "",
	STAT_BONUS2 : ""
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
		<div className={'highlight non-focus'}></div>
	</div>
}

//어빌리티 조합
function AbilityMixTable() {
	let id = useParams().id
	/*이 어빌을 만들기 위한 재료*/
	let lower = AbilityMixJson.filter(item=>item["RESULT"]===id)
	/*이 어빌로 만들 수 있는 어빌*/
	let upper = AbilityMixJson.filter(item=>item["ID1"]===id||item["ID2"]===id)
	let i = 0
	if (lower.length<=0) {lower=[]}
	if (upper.length<=0) {upper=[]}
	return <>{lower.length>0||upper.length>0?
		<div className={'abilityMixContainer'}>
			{lower.length>0?<div className={'description-box'}>
				<div className='title w3font font16 m-bottom16 white'>
					<i className="fi fi-rr-code-pull-request"></i>조합법
				</div>
				{lower.map(json=>{
					return <div className='row w3font font24 vertical-center horizon-center white' key={i++}>
						<AbilityWidget json={AbilityJson[AbilityMap[json["ID1"]]]}/>
						<p className='m-left16 m-right16'>+</p>
						<AbilityWidget json={AbilityJson[AbilityMap[json["ID2"]]]}/>
						<p className='m-left16 m-right16'>=</p>
						<AbilityWidget json={AbilityJson[AbilityMap[json["RESULT"]]]}/>
					</div>
				})}
			</div>:<></>}
			{upper.length>0?<div className={'description-box'}>
				<div className='title w3font font16 m-bottom16 white'>
					<i className="fi fi-rs-code-fork"></i>조합 가능 스킬
				</div>
				{upper.map(json=>{
					return <div className='row w3font font24 vertical-center horizon-center white' key={i++}>
						<AbilityWidget json={AbilityJson[AbilityMap[json["ID1"]]]}/>
						<p className='m-left16 m-right16'>+</p>
						<AbilityWidget json={AbilityJson[AbilityMap[json["ID2"]]]}/>
						<p className='m-left16 m-right16'>=</p>
						<AbilityWidget json={AbilityJson[AbilityMap[json["RESULT"]]]}/>
				</div>
				})}
			</div>:<></>}
		</div>:
		<></>}
	</>
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
		return <div className="abilityDescription description-box w3font" style={stl}>
			<div className="top">
				<AbilityWidget json={abiljson}/>
				{/*<img src={process.env.PUBLIC_URL+"/resource/"+abiljson["ICON_PATH"]} alt={process.env.PUBLIC_URL+"/resource/replaceabletextures/commandbuttons/btncancel.png"}/>*/}
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
				{/* 툴팁 */}
				<div className="tooltip" dangerouslySetInnerHTML={{__html:
					AbilityTooltips[abiljson["ID"]]!==undefined?AbilityTooltips[abiljson["ID"]]["TOOLTIP"]:""
				}}>
				</div>
				{/* 하단스탯보너스 */}
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
		<div className='abilitySingleContainer'>
			<AbilityDescription viewMode={true}/>
			<AbilityMixTable/>
			<div className='btn-container'>
				<div className='icon-button' onClick={goBack} title={'뒤로가기'}>
				<i className={"fi fi-bs-angle-left"}></i>
				</div>
				{/* <Link to={"/w3x/SkillArchive/Ability/"}>
					<div className='icon-button' title={'목록'}>
						<i className="fa-solid fa-bars"></i>
					</div>
				</Link> */}
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
				<i className="fi fi-rs-apps"></i>
			</div>
			<div className={viewMode?"icon-button hover":"icon-button"} title='상세 보기' onClick={viewMode?()=>{}:()=>{modifyViewMode.set(true)}}>
				<i className="fi fi-br-menu-burger"></i>
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
				<i className="fi fi-rr-cross-small"></i>
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
			</select>
			<div className="text-button"
				onClick={()=>{modifySearchField.query("TIER","")}}
			>
				<i className="fi fi-rr-cross-small"></i>
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
				<i className="fi fi-rr-cross-small"></i>
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
				<i className="fi fi-rr-cross-small"></i>
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
				<i className="fi fi-rr-cross-small"></i>
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
				<i className="fi fi-rr-cross-small"></i>
			</div>
		</div>
		{/*스탯보너스1*/}
		<div className="rel h24 horizon-left vertical-center">
			<p>스탯1</p>
			<p> : </p>
			<select
				value={searchField["STAT_BONUS1"]}
				onChange={(event)=>{modifySearchField.query("STAT_BONUS1",event.target.value)}}
			>
				<option value="">선택안함</option>
				<option value="CONFIG_STAT_MAXHP">체력</option>
				<option value="CONFIG_STAT_MAXMP">마나</option>
				<option value="CONFIG_STAT_ATTACK">공격력</option>
				<option value="CONFIG_STAT_DEFENSE">방어력</option>
				<option value="CONFIG_STAT_MAGICPOWER">주문력</option>
				<option value="CONFIG_STAT_RESISTANCE">저항력</option>
				<option value="CONFIG_STAT_ACCURACY">정확도</option>
				<option value="CONFIG_STAT_EVASION">회피치</option>
				<option value="CONFIG_STAT_ARMOR_PENET">방어관통</option>
				<option value="CONFIG_STAT_MAGIC_PENET">저항관통</option>
				<option value="CONFIG_STAT_SPELL_BOOST">주문가속</option>
				<option value="CONFIG_STAT_LUCK">행운</option>
				<option value="CONFIG_STAT_HPREGEN">체력재생</option>
				<option value="CONFIG_STAT_MPREGEN">마나재생</option>
			</select>
			<div className="text-button"
				onClick={()=>{modifySearchField.query("STAT_BONUS1","")}}
			>
				<i className="fi fi-rr-cross-small"></i>
			</div>
		</div>
		{/*스탯보너스2*/}
		<div className="rel h24 horizon-left vertical-center">
			<p>스탯2</p>
			<p> : </p>
			<select
				value={searchField["STAT_BONUS2"]}
				onChange={(event)=>{modifySearchField.query("STAT_BONUS2",event.target.value)}}
			>
				<option value="">선택안함</option>
				<option value="CONFIG_STAT_MAXHP">체력</option>
				<option value="CONFIG_STAT_MAXMP">마나</option>
				<option value="CONFIG_STAT_ATTACK">공격력</option>
				<option value="CONFIG_STAT_DEFENSE">방어력</option>
				<option value="CONFIG_STAT_MAGICPOWER">주문력</option>
				<option value="CONFIG_STAT_RESISTANCE">저항력</option>
				<option value="CONFIG_STAT_ACCURACY">정확도</option>
				<option value="CONFIG_STAT_EVASION">회피치</option>
				<option value="CONFIG_STAT_ARMOR_PENET">방어관통</option>
				<option value="CONFIG_STAT_MAGIC_PENET">저항관통</option>
				<option value="CONFIG_STAT_SPELL_BOOST">주문가속</option>
				<option value="CONFIG_STAT_LUCK">행운</option>
				<option value="CONFIG_STAT_HPREGEN">체력재생</option>
				<option value="CONFIG_STAT_MPREGEN">마나재생</option>
			</select>
			<div className="text-button"
				onClick={()=>{modifySearchField.query("STAT_BONUS2","")}}
			>
				<i className="fi fi-rr-cross-small"></i>
			</div>
		</div>
		{/*버튼스페이스*/}
		<div className="rel horizon-center vertical-bottom h64">
			{/*필터초기화*/}
			<div className="icon-button" title='필터 초기화' onClick={
				modifySearchField.clear
			}>
				<i className="fi fi-rr-refresh"></i>
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
			<div className="abilityDescriptionContainer">
				<AbilityDescriptions state={state}/>
			</div>
			:
			<div className="abilityGridContainer">
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
				) &&
				/*스탯보너스*/
				( form["STAT_BONUS1"]===""&&form["STAT_BONUS2"]===""?
					/*둘 다 비어있으면 걍 트루*/
					true:
					/*둘 다 빈값이 아니면*/
					form["STAT_BONUS1"]!==""&&form["STAT_BONUS2"]!==""?
						((item["STAT_BONUS1"]===form["STAT_BONUS1"])||(item["STAT_BONUS1"]===form["STAT_BONUS2"]))&&
						((item["STAT_BONUS2"]===form["STAT_BONUS1"])||(item["STAT_BONUS2"]===form["STAT_BONUS2"])):
						/*한 필드만 작성돼있으면 */
						(item["STAT_BONUS1"]===form["STAT_BONUS1"])||
						(item["STAT_BONUS1"]===form["STAT_BONUS2"])||
						(item["STAT_BONUS2"]===form["STAT_BONUS1"])||
						(item["STAT_BONUS2"]===form["STAT_BONUS2"])
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
	return <>
		{props.isSingle===true?
			<AbilityDescriptionSingle/>
			:
			<AbilityDescriptionContainer 
				state={state}
			/>
		}
	</>
}