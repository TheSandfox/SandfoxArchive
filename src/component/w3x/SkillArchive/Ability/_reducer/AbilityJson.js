import AbilityParams from 'json/w3x/SkillArchive/AbilityParams.json';
import CustomString from 'json/w3x/SkillArchive/CustomString.json';


import abilityJsonMap from 'json/w3x/SkillArchive/AbilityMap.json';
const abilityJsonDefault = AbilityParams["params"];
const abilityJsonTemplate = {
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

const abilityJsonReducer = (state,action)=>{
	switch(action.type) {
	case 'query':
		return action.target.filter((item)=>{
			/*즐찾*/
			return ( action.form["FAVORITE"]?
			action.handleAbilityFavorite.isFavorite(item["ID"])
			:
			true
			) &&
			/*어빌리티이름*/ 
			( action.form["NAME"]===""?true:
				item["NAME"].includes(action.form["NAME"]) 
			) &&
			/*어빌리티티어*/
			( action.form["TIER"]===""?true:
				item["TIER"].includes(action.form["TIER"]) 
			) &&
			/*어빌리티태그(좀무거움)*/
			( action.form["TAG"]===""?true:
				(CustomString[item["TAG1"]]!==undefined?CustomString[item["TAG1"]]["NAME"].includes(action.form["TAG"]):false)||
				(CustomString[item["TAG2"]]!==undefined?CustomString[item["TAG2"]]["NAME"].includes(action.form["TAG"]):false)||
				(CustomString[item["TAG3"]]!==undefined?CustomString[item["TAG3"]]["NAME"].includes(action.form["TAG"]):false)||
				(CustomString[item["TAG4"]]!==undefined?CustomString[item["TAG4"]]["NAME"].includes(action.form["TAG"]):false) 
			) &&
			/*캐스트타입*/
			( action.form["CAST_TYPE"]===""?true:
				/*(CustomString[item["CAST_TYPE"]]!==undefined?*/CustomString[item["CAST_TYPE"]]["NAME"].includes(action.form["CAST_TYPE"])/*:false)*/
			) &&
			/*데미지 타입*/
			( action.form["DAMAGE_TYPE"]===""?true:
				(CustomString[item["DAMAGE_TYPE"]]!==undefined?CustomString[item["DAMAGE_TYPE"]]["NAME"].includes(action.form["DAMAGE_TYPE"]):false)
			) &&
			/*공격 타입*/
			( action.form["ATTACK_TYPE"]===""?true:
				(CustomString[item["ATTACK_TYPE"]]!==undefined?CustomString[item["ATTACK_TYPE"]]["NAME"].includes(action.form["ATTACK_TYPE"]):false)
			) &&
			/*스탯보너스*/
			( action.form["STAT_BONUS1"]===""&&action.form["STAT_BONUS2"]===""?
				/*둘 다 비어있으면 걍 트루*/
				true:
				/*둘 다 빈값이 아니면*/
				action.form["STAT_BONUS1"]!==""&&action.form["STAT_BONUS2"]!==""?
					((item["STAT_BONUS1"]===action.form["STAT_BONUS1"])||(item["STAT_BONUS1"]===action.form["STAT_BONUS2"]))&&
					((item["STAT_BONUS2"]===action.form["STAT_BONUS1"])||(item["STAT_BONUS2"]===action.form["STAT_BONUS2"])):
					/*한 필드만 작성돼있으면 */
					(item["STAT_BONUS1"]===action.form["STAT_BONUS1"])||
					(item["STAT_BONUS1"]===action.form["STAT_BONUS2"])||
					(item["STAT_BONUS2"]===action.form["STAT_BONUS1"])||
					(item["STAT_BONUS2"]===action.form["STAT_BONUS2"])
			)
		})
	case 'clear':
		return abilityJsonDefault;
	default:
	}
}

export { abilityJsonDefault, abilityJsonTemplate, abilityJsonMap, abilityJsonReducer }