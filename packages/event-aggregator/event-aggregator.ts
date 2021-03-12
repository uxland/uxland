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

/**
 * Subscribes to a message channel or message type
 * @memberof EventAggregator
 * @class
 * @since v1.0.0
 * @example
 *
 * ```
 * const EA = new EventAggregator();
 * EA.subscribe('event', () => {...});
 * EA.publish('event');
 * ```
 *
 */

export class EventAggregator {
  eventLookup: Record<string, any[]>;
  messageHandlers: Array<any>;

  constructor() {
    this.eventLookup = {};
    this.messageHandlers = [];
  }

  /**
   * Publishes a message
   * @function
   * @memberof EventAggregator.EventAggregator
   * @name publish
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
  publish(event: string | any, data: any): void | never {
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
   * @memberof EventAggregator.EventAggregator
   * @name subscribe
   * @param {string} event The event channel or event data type
   * @param {EventAggregator.EventCallback} callback The callback to be invoked when when the specified message is published
   * @returns {EventAggregator.Subscription}
   * @throws Event channel/type is invalid
   * @example
   *
   * ```
   * EA.subscribe('EVENT-ID', callback);
   * ```
   *
   */
  subscribe(event: string | any, callback: EventCallback): Subscription {
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

  /**
   * Subscribes to a message channel or message type, then disposes the subscription automatically after the first message is received
   * @function
   * @memberof EventAggregator.EventAggregator
   * @name subscribeOnce
   * @param {string} event The event channel or event data type
   * @param {EventAggregator.EventCallback} callback The callback to be invoked when when the specified message is published
   * @returns {EventAggregator.Subscription}
   * @example
   *
   * ```
   * const callback = (payload: any): void => {};
   * EA.subscribeOnce('EVENT-ID', callback);
   * ```
   *
   */
  subscribeOnce(event: string | any, callback: EventCallback): Subscription {
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
