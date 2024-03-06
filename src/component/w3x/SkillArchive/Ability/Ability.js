//import react
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

//import JSON
import AbilityParams from 'json/w3x/SkillArchive/AbilityParams.json';
import AbilityMap from 'json/w3x/SkillArchive/AbilityMap.json';
import AbilityMix from 'json/w3x/SkillArchive/AbilityMix.json';
import AbilityTooltips from 'json/w3x/SkillArchive/AbilityTooltips.json';
import CustomString from 'json/w3x/SkillArchive/CustomString.json';
import 'css/w3x/SkillArchive/Ability/ability.css';

const AbilityJson = AbilityParams["params"];
const AbilityMixJson = AbilityMix["params"];
const SearchField = {
	FAVORITE : false,
	NAME : "",
	TIER : "",
	TAG : "",
	CAST_TYPE : "",
	DAMAGE_TYPE : "",
	ATTACK_TYPE : "",
	STAT_BONUS1 : "",
	STAT_BONUS2 : ""
};
const FavoritePrefix = "w3x_sa_ability_favorite_";

//즐찾에 있는지 판별하는 함수
function isFavorite(findfor) {
	// console.log(localStorage.getItem(FavoritePrefix+findfor));
	return localStorage.getItem(FavoritePrefix+findfor)!==null;
}
//즐찾 넣기,빼기
function addFavorite(val) {
	localStorage.setItem(FavoritePrefix+val,"true");
}
function removeFavorite(val) {
	localStorage.removeItem(FavoritePrefix+val);
}
function toggleFavorite(val) {
	if (isFavorite(val)) {
		removeFavorite(val);
		return false;
	} else {
		addFavorite(val);
		return true;
	}
}

//어빌리티 위젯에 붙는 즐찾버튼
function FavoriteWidget({json, interact}) {
	const [flag,setFlag] = useState(isFavorite(json["ID"]));
	// flag만 참이면 즐찾 돼있을 때에만 별 출력
	// interact상태일 때 즐찾버튼
	return <div className={
			'favoriteButton'+
			(!interact?' disabled':'')+
			(flag||interact?'':' hidden')
		}
		onClick={
			()=>{
				setFlag(toggleFavorite(json["ID"]));
			}	
		}
	>
		<i className={flag?"fi fi-sr-star active":"fi fi-rr-star"}></i>
	</div>;
}

//어빌리티 위젯 
export function AbilityWidget({
	json/*받는 어빌 json*/, 
	isThisAbility,/*믹스테이블에 들어갈 때 '이 어빌리티'와 같은지 하이라이트*/
	isSingle,/*상세보기에서 보고있는가*/
	interactFavorite,/*즐찾위젯 상호작용 여부*/
	inFavorite/*즐찾에 있는가*/
}) {
	return <div className={'w3x-icon rel'}>
		{/* json값을 undefined값을 줘서 '비어있는 어빌리티' 표현함 */}
		{/* 그렇지 않은 경우 정상적으로 어빌리티 위젯 표시 */}
		{json !== undefined ?
		<>
			<Link to={"/w3x/SkillArchive/Ability/"+json["ID"]}/*라우팅*/
				title={json["NAME"]}/*어빌리티 이름*/ 
				className={isSingle||isThisAbility?'disabled':''}/*클릭 막기*/
			>
				<img src={process.env.PUBLIC_URL+"/resource/"+json["ICON_PATH"]} alt='...'/>
				<div className={isThisAbility?'border-fill tier-this':'border-fill tier'+json["TIER"]}></div>
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
			{/*클릭 막기*/}
			{!(isSingle||isThisAbility)?<div className={'highlight non-focus'}></div>:<></>}
			{/*즐찾 위젯*/}
			<FavoriteWidget json={json} flag={inFavorite} interact={interactFavorite}/>
		</>
		:
		<>
			<img src={process.env.PUBLIC_URL+"/resource/replaceabletextures/commandbuttons/btncancel.png"} alt='...'/>
		</>
		}
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
			{lower.length>0?<div className={'descriptionBox'}>
				<div className='title w3font font16 white'>
					<i className="fi fi-rs-code-merge"></i>조합법
				</div>
				{lower.map(json=>{
					return <div className='row w3font font24 vertical-center horizon-center white' key={i++}>
						<AbilityWidget json={AbilityJson[AbilityMap[json["ID1"]]]} isThisAbility={json["ID1"]===id} isSingle={false} interactFavorite={false}/>
						<p className='m-left16 m-right16'>+</p>
						<AbilityWidget json={AbilityJson[AbilityMap[json["ID2"]]]} isThisAbility={json["ID2"]===id} isSingle={false} interactFavorite={false}/>
						<p className='m-left16 m-right16'>=</p>
						<AbilityWidget json={AbilityJson[AbilityMap[json["RESULT"]]]} isThisAbility={json["RESULT"]===id} isSingle={false} interactFavorite={false}/>
					</div>
				})}
			</div>:<></>}
			{upper.length>0?<div className={'descriptionBox'}>
				<div className='title w3font font16 white'>
					<i className="fi fi-rs-code-branch"></i>조합 가능 스킬
				</div>
				{upper.map(json=>{
					return <div className='row w3font font24 vertical-center horizon-center white' key={i++}>
						<AbilityWidget json={AbilityJson[AbilityMap[json["ID1"]]]} isThisAbility={json["ID1"]===id} isSingle={false} interactFavorite={false}/>
						<p className='m-left16 m-right16'>+</p>
						<AbilityWidget json={AbilityJson[AbilityMap[json["ID2"]]]} isThisAbility={json["ID2"]===id} isSingle={false} interactFavorite={false}/>
						<p className='m-left16 m-right16'>=</p>
						<AbilityWidget json={AbilityJson[AbilityMap[json["RESULT"]]]} isThisAbility={json["RESULT"]===id} isSingle={false} interactFavorite={false}/>
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
		return <div className="abilityDescription descriptionBox w3font" style={stl}>
			<div className="top">
				<AbilityWidget json={abiljson} isSingle={props.isSingle} interactFavorite={true} inFavorite={isFavorite(abiljson["ID"])}/>
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
		return <AbilityWidget json={abiljson} interactFavorite={false}/>
	}

}

//어빌리티 디스크립션 묶음
function AbilityDescriptions({state}) {
	return <>
		{state.abilityJson.map(desc=>{
			return <AbilityDescription key={desc.ID} json={desc} viewMode={state.viewMode} isSingle={false}/>		
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
		<div className='abilityContainer single'>
			<div className='abilitySingleContainer'>
				<AbilityDescription viewMode={true} isSingle={true}/>
				<AbilityMixTable/>
				<div className='btn-container'>
					<div className='icon-button' onClick={goBack} title={'뒤로가기'}>
					<i className={"fi fi-bs-angle-left"}></i>
					</div>
					<Link to={"/w3x/SkillArchive/Ability/"}>
						<div className='icon-button' title={'목록'}>
							<i className="fi fi-br-menu-burger"></i>
						</div>
					</Link>
				</div>
			</div>
		</div>
	</>
} 

//어빌리티 검색창
function AbilitySearchController({state}) {
	const viewMode = state.viewMode;
	const modifyViewMode = state.modifyViewMode;
	const modifyAbilityJson = state.modifyAbilityJson;
	const [searchField,setSearchField] = useState(SearchField);
	const modifySearchField = {
		modify : (field,val) =>{
			let sf = searchField;
			sf[field] = val;
			// setSearchField(JSON.parse(JSON.stringify(sf)));
			setSearchField(sf);
			// console.log(val+", "+searchField["FAVORITE"]);
			modifyAbilityJson.query(AbilityJson,searchField);
		},
		clear : () =>{
			setSearchField(JSON.parse(JSON.stringify(SearchField)));
			// setSearchField(SearchField);
			modifyAbilityJson.clear();
		},
		query : () =>{
			modifyAbilityJson.query(AbilityJson,searchField);
		}
	}
	return <>
	{/*컨트롤러 */}
	<div className="controller w3font shadow">
		{/*체크박스 */}
		<div className="radio">
			<div className={viewMode?"icon-button":"icon-button hover"} title='아이콘으로 보기' onClick={viewMode?()=>{modifyViewMode.set(false)}:()=>{}}>
				<i className="fi fi-rs-apps"></i>
			</div>
			<div className={viewMode?"icon-button hover":"icon-button"} title='상세 보기' onClick={viewMode?()=>{}:()=>{modifyViewMode.set(true)}}>
				<i className="fi fi-br-menu-burger"></i>
			</div>
			{/* 즐찾 */}
			{/* {console.log(searchField["FAVORITE"])} */}
			<div className={searchField["FAVORITE"]?"icon-button hover":"icon-button"} title='즐겨찾기' onClick={
				()=>{
					modifySearchField.modify("FAVORITE",!searchField["FAVORITE"]);
				}
			}>
				<i className={searchField["FAVORITE"]?"fi fi-sr-star favorite active":"fi fi-rr-star favorite"}></i>
			</div>
		</div>
		{/*이름검색*/}
		<div className="item">
			<p className="name">이름</p>
			<input 
				type="text"
				value={searchField["NAME"]}
				onChange={(event)=>{modifySearchField.modify("NAME",event.target.value)}}
			/>
			<div className="text-button"
				onClick={()=>{modifySearchField.modify("NAME","")}}
			>
				<i className="fi fi-rr-cross-small"></i>
			</div>
		</div>
		{/*티어필터링*/}
		<div className="item">
			<p className="name">티어</p>
			<select 
				value={searchField["TIER"]}
				onChange={(event)=>{modifySearchField.modify("TIER",event.target.value)}}
			>
				<option value="">전체</option>
				<option value="1">1</option>
				<option value="2">2</option>
				<option value="3">3</option>
				<option value="4">4</option>
				<option value="5">5</option>
			</select>
			<div className="text-button"
				onClick={()=>{modifySearchField.modify("TIER","")}}
			>
				<i className="fi fi-rr-cross-small"></i>
			</div>
		</div>
		{/*태그검색*/}
		<div className="item">
			<p className="name">태그</p>
			<input 
				type="text"
				value={searchField["TAG"]}
				onChange={(event)=>{modifySearchField.modify("TAG",event.target.value)}}
			/>
			<div className="text-button"
				onClick={()=>{modifySearchField.modify("TAG","")}}
			>
				<i className="fi fi-rr-cross-small"></i>
			</div>
		</div>
		{/*캐스트타입검색*/}
		<div className="item">
			<p className="name">시전 유형</p>
			<select
				value={searchField["CAST_TYPE"]}
				onChange={(event)=>{modifySearchField.modify("CAST_TYPE",event.target.value)}}
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
				onClick={()=>{modifySearchField.modify("CAST_TYPE","")}}
			>
				<i className="fi fi-rr-cross-small"></i>
			</div>
		</div>
		{/*피해 유형*/}
		<div className="item">
			<p className="name">피해 유형</p>
			<select
				value={searchField["DAMAGE_TYPE"]}
				onChange={(event)=>{modifySearchField.modify("DAMAGE_TYPE",event.target.value)}}
			>
				<option value="">전체</option>
				<option value="물리">물리</option>
				<option value="마법">마법</option>
				<option value="미분류">미분류</option>
			</select>
			<div className="text-button"
				onClick={()=>{modifySearchField.modify("DAMAGE_TYPE","")}}
			>
				<i className="fi fi-rr-cross-small"></i>
			</div>
		</div>
		{/*공격 유형*/}
		<div className="item">
			<p className="name">공격 유형</p>
			<select
				value={searchField["ATTACK_TYPE"]}
				onChange={(event)=>{modifySearchField.modify("ATTACK_TYPE",event.target.value)}}
			>
				<option value="">전체</option>
				<option value="기본">기본공격</option>
				<option value="스킬">스킬공격</option>
				<option value="미분류">미분류</option>
			</select>
			<div className="text-button"
				onClick={()=>{modifySearchField.modify("ATTACK_TYPE","")}}
			>
				<i className="fi fi-rr-cross-small"></i>
			</div>
		</div>
		{/*스탯보너스1*/}
		<div className="item">
			<p className="name">스탯1</p>
			<select
				value={searchField["STAT_BONUS1"]}
				onChange={(event)=>{modifySearchField.modify("STAT_BONUS1",event.target.value)}}
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
				onClick={()=>{modifySearchField.modify("STAT_BONUS1","")}}
			>
				<i className="fi fi-rr-cross-small"></i>
			</div>
		</div>
		{/*스탯보너스2*/}
		<div className="item">
			<p className="name">스탯2</p>
			<select
				value={searchField["STAT_BONUS2"]}
				onChange={(event)=>{modifySearchField.modify("STAT_BONUS2",event.target.value)}}
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
				onClick={()=>{modifySearchField.modify("STAT_BONUS2","")}}
			>
				<i className="fi fi-rr-cross-small"></i>
			</div>
		</div>
		{/*버튼스페이스*/}
		<div className="buttonSpace">
			{/*필터초기화*/}
			<div className="icon-button" title='필터 초기화' onClick={
				()=>{modifySearchField.clear()}
			}>
				<i className="fi fi-rr-refresh"></i>
			</div>
		</div>
	</div>
	</>;
}

//어빌리티 디스크립션 관리자
function AbilityDescriptionContainer({state}) {
	const viewMode = state.viewMode

	//viewmode에 따라 분기
	return <>
		<div className="abilityContainer">
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
		</div>
	</>
}

//어빌리티 메인 컨테이너
export function Ability(props) {
	const [viewMode,setViewMode] = useState(false);
	const [abilityJson,setAbilityJson] = useState(AbilityJson);
	
	const modifyViewMode = {
		set:(val) => {
			setViewMode(val);
		},
		toggle: ()=> {
			setViewMode(!viewMode);
		}
	}
	const modifyAbilityJson = {
		clear:() => {
			setAbilityJson(AbilityJson);
		},
		query:(target,form) => {
			setAbilityJson(target.filter(item =>
				/*즐찾*/
				( form["FAVORITE"]?
					isFavorite(item["ID"])
					:
					true
				) &&
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
			));
		}
	}
	
	const state = {
		viewMode:viewMode,
		modifyViewMode:modifyViewMode,
		abilityJson:abilityJson,
		modifyAbilityJson:modifyAbilityJson,
	}
	return <>
		{props.isSingle===true?
			<AbilityDescriptionSingle/>
			:
			<AbilityDescriptionContainer
				state={state}
			/>
		}
	</>;
}