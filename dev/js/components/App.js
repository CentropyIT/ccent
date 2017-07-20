import React from 'react'
require('../../scss/style.scss')
import PartList from '../containers/part-list'
import Chapter from '../containers/chapter-list'
import Section from '../containers/section-list'
import Instructions from '../containers/instruction-list'
import Navigation from '../containers/navigation'
import Footer from '../containers/footer'
const App = ()=> (
	<div>
		<Navigation />
		<div className='row'>
			<PartList />
			<div><Chapter /></div>
			<div><Section /></div>
		</div>
		<div className='row'><Instructions /></div>
	</div>
);

export default App;
