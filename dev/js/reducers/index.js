
import {combineReducers} from 'redux';
import PartReducer from './reducer-parts';
import ChapterReducer from './reducer-chapters';
import SectionReducer from './reducer-sections';
import InstructionReducer from './reducer-instructions';
import ActiveElements from './reducer-active-elements';
const allReducers = combineReducers({
	active: ActiveElements,
	parts: PartReducer,
	chapters : ChapterReducer,
	sections : SectionReducer,
	instructions : InstructionReducer

})
export default allReducers;
