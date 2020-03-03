import {IRegion, Region} from "../region";
import {RegionManager} from "../region-manager";
import {IView} from "../view-definition";

describe('add view feature', () => {
    describe('Scenario: a view is added to a region', () => {
        it('should add a view to region list', () =>{
           //Arrange
                let regionManager = new RegionManager();
                let region:Region = new Region('region-1',regionManager, undefined);
                let view: IView = <any>{key: 'view-1'}
           //Act
                region.add(view)
           //Assert
                expect(region.views).toContain(view);
        });
        it('should return him self', () => {
            //Arrange
            let regionManager = new RegionManager();
            let region:Region = new Region('region-1',regionManager, undefined);
            let view: IView = <any>{key: 'view-1'};
            //Act + Assert
            expect(region.add(view)).toBe(region);
        });
    });
    describe(`Scenario: duplicated view is added`, () => {
       it(`should raise a 'duplicated view's error`, () => {
           //Arrange
           let regionManager = new RegionManager();
           let region:Region = new Region('region-1',regionManager, undefined);

           //Act
           region.add(<any>{key: 'view-1'}).add(<any>{key: 'view-2'});

           //Assert
           expect(()=>region.add(<any>{key: 'view-1'})).toThrow(`A view with key 'view-1' already exists`);
           expect(()=>region.add(<any>{key: 'view-2'})).toThrow(`A view with key 'view-2' already exists`);
       });
    });
    describe(`Scenario: an invalid view is added`, () => {
        describe('view is nil or empty', () => {
           it(`should raise an error 'view must be defined'`, () =>{
               //Arrange
               let regionManager = new RegionManager();
               let region:Region = new Region('region-1',regionManager, undefined);

               //Act + Assert
               expect(()=>region.add(undefined)).toThrow(`view must be defined`);
               expect(()=>region.add(null)).toThrow(`view must be defined`);
           });
        });
        describe('key view is not defined', () => {
            it(`should raise an error 'view key prop must be a non empty string'`, () => {
                //Arrange
                let regionManager = new RegionManager();
                let region: Region = new Region('region-1', regionManager, undefined);

                //Act + Assert
                expect(() => region.add(<any>{key: undefined})).toThrow(`view key prop must be a non empty string`);
                expect(() => region.add(<any>{key: null})).toThrow(`view key prop must be a non empty string`);
            });
        });
        describe('key view is not a string', () => {
            it(`should raise an error 'view key prop must be a string'`, () => {
                //Arrange
                let regionManager = new RegionManager();
                let region: Region = new Region('region-1', regionManager, undefined);

                //Act + Assert
                expect(() => region.add(<any>{key: 1})).toThrow(`view key prop must be a string`);
                expect(() => region.add(<any>{key: false})).toThrow(`view key prop must be a string`);
                expect(() => region.add(<any>{key: 'someView'})).not.toThrow(`view key prop must be a string`);

            });
        });
    });
});

describe('remove view feature', () => {
    describe('Scenario: a view is removed from a region', ()=> {
        let view1 = <any>{key:'view-1'};
        let view2 = <any>{key:'view-2'};
        it('should remove a view from region list', () =>{
            //Arrange
            let regionManager = new RegionManager();
            let region:Region = new Region('region-1',regionManager, undefined);
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
            let regionManager = new RegionManager();
            let region:Region = new Region('region-1',regionManager, undefined);
            let view: IView = <any>{key: 'view-1'};
            //Act
            region.add(view);
            //Assert
            expect(region.remove(view)).toBe(region);
        });
    });
    describe('Scenario: an invalid view is removed', ()=> {
        describe('view is nil or empty', () => {
            it(`should raise and error 'view must be defined'`, () => {
                //Arrange
                let regionManager = new RegionManager();
                let region:Region = new Region('region-1',regionManager, undefined);

                //Act + Assert
                expect(()=>region.remove(undefined)).toThrow(`view must be defined`);
                expect(()=>region.remove(null)).toThrow(`view must be defined`);
            });
        });
        describe('key view is not defined', () => {
            it(`should raise an error 'view key prop must be a non empty string'`, () => {
                //Arrange
                let regionManager = new RegionManager();
                let region: Region = new Region('region-1', regionManager, undefined);

                //Act + Assert
                expect(() => region.remove(<any>{key: undefined})).toThrow(`view key prop must be a non empty string`);
                expect(() => region.remove(<any>{key: null})).toThrow(`view key prop must be a non empty string`);
            });
        });
        describe('key view is not a string', () => {
            it(`should raise an error 'view key prop must be a string'`, () => {
                //Arrange
                let regionManager = new RegionManager();
                let region: Region = new Region('region-1', regionManager, undefined);

                //Act + Assert
                expect(() => region.remove(<any>{key: 1})).toThrow(`view key prop must be a string`);
                expect(() => region.remove(<any>{key: false})).toThrow(`view key prop must be a string`);
                expect(() => region.remove(<any>{key: 'someView'})).not.toThrow(`view key prop must be a string`);
            });
        });
        describe('a no existing view is tried to remove', () => {
            it(`should raise an error 'view not exist on region'`, () => {
                let regionManager = new RegionManager();
                let region: Region = new Region('region-1', regionManager, undefined);

                //Act + Assert
                expect(() => region.remove(<any>{key: 'someView'})).toThrow(`view not exist on region ${region.key}`);
            });
        });
    });
});

describe('activate view feature', () => {
   describe('Scenario: a view is being activated', () => {
       it('should activate the view informed', () => {
           //Arrange
           let regionManager = new RegionManager();
           let region:Region = new Region('region-1',regionManager, undefined);
           let view = <any>{key: 'view-1', active: false};

           //Act
           region.add(view);
           region.activate('view-1')
           //Assert

           expect(region.isViewActive('view-1')).toEqual(true);

       });
       it('should return himself', () => {
           //Arrange
           let regionManager = new RegionManager();
           let region:Region = new Region('region-1',regionManager, undefined);
           let view = <any>{key: 'view-1', active: false};

           //Act
           region.add(view);
           //Assert

           expect(region.activate('view-1')).toBe(region);
       });
   });
   describe('Scenario: a view is already active', () => {
       it(`should raise an error 'View is already active'`, () => {
           //Arrange
           let regionManager = new RegionManager();
           let region:Region = new Region('region-1',regionManager, undefined);
           let view = <any>{key: 'view-1', active: true};
           //Act
           region.add(view);
           //Assert
           expect(()=>region.activate('view-1')).toThrow(`View ${view.key} is already active`);
       });
   });
});