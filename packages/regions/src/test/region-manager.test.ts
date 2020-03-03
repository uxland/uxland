import { IRegionManager, RegionManager } from '../region-manager';
import { IRegion } from '../region';

describe(`add region feature`, () => {
    describe(`Scenario: a region is added to a region manager`, () => {
        it("should add the region to the region's manager region list", function() {
            //Arrange
            const regionManager = new RegionManager();
            regionManager.add(<IRegion>{ key: 'initial-region' });
            const region = <IRegion>{ key: 'region1' };
            //Act
            regionManager.add(region);

            //Assert
            expect(regionManager.regions).toContain(region);
        });
        it(`should return an instance of the self region manager`, () => {
            //Arrange
            const regionManager = new RegionManager();
            regionManager.add(<IRegion>{ key: 'initial-region' });
            const region = <IRegion>{ key: 'region1' };
            expect(regionManager.add(region)).toBe(regionManager);
        });
    });
    describe(`Scenario: a duplicated region is added`, () => {
        it(`should raise a 'duplicated region' error`, () => {
            //Arrange
            const regionManager = new RegionManager();
            regionManager.add(<IRegion>{ key: 'region1' }).add(<IRegion>{ key: 'region2' });
            expect(() => regionManager.add(<IRegion>{ key: 'region1' })).toThrow(
                `A region with key 'region1' already exists`,
            );
            expect(() => regionManager.add(<IRegion>{ key: 'region2' })).toThrow(
                `A region with key 'region2' already exists`,
            );
        });
    });
    describe(`Scenario: an invalid region is added`, function() {
        describe('region is nil', () => {
            it(`should throw and 'region must be defined' error`, function() {
                //Arrange
                const regionManager = new RegionManager();

                //Act&Assert
                expect(() => regionManager.add(undefined)).toThrow('region must be defined');
                expect(() => regionManager.add(null)).toThrow('region must be defined');
            });
        });
        describe(`region key is not informed`, () => {
            it(`should throw 'region key prop must be a non empty string'`, () => {
                //Arrange
                const regionManager = new RegionManager();

                //Act&Assert
                expect(() => regionManager.add(<IRegion>{ key: undefined })).toThrow(
                    'region key prop must be a non empty string',
                );
                expect(() => regionManager.add(<IRegion>{ key: '' })).toThrow(
                    'region key prop must be a non empty string',
                );
                expect(() => regionManager.add(<IRegion>{ key: null })).toThrow(
                    'region key prop must be a non empty string',
                );
            });
        });
        describe(`region key is not an string`, () => {
            it(`should throw 'region key prop must be a non empty string'`, function() {
                //Arrange
                const regionManager = new RegionManager();

                //Act&Assert
                expect(() => regionManager.add(<any>{ key: 10 })).toThrow('region key prop must be a non empty string');
                expect(() => regionManager.add(<any>{ key: new Date() })).toThrow(
                    'region key prop must be a non empty string',
                );
                expect(() => regionManager.add(<any>{ key: {} })).toThrow('region key prop must be a non empty string');
                expect(() => regionManager.add(<any>{ key: true })).toThrow(
                    'region key prop must be a non empty string',
                );
            });
        });
    });
});

describe(`remove region feature`, () => {
    describe(`Scenario: a region included in a region manager is removed`, () => {
        describe(`Given a region manager with a region`, () => {
            let regionManager: IRegionManager;
            let region: IRegion;
            beforeEach(function() {
                regionManager = new RegionManager();
                region = <IRegion>{ key: 'my-region' };
                regionManager.add(region);
            });
            describe('when invoking remove on regionManager with a region with same region instance', () => {
                it('should remove the region from the region manager region list', function() {
                    //Act
                    regionManager.remove(region);

                    //Assert
                    expect(regionManager.regions).not.toContain(region);
                });
                it(`should return true`, () => {
                    const actual = regionManager.remove(region);

                    expect(actual).toBe(true);
                });
            });
            describe('when invoking remove on regionManager with a region withe same key ', () => {
                let regionToRemove: IRegion;
                beforeEach(function() {
                    regionToRemove = <IRegion>{ key: 'my-region' };
                });
                it('should remove the region from the region manager region list', function() {
                    //Act
                    regionManager.remove(regionToRemove);

                    //Assert
                    expect(regionManager.regions).not.toContain(regionToRemove);
                });
                it(`should return true`, () => {
                    const actual = regionManager.remove(regionToRemove);

                    expect(actual).toBe(true);
                });
            });
            describe('when invoking remove on regionManager with an string with the region key ', () => {
                const regionToRemoveKey = 'my-region';

                it('should remove the region from the region manager region list', function() {
                    //Act
                    regionManager.remove(regionToRemoveKey);

                    //Assert
                    expect(regionManager.regions).not.toContain(regionToRemoveKey);
                });
                it(`should return true`, () => {
                    const actual = regionManager.remove(regionToRemoveKey);

                    expect(actual).toBe(true);
                });
            });
            describe('When invoking remove on regionManager with a region having a key different the contained', () => {
                it(`should return false and do not remove any region`, () => {
                    //Act
                    const result = regionManager.remove(<IRegion>{ key: 'other region' });

                    //Assert
                    expect(result).toBe(false);
                    expect(regionManager.regions).toContain(region);
                });
            });
            describe('When invoking remove on regionManager with an string that does not match any region in regionManager', () => {
                it(`should return false and do not remove any region`, () => {
                    //Act
                    const result = regionManager.remove('other region');

                    //Assert
                    expect(result).toBe(false);
                    expect(regionManager.regions).toContain(region);
                });
            });
        });
    });
});
