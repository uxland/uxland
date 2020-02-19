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
 * @interface Subscription
 */
export interface Subscription {
  dispose: () => void;
}

/**
 * EventCallback type
 * @typedef {function} EventCallback
 * @param {*=} data Event payload
 * @param {string=} event Event ID
 * @returns {void|never}
 */
type EventCallback = (data: any, event?: string) => void;

/**
 * Event Aggregator handler
 * @class
 * @since v1.0.0
 */
class Handler {
  /**
   * Handler messageType
   * @type {*}
   * @const
   * @private
   * @since v1.0.0
   */
  private messageType: any;

  /**
   * Handler calback
   * @type {EventCallback}
   * @callback
   * @private
   * @since v1.0.0
   */
  private callback: EventCallback;

  /**
   * Handler constructor
   * @constructor
   * @since v1.0.0
   * @param {*} messageType Handler message type
   * @param {EventCallback} callback Handler callback
   * @example
   *
   * `new Handler('click', (ev) => console.log(ev))`
   *
   */
  constructor(messageType: any, callback: EventCallback) {
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
  handle(message: any) {
    if (message instanceof this.messageType) {
      this.callback.call(null, message);
    }
  }
}

/**
 * Invoke Callback and catches if error
 * @function
 * @since v1.0.0
 * @param {EventCallback} callback Callback to be called
 * @param {*} data Callback payload
 * @param {string} event Callback event-related to pass as argument to callback
 * @returns {void|never}
 * @example
 *
 * `TBD`
 *
 */
const invokeCallback = (callback: EventCallback, data: any, event: string): void | never => {
  try {
    callback(data, event);
  } catch (e) {
    console.error(e);
  }
};

/**
 * Invoke Handler and catches if error
 * @function
 * @since v1.0.0
 * @param {Handler} handler Handler to be called
 * @param {*} data Handler payload
 * @returns {void|never}
 * @example
 *
 * `TBD`
 *
 */
const invokeHandler = (handler: Handler, data: any): void | never => {
  try {
    handler.handle(data);
  } catch (e) {
    console.error(e);
  }
};

/**
 * Event Aggregator
 * @class
 * @since v1.0.0
 * @example
 *
 * `TBD`
 *
 */
class EventAggregator {
  /**
   * Event collection
   * @type {Object}
   * @since v1.0.0
   */
  eventLookup: object;

  /**
   * Message Handlers
   * @type {Array}
   * @since v1.0.0
   */
  messageHandlers: Array<any>;

  /**
   * EventAggregator constructor
   * @constructor
   * @constructor
   * @since v1.0.0
   */
  constructor() {
    this.eventLookup = {};
    this.messageHandlers = [];
  }

  /**
   * Publishes a message
   * @function
   * @since v1.0.0
   * @param {string} event The event or channel to publish to
   * @param {*} data The data to publish on the channel
   * @returns {void|never}
   * @throws Event channel/type is invalid
   * @example
   *
   * `TBD`
   *
   */
  publish(event: string, data: any): void | never {
    let subscribers: string | any[];
    let i: number;

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
   * @since v1.0.0
   * @param {string} event The event channel or event data type
   * @param {EventCallback} callback The callback to be invoked when when the specified message is published
   * @returns {Subscription}
   * @throws Event channel/type is invalid
   * @example
   *
   * `TBD`
   *
   */
  subscribe(event: string, callback: EventCallback): Subscription {
    let handler: EventCallback | Handler;
    let subscribers: any[];

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
   * @since v1.0.0
   * @param {string} event The event channel or event data type
   * @param {EventCallback} callback The callback to be invoked when when the specified message is published
   * @returns {Subscription}
   * @example
   *
   * `TBD`
   *
   */
  subscribeOnce(event: string, callback: EventCallback): Subscription {
    let sub = this.subscribe(event, (a: any, b: any) => {
      sub.dispose();
      return callback(a, b);
    });

    return sub;
  }
}

/** @ignore */
export const eventAggregator = new EventAggregator();
/** @ignore */
export const subscribe = eventAggregator.subscribe.bind(eventAggregator);
/** @ignore */
export const subscribeOnce = eventAggregator.subscribeOnce.bind(eventAggregator);
/** @ignore */
export const publish = eventAggregator.publish.bind(eventAggregator);
