import { IRegion } from "./region";
import { ViewDefinition } from "./view-definition";

export interface IRegionManager {
  addRegion(name: string, region: IRegion): IRegionManager;
  getRegion(name: string): IRegion;
  removeRegion(region: string | IRegion): IRegion;
  addViewToRegion(
    regionName: string,
    key: string,
    view: ViewDefinition
  ): IRegionManager;
  registerViewWithRegion<T extends ViewDefinition = ViewDefinition>(
    regionName: string,
    key: string,
    view: T
  ): IRegionManager;
  getRegisteredViews(
    regionName: string
  ): { key: string; view: ViewDefinition }[];
  clear(): IRegionManager;
  createRegionManager(): RegionManager;
}

export class RegionManager implements IRegionManager {
  addRegion(name: string, region: IRegion<any>): IRegionManager {
    throw new Error("Method not implemented.");
  }
  getRegion(name: string): IRegion<any> {
    throw new Error("Method not implemented.");
  }
  removeRegion(region: string | IRegion<any>): IRegion<any> {
    throw new Error("Method not implemented.");
  }
  addViewToRegion(
    regionName: string,
    key: string,
    view: ViewDefinition<any>
  ): IRegionManager {
    throw new Error("Method not implemented.");
  }
  registerViewWithRegion<T extends ViewDefinition<any> = ViewDefinition<any>>(
    regionName: string,
    key: string,
    view: T
  ): IRegionManager {
    throw new Error("Method not implemented.");
  }
  getRegisteredViews(
    regionName: string
  ): { key: string; view: ViewDefinition<any> }[] {
    throw new Error("Method not implemented.");
  }
  clear(): IRegionManager {
    throw new Error("Method not implemented.");
  }
  createRegionManager(): RegionManager {
    throw new Error("Method not implemented.");
  }
}
