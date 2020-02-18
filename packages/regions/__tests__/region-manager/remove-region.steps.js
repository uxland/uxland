import {defineFeature, loadFeature} from "jest-cucumber";
import path from "path";
import {RegionManager} from "../../src/region-manager";
import { is } from 'ramda'

const feature = loadFeature(path.join(__dirname, './remove-region.feature'));
defineFeature(feature, defineScenario => {
    defineScenario(`A region is removed from region manager`,({given, when, then, and})=>{
        let regionManager, region, result;
        given(`A region manager`, () =>{
            regionManager = new RegionManager();
            regionManager.regionsMap.set('region1', {key: 'region1'});
            regionManager.regionsMap.set('region2', {key: 'region2'});
        });
        and('A region', () => {
            region = {key: 'region1'}
        });
        when('Removed from region manager', () =>{
            regionManager.removeRegion(region);
            result = regionManager.regionsMap.has(region)
        });
        then('The region manager not contains the region', () => {
            expect(result).toBe(false);
            expect(regionManager.regionsMap.has('region2')).toBeTruthy();
        });
    });
    defineScenario('A not defined region is proposal for remove', ({given, then, and,when}) =>{
        let regionManager, region, error;
        given('A region manager that contains some regions', ()=>{
            regionManager = new RegionManager();
            regionManager.regionsMap.set('region1', {key: 'region1'});
            regionManager.regionsMap.set('region2', {key: 'region2'});
        });
        and('A region', () =>{
            region = {key: 'region3'}
        });
        when('Delete a region but is not defined yet', () => {
            try{
                regionManager.removeRegion(region)
            }
            catch(e){
                error = e
            }
        });
        then(`Should be raise an error as 'Region was not defined yet'`, () => {
            expect(is(Error, error)).toBeTruthy();
            expect(error.message).toEqual('Region was not defined yet');
        });
    });
    defineScenario('A invalid region to remove', ({given, then, and,when}) =>{
        let regionManager, region1, region2, error1, error2;
        given('A region manager that contains some regions', ()=>{
            regionManager = new RegionManager();
            regionManager.regionsMap.set('region1', {key: 'region1'});
            regionManager.regionsMap.set('region2', {key: 'region2'});
        });
        and('A region who has an invalid object key', () =>{
            region1 = {key: undefined}
        });
        and('A region who is not defined', () =>{
            region2 = undefined
        });
        when('delete the region', () => {
            try{
                regionManager.removeRegion(region1)
            }
            catch (e) {
                error1 = e
            }
            try{
                regionManager.removeRegion(region2)
            }
            catch (e) {
                error2 = e
            }
        });
        then(`Raise an error as 'Invalid region object'`, () => {
            expect(is(Error, error1)).toBeTruthy();
            expect(error1.message).toEqual('Invalid region object');
            expect(is(Error, error2)).toBeTruthy();
            expect(error2.message).toEqual('Invalid region object');
        });
    });
});