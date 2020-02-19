import {defineFeature, loadFeature} from "jest-cucumber";
import path from 'path'
import {Region} from "../../src/region";
import {is} from "ramda";

const feature = loadFeature(path.join(__dirname, './deactivate-view.feature'));
defineFeature(feature, defineScenario => {
    defineScenario('Deactivate a view', ({given, and, when, then}) => {
        let region, key, result1, result2;
        given('A region', () => {
            region = new Region('region-1');
            region.addView({key: 'view-1', active: true});
            region.addView({key: 'view-2', active: true});
        });
        and('A view key', () => {
            key = 'view-1'
        });
        when('The view is activated', () => {
            region.deactivateView('view-1');
            result1 = region.getView('view-1');
            result2 = region.getView('view-2');
        });
        then('Return the region with this one deactivate', () => {
            expect(result1.active).toBe(false);
            expect(result2.active).toBe(true);
        });
    });
    defineScenario('Deactivate a view already inactive', ({given, and, when, then}) => {
        let region, key, error;
        given('A region', () => {
            region = new Region('region-1');
            region.addView({key: 'view-1', active: false});
            region.addView({key: 'view-2', active: true});
        });
        and('A view key', () => {
            key = 'view-1'
        });
        when('The view is deactivated', () => {
            try{
                region.deactivateView('view-1');
            }catch (e) {
                error = e;
            }
        });
        then(`Throw an error 'View already inactive'`, () => {
            expect(is(Error, error)).toBe(true);
            expect(error.message).toEqual('View already inactive');

        });
    });
});