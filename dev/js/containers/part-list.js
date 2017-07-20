import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import _ from 'lodash';
import Chapter from './chapter-list';
import {selectActiveElements} from '../actions';
import PartModal from '../components/PartModal';

class PartList extends Component {

	activePart(part) { return part===this.props.active.activepart ? 0 : part}


	editContent (data,e) {

		// event.preventDefault(e)
		var date = new Date(e.timeStamp);
		//
		// console.log(date,e.timeStamp);
		// console.log(this,e)
	}

	hoverOnTitle(event) {
		event.target.style['color']='#eee'
		event.target.style['backgroundColor'] = '#5cb85c'
	}

	hoverOffTitle(event) {
		event.target.style['color']='#333'
		event.target.style['backgroundColor'] = '#abc'
	}
// onClick={()=>this.props.editPart(part)} //add to samp below
	getParts(data) {
		  // console.log('part list',this);
		var partChap, partPoint,boxInset,partMain;
		(!this.props.active.activepart)
		? (partChap="110px",
			partMain="col-lg-3 col-md-4 col-sm-6",
			boxInset = "inset 0px 0px 6px 3px rgba(0, 0, 0, 0.2)",
			partPoint="cursor")
		: (partMain="col-lg-4 col-md-4 col-sm-6",
			boxInset = 'none',
			partPoint="default",
			'activesection' in this.props.active)
				? partChap="310px"
				: partChap="auto"




		return _.map(data,(part,index) =>
		<div className={partMain}
		key={index}
			style={{
			color:'#555'
		}}>
		<div className ="col-md-12"

		style={{
			cursor: partPoint,
			backgroundColor: '#abc',
			padding: '10px',
			marginTop: '10px',
			height: partChap,
			overflow:'hidden',
			boxShadow: boxInset,
			borderRadius:'3px',
			color: '#111'

		}}>
			<div
			style={{marginBottom:'5px',cursor:'pointer', padding:'5px', borderRadius: '3px', fontSize: '14px'}}
			onMouseOver ={this.hoverOnTitle.bind(this)}
			onMouseOut ={this.hoverOffTitle.bind(this)}
			onClick={()=>

			this.props.selectActiveElements(
			{activepart: this.props.active.activepart=this.activePart(part.key)}
			)}>
				{part.name}</div>
			<samp>{this.showingPart(part)}</samp>


		</div>
		</div>
		)
	}

	showingPart(data) {

		var notes =data.notes.split('\n').map((item, key) => {
  		return <span key={key}>{item}<br/></span>
		})
		//  console.log(somedata)
		return (!this.props.active.activepart)
		? <PartModal part={data} show={false} />
	: <div>{notes}</div>

	}
	render() {
		return (
			<div>
				{this.getParts(this.props.parts)}

			</div>
		)
	}
}

function mapStateToProps(state) {
	var part =
	state.active.activepart ?
	state.parts.filter((part)=> part.key===state.active.activepart)
	: state.parts

	return {
		parts: part,
		active: state.active
	}
}

function matchDispatchToProps (dispatch) {
	let boundActionCreators = bindActionCreators({
		selectActiveElements: selectActiveElements}, dispatch);
	return boundActionCreators;
}

export default connect(mapStateToProps, matchDispatchToProps)(PartList)
