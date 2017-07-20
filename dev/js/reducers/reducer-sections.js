import datajson from 'json!../../../json/sections.json'
const initialState = localStorage.sections
? JSON.parse(localStorage.sections)
: datajson


const sectionAdd = (key, state) => {
	// console.log(key)
	return Object.assign([], [...state,
		{
			key: state.length+1,
			name: "New Section ",
			notes: "will only save when something is edited.  If you want to keep it, edit it, otherwise, refresh your page now",
			chapterID: key.chapterID
	  }
	])

}


const addLocal=(state) => {
	// console.log(state)
	localStorage.setItem('sections', JSON.stringify(state))
	return;
	}

	 const sectionEdit = (action , state) => {
	// console.log('action state',action,state)
	var newState = state.map( (item, index) => {
		// console.log(item.key,index)
        if(item.key !== action.key) {
            // This isn't the item we care about - keep it as-is
            return item;
        }
        // Otherwise, this is the one we want - return an updated value
        else {
     	// console.log('section ',item,action)
          return  {
          	key:action.key,
          	chapterID: action.chapterID,
          	name:action.name,
          	notes:action.notes
          }
        }
    });
    addLocal(newState)
	return newState;
}



	 const section = (state = initialState, action) => {
// console.log('action', state)
	switch (action.type) {
		case 'EDIT_SECTION_SELECTED' :
		return sectionEdit(action.payload,state)

		case 'ADD_SECTION_SELECTED' :
		return sectionAdd(action.payload,state)

		default:
		return state;
	}

	return state;

}


export default section
