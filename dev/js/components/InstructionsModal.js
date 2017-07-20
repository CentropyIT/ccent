import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {editInstructions,openInstructions} from '../actions'
import Modal from 'react-bootstrap/lib/Modal'
import Button from 'react-bootstrap/lib/Button'
import Tooltip from 'react-bootstrap/lib/Tooltip'
import Popover from 'react-bootstrap/lib/Popover'
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger'
class InstructionsModal extends Component  {

  constructor(props) {
    super(props)
    // console.log(this.props)
    this.state = {
      showModal: this.props.showModal,
      key: this.props.instruction.key,
      instructions: this.props.instruction.instructions,
      purpose: this.props.instruction.purpose,
      result: this.props.instruction.result,
      sectionID: this.props.instruction.sectionID,
      commands: this.props.instruction.commands

    }
  }

  commandList(data) {
  return typeof(data)=='object' ?
  	 _.map(data, index=> index+'\n').join('')
    : data
  }

  close() {
    this.setState({showModal: false})
  }

  handleChange(event) {

    // console.log(event,event.target,event.target.id)
    this.setState({[event.target['id']]: event.target['value']});
  }

  open() {
    this.setState({showModal: true});
  }


  render() {
    // console.log(this.state)
    const modalWindow = (
      <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>
              <input className="form-control" id="instructions"
                value={this.state.instructions} onChange={this.handleChange.bind(this)} />
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <input className="form-control" id="purpose"
              value={this.state.purpose}
              onChange={this.handleChange.bind(this)} />
          </Modal.Body>
          <Modal.Body>
            <input className="form-control" id="result"
            value={this.state.result} onChange={this.handleChange.bind(this)} />
          </Modal.Body>
          <Modal.Body>
            <span>precede text with // for comments and * for output</span>
            <textarea className="form-control" id="commands" cols="5" rows = "20"
              value={this.commandList(this.state.commands)} onChange={this.handleChange.bind(this)} />

          </Modal.Body>
          <Modal.Footer>
          <div className="col-xs-2">
            <Button bsStyle="danger"
            onClick={this.close.bind(this)}>Close</Button>
          </div>
          <div className="col-xs-4">
            <Button  bsStyle="success" onClick={()=>this.props.editInstructions(this.state)}>Save</Button>
          </div>
          </Modal.Footer>
        </Modal>
        )
    return (

        <Button
          bsStyle="primary"

          onClick={this.open.bind(this)}
        >
          Edit {this.props.showModal}
        {modalWindow}

        </Button>

    );
  }
};
function mapStateToProps(state) {
  return {
    activesection: state.activesection
  }
}

function matchDispatchToProps (dispatch) {
  let boundActionCreators = bindActionCreators({
    editInstructions:editInstructions,
    openInstructions:openInstructions
  }, dispatch);
  return boundActionCreators;
}

export default connect(mapStateToProps, matchDispatchToProps)(InstructionsModal)
