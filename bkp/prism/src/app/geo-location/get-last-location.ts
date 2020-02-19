import {lastKnownPositionSelector} from "./selectors";
import {store} from "../../store";

export const getLastLocation: (maxAge: number, timeout?: number, highAccuracy?: boolean) => Promise<Position> = (maxAge, timeout, highAccuracy) => {
    let lastKnown = lastKnownPositionSelector(store.getState());
    if(lastKnown)
        return Promise.resolve(lastKnown);
    return new Promise<Position>(resolve => navigator.geolocation.getCurrentPosition(resolve, () => resolve(null),
        {enableHighAccuracy: highAccuracy, timeout: timeout, maximumAge: maxAge}));
};