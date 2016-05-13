(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
var subscribers = {};

var broadcastGlobalEvent = function broadcastGlobalEvent(eventName, callbackName, e) {
	if (!subscribers[eventName]) return;
	subscribers[eventName].forEach(function (s) {
		return s[callbackName](e);
	});
};

// PUBLIC API
// ——————————————————————————————————————
var GlobalEvents = {

	subscribe: function subscribe(obj) {
		for (var _len = arguments.length, eventNames = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
			eventNames[_key - 1] = arguments[_key];
		}

		eventNames.forEach(function (eventName) {
			if (!subscribers[eventName]) subscribers[eventName] = [];
			subscribers[eventName].push(obj);
		});
	},

	unsubscribe: function unsubscribe(obj) {
		for (var _len2 = arguments.length, eventNames = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
			eventNames[_key2 - 1] = arguments[_key2];
		}

		eventNames.forEach(function (eventName) {
			var eventSubscribers = subscribers[eventName];
			if (!eventSubscribers) return;
			eventSubscribers.splice(eventSubscribers.indexOf(obj), 1);
		});
	}
};

var listenFor = exports.listenFor = function listenFor() {
	var props = {};

	for (var _len3 = arguments.length, eventNames = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
		eventNames[_key3] = arguments[_key3];
	}

	eventNames.forEach(function (eventName) {
		var capitalizedEvent = eventName.slice(0, 1).toUpperCase() + eventName.slice(1),
		    onEvent = "on" + capitalizedEvent,
		    callback = "onGlobal" + capitalizedEvent;

		props[onEvent] = broadcastGlobalEvent.bind(null, eventName, callback);
	});

	return props;
};

exports.default = GlobalEvents;

},{}]},{},[1]);
