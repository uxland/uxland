import {IRegion} from "./definitions";
import {Region} from "./region";

interface RegionFactory {
    (): IRegion;
}

export default function regionFactory(): IRegion {
    return new Region();
}