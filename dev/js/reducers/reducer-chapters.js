import datajson from 'json!../../../json/chapters.json'

const initialState = localStorage.chapters
  ? JSON.parse(localStorage.chapters)
  : datajson	

const addChapter = (key, state) => {
	// console.log(key)
	return Object.assign([], [...state,
		{
			key: state.length+1,
			name: "Sample data. ",
			notes: "will only save when something is edited.  If you want to keep it, edit it, otherwise, refresh your page now",
			partID: key.chapter.partID
	  }
	])
}

const addLocal=(state) => {
	// console.log(state)
	localStorage.setItem('chapters', JSON.stringify(state))
	return;
	}


const chapterEdit = (action , state) => {
	// console.log('action state',action,state)
	var newState = state.map( (item, index) => {
		// console.log(item.key,index)
        if(item.key !== action.key) {
            // This isn't the item we care about - keep it as-is
            return item;
        }
        // Otherwise, this is the one we want - return an updated value
        else {
     // 	console.log(item,action)
          return  {
          	key:action.key,
          	partID: action.partID,
          	name:action.name,
          	notes:action.notes
          }
        }
    });
    addLocal(newState)
	return newState;
}

const chapter = (state = initialState, action) => {
// console.log('action', state)
	switch (action.type) {

		case 'CHAPTER_SELECTED' :
		return action.payload

		case 'EDIT_CHAPTER_SELECTED' :
		return chapterEdit(action.payload,state)

		case 'ADD_CHAPTER_SELECTED' :
		return addChapter(action.payload,state)

		default:
		return state;
	}
	return state;

}

export default chapter
