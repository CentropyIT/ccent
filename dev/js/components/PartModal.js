import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {editPart} from '../actions';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import Tooltip from 'react-bootstrap/lib/Tooltip';
import Popover from 'react-bootstrap/lib/Popover';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';

class PartModal extends Component  {

  constructor(props) {
    super(props)
    this.state ={
      showModal: this.props.show,
      notes: this.props.part.notes,
      name:  this.props.part.name,
      key:   this.props.part.key
    }
  }

  close() {
    this.setState({ showModal: false });
    //  console.log(this)
  }

  open() {
    this.setState({ showModal: true });
  }

   handleChange(event) {
     this.setState({[event.target.id]: event.target.value});
  }

  openhint (event) {
    event.target.id,event.target.style['background-color']="#5cb85c";
  }
  closehint (event) {
    event.target.id,event.target.style['background-color']="#36424e";
  }
  render() {
    const modalWindow =(
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
            <Button  bsStyle="success" onClick={()=>this.props.editPart(this.state)}>Save</Button>
          </div>

          </Modal.Footer>
        </Modal>
        )

    return (
      <div style={{
      cursor:'pointer',
      backgroundColor: '#36424e',
      color: "#ffe",
      overflow:'auto',
      padding: '10px',
      borderRadius: '2px'
      }}
      id="chapNotes"
      onMouseOver ={this.openhint.bind(this)}
      onMouseOut={this.closehint.bind(this)}
      onClick={this.open.bind(this)}>
          {this.state.notes} {this.state.showModal}
        {modalWindow}
        </div>
    );
  }
};
//
function mapStateToProps(state) {
   // console.log('state in partmodal ',state)
  return {

  }
}

function matchDispatchToProps (dispatch) {
  let boundActionCreators = bindActionCreators({editPart:editPart}, dispatch);
  return boundActionCreators;
}

export default connect(mapStateToProps, matchDispatchToProps)(PartModal)
