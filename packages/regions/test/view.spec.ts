import {validateView, View} from "../src/view";

describe("Given a view", () =>{
    describe("with no construction info supplied", ( ) => {
        it('should raise error when validateView is invoked', function () {
            const view: View = {key: 'my-view'};
            expect(() => validateView(view)).toThrowError("Invalid view with key 'my-view': Neither 'element' or 'factory' or 'construct' were supplied");
        });
    });
    describe("with no key supplied", () => {
        it('should raise error when validateView is invoked', function () {
            const view: View = {element: {}, key: undefined};
            expect(() => validateView(view)).toThrowError("Invalid view: Key not supplied");
        });
    });
    describe("with all required info supplied", () => {
        it('should return the view itself when validateView is invoked', () => {
            const views: View[] = [
                {element: {}, key: 'my-view'},
                {factory: () => {}, key: 'my-view'},
                {construct: Object, key: 'my-view'},
                {construct: Object, element: {}, key: 'my-view'},
                {element: {}, factory: () => {}, key: 'my-view'},
                {construct: Object, factory: () => {}, key: 'my-view'},
                {construct: Object, factory: () => {}, element: {}, key: 'my-view'}
            ]
          views.forEach(v => expect(validateView(v)).toBe(v));
        });
    })
})