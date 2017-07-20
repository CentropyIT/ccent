import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import _ from 'lodash';
import Instructions from './instruction-list';
import {selectActiveElements} from '../actions';
import {editSection} from '../actions';
import SectionModal from '../components/SectionModal';


class SectionList extends Component {
	activeSection(section) {
	return section===this.props.active.activesection ? 0 : section
	}

	getSections() {

	var secItems = _.map(this.props.sections, (details,index)=>
		<div
		key={index}
		className="col-md-12 bg-success"
		style={{
			marginTop: '15px',
			color:'#333',
			border: '1px solid #ccc',
			padding: '10px'
		}}>
			<button className='btn btn-success' id='sectionTitle' onClick={()=> this.props.selectActiveElements(
				{activepart: this.props.active.activepart,
					activechapter: this.props.active.activechapter,
					activesection: this.activeSection(details.key)}
				)}>Section : {details.name}</button>
			<SectionModal section={details} show ={false} active={this.props.active}/>
		</div>)
	// console.log(secItems)
	return secItems
	}
	render() {
		//  console.log('active Chapter',this.props.active.activechapter);
		 var chapterRef = this.props.active.activechapter ?
		 <h4>List of Sections {this.props.active.activechapter}</h4> : '';

		return (
			<div className='col-md-8 pull-right'>
			{this.getSections()}
			</div>

		)
	}


}


function mapStateToProps(state) {

	var sections = state.active.activesection
	? state.sections.filter(section=> section.key===state.active.activesection)
	: state.sections.filter(section=> section.chapterID===state.active.activechapter)

	return {
		active: state.active,
		chapter: state.chapter,
		sections: sections
	}
};

function matchDispatchToProps(dispatch) {
	let boundActionCreators = bindActionCreators({
		selectActiveElements:selectActiveElements,
		editSection:editSection
	},dispatch)
	return boundActionCreators;
}

export default connect(mapStateToProps, matchDispatchToProps)(SectionList)
