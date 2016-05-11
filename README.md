# React Global Events
Broadcast `SyntheticEvent`s from any React component to any others which are subscribed to that event.

## Use
The most common implementation is to have a single root component listen for events.
```
// RootComponent.js

import {listenFor} from 'react-global-events'

const Root = () => (
    <div id="app-root" {...listenFor('mouseUp', 'mouseDown')}>
        ...
        <MySubComponent />
    </div>
)
```
Subcomponents may then subscribe to those events in `componentDidMount`. They must then implement callback methods with the naming convention `onGlobal<EventName>`, e.g. `onGlobalMouseDown`

// MySubComponent.js

import GlobalEvents from 'react-global-events'

const MySubComponent = React.createClass({
    
    componentDidMount: function() {
        GlobalEvents.subscribe(this, 'mouseDown', 'mouseUp')
    },

    componentWillUnmount: function() {
        // Don't forget to clean up afterwards!
        GlobalEvents.unsubscribe(this, 'mouseDown', 'mouseUp')
    },

    onGlobalMouseDown: function(e) {

    },

    onGlobalMouseUp: function(e) {

    }

})
```