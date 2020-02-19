import {RegionManager} from "../region-manager";

describe(`add region feature`, ()=> {
   describe(`Scenario: a region is added to a region manager`, () => {

       it('should add the region to the region\'\s manager region list', function () {
           //Arrange
           const regionManager = new RegionManager();
           regionManager.add({key: 'initial-region'});
           const region: any = {key: 'region1'};
           //Act
           regionManager.add(region);

           //Assert
           expect(regionManager.regions).toContain(region);

       });
       it(`should return an instance of the self region manager`, () => {
           //Arrange
           const regionManager = new RegionManager();
           regionManager.add({key: 'initial-region'});
           const region: any = {key: 'region1'};
           expect(regionManager.add(region)).toBe(regionManager);
       })
   });
   describe(`Scenario: a duplicated region is added`, () => {
      it(`should raise a 'duplicated region' error`, () => {
          //Arrange
          const regionManager = new RegionManager();
          regionManager.add({key: 'region1'})
              .add({key: 'region2'});
          expect(() => regionManager.add({key: 'region1'})).toThrow(`A region with key 'region1' already exists`);
          expect(() => regionManager.add({key: 'region2'})).toThrow(`A region with key 'region2' already exists`);
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
                expect(() => regionManager.add({key: undefined})).toThrow('region key prop must be a non empty string');
                expect(() => regionManager.add({key: ''})).toThrow('region key prop must be a non empty string');
                expect(() => regionManager.add({key: null})).toThrow('region key prop must be a non empty string');
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
/**
 *
 * import path from 'path';
 import {defineFeature, loadFeature} from 'jest-cucumber';
 import {RegionManager} from "../../src/region-manager";
 import {is} from "ramda";

 const feature = loadFeature(path.join(__dirname, './add-region.feature'));
 defineFeature(feature, defineScenario => {
    defineScenario(`A region is added to a region manager`, ({given, and, then, when}) => {
        let regionManager;
        let region;
        given(`A region manager`, () => {
            regionManager = new RegionManager();
        });
        and(`A region`, () => {
                region = {key:'region1'};
            }
        );
        when('Added to the region manager', () => {
            regionManager.addRegion(region);
        });
        then(`The region manager contains the region`, () => {
            expect(regionManager.regions).toContain(region);
        });
    });
    defineScenario(`A duplicated region is added`, ({given, and, then, when}) => {
        let regionManager;
        let region;
        let error;
        given(`a region manager that contains a some regions`, () => {
            regionManager = new RegionManager();
            regionManager.regionsMap.set('region1', {key: 'region1'});
            regionManager.regionsMap.set('region2', {key: 'region 2'});
        });
        and(`a region with same key that one of the region manager's regions`, () => {
            region = {key: 'region1'};
        });
        when('Adding the region to region manager', () => {
            try {
                regionManager.addRegion(region);
            } catch (e) {
                error = e;
            }
        });
        then(`an error is thrown with message 'RegionManager already contains a region with same key'`, () => {
            expect(is(Error, error)).toBe(true);
            expect(error.message).toEqual('Duplicated region');
        });
    });
    defineScenario('An invalid region is added', ({given, and, then, when}) => {
        let regionManager, error1, error2, error3, invalidRegion1, invalidRegion2, invalidRegion3;
        given('a region manager',()=>{
            regionManager = new RegionManager();
            regionManager.regionsMap.set('region1', {key: 'region1'});
            regionManager.regionsMap.set('region2', {key: 'region 2'});
        });
        and('an invalid region as an object', ()=>{
            invalidRegion1 = {};
        });
        and('an invalid region with key property not defined', ()=>{
            invalidRegion2 = {key:undefined}
        });
        and('an invalid region without key property defined', ()=>{
            invalidRegion3 = {otherKey:'region1'}
        });
        when('adding the region to the region manager', ()=>{
            try{
                regionManager.addRegion(invalidRegion1)
            }
            catch(e){
                error1 = e;
            }
            try{
                regionManager.addRegion(invalidRegion2)
            }
            catch(e){
                error2 = e;
            }
            try{
                regionManager.addRegion(invalidRegion3)
            }
            catch(e){
                error3 = e;
            }
        });
        then(`an error is thrown with message 'Invalid region object'`,()=>{
            expect(is(Error, error1)).toBe(true);
            expect(error1.message).toEqual('Invalid region object');
            expect(is(Error, error2)).toBe(true);
            expect(error2.message).toEqual('Invalid region object');
            expect(is(Error, error3)).toBe(true);
            expect(error3.message).toEqual('Invalid region object');
        });
    });
});

 */