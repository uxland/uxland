import {
    createRegionViewRegistry,
    RegionViewRegistry,
    VIEW_REGISTERED,
    VIEW_UNREGISTERED, ViewRegisteredPayload
} from "../src/region-view-registry";
import {View} from "../src";
import {subscribe} from "@uxland/event-aggregator";

describe("Given a RegionViewRegistry", () => {
    let sut: RegionViewRegistry;
    beforeEach(() => {
       sut = createRegionViewRegistry();
    });
    describe("When registering a view to a region", () => {
        const regionName = "my-region";
        const view: View = {key: 'my-view', element: {}};
        it('should raise an error if the view is not valid', function () {
            const view: View = {key: undefined};
            expect(() => sut.registerViewWithRegion(regionName, view)).toThrowError();
        });
        it('should register the view with the region name', () => {
           sut.registerViewWithRegion(regionName, view);
           expect(sut.getViews(regionName)).toContain(view);
        });
        it('should raise error if view is already registered with the region', () => {
            sut.registerViewWithRegion(regionName, view);
            const view2: View = {...view};
            expect(() => sut.registerViewWithRegion(regionName, view2)).toThrowError(`View with key '${view2.key}' already registered with region '${regionName}'`);
        });
        it('should return the registry it self', function () {
            expect(sut.registerViewWithRegion(regionName, view)).toBe(sut);
        });
        it('should raise an event with view as payload', () =>{
            const callback = jest.fn();
            subscribe(VIEW_REGISTERED, callback);
            sut.registerViewWithRegion(regionName, view);
            expect(callback).toBeCalledWith({regionName, view}, VIEW_REGISTERED);
        });
    });
    describe("When getting region's view", () => {
        it('should return all the views associated with the region', function () {
            const view1: View = {key: 'view1', element: {}};
            const view2: View = {key: 'view2', element:{}};
            const expected = [view1, view2];
            const regionName = 'region';
            sut.registerViewWithRegion(regionName, view1);
            sut.registerViewWithRegion(regionName, view2);
            expect(sut.getViews(regionName)).toEqual(expected);
        });
        it('should return empty slice if no views associated with the region', function () {
            expect(sut.getViews('my-other-region')).toEqual([]);
        });
    });
    describe("When unregistering view from a region", () => {
        let regionName: string;
        let view: View;
        beforeEach(() => {
            regionName = "my-region";
            view = {key: 'my-view', element: {}};
            sut.registerViewWithRegion(regionName, view);
        });

        it('should remove the view from the registry', () => {
           sut.unregisterViewFromRegion(regionName, view);
           expect(sut.getViews(regionName)).not.toContain(view);
           //It should work also with an string as argument
           sut.registerViewWithRegion(regionName, view);
           sut.unregisterViewFromRegion(regionName, view.key);
           expect(sut.getViews(regionName)).not.toContain(view);
        });
        it('should return the registry itself', () => {
            expect(sut.unregisterViewFromRegion(regionName, view)).toBe(sut);
        });
        it('should publish an event', function () {
            const callback = jest.fn();
            subscribe(VIEW_UNREGISTERED, callback);
            sut.unregisterViewFromRegion(regionName, view);
            expect(callback).toBeCalledWith({regionName, view}, VIEW_UNREGISTERED);
        });
        describe('And the view is not registered with the region name', () => {
            it('should not deregister nothing', function () {
                const view2 = {...view, key: 'another-view'};
                sut.unregisterViewFromRegion(regionName, view2);
                expect(sut.getViews(regionName)).toEqual([view]);
                sut.unregisterViewFromRegion(regionName, view2.key);
                expect(sut.getViews(regionName)).toEqual([view]);
            });
            it('should return itself', () => {
                expect(sut.unregisterViewFromRegion(regionName, 'another-view')).toBe(sut);
            });
            it('should not publish any event', function () {
                const callback = jest.fn();
                subscribe<ViewRegisteredPayload>(VIEW_UNREGISTERED, callback);
                sut.unregisterViewFromRegion(regionName, 'another-view');
                expect(callback).not.toBeCalled();
            });
        });

    });
})