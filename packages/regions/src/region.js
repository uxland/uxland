import * as R from 'ramda'
import {isNullOrEmpty} from "@uxland/functional";
export class Region {
    constructor(name) {
        this.name = name;
        this.views = new Map(); //Todo see if one region can have multiple views
        this.regionScoped = null;
    }
    addView(view){
        if(this.validateView(view))
            this.views.set(view.key, view);
        return this;
    }
    removeView(view){

    }
    getView(key){

    }
    getActiveViews(){

    }
    activateView(view){

    }
    deactivateView(view){

    }
    isViewActive(view){

    }
    containsView(view){

    }
    addRegionManagerToRegion(){
       // this.regionScoped = new RegionManager();
    }
    removeRegionManagerFromRegion(){

    }
    validateView(view){
        R.when(isNullOrEmpty, ()=> this.throwError('Invalid view object'))(view);
        return true;
    }
    throwError(message) {
        throw new Error(message)
    }
}