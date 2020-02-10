import { nop } from '@uxland/utilities';
import * as R from 'ramda';
import { IRegion, IRegionBehavior } from '../region';
export class AutoPopulateBehavior implements IRegionBehavior {
  constructor(private targetRegion: IRegion) {}
  async attach(): Promise<void> {
    let views = this.targetRegion.regionManager.getRegisteredViews(this.targetRegion.name);
    //@ts-ignore
    return R.pipe(
      R.map<any, Promise<any>>(view => {
        let added = this.targetRegion.addView(view.key, view.view);
        return added;
      }),
      R.bind(Promise.all, Promise),
      (R as any).andThen(nop) //TODO: this should be fixed in a @types/ramda release
    )(views);
  }

  detach(): Promise<void> {
    return Promise.resolve();
  }
}
