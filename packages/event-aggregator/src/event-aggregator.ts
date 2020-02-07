export type EventCallback = (data?: any, event?: string) => void;
export interface Subscription {
  dispose(): void;
}

class Handler {
  constructor(private readonly messageType: any, private callback: EventCallback) {
    this.messageType = messageType;
    this.callback = callback;
  }

  handle(message) {
    if (message instanceof this.messageType) {
      this.callback.call(null, message);
    }
  }
}
const invokeCallback = (callback: EventCallback, data: any, event: string) => {
  try {
    callback(data, event);
  } catch (e) {
    console.error(e);
  }
};

const invokeHandler = (handler: Handler, data: any) => {
  try {
    handler.handle(data);
  } catch (e) {
    console.error(e);
  }
};
/**
 * Enables loosely coupled publish/subscribe messaging.
 */
class EventAggregator {
  private eventLookup: any;
  private messageHandlers: any[];
  /**
   * Creates an instance of the EventAggregator class.
   */
  constructor() {
    this.eventLookup = {};
    this.messageHandlers = [];
  }

  /**
   * Publishes a message.
   * @param event The event or channel to publish to.
   * @param data The data to publish on the channel.
   */
  publish(event, data) {
    let subscribers;
    let i;

    if (!event) {
      throw new Error("Event was invalid.");
    }

    if (typeof event === "string") {
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
   * Subscribes to a message channel or message type.
   * @param event The event channel or event data type.
   * @param callback The callback to be invoked when when the specified message is published.
   */
  subscribe(event, callback) {
    let handler;
    let subscribers;

    if (!event) {
      throw new Error("Event channel/type was invalid.");
    }

    if (typeof event === "string") {
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
   * Subscribes to a message channel or message type, then disposes the subscription automatically after the first message is received.
   * @param event The event channel or event data type.
   * @param callback The callback to be invoked when when the specified message is published.
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
