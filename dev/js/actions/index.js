export const selectPart = part => {
	// console.info('clicked part: '+ part.name+' '+part.key)
	return {
		type: 'PART_SELECTED',
		payload: part
	}
}

export const selectChapter = chapter => {
	 // console.info('clicked chapter: '+ chapter);
	return {
		type: 'CHAPTER_SELECTED',
		payload: 'CHAPTER_SELECTED'
	}
}

export const selectSection = section => {
	// console.info('clicked section: '+ section.name+' '+section.key)
	return {
		type: 'SECTION_SELECTED',
		payload: section.key
	}
}

export const selectActiveElements = elements => {
	 // console.info(elements,'clicked elements')
	return {
		type: 'ELEMENT_SELECTED',
		payload: elements
	}
}

export const resetElements = reset => {
	  // console.info('clicked reset')
	return {
		type: 'RESET_SELECTED',
		payload: reset
	}
}


export const editPart = edit => {
	  // console.info('clicked to edit part: '+edit.key)
	return {
		type: 'EDIT_PART_SELECTED',
		payload: edit
	}
}

export const editChapter = edit => {
	  // console.info('clicked to edit chapter: '+edit.key)
	return {
		type: 'EDIT_CHAPTER_SELECTED',
		payload: edit
	}
}

export const updateChapter = edit => {
	  // console.info('clicked to edit chapter: '+edit.key)
	return {
		type: 'EDIT_CHAPTER_SELECTED',
		payload: edit
	}
}

export const editSection = section => {
	// console.info(section+'clicked to edit section: ')
	return {
		type: 'EDIT_SECTION_SELECTED',
		payload: section
	}
}

export const editInstructions = instruction => {
	// console.info(instruction+'clicked to edit instruction: ')
	return {
		type: 'EDIT_INSTRUCTIONS_SELECTED',
		payload: instruction
	}
}

export const addPart = part => {
	  // console.info('clicked to add part: '+part.key)
	return {
		type: 'ADD_PART_SELECTED',
		payload: part
	}
}

export const addChapter = chapter => {
	  // console.info(chapter,'clicked to add chapter: '+chapter)
	return {
		type: 'ADD_CHAPTER_SELECTED',
		payload: chapter
	}
}

export const addSection = section => {
	  // console.info(section,'clicked to add chapter: '+section.key)
	return {
		type: 'ADD_SECTION_SELECTED',
		payload: section
	}
}

export const addInstructions = instruction => {
	  console.info(instruction,'clicked to add Instructions: ')
	return {
		type: 'ADD_INSTRUCTIONS_SELECTED',
		payload: instruction
	}
}

export const openInstructions = openinstruction => {
	  console.info(openinstruction,'clicked to open Instructions: ')
	return {
		type: 'OPEN_INSTRUCTIONS_SELECTED',
		payload: openinstruction
	}
}
