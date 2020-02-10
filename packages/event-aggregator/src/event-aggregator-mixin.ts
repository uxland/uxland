import { dedupingMixin, MixinFunction } from '@uxland/utilities';
import { Constructor, LitElement } from 'lit-element';
import { eventAggregator, EventCallback, Subscription } from './event-aggregator';

export interface IEventAggregatorMixin<T = any> extends LitElement {
  new (): IEventAggregatorMixin<T> & T;
}

export interface EventAggregatorMixin extends LitElement {
  subscribe: (event: string, callback: EventCallback) => Subscription;
  subscribeOnce: (event: string, callback: EventCallback) => Subscription;
  publish: (event: string, data?: any) => void;
}

export interface EventAggregatorMixinConstructor extends LitElement {
  new (...args: any[]): EventAggregatorMixin & LitElement;
}

export type EventAggregatorMixinFunction = MixinFunction<EventAggregatorMixinConstructor>;

export const EventAggregatorMixin = dedupingMixin((superClass: Constructor<LitElement>) => {
  class EventAggregatorMixinClass extends superClass implements EventAggregatorMixin {
    private subscriptions: Subscription[] = [];
    subscribe(event: string, callback: EventCallback): Subscription {
      let subscription = eventAggregator.subscribe(event, callback);
      this.subscriptions.push(subscription);
      return subscription;
    }
    subscribeOnce(event: string, callback: EventCallback): Subscription {
      let subscription = eventAggregator.subscribeOnce(event, callback);
      this.subscriptions.push(subscription);
      return subscription;
    }
    publish(event: string, data: any) {
      eventAggregator.publish(event, data);
    }
    disconnectedCallback() {
      super.disconnectedCallback();
      this.subscriptions.forEach(s => s.dispose());
    }
  }
  return EventAggregatorMixinClass as any;
});
