/**
 * A higher-level component is given event handler props via `listenFor`, e.g.
 * {...listenFor('mouseUp', 'mouseDown')}. This will cause it to broadcast 
 * the specified events to any subscribing components below it. Subscribing 
 * components should call `GlobalEvents.subscribe/unsubcribe` inside 
 * `componentDidMount/componentWillUnmount` and implement the callback
 * methods following the naming format `onGlobalMouseDown`, `onGlobalKeyUp`, etc.
 */


const subscribers = {}

const broadcastGlobalEvent = function(eventName, callbackName, e) {
	if (!subscribers[eventName]) return
	subscribers[eventName].forEach(s => s[callbackName](e) )
}

// PUBLIC API
// ——————————————————————————————————————
const GlobalEvents = {
	
	subscribe: function(obj, ...eventNames) {
		eventNames.forEach( eventName => {
			if (!subscribers[eventName]) subscribers[eventName] = []
			subscribers[eventName].push(obj)
		})
	},

	unsubscribe: function(obj, ...eventNames) {
		eventNames.forEach( eventName => {
			let eventSubscribers = subscribers[eventName]
			if (!eventSubscribers) return
			eventSubscribers.splice(eventSubscribers.indexOf(obj), 1)
		})
	},
}

export const listenFor = function(...eventNames) {
	let props = {}
	
	eventNames.forEach( eventName => {
		let capitalizedEvent = eventName.slice(0, 1).toUpperCase() + eventName.slice(1),
		    onEvent = `on${capitalizedEvent}`,
		    callback = `onGlobal${capitalizedEvent}`

		props[onEvent] = broadcastGlobalEvent.bind(null, eventName, callback)
	})
	
	return props
}

export default GlobalEvents