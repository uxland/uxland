import {IViewDefinition} from "../../src";
import {Region} from "../../src/region";
import {keys} from "ramda";

describe('Feature: Add a view to a region', () => {
        let region: Region;
        beforeEach(() => {
            region = new Region();
        });
        describe(`Scenario: A new view is added to a empty region`, () => {
            describe(`Given A region with no views`, () => {
                describe('When A view is added to the region', () => {
                    it('Then The region should add the view to its view list', () => {
                        //Arrange
                        const view: IViewDefinition = {key: 'my-key'};

                        //Act
                        region.addView(view);

                        //Assert
                        expect(region.containsView(view)).toBe(true);
                    });
                })
            })
        });
        describe(`Scenario: An existing view is added to a region`,  () => {
            describe(`Given A region with a few views`, () => {
                const view1Key = 'my-view-1';
                const view2Key = 'my-view-2';
                beforeEach(() => {
                    console.log('before each');
                    region
                        .addView({key: view1Key})
                        .addView({key: view2Key});
                });
                describe(`Given A view with same key than a view into the region`, () => {
                    const view1: IViewDefinition = {key: view1Key};
                    const view2: IViewDefinition = {key: view2Key};

                    describe(`When  The view is added to the region`, () => {
                        it(`Then An error is thrown`, () => {
                            expect(() => region.addView(view1)).toThrowError(`Region already contains a view with key '${view1Key}'`);
                             expect(() => region.addView(view2)).toThrowError(`Region already contains a view with key '${view2Key}'`);
                        })
                    })
                })
            })
        });
        describe(`Scenario: A new view is added to a populated region`, () => {
            describe(`Given A region with a few views`, () => {
                const view1Key = 'my-view-1';
                const view2Key = 'my-view-2';
                beforeEach(() => {
                    region
                        .addView({key: view1Key})
                        .addView({key: view2Key});
                });
                describe(`Given A view not contained in region`, ()=> {
                    const view = <IViewDefinition>{key: 'my-view-3'};
                    describe(`When The view is added to region`, ()=> {
                        beforeEach(()=> {
                            region.addView(view);
                        })
                        it(`Then The region should add the view to its view list`, ( ) => {
                            expect(region.containsView(view)).toBe(true);
                        })
                    })
                })
            })
        })

    }
);
// describe('Scenario: A new view is added to a region', () => {
//     let region: Region;
//     beforeEach(() => {
//        region = new Region();
//     });
//     describe('Given a region with no views', () => {
//         describe('Given a new view', () => {
//             describe('When the view is added to the region', () => {
//                 it(`Region should contain the view in its views list`, () => {
//                     //Arrange
//                     const view: IViewDefinition = {key: 'my-key'};
//
//                     //Act
//                     region.addView(view);
//
//                     //Assert
//                     expect(region.containsView(view)).toBe(true);
//                 })
//             });
//         })
//     });
//     describe('Given a region with several views', () =>{
//         describe(`Given a view with same key as one of the region' s view`, () =>{
//             describe(`When the view is added to the region`, () => {
//                 it(`Should throw error`, () => {
//                     //Arrange
//                     region
//                         .addView({key: 'my-view.1'})
//                         .addView({key: 'my-view.2'});
//                     //Act-Assert
//                     expect(() => region.addView({key: 'my-view.1'})).toThrowError(`Region already contains a view with key 'my-view.1'`);
//                     expect(() => region.addView({key: 'my-view.2'})).toThrowError(`Region already contains a view with key 'my-view.2'`);
//                 });
//             });
//         });
//     })
// });
