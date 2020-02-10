import { RoutingMixinConstructor } from '@uxland/routing';
import { dedupingMixin, MixinFunction } from '@uxland/utilities';
import { Routing } from './mixins';

export type PrismShellMixinFunction = MixinFunction<RoutingMixinConstructor>;
export const PrismShellMixin: PrismShellMixinFunction = dedupingMixin(parent => {
  class mixin extends Routing(parent) {
    subroute: string = '/';
  }

  return <any>mixin;
});
