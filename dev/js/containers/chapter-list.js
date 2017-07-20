import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import _ from 'lodash'
import SectionList from './section-list'
import {selectActiveElements} from '../actions';
import ContentEditable from 'react-contenteditable'
import {updateChapter} from '../actions';
import {addChapter} from '../actions';
import ChapterModal from '../components/ChapterModal'
require('../../scss/style.scss')

class ChapterList extends Component {

	constructor(props) {
		super(props)
		// console.log(props)
		this.state = {
			chapter: null

		}
	}


	activeChapter(chapter) {
		return chapter===this.props.active.activechapter ? 0 : chapter
	}

	editChapter(event) {
		event.preventDefault(event)
		// console.log(event.target,[event.target.id],this)
		this.setState({chapter: event.target.value});

	}

	showingChapter(chapter) {
		return (!this.props.active.activechapter) ?
		<div className="btn-group" role="group">
			<ChapterModal chapter={chapter} show={false} />
				<button
				onClick={()=> this.props.selectActiveElements({
				activepart: this.props.active.activepart,
				activechapter: this.activeChapter(chapter.key)}
				)}
				className="btn btn-responsive btn-success"
				id={chapter.name}>{chapter.name}</button>
		</div>

		: <button onClick={()=> this.props.selectActiveElements({
							activepart: this.props.active.activepart,
							activechapter: this.activeChapter(chapter.key
							)}
			)}
			className="btn btn-responsive btn-success"
			id={chapter.name}>{chapter.name}</button>

	}

	getChapters(data) {
		const notes = (chapter) =>chapter.notes.split('\n').map((item, key) => {
  		return <span key={key}>{item}<br/></span>
		})
		var chapterData= _.map(data,(chapter,index)=>
			<div
			className="col-md-8 pull-right"
			style={{color:'#333',marginTop: '15px',}}
			key={index}>
			<div className="col-md-12 bg-info"
			style={{padding: '15px', borderRadius:'2px'}}>

				{this.showingChapter(chapter)}


				<div id="chapter">
				{notes(chapter)}
			</div>
			</div>
			</div>
		)
		return chapterData;
	}

	render() {
		var partRef = this.props.active.activepart ?
		<div className="col-md-12 bg-success">
		<h4>List of Chapters from part {this.props.active.activepart}</h4>
		</div>  : null;
		//{partRef}
		return (
			<div>
				{this.getChapters(this.props.chapters)}
			</div>
		)
	}
}
//
function mapStateToProps(state) {
	// console.log(state.chapters)
	var chapter = state.active.activechapter
	? state.chapters.filter(chapter=> chapter.key===state.active.activechapter)
	: state.chapters.filter(chapter=> chapter.partID===state.active.activepart)
	return {
		chapters: chapter,
		active: state.active
	}
}

function matchDispatchToProps(dispatch) {
	let boundActionCreators = bindActionCreators({selectActiveElements:selectActiveElements,
		updateChapter:updateChapter,
		addChapter:addChapter},dispatch)
	return boundActionCreators;
}

export default connect(mapStateToProps, matchDispatchToProps)(ChapterList)
