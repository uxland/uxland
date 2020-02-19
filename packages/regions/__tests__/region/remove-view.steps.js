import {defineFeature, loadFeature} from "jest-cucumber";
import path from "path";
import {Region} from './../../src/region'
import * as R from 'ramda';

const feature = loadFeature(path.join(__dirname, './remove-view.feature'));
defineFeature(feature, defineScenario =>{
    defineScenario('A view is removed from a Region', ({given, and, when, then}) => {
        let region, view, result;
        given('A region', () => {
            region = new Region('region-1');
            region.views.set('view-1',{key: 'view-1'})
        });
        and('A valid view to remove', () => {
            view = {key: 'view-1'}
        });
        when('Removing the view', () => {
            region.removeView(view);
            result = region.views.has(view.key)
        });
        then('return the region without the region removed', () => {
            expect(result).toBe(false);
        });
    });

    defineScenario('Trying to remove invalid view from region', ({given, and, when, then}) => {
        let region, view1, view2, error1,  error2;
        given('A region', () => {
            region = new Region('region-1');
            region.views.set('view-1',{key: 'view-1'});
            region.views.set('view-2',{key: 'view-2'});
        });
        and('A invalid object view not defined', () => {
            view1 = undefined;
        });
        and('A invalid object view key', () => {
            view2 = { key: undefined }
        });
        when('Removing the view', () => {
            try{
                region.removeView(view1);
            }catch (e) {
                error1 = e
            }
            try{
                region.removeView(view2);
            }catch (e) {
                error2 = e
            }
        });
        then(`Throw an error 'Invalid view object'`, () => {
            expect(R.is(Error, error1)).toBe(true);
            expect(error1.message).toEqual('Invalid view object');
            expect(R.is(Error, error2)).toBe(true);
            expect(error2.message).toEqual('Invalid view object');
        });
    });

    defineScenario('Trying to remove a view from region', ({given, and, when, then}) => {
        let region, view, error;
        given('A region', () => {
            region = new Region('region-1');
            region.views.set('view1',{key: 'view-1'})
            region.views.set('view2',{key: 'view-2'})
        });
        and('A view', () => {
            view = {key: 'view-3'}
        });
        when('View not exist on region', () => {
            try{
                region.removeView(view);
            }catch (e) {
                error = e
            }
        });
        then(`Throw an error 'This view not exists on region'`, () => {
            expect(R.is(Error, error)).toBe(true);
            expect(error.message).toEqual('This view not exists on region');
        });
    });
});