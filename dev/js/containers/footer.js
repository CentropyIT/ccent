import React, {Component} from 'react'
import Jumbotron from 'react-bootstrap/lib/Jumbotron'
import Button from 'react-bootstrap/lib/Button'
require('../../scss/style.scss')

class Footer extends Component {
	render() {
		const jumbotronInstance = (
	  <Jumbotron>
	    <p>This is a footer. change this later</p>
	    <p><Button bsStyle="primary">Learn more</Button></p>
	  </Jumbotron>
		);
		return <div className='col-md-12' style={{marginTop:'20px'}}>{jumbotronInstance}</div>
	}
}

export default Footer
