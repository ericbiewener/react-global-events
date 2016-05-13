import React from 'react'
import {render} from 'react-dom'
import GlobalEvents, {listenFor} from '../src/index.js'

const RootComponent = () => (
	<div id="app-root" {...listenFor('mouseUp', 'mouseDown')}>
		<MySubComponent />
	</div>
)

const MySubComponent = React.createClass({
	getInitialState: function() {
		return { text: '' }
	},
    
    componentDidMount: function() {
        GlobalEvents.subscribe(this, 'mouseDown', 'mouseUp')
    },

    componentWillUnmount: function() {
        GlobalEvents.unsubscribe(this, 'mouseDown', 'mouseUp')
    },

    onGlobalMouseDown: function(e) {
    	this.setState({ text: 'Mouse down!' })
    },

    onGlobalMouseUp: function(e) {
    	this.setState({ text: 'Mouse up!' })
    },

    render: function() {
    	return  <div className='event-listener'>
                    <div>
        				<div>I'm listening for events anywhere!</div>
        				<div>{this.state.text}</div>
                    </div>
    			</div>
    }
})

render(
	<RootComponent />,
	document.getElementById('root')
)