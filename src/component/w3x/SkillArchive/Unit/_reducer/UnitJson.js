import UnitParams from 'json/w3x/SkillArchive/UnitParams.json';

const unitJsonDefault = UnitParams["params"];
const unitJsonTemplate = {
	"ICON_PATH":"ReplaceableTextures/CommandButtons/btncancel.png",
	"ID":"???",
	"NAME":"Missing No.",
	"TOOLTIP":"<b><span style=\"color:#ff0000;\">Tooltip Missing</span></b>"
}
const unitJsonMap = Object.fromEntries(
	unitJsonDefault.map((json,index)=>{
		return [json["ID"],String(index)]
	})
)

console.log(unitJsonMap);
const unitJsonReducer = (state,action)=>{
	switch(action.type){
	case 'query':
		return action.target.filter(item =>
			/*유닛이름*/ 
			( action.form["NAME"]===""?true:
				item["NAME"].includes(action.form["NAME"]) 
			) 
		)
	case 'clear':
		return unitJsonDefault;
	default:
	}
}

export { unitJsonDefault, unitJsonTemplate, unitJsonReducer, unitJsonMap }