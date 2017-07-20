import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {selectActiveElements} from '../actions';
import InstructionsModal from '../Components/InstructionsModal'
import _ from 'lodash';

class InstructionList extends Component {

	activeInstruction(instruction) {		 // console.log('instrictions',this.props.active)
		return instruction===this.props.active.activeinstruction ? 0 : instruction
	}
	commentary(data) {
		console.log(data.split('//')[0])
		return data
	}
	commandList(data) {
		return _.map(data.commands, (index,key)=> <div
		key={key}>
		{(index.split('//')[0].startsWith('*'))
			? <span style={{color:'#417be6'}}>
					{index.split('//')[0].slice(1,index.split('//')[0].length)}
				</span>
			: <span>{index.split('//')[0]}</span>
		}
		<span style={{color:'#74d497',
		fontFamily:'Courier'}}>{index.split('//')[1]? index.split('//')[1] :''}</span>

	</div>)
	}
	getInstructions (instruction) {
			var instructionSingle = (this.props.active.activeinstruction || this.props.instructions.length===1)
			? "col-lg-12 col-md-12 col-sm-12"
			: "col-lg-4 col-md-6 col-sm-12"
			return _.map(this.props.instructions,
			(instruction,index)=>
				<div
				className={instructionSingle}
				style={{marginBottom:'10px'}}
				key={index}>

					<div className="col-sm-12"
					style={{color:'#333', cursor:'pointer', marginTop: '15px', minHeight:'100px'}}
					onClick={()=>this.props.selectActiveElements(
						{
							activepart: this.props.active.activepart,
							activechapter: this.props.active.activechapter,
							activesection: this.props.active.activesection,
							activeinstruction: this.activeInstruction(instruction.key)
						})
					}>
					<h5
					style={{color:'#333', minHeight:'30px'}}>
						How to: <strong>{instruction.instructions}</strong>
					</h5>
						<h5 style={{minHeight:'40px'}}>purpose: <strong>{instruction.purpose}</strong></h5>
						<h5 style={{minHeight:'40px'}}>expectation: <strong>{instruction.result}</strong></h5>
						<div
						className="col-sm-12"
						style={{
							color:'#f7f3f3',
							backgroundColor: '#222',
							padding: '3px',
							borderRadius: '2px',
							border: '2px solid #223',
							marginBottom: '10px',
							height:'300px',
							overflow: 'auto',
							fontFamily:'Consolas, Lucida, Console, monospace'
						}}>
							{this.commandList(instruction)}
						</div>

					</div>
					{(this.props.active.activeinstruction)
					? <span>single view</span>
					: <InstructionsModal instruction={instruction} showModal={false}/>}
			</div>
		);
	}

	render() {
		 // console.log('props passed to instructions',this.props)
		return (

			<div className='col-md-12'>{this.getInstructions()}</div>

		)
	}


}
function mapStateToProps(state) {
	 // console.log('instruction state', state)
	var instructions = state.active.activeinstruction
	? state.instructions.filter(instruction=> instruction.key===state.active.activeinstruction)
	: state.instructions.filter(instruction=> instruction.sectionID===state.active.activesection)

	return {
		sections: state.sections,
		active:state.active,
		instructions: instructions
	}
}

function mapDispatchToProps(dispatch) {
	let boundActionCreators = bindActionCreators({
		selectActiveElements: selectActiveElements
	},dispatch)

	return boundActionCreators
}

export default connect(mapStateToProps, mapDispatchToProps)(InstructionList)
