import datajson from 'json!../../../json/parts.json'

const initialState = (localStorage.part)
? JSON.parse(localStorage.part)
: datajson

const addanItem = (key, state) => {
	return Object.assign([], [...state,
		{
			key: key,
			notes: "a New Part",
			name: "Sample data"
	  }
	])
}

const addLocal=(state) => {
	localStorage.setItem('part', JSON.stringify(state))
	}


const editanItem = (key, state) => {

  var newState = state.map( (item, index) => {
        if(item.key !== key.key) {
    	// console.log('parts ',item)
            // This isn't the item we care about - keep it as-is
            return item;
        }
        // Otherwise, this is the one we want - return an updated value
        else {
    	// console.log(key)
          return  {
          	key:key.key,
          	name:key.name,
          	notes:key.notes
          }
        };
    });
  addLocal(newState)
  return newState;
}

const addPart = (state = initialState, action) => {
		 // console.log('state and action', ...state,action)

	switch(action.type) {
		case 'ADD_PART_SELECTED' :
		return addanItem(action.payload.key,state);
		case 'EDIT_PART_SELECTED' :
		return editanItem(action.payload,state);
		default:
			return state;
	}
  	addLocal(state)
	return state;
}


export default addPart;
