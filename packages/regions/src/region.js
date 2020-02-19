import * as R from 'ramda'
import {isNullOrEmpty} from "@uxland/functional";
import {isNil} from "ramda";
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
        if(this.validateView(view)) {
            if (this.getView(view.key))
                this.views.delete(view.key);
            else this.throwError('This view not exists on region');
        }
        return this;
    }
    getView(key){
        let view = this.views.get(key);
        if(!view)
            this.throwError('This view not exists on region');
        return view;
    }
    getActiveViews(){
        const activeViews = [];
          this.views.forEach(view => {
              if(view.active)
                  activeViews.push(view);
          });
          return activeViews;
    }
    activateView(key){
        let viewToActivate = this.getView(key);
        if(viewToActivate.active)
            this.throwError('View already active');
        this.views.forEach((view) => {
            if(view.key === viewToActivate.key) {
                view.active = true;
            }
        });
        return this;
    }
    deactivateView(key){
        let viewToActivate = this.getView(key);
        if(!viewToActivate.active)
            this.throwError('View already inactive');
        this.views.forEach((view) => {
            if(view.key === viewToActivate.key) {
                view.active = false;
            }
        });
        return this;
    }
    isViewActive(key){
        const view = this.getView(key);
        return view.active;
    }
    containsView(key){
        if(this.getView(key))
            return true;
        else
            return false;
    }
    addRegionManagerToRegion(){
       // this.regionScoped = new RegionManager();
    }
    removeRegionManagerFromRegion(){

    }
    validateView(view){
        R.when(isNullOrEmpty, ()=> this.throwError('Invalid view object'))(view);
        R.when(isNil, ()=> this.throwError('Invalid view object'))(view.key)
        return true;
    }
    throwError(message) {
        throw new Error(message)
    }
}