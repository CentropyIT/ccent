import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {addPart,addChapter,addSection,addInstructions, resetElements,selectActiveElements} from '../actions';
import _ from 'lodash';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import Navbar from 'react-bootstrap/lib/Navbar';
import FormControl from 'react-bootstrap/lib/Formcontrol';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Fuse from 'fuse.js';


class Navigation extends Component {

	constructor(props) {
		super(props)
	}

	addFromPage () {
		return <NavItem eventKey={1} href="#" onClick={()=>this.props.addPart({
			key: this.props.parts.length+1})}>Add a Part</NavItem>
	}
	addFromChapter () {
		// console.log('this props in chapter nav',this.props)
		return <NavItem eventKey={1} href="#" onClick={()=>this.props.addChapter({
			chapter:{key: this.props.chapter, partID: this.props.active.activepart}})}>Add a Chapter</NavItem>
	}

	addFromSection () {
		// console.log('this props in section nav',this.props)
		return <NavItem eventKey={1} href="#" onClick={()=>this.props.addSection({
			key: this.props.parts.length+1, chapterID: this.props.active.activechapter})}>Add a Section</NavItem>
	}

	addfromInstruction () {
		return <NavItem eventKey={1} href="#" onClick={()=>this.props.addInstructions({
			sectionID: this.props.active.activesection})}>Add Instructions</NavItem>
	}

	addFromCommands () {
		return <NavItem eventKey={1} href="#" onClick={()=>this.props.addPart({
			key: this.props.parts.length+1})}>(todo)</NavItem>
	}

	addWhat (fil) {
		return (
			fil===1 ?  this.addFromChapter() :
			fil===2 ?  this.addFromSection() :
			fil===3 ?  this.addfromInstruction() :
			fil===4 ?  this.addFromCommands() : this.addFromPage()
			)
	}

	menuItems(fil) {
		var some = this.props.selectActiveElements
		var parts,name,which

		fil===1 ? (
			parts = this.props.chapters,
			name = 'List of Chapters',
			which='activechapter',
			some = this.props.selectActiveElements) :
		fil===2 ? (
			parts = this.props.sections,
			name = 'List of Sections', which='activesection') :

		(parts = this.props.parts, name = 'List of Parts', which='activepart')

		const whichone = _.map(parts, part=>
			<MenuItem key={part.key} eventKey={part.key}
			onSelect={
			()=>some({[which]: part.key})}>
				{part.name}
			</MenuItem>)

		const menu = (<NavDropdown
					    eventKey={3}
					    title={name}
					    id="basic-nav-dropdown">
					    {whichone}
							</NavDropdown>)
		return menu
	}

	getSearches(event) {
		var options = {
		  shouldSort: true,
		  threshold: 0.3,
		  location: 0,
		  distance: 50,
		  maxPatternLength: 32,
		  minMatchCharLength: 3,
		  keys: [
		    "name",
		    "notes"
			]
		}
		var optionsI = {
			shouldSort: true,
			threshold: 0.3,
			location: 0,
			distance: 50,
			maxPatternLength: 32,
			minMatchCharLength: 3,
			keys: [
				"purpose",
				"result",
				"instructions"
			]
		}
		// var partsResult = new Fuse(this.props.parts, options); // "list" is the item array
		// var chapterResult = new Fuse(this.props.chapters, options); // "list" is the item array
		// var sectionResult = new Fuse(this.props.sections, options); // "list" is the item array
		// var insResult = new Fuse(this.props.instructions, optionsI); // "list" is the item array
		// var results={};
		// var result = partsResult.search(event.target.value);
		// var resultc = chapterResult.search(event.target.value);
		// var resultse = sectionResult.search(event.target.value);
		// var resultsi = insResult.search(event.target.value);
		//do something with results
		// console.log(result,resultc,resultse, resultsi)
	}

	searchBar() {
		// console.log(this.props);
		return   <Navbar.Form pullRight>
        <FormGroup>
          <FormControl
					componentClass="input"
					ref={(ref) => {this.input = ref}}
					onChange={this.getSearches.bind(this)}
					type="text" placeholder="Search" />
        </FormGroup>
        {' '}
      </Navbar.Form>

	}

	naver() {
		let fil = _.filter (this.props.active, (key,index) => key>0).length;
		return ( <Nav>
      {this.addWhat(fil)}
			{this.menuItems(fil)}

		</Nav> )
	}


	render() {
		return (
			<Navbar inverse collapseOnSelect>
		    <Navbar.Header>
		      <Navbar.Brand>
		        <a href="#" onClick={()=>this.props.resetElements(0)}>Home</a>
		      </Navbar.Brand>-
		      <Navbar.Toggle />
		    </Navbar.Header>
		    <Navbar.Collapse>
		   		{this.naver()}
					{this.searchBar()}
			  </Navbar.Collapse>
		  </Navbar>

		)

	}


}
function mapStateToProps(state) {
  // console.log('the state of navigation ',state,state.chapters.length)
	return {
		parts: state.parts,
		active: state.active,
		chapter: state.chapters.length,
		chapters: state.chapters,
		sections: state.sections,
		instructions:state.instructions
	}

}

function mapDispatchToProps(dispatch) {
	let boundActionCreators = bindActionCreators({
	 	selectActiveElements:selectActiveElements,
	 	resetElements:resetElements,
	 	addPart:addPart,
	 	addChapter:addChapter,
	 	addSection:addSection,
	 	addInstructions: addInstructions
	 },dispatch)

	 return boundActionCreators
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation)
