import {IRegion} from "./region";


export interface IView {
    key: string;
    region: IRegion;
    active: boolean;
    regionContext: any;
}