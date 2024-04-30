const abilitySearchFieldDefault = {
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

const abilitySearchFieldReducer = (state,action)=>{
	switch(action.type) {
	case 'get':
		return state[action.fieldName];
	case 'modify':
		return {
			...state,
			[action.fieldName]:action.value
		}
	case 'clear':
		return abilitySearchFieldDefault;
	default:
	}
}

export { abilitySearchFieldDefault, abilitySearchFieldReducer };