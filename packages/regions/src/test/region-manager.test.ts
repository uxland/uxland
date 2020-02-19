import {RegionManager} from "../region-manager";

describe(`add region feature`, ()=> {
   describe(`Scenario: a region is added to a region manager`, () => {
       it('should add the region to the region\'\s manager region list', function () {
           //Arrange
           const regionManager = new RegionManager();
           regionManager.add(<any>{key: 'initial-region'});
           const region: any = {key: 'region1'};
           //Act
           regionManager.add(region);

           //Assert
           expect(regionManager.regions).toContain(region);

       });
       it(`should return an instance of the self region manager`, () => {
           //Arrange
           const regionManager = new RegionManager();
           regionManager.add(<any>{key: 'initial-region'});
           const region: any = {key: 'region1'};
           expect(regionManager.add(region)).toBe(regionManager);
       })
   });
   describe(`Scenario: a duplicated region is added`, () => {
      it(`should raise a 'duplicated region' error`, () => {
          //Arrange
          const regionManager = new RegionManager();
          regionManager.add(<any>{key: 'region1'})
              .add(<any>{key: 'region2'});
          expect(() => regionManager.add(<any>{key: 'region1'})).toThrow(`A region with key 'region1' already exists`);
          expect(() => regionManager.add(<any>{key: 'region2'})).toThrow(`A region with key 'region2' already exists`);
      })
   });
   describe(`Scenario: an invalid region is added`, function () {
        describe('region is nil', () => {
            it(`should throw and 'region must be defined' error`, function () {
                //Arrange
                const regionManager = new RegionManager();

                //Act&Assert
                expect(() => regionManager.add(undefined)).toThrow('region must be defined');
                expect(() => regionManager.add(null)).toThrow('region must be defined');

            })
        });
        describe(`region key is not informed`, () => {
            it(`should throw 'region key prop must be a non empty string'`, () => {
                //Arrange
                const regionManager = new RegionManager();

                //Act&Assert
                expect(() => regionManager.add(<any>{key: undefined})).toThrow('region key prop must be a non empty string');
                expect(() => regionManager.add(<any>{key: ''})).toThrow('region key prop must be a non empty string');
                expect(() => regionManager.add(<any>{key: null})).toThrow('region key prop must be a non empty string');
            })
        });
        describe(`region key is not an string`, () => {
            it(`should throw 'region key prop must be a non empty string'`, function () {
                //Arrange
                const regionManager = new RegionManager();

                //Act&Assert
                expect(() => regionManager.add(<any>{key: 10})).toThrow('region key prop must be a non empty string');
                expect(() => regionManager.add(<any>{key: new Date()})).toThrow('region key prop must be a non empty string');
                expect(() => regionManager.add(<any>{key: {}})).toThrow('region key prop must be a non empty string');
                expect(() => regionManager.add(<any>{key: true})).toThrow('region key prop must be a non empty string');

            });
        });
   })
});

describe(`remove region feature`, () => {

});