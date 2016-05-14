# React Global Events
Broadcast [`SyntheticEvents`](https://facebook.github.io/react/docs/events.html) from any React component to any others which are subscribed to that event.

## Installation
`npm install --save react-global-events`

## Usage
The most common implementation is to have a single root component listen for events.
```js
// RootComponent.js

import {listenFor} from 'react-global-events'

const Root = () => (
    <div id="app-root" {...listenFor('mouseUp', 'mouseDown')}>
        ...
        <MySubComponent />
    </div>
)
```

Subcomponents may then subscribe to those events in `componentDidMount`. They must then implement callback methods with the naming convention `onGlobal<ReactEventName>`. Note that the `<ReactEventName>` follows the camel-casing convetions of event names in React, not standard JS: `onGlobalMouseDown` rather than `onGlobalMousedown`.
```js
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
        // Handle global mousedown events here
    },

    onGlobalMouseUp: function(e) {
        // Handle global mouseup events here
    }

})
```

You can have multiple components `listenFor` events, but they can't choose which subscribers to broadcast to. The events are still broadcast globally.
