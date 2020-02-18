import {defineFeature, loadFeature} from "jest-cucumber";
import path from "path";
import {Region} from './../../src/region'

const feature = loadFeature(path.join(__dirname, './add-view.feature'));
defineFeature(feature, defineScenario => {
    defineScenario('A view is added to a region', ({given, and, when, then}) => {
        let region, view, result;
        given('A region', () => {
            region = new Region('my-region-1');
        });
        and('A view', () => {
            view = { key: 'view-1'}
        });
        when('Added to a region', () => {
            result = region.addView(view)
        });
        then('The region contains de view', () => {
            expect(result).toBeTruthy();
            expect(region.views.has(view.key)).toBe(true);
        });
    });

    defineScenario('A invalid view is added to a region', ({given, and, when, then}) => {
        let region, view, error;
        given('A region', () => {
            region = new Region('my-region-1');
        });
        and('A view not defined', () => {
            view = undefined
        });
        when('Added to a region', () => {
            try{
                region.addView(view)
            }catch (e) {
                error = e
            }
        });
        then(`Should raise an error 'Invalid view object'`, () => {
            expect(error.message).toEqual('Invalid view object');
        });
    });
});

