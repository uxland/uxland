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
            //Arrange
            let regionManager = new RegionManager();
            let region:Region = new Region('region-1',regionManager, undefined);

            //Act + Assert
            expect(()=>region.add(undefined)).toThrow(`view key prop must be a non empty string`);
            expect(()=>region.add(null)).toThrow(`view key prop must be a non empty string`);
        });
        describe('key view is not a string', () => {

        });
    });
});