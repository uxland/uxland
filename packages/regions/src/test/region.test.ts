import { Region, IRegion } from '../region';
import { RegionManager } from '../region-manager';
import { IView, ViewComponent } from '../view-definition';
import { RegionAdapter } from '../region-adapter';
import {is} from "ramda";
import {resolve} from "@uxland/functional-utilities";

describe('add view feature', () => {
    describe('Scenario: a view is added to a region', () => {
        it('should add a view to region list', () => {
            //Arrange
            const regionManager = new RegionManager();
            const region: Region = new Region({ regionManager, key: 'region-1', host: undefined, adapter: undefined });
            const view: IView = <IView>{ key: 'view-1' };
            //Act
            region.add(view);
            //Assert
            expect(region.views).toContain(view);
        });
        it('should return him self', () => {
            //Arrange
            const regionManager = new RegionManager();
            const region: Region = new Region({ regionManager, key: 'region-1', host: undefined, adapter: undefined });
            const view = <IView>{ key: 'view-1' };
            //Act + Assert
            expect(region.add(view)).toBe(region);
        });
    });
    describe(`Scenario: duplicated view is added`, () => {
        it(`should raise a 'duplicated view's error`, () => {
            //Arrange
            const regionManager = new RegionManager();
            const region: Region = new Region({ regionManager, key: 'region-1', host: undefined, adapter: undefined });

            //Act
            region.add(<IView>{ key: 'view-1' }).add(<IView>{ key: 'view-2' });

            //Assert
            expect(() => region.add(<IView>{ key: 'view-1' })).toThrow(`A view with key 'view-1' already exists`);
            expect(() => region.add(<IView>{ key: 'view-2' })).toThrow(`A view with key 'view-2' already exists`);
        });
    });
    describe(`Scenario: an invalid view is added`, () => {
        describe('view is nil or empty', () => {
            it(`should raise an error 'view must be defined'`, () => {
                //Arrange
                const regionManager = new RegionManager();
                const region: Region = new Region({
                    regionManager,
                    key: 'region-1',
                    host: undefined,
                    adapter: undefined,
                });

                //Act + Assert
                expect(() => region.add(undefined)).toThrow(`view must be defined`);
                expect(() => region.add(null)).toThrow(`view must be defined`);
            });
        });
        describe('key view is not defined', () => {
            it(`should raise an error 'view key prop must be a non empty string'`, () => {
                //Arrange
                const regionManager = new RegionManager();
                const region: Region = new Region({
                    regionManager,
                    key: 'region-1',
                    host: undefined,
                    adapter: undefined,
                });

                //Act + Assert
                expect(() => region.add(<IView>{ key: undefined })).toThrow(`view key prop must be a non empty string`);
                expect(() => region.add(<IView>{ key: null })).toThrow(`view key prop must be a non empty string`);
            });
        });
        describe('key view is not a string', () => {
            it(`should raise an error 'view key prop must be a string'`, () => {
                //Arrange
                const regionManager = new RegionManager();
                const region: Region = new Region({
                    regionManager,
                    key: 'region-1',
                    host: undefined,
                    adapter: undefined,
                });

                //Act + Assert
                expect(() => region.add(<any>{ key: 1 })).toThrow(`view key prop must be a string`);
                expect(() => region.add(<any>{ key: false })).toThrow(`view key prop must be a string`);
                expect(() => region.add(<any>{ key: 'someView' })).not.toThrow(`view key prop must be a string`);
            });
        });
    });
});

describe('activate view feature', () => {
    const createdNotify = jest.fn().mockResolvedValue(undefined);
    const activatedNotify = jest.fn().mockResolvedValue(undefined);
    const deactivatedNotify = jest.fn().mockResolvedValue(undefined);
    const regionAdapter: RegionAdapter = {
        componentCreated: createdNotify,
        componentActivated: activatedNotify,
        componentDeactivated:  deactivatedNotify };
    const component: ViewComponent = {};
    const regionKey = 'my-region';
    const viewKey = 'my-view';
    let region: IRegion;
    const viewFactory = jest.fn().mockResolvedValue(component);
    const view: IView = { key: viewKey, viewFactory };
    describe(`Scenario: a view is activated for first time`, () => {
        describe(`Given a region with a view not yet activated`, () => {
            beforeEach(async () => {
                createdNotify.mockReset();
                activatedNotify.mockReset();
                region = new Region({
                    key: regionKey,
                    adapter: regionAdapter,
                    host: undefined,
                    regionManager: new RegionManager(),
                }).add(view);
                await region.activate(viewKey);
            });
            it(`should create a new ViewComponent`, () => {
                expect(viewFactory).toBeCalledTimes(1);
                expect(viewFactory).toBeCalledWith(view);
                //expect()
            });
            it(`Should notify adapter a new component is created`, () => {
                expect(createdNotify).toBeCalledWith(component);
                expect(createdNotify).toBeCalledTimes(1);
            });
            it('should set region properties to component', () => {
                expect(component.region).toBe(region);
                expect(component.view).toBe(view);
                expect(component.viewKey).toBe(viewKey);
            });
            it(`should call componentActivated on adapter and  activate component`, () => {
                expect(component.active).toBe(true);
                expect(activatedNotify).toBeCalledWith(component);
                expect(activatedNotify).toBeCalledTimes(1);
            });
        });
    });
    describe(`Scenario: a view is activated for any other time`, () => {
        let region: IRegion;
        beforeEach(async () => {
            createdNotify.mockReset();
            activatedNotify.mockReset();
            region = new Region({
                key: regionKey,
                adapter: regionAdapter,
                host: undefined,
                regionManager: new RegionManager(),
            }).add(view);
            await region.activate(viewKey);
        });
        describe(`Given a region with a view not yet activated`, () => {
            it(`should activate component and call componentActivated on adapter`, () => {
                expect(component.active).toBe(true);
                expect(activatedNotify).toBeCalledWith(component);
                expect(activatedNotify).toBeCalledTimes(1);
            });
            it(`Should not notify adapter a new component is created twice`, async () => {
                await region.activate(viewKey);
                expect(createdNotify).toBeCalledWith(component);
                expect(createdNotify).toBeCalledTimes(1);
                expect(createdNotify).not.toBeCalledTimes(2);
            });
        });
        describe(`Given a region with a view already activated`,  () => {
            it(`should do nothing and return the region`, async () => {
                //reactivate the same region
                await region.activate(viewKey);
                expect(component.active).toBe(true);
                expect(activatedNotify).toBeCalledWith(component);
                expect(activatedNotify).toBeCalledTimes(1);
                expect(activatedNotify).not.toBeCalledTimes(2);
            });
        });
    });
});

describe('deactivate view feature', () => {
    const component: ViewComponent = { viewKey: 'my-view'};
    const regionKey = 'my-region';
    const viewKey = 'my-view';
    let region: IRegion;
    const viewFactory = jest.fn().mockResolvedValue(component);
    const view: IView = { key: viewKey, viewFactory };
    const createdNotify = jest.fn().mockResolvedValue(undefined);
    const activatedNotify = jest.fn().mockResolvedValue(undefined);
    const deactivatedNotify = jest.fn().mockResolvedValue(undefined);
    const regionAdapter: RegionAdapter = {
        componentCreated: createdNotify,
        componentActivated: activatedNotify,
        componentDeactivated:  deactivatedNotify };
    describe('Scenario: when view is already activate', () => {
        beforeEach( async () => {
            createdNotify.mockReset();
            activatedNotify.mockReset();
            deactivatedNotify.mockReset();
            region = new Region({
                key: regionKey,
                adapter: regionAdapter,
                host: undefined,
                regionManager: new RegionManager(),
            }).add(view);
            await region.activate(view);
        });
        it('should be the component activated yet', async () => {
            const spyActive = jest.spyOn(region, 'isViewActive');
            await region.deactivate(view);
            expect(spyActive).toBeCalledTimes(1);
            expect(spyActive).lastReturnedWith(true);
        });
        it(`Should call componentDeactivated on adapter and deactivate component`, async () => {
            await region.deactivate(view);
            expect(deactivatedNotify).toBeCalledWith(component);
            expect(deactivatedNotify).toBeCalledTimes(1);
            expect(component.active).toBe(false);
        });
    });
    describe(`Scenario: when the view is not activated yet`, () => {
        beforeEach( async () => {
            createdNotify.mockReset();
            activatedNotify.mockReset();
            deactivatedNotify.mockReset();
            region = new Region({
                key: regionKey,
                adapter: regionAdapter,
                host: undefined,
                regionManager: new RegionManager(),
            }).add(view);
        });
        it(`Should call also isActivated method`, async () => {
            const spyActive = jest.spyOn(region, 'isViewActive');
            await region.deactivate(view);
            expect(spyActive).toBeCalledTimes(1);
            expect(spyActive).lastReturnedWith(false);
        });
        it(`Should not call componentDeactivated on adapter`, async () => {
            await region.deactivate(view);
            expect(deactivatedNotify).toBeCalledTimes(0);
            expect(component.active).toBe(false);
        });
        it(`Should do nothing and return the region himself`, async () => {
            await region.deactivate(view);
            expect(deactivatedNotify).not.toBeCalled();
            expect(component.active).toBe(false);
        });
    });
});

describe('remove view feature', () => {
    describe('Scenario: a view is removed from a region', () => {
        const view1 = <IView>{ key: 'view-1' };
        const view2 = <IView>{ key: 'view-2' };
        const regionManager = new RegionManager();
        let region: Region;
        const view: IView = <any>{ key: 'view-1' };
        beforeEach(() => {
            region =  new Region({ regionManager, key: 'region-1', host: undefined, adapter: undefined });
            const view1 = <IView>{ key: 'view-1' };
            const view2 = <IView>{ key: 'view-2' };
            region.add(view1).add(view2);

        });
        it('should remove a view from region list', async () => {
            await region.remove(view);
            expect(region.views).toContainEqual(view2);
            expect(region.views).not.toContain(view1);
        });
        it('should return him self', async () => {
            expect(await region.remove(view)).toBe(region);
        });
        it('should also deactivate view component', async () => {
            const deactivateSpy = jest.spyOn(region, 'deactivate');
            await region.remove(view);
            expect(deactivateSpy).toBeCalled();
            expect(deactivateSpy).toBeCalledTimes(1);
        });
        it(`should eliminate view from regionViews Map`, async () => {
            await region.remove(view);
            expect(region.containsView(view)).toBe(false);
        })
    });

    describe('Scenario: an invalid view is removed', () => {
        describe('view is nil or empty', () => {
            it(`should raise and error 'view must be defined'`, async () => {
                //Arrange
                const regionManager = new RegionManager();
                const region: Region = new Region({
                    regionManager,
                    key: 'region-1',
                    host: undefined,
                    adapter: undefined,
                });

                try{
                    await region.remove(undefined);
                }catch(e){
                    expect(e.message).toEqual(`view must be defined`);
                }
                try{
                    await region.remove(null);
                }catch(e) {
                    expect(e.message).toEqual(`view must be defined`);
                }
            });
        });
        describe('key view is not defined', () => {
            it(`should raise an error 'view key prop must be a non empty string'`, async () => {
                //Arrange
                const regionManager = new RegionManager();
                const region: Region = new Region({
                    regionManager,
                    key: 'region-1',
                    host: undefined,
                    adapter: undefined,
                });
                let error1, error2
                try{
                    await region.remove(<IView>{ key: undefined })
                }catch(e){
                    error1 = e
                }
                try{
                    await region.remove(<IView>{ key: null })
                }catch(e){
                    error2 = e
                }
                expect(is(Error,error1)).toBe(true);
                expect(is(Error,error2)).toBe(true);
                expect(error1.message).toEqual(
                    `view key prop must be a non empty string`);
                expect(error2.message).toEqual(
                    `view key prop must be a non empty string`);           });
        });
        describe('key view is not a string', () => {
            it(`should raise an error 'view key prop must be a string'`, async () => {
                //Arrange
                const regionManager = new RegionManager();
                const region: Region = new Region({
                    regionManager,
                    key: 'region-1',
                    host: undefined,
                    adapter: undefined,
                });

                //Act + Assert
                await region.remove(<any>{ key: 1 }).then().catch(data => expect(data.message).toEqual(`view key prop must be a string`));
                await region.remove(<any>{ key: false }).then().catch(data => expect(data.message).toEqual(`view key prop must be a string`));
                await region.remove(<any>{ key: 'someView' }).then().catch(data=> expect(data.message).not.toEqual(`view key prop must be a string`));
            });
        });
        describe('a no existing view is tried to remove', () => {
            it(`should raise an error 'view not exist on region'`,  async() => {
                const regionManager = new RegionManager();
                const region: Region = new Region({
                    regionManager,
                    key: 'region-1',
                    host: undefined,
                    adapter: undefined,
                });
                let error;
                try{
                    await region.remove(<any>{ key: 'someView' })
                }catch(e){
                    error = e;
                }

                expect(error.message).toEqual(`view not exist on regions ${region.options.key}`);
                expect(is(Error, error)).toBe(true);
            });
        });
    });
});

describe('region contains view feature', () => {
    describe('Scenario: when a view exist in a region', () => {
        it(`should return true`, () => {
            let region = new Region(<any>{key: 'my-region'});
            let view: IView = {key: 'my-view', viewFactory: undefined}
            region.add(view);
            expect(region.containsView(view)).toBe(true);
        });
    });

    describe('Scenario: when a view not exist in a region', () => {
        it(`should return false`, () => {
            let region = new Region(<any>{key: 'my-region'});
            let view: IView = { key: 'my-view', viewFactory: undefined };
            let otherView = { key: 'other', viewFactory: undefined };
            region.add(view);
            expect(region.containsView(otherView)).toBe(false);
        });
    });
});

describe('Is view activated feature', () => {
    let region;
    let component: ViewComponent = {};
    beforeEach(() => {
        const regionAdapter: RegionAdapter = {
            componentCreated: jest.fn().mockResolvedValue(undefined),
            componentActivated: jest.fn().mockResolvedValue(undefined),
            componentDeactivated:  jest.fn().mockResolvedValue(undefined) };
        region = new Region(<any>{key: 'my-region', adapter: regionAdapter});
    });
    describe('Scenario: when a view is already active', () => {
        it('should return true', async () => {
            let view: IView = { key: 'my-view', viewFactory: jest.fn().mockResolvedValue(component) };
            region.add(view);
            await region.activate(view);
            expect(region.isViewActive(view)).toBe(true);
        });
    });

    describe('Scenario: when a view is not active', () => {
        it('should return false', () => {
            let view: IView = { key: 'my-view', viewFactory: jest.fn().mockResolvedValue(component) };
            region.add(view);
            expect(region.isViewActive(view)).toBe(false);
        });
    });
});

describe('clear all from a region', () => {
    describe('when invoking method clear from a region', () => {
        let region: Region;
        beforeEach(() => {
            region = new Region(<any>{key: 'my-region'});
            region.clear();
        });
       it('should reset region views', () => {
           expect(region.views).toMatchObject({});
       });
       it('should reset views actives', () => {
           expect(region.viewsActive).toMatchObject({});
       });
       it('should reset region components', () => {
           expect(region.components).toEqual(new WeakMap<IView, ViewComponent>())
       });
    });
});
