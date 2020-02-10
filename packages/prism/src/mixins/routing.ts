import { routingMixin, RoutingMixinFunction, routingSelectors } from '@uxland/routing';
import { Redux } from './redux';

export const Routing: RoutingMixinFunction = routingMixin(Redux, routingSelectors);
