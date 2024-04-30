import AbilityTooltips from 'json/w3x/SkillArchive/AbilityTooltips.json';
import CustomString from 'json/w3x/SkillArchive/CustomString.json';
import { AbilityWidget } from "./Ability";
import { abilityJsonDefault, abilityJsonMap, abilityJsonTemplate } from "./_reducer/AbilityJson";
import { useParams } from 'react-router-dom';

//어빌리티 디스크립션 (상세or아이콘)
export default function AbilityDescription(props) {
	let viewMode
	let abilJson = {}
	let p = useParams()
	//뷰모드 가져오기
	viewMode = props.viewMode||props.state.viewMode;
	//어빌리티 제이슨 가져오기
	abilJson = props.json||abilityJsonDefault[abilityJsonMap[p.id]]
	if (!abilJson) {
		abilJson = abilityJsonTemplate
	}
	if(viewMode===true) {
		//디테일모드
		let stl = {
			// 티어 테두리
			border:'2px solid #'+CustomString["CONFIG_TIER_"+abilJson["TIER"]]["COLOR"]
		}
		return <div className="abilityDescription descriptionBox w3font" style={stl}>
			<div className="top">
				{/* 위젯 */}
				<AbilityWidget json={abilJson} isSingle={props.isSingle} interactFavorite={true} state={props.state}/>
				{/* 이름&태그 */}
				<div className='name-and-tags'>
					<div className="ability-name">{/*#{abilJson["ID"]} */}{abilJson["NAME"]}</div>
					<div className="ability-tags">
						{abilJson["TAG1"]!=="null"?CustomString[abilJson["TAG1"]]["NAME"]:""}
						{abilJson["TAG2"]!=="null"?", "+CustomString[abilJson["TAG2"]]["NAME"]:""}
						{abilJson["TAG3"]!=="null"?", "+CustomString[abilJson["TAG3"]]["NAME"]:""}
						{abilJson["TAG4"]!=="null"?", "+CustomString[abilJson["TAG4"]]["NAME"]:""}
					</div>
				</div>
				{/* 쿨타임&마나코스트 */}
				{/* 무기일 경우 사거리&공격쿨타임 */}
				<div className='cooldown-and-manacost'>
					<div>
						<img src={process.env.PUBLIC_URL+"/resource/ui/widgets/tooltips/human/"+(abilJson["IS_WEAPON"]==="true"?"tooltipattackrangeicon":"tooltipmanaicon")+".png"} alt={process.env.PUBLIC_URL+"/resource/replaceabletextures/commandbuttons/btncancel.png"}/>
						<p>{abilJson["IS_WEAPON"]==="true"?abilJson["WEAPON_RANGE"]:abilJson["MANACOST"]}</p>
					</div>
					<div>
						<img src={process.env.PUBLIC_URL+"/resource/ui/widgets/tooltips/human/tooltipcooldownicon.png"} alt={process.env.PUBLIC_URL+"/resource/replaceabletextures/commandbuttons/btncancel.png"}/>
						<p>{abilJson["IS_WEAPON"]==="true"?abilJson["WEAPON_DELAY"]:abilJson["COOLDOWN_MAX"]+"/("+abilJson["COOLDOWN_MIN"]+")"}</p>
					</div>
				</div>
			</div>
			<div className="bottom">
				{/* 시전유형&커스텀코스트(있을경우에만) */}
				<div className = "cast-type-and-custom-cost">
					<div className="cast-type">
						{abilJson["CAST_TYPE"]!=="null"?CustomString[abilJson["CAST_TYPE"]]["NAME"]:""}
					</div>
					<div className="custom-cost" dangerouslySetInnerHTML={{__html:
						AbilityTooltips[abilJson["ID"]]!==undefined?(
							AbilityTooltips[abilJson["ID"]]["CUSTOM_COST"]!==undefined?AbilityTooltips[abilJson["ID"]]["CUSTOM_COST"]:""
						):
						""
					}}>
					</div>
				</div>
				{/* 툴팁 */}
				<div className="tooltip" dangerouslySetInnerHTML={{__html:
					AbilityTooltips[abilJson["ID"]]!==undefined?AbilityTooltips[abilJson["ID"]]["TOOLTIP"]:""
				}}>
				</div>
				{/* 하단스탯보너스 */}
				<div className="statbonus">
					<p>스탯 보너스 : </p>
					<img 
						src={process.env.PUBLIC_URL+"/resource/"+CustomString[abilJson["STAT_BONUS1"]]["ICON"]}
						title={CustomString[abilJson["STAT_BONUS1"]]["NAME"]}
						alt='...'
					/>
					<img 
						src={process.env.PUBLIC_URL+"/resource/"+CustomString[abilJson["STAT_BONUS2"]]["ICON"]}
						title={CustomString[abilJson["STAT_BONUS2"]]["NAME"]}
						alt='...'
					/>
				</div>
			</div>
		</div>
	} else {
		//아이콘모드일 때 위젯
		return <AbilityWidget json={abilJson} interactFavorite={false} state={props.state}/>
	}

}