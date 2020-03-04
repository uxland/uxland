import { Region, IRegion } from '../region';
import { RegionManager } from '../region-manager';
import { IView, ViewComponent } from '../view-definition';
import { RegionAdapter } from '../region-adapter';

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
        it('should remove a view from region list', () => {
            //Arrange
            const regionManager = new RegionManager();
            const region: Region = new Region({ regionManager, key: 'region-1', host: undefined, adapter: undefined });
            region.add(view1);
            region.add(view2);
            //Action
            region.remove('view-1');
            //Assert
            expect(region.views).toContain(view2);
            expect(region.views).not.toContain(view1);
        });
        it('should return him self', () => {
            //Arrange
            const regionManager = new RegionManager();
            const region: Region = new Region({ regionManager, key: 'region-1', host: undefined, adapter: undefined });
            const view: IView = <any>{ key: 'view-1' };
            //Act
            region.add(view);
            //Assert
            expect(region.remove(view)).toBe(region);
        });
    });
    describe('Scenario: an invalid view is removed', () => {
        describe('view is nil or empty', () => {
            it(`should raise and error 'view must be defined'`, () => {
                //Arrange
                const regionManager = new RegionManager();
                const region: Region = new Region({
                    regionManager,
                    key: 'region-1',
                    host: undefined,
                    adapter: undefined,
                });

                //Act + Assert
                expect(() => region.remove(undefined)).toThrow(`view must be defined`);
                expect(() => region.remove(null)).toThrow(`view must be defined`);
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
                expect(() => region.remove(<any>{ key: undefined })).toThrow(
                    `view key prop must be a non empty string`,
                );
                expect(() => region.remove(<any>{ key: null })).toThrow(`view key prop must be a non empty string`);
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
                expect(() => region.remove(<any>{ key: 1 })).toThrow(`view key prop must be a string`);
                expect(() => region.remove(<any>{ key: false })).toThrow(`view key prop must be a string`);
                expect(() => region.remove(<any>{ key: 'someView' })).not.toThrow(`view key prop must be a string`);
            });
        });
        describe('a no existing view is tried to remove', () => {
            it(`should raise an error 'view not exist on region'`, () => {
                const regionManager = new RegionManager();
                const region: Region = new Region({
                    regionManager,
                    key: 'region-1',
                    host: undefined,
                    adapter: undefined,
                });

                //Act + Assert
                expect(() => region.remove(<any>{ key: 'someView' })).toThrow(`view not exist on region ${region.options.key}`);
            });
        });
    });
});
