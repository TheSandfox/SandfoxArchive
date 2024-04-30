import { useParams, Link } from "react-router-dom"

import { abilityJsonDefault, abilityJsonMap } from '../Ability/_reducer/AbilityJson';
import { AbilityWidget } from "../Ability/Ability";
import { unitJsonDefault, unitJsonTemplate } from "./_reducer/UnitJson";

//유닛 디스크립션 (상세or아이콘)
export default function UnitDescription(props) {
	let json = {}
	let p = useParams()
	json = props.json||unitJsonDefault.filter(item=>item["ID"]===p.id)[0]
	if (json===undefined) {
		json = unitJsonTemplate
	}
	if(props.viewMode===true) {
		//디테일모드
		let stl = {
			border:'2px solid #ffffff'
		}
		// console.log("========================"+json["INITIAL_ABILITY1"]+"=======================")
		return <div className="unitDescription descriptionBox" style={stl}>
			<div className='left'>
				<div className='top'>
					<img className='w3icon' src={process.env.PUBLIC_URL+"/resource/"+json["ICON_PATH"]} alt={process.env.PUBLIC_URL+"/resource/replaceabletextures/commandbuttons/btncancel.png"}/>
					<div className='name-and-tags'>
						<div className="font24 white">{json["NAME"]}</div>
					</div>
				</div>
				<br/>
				<div className="bottom">
					<div className="tooltip white" >
						{json["TOOLTIP"]}
					</div>
				</div>
			</div>
			<br/>
			{/*고유능력 아이콘*/}
			<div className="right">
				<p className='white'>고유 능력 : </p>
				{json["INITIAL_ABILITY1"]!=="null"?
					<div>
						<AbilityWidget json={abilityJsonDefault[abilityJsonMap[json["INITIAL_ABILITY1"]]]} state={props.state}/>
					</div>
					:
					<div style={{opacity:0.3}}>
						<AbilityWidget json={undefined} state={props.state}/>
					</div>
				}
				{json["INITIAL_ABILITY2"]!=="null"?
					<div>
						<AbilityWidget json={abilityJsonDefault[abilityJsonMap[json["INITIAL_ABILITY2"]]]} state={props.state}/>
					</div>
					:
					<div style={{opacity:0.3}}>
						<AbilityWidget json={undefined} state={props.state}/>
					</div>
				}
			</div>
		</div>
	} else {
		//아이콘모드
		return <div className='w3x-icon rel'>
			<Link to={"/w3x/SkillArchive/Unit/"+json["ID"]} title={json["NAME"]}>
				<img src={process.env.PUBLIC_URL+"/resource/"+json["ICON_PATH"]} alt={process.env.PUBLIC_URL+"/resource/replaceabletextures/commandbuttons/btncancel.png"}/>
			</Link>
			<div className={'highlight non-focus'}></div>
		</div>
	}

}