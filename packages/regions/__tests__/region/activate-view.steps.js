import {defineFeature, loadFeature} from "jest-cucumber";
import path from 'path'
import {Region} from "../../src/region";
import {is} from "ramda";
const feature = loadFeature(path.join(__dirname, './activate-view.feature'));
defineFeature(feature, defineScenario => {
    defineScenario('Activate a view', ({given, and, when, then}) => {
        let region, key, result1, result2;
        given('A region', () => {
            region = new Region('region-1');
            region.addView({key: 'view-1', active: false});
            region.addView({key: 'view-2', active: false});
        });
        and('A view key', () => {
            key = 'view-1'
        });
        when('The view is deactivated', () => {
            region.activateView('view-1');
            result1 = region.getView('view-1');
            result2 = region.getView('view-2');
        });
        then('Return the region with this one activate', () => {
            expect(result1.active).toBe(true);
            expect(result2.active).toBe(false);
        });
    });
    defineScenario('Activate a view already active', ({given, and, when, then}) => {
        let region, key, error;
        given('A region', () => {
            region = new Region('region-1');
            region.addView({key: 'view-1', active: true});
            region.addView({key: 'view-2', active: false});
        });
        and('A view key', () => {
            key = 'view-1'
        });
        when('The view is activated', () => {
            try{
                region.activateView('view-1');
            }catch (e) {
                error = e;
            }
        });
        then(`Throw an error 'View already active'`, () => {
            expect(is(Error, error)).toBe(true);
            expect(error.message).toEqual('View already active');

        });
    });
});