import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {editSection} from '../actions';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import Tooltip from 'react-bootstrap/lib/Tooltip';
import Popover from 'react-bootstrap/lib/Popover';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';

class SectionModal extends Component  {

  constructor(props) {
    super(props)
      // console.log('constructor in sectionmodal',this.props)
    this.state ={
      showModal: this.props.show,
      notes: this.props.section.notes,
      name:  this.props.section.name,
      chapterID:this.props.section.chapterID,
      key:    this.props.section.key
    }
  }

  close() {
    if(this.props.section.notes!==this.state.notes) {
      var conf = confirm('are you sure') | 'nothing';
    // console.log(conf)
      (!conf)
      ? 'nothing'
      : (
        this.setState({ showModal: false }),
        this.setState({notes: this.props.section.notes})
        )
    } else {
      this.setState({ showModal: false });
    }

    return;
     // console.log(this)
  }


  open() {
    this.setState({ showModal: true });
  }

   handleChange(event) {
    // console.log(event.target,event.target.id, event.target.value);
     this.setState({[event.target.id]: event.target.value});
  }

  render() {
    // console.log('props in render of sectionmodal',this.props)
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
            <span>precede highlighted notes with Note: and important ones with Important:</span>
            <textarea className="form-control" rows="20" id="notes"
            value={this.state.notes} onChange={this.handleChange.bind(this)} />
          </Modal.Body>
          <Modal.Footer>
          <div className="col-xs-2">
            <Button bsStyle="danger" onClick={this.close.bind(this)}>Close</Button>
          </div>
          <div className="col-xs-4">
            <Button  bsStyle="success" onClick={()=>this.props.editSection(this.state)}>Save</Button>
          </div>
          </Modal.Footer>
        </Modal>
    )
    const notes = (secNotes) =>secNotes.split('\n').map((item, key) => {
      return item.split(/(Note:|Important:)+g/).map((spec,keya)=> {
        //  console.log('splits',spec,'key ',keya);
        return (spec.startsWith('Note:')) ? <span
        style={{
          color:'#FF5722',
          padding:'3px',
          marginTop:'10px'

        }}><strong>{spec.slice(5,spec.length)}</strong><br/></span>
      : (spec.startsWith('Important:')) ? <span
        style={{
          color:'red',
          padding:'3px',
          marginTop:'10px'

        }}><strong>{spec.slice(10,spec.length)}</strong><br/></span>
      : <span>{spec}<br/></span>
      })
      // console.log(specWords);
      //  return <span key={key}>{item}<br/></span>
  })
  return (!this.props.active.activesection) ?
  (
    <div
    id ="notes"
    style={{backgroundColor:'white',cursor:'pointer', padding:'5px',marginTop:'10px'}}
    onClick={this.open.bind(this)}>
      {this.state.showModal}
      {modalWindow}
      <div>
        {notes(this.props.section.notes)}
      </div>
    </div>
  )
  :
  (
    <div
    id ="notes"
    style={{padding:'5px',marginTop:'10px'}}>
      {this.state.showModal}
      {modalWindow}
      <div>
        {notes(this.props.section.notes)}
      </div>
    </div>
  )
  }
};
function mapStateToProps(state) {
    // console.log('state in sectionmodal ',state)
  return {

  }
}

function matchDispatchToProps (dispatch) {
  let boundActionCreators = bindActionCreators({editSection:editSection}, dispatch);
  return boundActionCreators;
}

export default connect(mapStateToProps, matchDispatchToProps)(SectionModal)
