/*
 * MIT License
 *
 * Copyright (c) 2020 UXLand
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the
 * Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN
 * AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH
 * THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

/**
 * Subscription interface
 * @namespace EventAggregator
 * @interface Subscription
 */
/**
 * Subscription disposer
 * @name Subscription#dispose
 * @function
 * @returns {void|never}
 */

/**
 * EventCallback type
 * @memberof EverntAggregator
 * @typedef {function(data, event)} EventCallback
 * @param {*=} data
 * @param {string=} event
 * @returns {void|never}
 */

/**
 * Event Aggregator handler
 * @class
 * @private
 * @memberof EventAggregator
 * @since v1.0.0
 */
class Handler {
  /**
   * Handler messageType
   * @type {*}
   * @const
   * @private
   * @memberof EventAggregator.Handler
   * @since v1.0.0
   */
  messageType;

  /**
   * Handler calback
   * @type {EventCallback}
   * @callback
   * @private
   * @memberof EventAggregator.Handler
   * @since v1.0.0
   */
  callback;

  /**
   * Handler constructor
   * @constructor
   * @memberof Handler
   * @since v1.0.0
   * @param {*} messageType Handler message type
   * @param {EventCallback} callback Handler callback
   * @example
   *
   * new Handler('click', (ev) => console.log(ev))
   *
   */
  constructor(messageType, callback) {
    this.messageType = messageType;
    this.callback = callback;
  }

  /**
   * Handle event
   * @public
   * @function
   * @since v1.0.0
   * @param {*} message Message
   */
  handle(message) {
    if (message instanceof this.messageType) {
      this.callback.call(null, message);
    }
  }
}

/**
 * Invoke Callback and catches if error
 * @function
 * @memberof EventAggregator
 * @since v1.0.0
 * @param {EventCallback} callback Callback to be called
 * @param {*} data Callback payload
 * @param {string} event Callback event-related to pass as argument to callback
 * @returns {void|never}
 * @example
 *
 * TBD
 *
 */
const invokeCallback = (callback, data, event) => {
  try {
    callback(data, event);
  } catch (e) {
    console.error(e);
  }
};

/**
 * Invoke Handler and catches if error
 * @function
 * @memberof EventAggregator
 * @since v1.0.0
 * @param {EventAggregator.Handler} handler Handler to be called
 * @param {*} data Handler payload
 * @returns {void|never}
 * @example
 *
 * TBD
 *
 */
const invokeHandler = (handler, data) => {
  try {
    handler.handle(data);
  } catch (e) {
    console.error(e);
  }
};

/**
 * Event Aggregator
 * @class
 * @memberof EventAggregator
 * @since v1.0.0
 * @example
 *
 * TBD
 *
 */
class EventAggregator {
  /**
   * Event collection
   * @type {Object}
   * @memberof EventAggregator.EventAggregator
   * @since v1.0.0
   */
  eventLookup;

  /**
   * Message Handlers
   * @type {Array}
   * @memberof EventAggregator.EventAggregator
   * @since v1.0.0
   */
  messageHandlers;

  /**
   * EventAggregator constructor
   * @constructor
   * @constructor
   * @memberof EventAggregator.EventAggregator
   * @since v1.0.0
   */
  constructor() {
    this.eventLookup = {};
    this.messageHandlers = [];
  }

  /**
   * Publishes a message
   * @function
   * @memberof EventAggregator.EventAggregator
   * @since v1.0.0
   * @param {string} event The event or channel to publish to
   * @param {*} data The data to publish on the channel
   * @returns {void|never}
   * @throws Event channel/type is invalid
   * @example
   *
   * TBD
   *
   */
  publish(event, data) {
    let subscribers;
    let i;

    if (!event) {
      throw new Error('Event channel/type is invalid.');
    }

    if (typeof event === 'string') {
      subscribers = this.eventLookup[event];
      if (subscribers) {
        subscribers = subscribers.slice();
        i = subscribers.length;

        while (i--) {
          invokeCallback(subscribers[i], data, event);
        }
      }
    } else {
      subscribers = this.messageHandlers.slice();
      i = subscribers.length;

      while (i--) {
        invokeHandler(subscribers[i], event);
      }
    }
  }

  /**
   * Subscribes to a message channel or message type
   * @function
   * @memberof EventAggregator.EventAggregator
   * @since v1.0.0
   * @param {string} event The event channel or event data type
   * @param {function} callback The callback to be invoked when when the specified message is published
   * @returns {Subscription}
   * @throws Event channel/type is invalid
   * @example
   *
   * TBD
   *
   */
  subscribe(event, callback) {
    let handler;
    let subscribers;

    if (!event) {
      throw new Error('Event channel/type is invalid.');
    }

    if (typeof event === 'string') {
      handler = callback;
      subscribers = this.eventLookup[event] || (this.eventLookup[event] = []);
    } else {
      handler = new Handler(event, callback);
      subscribers = this.messageHandlers;
    }

    subscribers.push(handler);

    return {
      dispose() {
        let idx = subscribers.indexOf(handler);
        if (idx !== -1) {
          subscribers.splice(idx, 1);
        }
      }
    };
  }

  /**
   * Subscribes to a message channel or message type, then disposes the subscription automatically after the first message is received
   * @function
   * @memberof EventAggregator.EventAggregator
   * @since v1.0.0
   * @param {string} event The event channel or event data type
   * @param {function} callback The callback to be invoked when when the specified message is published
   * @returns {Subscription}
   * @example
   *
   * TBD
   *
   */
  subscribeOnce(event, callback) {
    let sub = this.subscribe(event, (a, b) => {
      sub.dispose();
      return callback(a, b);
    });

    return sub;
  }
}

export const eventAggregator = new EventAggregator();

export const subscribe = eventAggregator.subscribe.bind(eventAggregator);
export const subscribeOnce = eventAggregator.subscribeOnce.bind(eventAggregator);
export const publish = eventAggregator.publish.bind(eventAggregator);
