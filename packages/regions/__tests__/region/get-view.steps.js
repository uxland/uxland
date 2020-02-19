import {defineFeature, loadFeature} from "jest-cucumber";
import path from "path";
import {Region} from "../../src/region";
import {is} from "ramda";

const feature = loadFeature(path.join(__dirname, './get-view.feature'));
defineFeature(feature, defineScenario => {
    defineScenario('Get a view from a region', ({given, and, when, then}) => {
        let region, key, result;
        given('A region', () => {
            region = new Region('region-1');
            region.addView({key: 'view-1'});
            region.addView({key: 'view-2'});
        });
        and('A key from view', () => {
            key = 'view-1'
        });
        when('Exists view in the region', () => {
            result = region.getView(key)
        });
        then('Return this view', () => {
            expect(result).toBeTruthy();
        });
    });

    defineScenario('Get a invalid view from a region', ({given, and, when, then}) => {
        let region, key, error;
        given('A region', () => {
            region = new Region('region-1');
            region.views.set('view-1',{key: 'view-1'});
            region.views.set('view-2',{key: 'view-2'});
        });
        and('A key from view', () => {
            key = 'view-3';
        });
        when('Not exists view in the region', () => {
            try{
                region.getView(key);
            }catch (e) {
                error = e;
            }
        });
        then(`Should raise an error 'This view not exists on region'`, () => {
            expect(error.message).toEqual('This view not exists on region')
            expect(is(Error, error)).toBeTruthy();
        });
    });
});