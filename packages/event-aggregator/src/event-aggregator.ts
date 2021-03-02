/*
 * @license
 * BSD License
 *
 * Copyright (c) 2020, UXLand
 *
 * All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 * 1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
 * 3. All advertising materials mentioning features or use of this software must display the following acknowledgement: This product includes software developed by the <copyright holder>.
 * 4. Neither the name of the <copyright holder> nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY <COPYRIGHT HOLDER> ''AS IS'' AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

let STUB = 1;
/**
 * Subscription interface
 * @memberof EventAggregator
 * @since v1.0.0
 * @interface Subscription
 * @property {function} dispose Subscription disposer
 */
STUB = 1;
export interface Subscription {
  dispose: () => void;
}

/**
 * EventCallback type
 * @memberof EventAggregator
 * @since v1.0.0
 * @typedef {function} EventCallback
 * @param {*=} data Event payload
 * @param {string=} event Event ID
 * @returns {void|never}
 */
STUB = 1;
export type EventCallback = (data: any, event?: string) => void;

class Handler {
  private messageType: any;
  private callback: EventCallback;

  constructor(messageType: any, callback: EventCallback) {
    this.messageType = messageType;
    this.callback = callback;
  }

  handle(message: any): void {
    if (message instanceof this.messageType) {
      this.callback.call(null, message);
    }
  }
}

const invokeCallback = (callback: EventCallback, data: any, event: string): void | never => {
  try {
    callback(data, event);
  } catch (e) {
    console.error(e);
  }
};

const invokeHandler = (handler: Handler, data: any): void | never => {
  try {
    handler.handle(data);
  } catch (e) {
    console.error(e);
  }
};

class EventAggregator {
  eventLookup: Record<string, any[]>;
  messageHandlers: Array<any>;

  constructor() {
    this.eventLookup = {};
    this.messageHandlers = [];
  }

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
      dispose(): void {
        const idx = subscribers.indexOf(handler);
        if (idx !== -1) {
          subscribers.splice(idx, 1);
        }
      },
    };
  }

  subscribeOnce(event: string, callback: EventCallback): Subscription {
    const sub = this.subscribe(event, (a: any, b: any) => {
      sub.dispose();
      return callback(a, b);
    });

    return sub;
  }
}

/**
 * Event Aggregator singleton
 * @memberof EventAggregator
 * @constant
 * @name eventAggregator
 * @since v1.0.0
 */
export const eventAggregator = new EventAggregator();

/**
 * Subscribes to a message channel or message type
 * @memberof EventAggregator
 * @function
 * @name subscribe
 * @since v1.0.0
 * @param {string} event The event channel or event data type
 * @param {EventAggregator.EventCallback} callback The callback to be invoked when when the specified message is published
 * @returns {EventAggregator.Subscription}
 * @throws Event channel/type is invalid
 * @example
 *
 * ```
 * const callback = (payload: any): void => {};
 * subscribe('EVENT-ID', callback);
 * ```
 *
 */
export const subscribe = eventAggregator.subscribe.bind(eventAggregator);

/**
 * Subscribes to a message channel or message type, then disposes the subscription automatically after the first message is received
 * @memberof EventAggregator
 * @function
 * @name subscribeOnce
 * @since v1.0.0
 * @param {string} event The event channel or event data type
 * @param {EventAggregator.EventCallback} callback The callback to be invoked when when the specified message is published
 * @returns {EventAggregator.Subscription}
 * @example
 *
 * ```
 * const callback = (payload: any): void => {};
 * subscribeOnce('EVENT-ID', callback);
 * ```
 *
 */
export const subscribeOnce = eventAggregator.subscribeOnce.bind(eventAggregator);

/**
 * Publishes a message
 * @memberof EventAggregator
 * @function
 * @name publish
 * @since v1.0.0
 * @param {string} event The event or channel to publish to
 * @param {*} data The data to publish on the channel
 * @returns {void|never}
 * @throws Event channel/type is invalid
 * @example
 *
 * const payload = { foo: 'bar' };
 * publish('EVENT-ID', payload);
 *
 */
export const publish = eventAggregator.publish.bind(eventAggregator);
