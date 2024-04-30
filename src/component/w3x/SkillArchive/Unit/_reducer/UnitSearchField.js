const unitSearchFieldDefault = {
	FAVORITE : false,
	NAME : ""
}

const unitSearchFieldReducer = (state,action)=>{
	switch(action.type) {
	case 'get':
		return state[action.fieldName];
	case 'modify':
		return {
			...state,
			[action.fieldName]:action.value
		}
	case 'clear':
		return unitSearchFieldDefault;
	default:
	}
}

export { unitSearchFieldDefault, unitSearchFieldReducer };