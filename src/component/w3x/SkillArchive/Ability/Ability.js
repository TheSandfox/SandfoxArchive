//import JSON
// import abilityJsonMap from 'json/w3x/SkillArchive/abilityJsonMap.json';
import AbilityMix from 'json/w3x/SkillArchive/AbilityMix.json';

//import css
import 'css/w3x/SkillArchive/Ability/ability.css';

//import react
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useReducer, useState } from 'react';

//import icons
import { FaStar, FaRegStar } from "react-icons/fa6";
import { TfiLayoutGrid2 } from "react-icons/tfi";
import { FiMenu } from "react-icons/fi";
import { LuRefreshCw } from "react-icons/lu";
import { IoIosArrowBack } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { abilitySearchFieldDefault, abilitySearchFieldReducer } from './_reducer/AbilitySearchField';
import { abilityJsonDefault, abilityJsonReducer, abilityJsonMap } from './_reducer/AbilityJson';
import AbilityDescription from './AbilityDescription';

const AbilityMixJson = AbilityMix["params"];

//로컬 스토리지 키
const LocalViewmode = "w3x_sa_ability_viewmode";

//어빌리티 위젯에 붙는 즐찾버튼
function FavoriteWidget({json, interact, state}) {
	const flag = state.handleAbilityFavorite.isFavorite(json["ID"]);
	// flag만 참이면 즐찾 돼있을 때에만 별 출력
	// interact상태일 때 즐찾버튼
	return <div className={
			'favoriteButton'+
			(!interact?' disabled':'')+
			(flag||interact?'':' hidden')
		}
		onClick={()=>{
				state.handleAbilityFavorite.toggle(json["ID"])
		}}
	>
		{flag
			?<FaStar className={"active"}></FaStar>
			:<FaRegStar></FaRegStar>
		}
	</div>;
}

//어빌리티 위젯 
export function AbilityWidget({
	json/*받는 어빌 json*/, 
	isThisAbility,/*믹스테이블에 들어갈 때 '이 어빌리티'와 같은지 하이라이트*/
	isSingle,/*상세보기에서 보고있는가*/
	interactFavorite,/*즐찾위젯 상호작용 여부*/
	state
}) {
	return <div className={'w3x-icon rel'}>
		{/* json값을 undefined값을 줘서 '비어있는 어빌리티' 표현함 */}
		{/* 그렇지 않은 경우 정상적으로 어빌리티 위젯 표시 */}
		{json !== undefined 
		?<>
			<Link to={"/w3x/SkillArchive/Ability/"+json["ID"]}/*라우팅*/
				title={json["NAME"]}/*어빌리티 이름*/ 
				className={isSingle||isThisAbility?'disabled':''}/*클릭 막기*/
			>
				<img src={process.env.PUBLIC_URL+"/resource/"+json["ICON_PATH"]} alt='...'/>
				<div className={isThisAbility?'border-fill tier-this':'border-fill tier'+json["TIER"]}></div>
				{/*무기어빌리티면 무기아이콘 표시*/}
				{json["IS_WEAPON"]==="true"
					?<img
						className={'bottom-right abs icon-24x'}
						src={process.env.PUBLIC_URL+"/resource/ui/widgets/tooltips/human/tooltipweaponicon.png"}
						alt='...'
					/>
					:<></>
				}
			</Link>
			{/*클릭 막기*/}
			{!(isSingle||isThisAbility)?<div className={'highlight non-focus'}></div>:<></>}
			{/*즐찾 위젯*/}
			<FavoriteWidget json={json} state={state} interact={interactFavorite}/>
		</>
		:<>
			<img src={process.env.PUBLIC_URL+"/resource/replaceabletextures/commandbuttons/btncancel.png"} alt='...'/>
		</>
		}
	</div>
}

//어빌리티 조합
function AbilityMixTable({state}) {
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
						<AbilityWidget json={abilityJsonDefault[abilityJsonMap[json["ID1"]]]} isThisAbility={json["ID1"]===id} isSingle={false} interactFavorite={false} state={state}/>
						<p className='m-left16 m-right16'>+</p>
						<AbilityWidget json={abilityJsonDefault[abilityJsonMap[json["ID2"]]]} isThisAbility={json["ID2"]===id} isSingle={false} interactFavorite={false} state={state}/>
						<p className='m-left16 m-right16'>=</p>
						<AbilityWidget json={abilityJsonDefault[abilityJsonMap[json["RESULT"]]]} isThisAbility={json["RESULT"]===id} isSingle={false} interactFavorite={false} state={state}/>
					</div>
				})}
			</div>:<></>}
			{upper.length>0?<div className={'descriptionBox'}>
				<div className='title w3font font16 white'>
					<i className="fi fi-rs-code-branch"></i>조합 가능 스킬
				</div>
				{upper.map(json=>{
					return <div className='row w3font font24 vertical-center horizon-center white' key={i++}>
						<AbilityWidget json={abilityJsonDefault[abilityJsonMap[json["ID1"]]]} isThisAbility={json["ID1"]===id} isSingle={false} interactFavorite={false} state={state}/>
						<p className='m-left16 m-right16'>+</p>
						<AbilityWidget json={abilityJsonDefault[abilityJsonMap[json["ID2"]]]} isThisAbility={json["ID2"]===id} isSingle={false} interactFavorite={false} state={state}/>
						<p className='m-left16 m-right16'>=</p>
						<AbilityWidget json={abilityJsonDefault[abilityJsonMap[json["RESULT"]]]} isThisAbility={json["RESULT"]===id} isSingle={false} interactFavorite={false} state={state}/>
				</div>
				})}
			</div>:<></>}
		</div>:
		<></>}
	</>
}

//어빌리티 디스크립션 묶음
function AbilityDescriptions({state}) {
	return <>
		{state.abilityJson.map(desc=>{
			return <AbilityDescription key={desc.ID} json={desc} state={state} isSingle={false}/>		
		})}
	</>
}

//어빌리티 디스크립션 한 개(상세)
function AbilityDescriptionSingle({state}) {
	var navigate = useNavigate();
	function goBack() {
		navigate(-1);
	}
	//어빌툴팁 상세
	//뒤로가기버튼
	return <>
		<div className='abilityContainer single'>
			<div className='abilitySingleContainer'>
				<AbilityDescription viewMode={true} isSingle={true} state={state}/>
				<AbilityMixTable state={state}/>
				<div className='btn-container'>
					<div className='icon-button' onClick={goBack} title={'뒤로가기'}>
						<IoIosArrowBack />
					</div>
					<Link to={"/w3x/SkillArchive/Ability"}>
						<div className='icon-button' title={'목록'}>
							<FiMenu />
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
	const handleViewMode = state.handleViewMode;
	const searchField = state.searchField;
	const handleSearchField = state.handleSearchField;
	return <>
	{/*컨트롤러 */}
	<div className="controller w3font shadow">
		{/*체크박스 */}
		<div className="radio">
			<div className={viewMode?"icon-button":"icon-button hover"} title='아이콘으로 보기' onClick={viewMode?()=>{handleViewMode.set(false)}:()=>{}}>
				<TfiLayoutGrid2 />
			</div>
			<div className={viewMode?"icon-button hover":"icon-button"} title='상세 보기' onClick={viewMode?()=>{}:()=>{handleViewMode.set(true)}}>
				<FiMenu />
			</div>
			{/* 즐찾 */}
			{/* {console.log(searchField["FAVORITE"])} */}
			<div className={searchField["FAVORITE"]?"icon-button hover":"icon-button"} title='즐겨찾기' onClick={
				()=>{
					handleSearchField.modify("FAVORITE",!searchField["FAVORITE"]);
				}
			}>
				{searchField["FAVORITE"]?
					<FaStar className='favorite active'/>
					:
					<FaRegStar className='favorite'/>
				}
			</div>
		</div>
		{/*이름검색*/}
		<div className="item">
			<p className="name">이름</p>
			<input 
				type="text"
				name="abilityname"
				value={searchField["NAME"]}
				onChange={(event)=>{handleSearchField.modify("NAME",event.target.value)}}
			/>
			<div className="text-button"
				onClick={()=>{handleSearchField.modify("NAME","")}}
			>
				<RxCross2 />
			</div>
		</div>
		{/*티어필터링*/}
		<div className="item">
			<p className="name">티어</p>
			<select 
				name="tier"
				value={searchField["TIER"]}
				onChange={(event)=>{handleSearchField.modify("TIER",event.target.value)}}
			>
				<option value="">전체</option>
				<option value="1">1</option>
				<option value="2">2</option>
				<option value="3">3</option>
				<option value="4">4</option>
				<option value="5">5</option>
			</select>
			<div className="text-button"
				onClick={()=>{handleSearchField.modify("TIER","")}}
			>
				<RxCross2 />
			</div>
		</div>
		{/*태그검색*/}
		<div className="item">
			<p className="name">태그</p>
			<input 
				name="tag"
				type="text"
				value={searchField["TAG"]}
				onChange={(event)=>{handleSearchField.modify("TAG",event.target.value)}}
			/>
			<div className="text-button"
				onClick={()=>{handleSearchField.modify("TAG","")}}
			>
				<RxCross2 />
			</div>
		</div>
		{/*캐스트타입검색*/}
		<div className="item">
			<p className="name">시전 유형</p>
			<select
				name="casttype"
				value={searchField["CAST_TYPE"]}
				onChange={(event)=>{handleSearchField.modify("CAST_TYPE",event.target.value)}}
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
				onClick={()=>{handleSearchField.modify("CAST_TYPE","")}}
			>
				<RxCross2 />
			</div>
		</div>
		{/*피해 유형*/}
		<div className="item">
			<p className="name">피해 유형</p>
			<select
				name="damagetype"
				value={searchField["DAMAGE_TYPE"]}
				onChange={(event)=>{handleSearchField.modify("DAMAGE_TYPE",event.target.value)}}
			>
				<option value="">전체</option>
				<option value="물리">물리</option>
				<option value="마법">마법</option>
				<option value="미분류">미분류</option>
			</select>
			<div className="text-button"
				onClick={()=>{handleSearchField.modify("DAMAGE_TYPE","")}}
			>
				<RxCross2 />
			</div>
		</div>
		{/*공격 유형*/}
		<div className="item">
			<p className="name">공격 유형</p>
			<select
				name="attacktype"
				value={searchField["ATTACK_TYPE"]}
				onChange={(event)=>{handleSearchField.modify("ATTACK_TYPE",event.target.value)}}
			>
				<option value="">전체</option>
				<option value="기본">기본공격</option>
				<option value="스킬">스킬공격</option>
				<option value="미분류">미분류</option>
			</select>
			<div className="text-button"
				onClick={()=>{handleSearchField.modify("ATTACK_TYPE","")}}
			>
				<RxCross2 />
			</div>
		</div>
		{/*스탯보너스1*/}
		<div className="item">
			<p className="name">스탯1</p>
			<select
				name="statbonus1"
				value={searchField["STAT_BONUS1"]}
				onChange={(event)=>{handleSearchField.modify("STAT_BONUS1",event.target.value)}}
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
				onClick={()=>{handleSearchField.modify("STAT_BONUS1","")}}
			>
				<RxCross2 />
			</div>
		</div>
		{/*스탯보너스2*/}
		<div className="item">
			<p className="name">스탯2</p>
			<select
				name="statbonus2"
				value={searchField["STAT_BONUS2"]}
				onChange={(event)=>{handleSearchField.modify("STAT_BONUS2",event.target.value)}}
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
				onClick={()=>{handleSearchField.modify("STAT_BONUS2","")}}
			>
				<RxCross2 />
			</div>
		</div>
		{/*버튼스페이스*/}
		<div className="buttonSpace">
			{/*필터초기화*/}
			<div className="icon-button" title='필터 초기화' onClick={
				()=>{handleSearchField.clear()}
			}>
				<LuRefreshCw />
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

function getViewmode() {
	return localStorage.getItem(LocalViewmode)!==null;
}

//어빌리티 메인 컨테이너
export function Ability(props) {
	const [viewMode,setViewMode] = useState(getViewmode());
	const [abilityJson,dispatchAbilityJson] = useReducer(abilityJsonReducer,abilityJsonDefault);
	const [searchField,dispatchSearchField] = useReducer(abilitySearchFieldReducer,abilitySearchFieldDefault);
	const handleViewMode = {
		set:(val) => {
			setViewMode(val);
			if (val) {
				localStorage.setItem(LocalViewmode,"true");
			} else {
				localStorage.removeItem(LocalViewmode);
			}
 		},
		toggle: ()=> {
			setViewMode(!viewMode);
		}
	}
	const handleAbilityJson = {
		clear:() => {
			dispatchAbilityJson({type:'clear'});
		},
		query:(target,form,handleAbilityFavorite) => {
			dispatchAbilityJson({type:'query',target:target,form:form,handleAbilityFavorite:handleAbilityFavorite});
		}
	}
	const handleSearchField = {
		get : (fieldName)=>{
			return dispatchSearchField({type:'get',fieldName:fieldName});
		},
		modify : (fieldName,value) =>{
			let sf = JSON.parse(JSON.stringify(searchField))
			sf[fieldName] = value;
			dispatchSearchField({type:'modify',fieldName:fieldName,value:value})
			handleAbilityJson.query(abilityJsonDefault,sf,props.state.handleAbilityFavorite);
		},
		clear : () =>{
			dispatchSearchField({type:'clear'})
			handleAbilityJson.clear();
		},
		refresh : () =>{
			handleAbilityJson.query(abilityJson,searchField,props.state.handleAbilityFavorite);
		}
	}
	const state = {
		viewMode:viewMode,
		handleViewMode:handleViewMode,
		abilityJson:abilityJson,
		handleAbilityJson:handleAbilityJson,
		searchField:searchField,
		handleSearchField:handleSearchField,
		// 어빌 따봉 핸들러
		abilityFavorite:props.state.Favorite,
		handleAbilityFavorite:props.state.handleAbilityFavorite
	}
	return <>
		{props.isSingle===true?
			<AbilityDescriptionSingle
				state={state}
			/>
			:
			<AbilityDescriptionContainer
				state={state}
			/>
		}
	</>;
}