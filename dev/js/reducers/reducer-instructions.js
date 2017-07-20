import datajson from 'json!../../../json/instructions.json'
const initialState = localStorage.instructions
? JSON.parse(localStorage.instructions)
: datajson



const addLocal=(state) => {
	// console.log('adding to local')
	localStorage.setItem('instructions', JSON.stringify(state))
}

const instructionEdit = (action, state ) => {
 	// console.log('action state',action,state)
  var coms = (action.commands)? action.commands.split('\n') : []
	var newState = state.map( (item, index) => {
		// console.log(item.key,index)
        if(item.key !== action.key) {
            // This isn't the item we care about - keep it as-is
            return item;
        }
        // Otherwise, this is the one we want - return an updated value
        else {
     	// console.log(item,action)
          return  {
          	key:action.key,
          	sectionID: action.sectionID,
          	purpose:action.purpose,
            instructions:action.instructions,
          	commands:coms,
          	result: action.result
          }
        }
    });
    addLocal(newState)
	return newState;
}

const instructionAdd=(key, state) => {
	// console.log('running actions', key, state)
	var newState= Object.assign([],[...state, {
				key: state.length+1,
				sectionID: key.sectionID,
				purpose: "what is the goal?",
				instructions: "any other instructions or pre setup requirements?",
				commands: [	">enable",
			"#configure terminal"],
				result: "this bit should contain the outcome of your commands"
		}])
		addLocal(newState);

	return newState;

}

const openInst = (action,state) => {
	console.log(action,state)
	var ret = state.filter((a,b)=> a.key===action.key);
	ret[0].showModal=action.showModal
	console.log(ret[0]);
	return ret
}


const instructions = (state=initialState,action) => {
	switch(action.type) {
		case 'OPEN_INSTRUCTIONS_SELECTED':
			return openInst(action.payload,state);
		case 'ADD_INSTRUCTIONS_SELECTED':
			return instructionAdd(action.payload,state)
		case 'EDIT_INSTRUCTIONS_SELECTED':
			return instructionEdit(action.payload,state)
		default :
			return state;
	}
	return state
}

export default instructions
