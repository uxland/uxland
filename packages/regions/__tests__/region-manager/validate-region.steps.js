import {defineFeature, loadFeature} from "jest-cucumber";
import path from "path";
import {RegionManager} from "../../src/region-manager";


const feature = loadFeature(path.join(__dirname, './validate-region.feature'));
defineFeature(feature, defineScenario => {
    defineScenario('A region to validate',({given, and, when, then}) => {
        let regionManager, region, result;
        given('A region manager', () => {
            regionManager = new RegionManager();
        });
        and('A region', () => {
            region = { key : 'region-1'}
        });
        when('Validate the region', () => {
           result = regionManager.validateRegion(region);
        });
        then('Return true if is a valid region', () => {
            expect(result).toBeTruthy();
            expect(result).toBe(true);
        });
    });

    defineScenario('A invalid region for validate',({given, and, when, then}) => {
        let regionManager, region1, region2, error1, error2;
        given('A region manager', () => {
            regionManager = new RegionManager();
        });
        and('A region is not defined', () => {
            region1 = undefined
        });
        and('A region has invalid key property', () => {
            region2 = {key: undefined}
        });
        when('Go to be added o removed from region manager', () => {
            try {
                regionManager.validateRegion(region1)
            }catch (e) {
                error1 = e;
            }
            try {
                regionManager.validateRegion(region2)
            }catch (e) {
                error2 = e;
            }
        });
        then(`Raise an error like 'Invalid region object'`, () => {
            expect(error1.message).toContain('Invalid region object');
            expect(error2.message).toContain('Invalid region object');
        });
    });
});