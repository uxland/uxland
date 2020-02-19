import {defineFeature, loadFeature} from "jest-cucumber";
import path from "path";
import {Region} from "../../src/region";

const feature = loadFeature(path.join(__dirname, './get-active-views.feature'));
defineFeature(feature, defineScenario => {
    defineScenario('Get actives views from a region', ({given, when, then}) => {
        let region, view1, view2, view3, result;
        given('A region', () => {
            region = new Region('region-1');
            view1 = {key: 'view-1', active : true};
            view2 = {key: 'view-2', active : false};
            view3 = {key: 'view-3', active : true};
            region.addView(view1);
            region.addView(view2);
            region.addView(view3);
        });
        when('Want to know all actives views', () => {
            result = region.getActiveViews();
        });
        then('Return them', () => {
            expect(result).toEqual([view1, view3]);
        });
    });

    defineScenario('Know actives views from a region', ({given, and, when, then}) => {
        let region, key, result;
        given('A region', () => {
            region = new Region('region-1');
            region.views.set('view-1', {key: 'view-1', active : false});
            region.views.set('view-2', {key: 'view-2', active : false});
        });
        when('Region have not any active view', () => {
            result = region.getActiveViews();
        });
        then('Return an empty item', () => {
            expect(result).toEqual([]);
        });
    });
});