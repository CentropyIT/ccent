import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {editChapter} from '../actions';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import Tooltip from 'react-bootstrap/lib/Tooltip';
import Popover from 'react-bootstrap/lib/Popover';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';

class ChapterModal extends Component  {

  constructor(props) {
    super(props)
    this.state ={
      showModal: this.props.show,
      notes: this.props.chapter.notes,
      name:  this.props.chapter.name,
      partID:    this.props.chapter.partID,
      key:    this.props.chapter.key
    }
  }

  close() {
    this.setState({ showModal: false });
     // console.log(this)
  }

  open() {
    this.setState({ showModal: true });
  }

   handleChange(event) {
     this.setState({[event.target.id]: event.target.value});
  }

  render() {
    const modalWindow = (
      <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>
              <input className="form-control" id="name"
              value={this.state.name}
              onChange={this.handleChange.bind(this)} />
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <textarea className="form-control" rows="5" id="notes" 
            value={this.state.notes} onChange={this.handleChange.bind(this)} />
          </Modal.Body>
          <Modal.Footer>
          <div className="col-xs-2">
            <Button bsStyle="danger" onClick={this.close.bind(this)}>Close</Button>
          </div>
          <div className="col-xs-4">
            <Button  bsStyle="success" onClick={()=>this.props.editChapter(this.state)}>Save</Button>
          </div>
          </Modal.Footer>
        </Modal>
        )
    return (

        <Button
          bsStyle="primary"
 
          onClick={this.open.bind(this)}
        >
          Edit {this.state.showModal}
        {modalWindow}

        </Button>

    );
  }
};
function mapStateToProps(state) {
    // console.log('state in partmodal ',state)
  return {
  
  }
}

function matchDispatchToProps (dispatch) {
  let boundActionCreators = bindActionCreators({editChapter:editChapter}, dispatch);
  return boundActionCreators;
}

export default connect(mapStateToProps, matchDispatchToProps)(ChapterModal)
