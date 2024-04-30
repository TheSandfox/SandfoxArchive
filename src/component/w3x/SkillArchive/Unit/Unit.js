//import react
import { useNavigate } from 'react-router-dom'
import { useReducer, useState } from 'react'

//import icons
import { TfiLayoutGrid2 } from "react-icons/tfi";
import { FiMenu } from "react-icons/fi";
import { LuRefreshCw } from "react-icons/lu";
import { IoIosArrowBack } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";

//import css
import 'css/w3x/SkillArchive/Unit/unit.css'
import { unitJsonReducer, unitJsonDefault } from './_reducer/UnitJson';
import { unitSearchFieldDefault, unitSearchFieldReducer } from './_reducer/UnitSearchField';
import UnitDescription from './UnitDescription';

//로컬 스토리지 키
const LocalViewmode = "w3x_sa_unit_viewmode";

//유닛 디스크립션 묶음
function UnitDescriptions({state}) {
	return <>
		{state.unitJson.map(desc=>{
			return <UnitDescription key={desc.ID} json={desc} viewMode={state.viewMode} state={state}/>		
		})}
	</>
}

//유닛 디스크립션 한 개(상세)
function UnitDescriptionSingle({state}) {
	var navigate = useNavigate()
	function goBack() {
		navigate(-1);
	}
	//유닛툴팁 상세
	//뒤로가기버튼
	return <>
		<div className='unitContainer single'>
			<div className='unitSingleContainer'>
				<UnitDescription viewMode={true} state={state}/>
				<div className='unit-single-back-div icon-button' onClick={goBack}>
					<IoIosArrowBack />
				</div>
			</div>
		</div>
	</>
} 

//유닛 검색창
function UnitSearchController({state}) {
	const viewMode = state.viewMode
	const handleViewMode = state.handleViewMode
	const searchField = state.searchField
	const handleSearchField = state.handleSearchField
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
		</div>
		{/*이름검색*/}
		<div className="item">
			<p className="name">이름</p>
			<input
				name="unitname"
				type="text"
				value={searchField["NAME"]}
				onChange={(event)=>{handleSearchField.query("NAME",event.target.value)}}
			/>
			<div className="text-button"
				onClick={()=>{handleSearchField.query("NAME","")}}
			>
				<RxCross2 />
			</div>
		</div>
		{/*버튼스페이스*/}
		<div className="buttonSpace">
			{/*필터초기화*/}
			<div className="icon-button" title='필터 초기화' onClick={
				handleSearchField.clear
			}>
				<LuRefreshCw />
			</div>
		</div>
	</div>
	</>
}

//유닛 디스크립션 관리자
function UnitDescriptionContainer({state}) {
	const viewMode = state.viewMode

	//viewmode에 따라 분기
	return <div className="unitContainer">
		<UnitSearchController state={state}/>
		{/*뷰모드 분기(상세설명들로 채우냐, 아이콘들로 채우냐) */}
		{viewMode===true?
			<div className="unitDescriptionContainer">
				<UnitDescriptions state={state}/>
			</div>
			:
			<div className="unitGridContainer">
				<UnitDescriptions state={state}/>
			</div>
		}
	</div>
}

function getViewmode() {
	return localStorage.getItem(LocalViewmode)!==null;
}

export function Unit(props) {
	const [viewMode,setViewMode] = useState(getViewmode())
	const [unitJson,dispatchUnitJson] = useReducer(unitJsonReducer,unitJsonDefault)
	const [searchField,dispatchSearchField] = useReducer(unitSearchFieldReducer,unitSearchFieldDefault)
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
	const handleUnitJson = {
		clear:() => {
			dispatchUnitJson({type:'clear'});
		},
		query:(target,form) => {
			dispatchUnitJson({type:'query',target:target,form:form})
		}
	}
	const handleSearchField = {
		query : (fieldName,value) =>{
			let sf = JSON.parse(JSON.stringify(searchField))
			sf[fieldName] = value
			dispatchSearchField({type:'modify',fieldName:fieldName,value:value})
			handleUnitJson.query(unitJsonDefault,sf)
		},
		clear : () =>{
			dispatchSearchField({type:'clear'})
			handleUnitJson.clear()
		}
	}
	const state = {
		viewMode:viewMode,
		handleViewMode:handleViewMode,
		unitJson:unitJson,
		handleUnitJson:handleUnitJson,
		searchField:searchField,
		handleSearchField:handleSearchField,
		// 어빌 따봉 핸들러
		abilityFavorite:props.state.abilityFavorite,
		handleAbilityFavorite:props.state.handleAbilityFavorite,
		// 유닛 따봉 핸들러
		unitFavorite:props.state.unitFavorite,
		handleUnitFavorite:props.state.handleUnitFavorite
	}
	return <>
	{props.isSingle===true?
		<UnitDescriptionSingle
			state={state}
		/>
		:
		<UnitDescriptionContainer 
			state={state}
		/>
	}
</>
}