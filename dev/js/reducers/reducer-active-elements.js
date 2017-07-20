const initialState = {
	activepart: null
	}


const active =  (state = initialState, action) => {
	// console.warn('active element state and actions',state,action);
	switch(action.type) {
	 	case 'ELEMENT_SELECTED' :
	 		return action.payload

	 	case 'RESET_SELECTED' :
	 		return {}
	}

	return state;
}

export default active;
