import path from 'path';
import {defineFeature, loadFeature} from 'jest-cucumber';
import {RegionManager} from "../../src/region-manager";
import {is} from "ramda";

const feature = loadFeature(path.join(__dirname, './add-region.feature'));
defineFeature(feature, defineScenario => {
    defineScenario(`A region is added to a region manager`, ({given, and, then, when}) => {
        let regionManager;
        let region;
        given(`A region manager`, () => {
            regionManager = new RegionManager();
        });
        and(`A region`, () => {
                region = {key:'region1'};
            }
        );
        when('Added to the region manager', () => {
            regionManager.addRegion(region);
        });
        then(`The region manager contains the region`, () => {
            expect(regionManager.regions).toContain(region);
        });
    });
    defineScenario(`A duplicated region is added`, ({given, and, then, when}) => {
        let regionManager;
        let region;
        let error;
        given(`a region manager that contains a some regions`, () => {
            regionManager = new RegionManager();
            regionManager.regionsMap.set('region1', {key: 'region1'});
            regionManager.regionsMap.set('region2', {key: 'region 2'});
        });
        and(`a region with same key that one of the region manager's regions`, () => {
            region = {key: 'region1'};
        });
        when('Adding the region to region manager', () => {
            try {
                regionManager.addRegion(region);
            } catch (e) {
                error = e;
            }
        });
        then(`an error is thrown with message 'RegionManager already contains a region with same key'`, () => {
            expect(is(Error, error)).toBe(true);
            expect(error.message).toEqual('Duplicated region');
        });
    });
    defineScenario('An invalid region is added', ({given, and, then, when}) => {
        let regionManager, error1, error2, error3, invalidRegion1, invalidRegion2, invalidRegion3;
        given('a region manager',()=>{
            regionManager = new RegionManager();
            regionManager.regionsMap.set('region1', {key: 'region1'});
            regionManager.regionsMap.set('region2', {key: 'region 2'});
        });
        and('an invalid region as an object', ()=>{
            invalidRegion1 = {};
        });
        and('an invalid region with key property not defined', ()=>{
            invalidRegion2 = {key:undefined}
        });
        and('an invalid region without key property defined', ()=>{
            invalidRegion3 = {otherKey:'region1'}
        });
        when('adding the region to the region manager', ()=>{
            try{
                regionManager.addRegion(invalidRegion1)
            }
            catch(e){
                error1 = e;
            }
            try{
                regionManager.addRegion(invalidRegion2)
            }
            catch(e){
                error2 = e;
            }
            try{
                regionManager.addRegion(invalidRegion3)
            }
            catch(e){
                error3 = e;
            }
        });
        then(`an error is thrown with message 'Invalid region object'`,()=>{
            expect(is(Error, error1)).toBe(true);
            expect(error1.message).toEqual('Invalid region object');
            expect(is(Error, error2)).toBe(true);
            expect(error2.message).toEqual('Invalid region object');
            expect(is(Error, error3)).toBe(true);
            expect(error3.message).toEqual('Invalid region object');
        });
    });
});
