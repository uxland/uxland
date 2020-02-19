import {defineFeature, loadFeature} from "jest-cucumber";
import path from "path";
import {Region} from "../../src/region";

const feature = loadFeature(path.join(__dirname, './is-view-active.feature'));
defineFeature(feature, defineScenario => {
    defineScenario('Know the activity of a view', ({given, and, when, then}) => {
        let region, key1, key2, result1, result2;
        given('A region', () => {
            region = new Region('region-1');
            region.addView({key: 'view-1', active: true});
            region.addView({key: 'view-2', active: false});
        });
        and('A view key', () => {
            key1 = 'view-1';
            key2 = 'view-2';
        });
        when('A view is active or inactive', () => {
            result1 = region.isViewActive(key1);
            result2 = region.isViewActive(key2);
        });
        then('Return the activity of a view', () => {
            expect(result1).toEqual(true);
            expect(result2).toEqual(false);
        })
    });
});