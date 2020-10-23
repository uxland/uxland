import {RegionManager, createRegionManager} from "../src/region-manager";
import {Region, View} from "../src";

describe("Given a region manager", ()=> {
   let sut: RegionManager;
   beforeEach(() => {
      sut = createRegionManager();
   });

   describe("When a region is added", () => {
       let region: Region;
       beforeEach(() =>{
           region = {options:{name: 'region'}, addView: jest.fn};
       });
      it(`should add the region to the regions list`, () =>{
          sut.add(region);
          expect(sut.regions).toContain(region);
      } );
       it('should be possible to retrieve it', function () {
           sut.add(region);
           expect(sut.getRegion(region.options.name)).toBe(region);
       });
       it('should return the region manager itself', function () {
           expect(sut.add(region)).toBe(sut);
       });
   });

   describe("When getting a region", () => {
       it('should return undefined if no region with required name exists', function () {
           let region1: Region = {options: {name: 'my-region'}, addView: undefined};
           sut.add(region1);
           expect(sut.getRegion('my-other-region')).toBeUndefined();
       });
   });
   describe("When creating a region manager", ()=> {
       it('should return a new region manager instance', function () {
           const rm1 = sut.createRegionManager();
           const rm2 = sut.createRegionManager();
           expect(rm1).not.toBe(rm2);
           expect(rm1).not.toBe(sut);
       });
   });
   describe("and given a region in the region manager", () => {
       let region: Region;
       beforeEach(() => {
          region = {options:{name: 'my-region'}, addView: jest.fn()};
          sut.add(region);
       });
       describe("When adding a view to the region", () => {
           const view: View = {element: {}, key: 'my-view'};
           it('should add the view to target region', function () {
               sut.addToRegion(region.options.name, view);
               expect(region.addView).toBeCalledWith(view);
           });
           it('should raise error if region does not exist', function () {
               const otherRegion = 'my-other-region';
               expect(() => sut.addToRegion(otherRegion, view)).toThrowError(`Region '${otherRegion}' not found`);
           });
           it('should return the region manager itself', function () {
               expect(sut.addToRegion(region.options.name, view)).toBe(sut);
           });
       });
   })
});