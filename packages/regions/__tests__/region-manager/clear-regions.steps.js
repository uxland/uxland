import {defineFeature, loadFeature} from "jest-cucumber";
import path from "path";
import {RegionManager} from "../../src/region-manager";

const feature = loadFeature(path.join(__dirname, './clear-regions.feature'));
defineFeature(feature, defineScenario => {
    defineScenario('All the regions be removed from region manager', ({given, when, then}) =>{
        let regionManager, result;
        given('A region manager', () => {
            regionManager = new RegionManager();
            regionManager.regionsMap.set('region1', {key: 'region1'});
            regionManager.regionsMap.set('region2', {key: 'region2'});
            regionManager.regionsMap.set('region2', {key: 'region3'});
        });
        when('remove all the regions', () => {
            result = regionManager.clearAllRegions();
        });
        then('region manager not contain any region', () => {
            expect(result).toBeUndefined();
        });
    });
});
