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
                region = {};
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

    defineScenario('An invalid region is added', ({give, and, then, when}) => {

    });
});
