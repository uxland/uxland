import "./components/region-app";
import {regionAdapterRegistry} from "../../src";
import {factory} from "../../src/adapters/single-active-adapter";
import {RegionApp} from "./components/region-app";

regionAdapterRegistry.registerAdapterFactory('div', factory);
describe('When having a single active region', () => {
    let app: RegionApp;
    beforeEach(() =>{
        app = <any>document.createElement('region-app');

        // Connect to DOM in case there's any `connectedCallback` logic
        document.body.appendChild(app);
    });
    afterEach(() =>{
        app.remove();
    });
    it('views should not be added to DOM until they are activated', async () => {
        await app.updateComplete;
        await app.region.addView('view1', {htmlTag: 'test-view1'});
        await app.region.addView('view2', {htmlTag: 'test-view2'});
        await app.region.addView('view3', {htmlTag: 'test-view3'});
        await app.updateComplete;
        expect(app.region.host.childElementCount).toBe(0);
        await app.region.activate('view1');
        await app.updateComplete;
        expect(app.region.host.children[0].localName).toBe('test-view1');
        await app.region.activate('view3');
        await app.updateComplete;
        expect(app.region.host.childElementCount).toBe(2);
        expect(app.region.host.children[1].localName).toBe('test-view3');
        await app.region.activate('view2');
        await app.updateComplete;
        expect(app.region.host.childElementCount).toBe(3);
        expect(app.region.host.children[2].localName).toBe('test-view2');
    });
    it('should hide non active views', async () => {
        /*let f: HTMLDivElement = fixture('test-fixture');
        f.appendChild(document.createElement('region-app'));
        let app: RegionApp = <any>f.querySelector('region-app');
        await app.updateComplete;
        await app.region.addView('view1', {htmlTag: 'test-view1'});
        await app.region.addView( 'view2', {htmlTag: 'test-view2'});
        await app.region.addView( 'view3', {htmlTag: 'test-view3'});
        await app.updateComplete;
        await app.region.activate('view1');
        await app.updateComplete;
        await app.region.activate('view2');
        await app.updateComplete;
        await app.region.activate('view3');
        await app.updateComplete;
        expect((<HTMLElement>app.region.host.children[0]).hidden).to.be.true;
        expect((<HTMLElement>app.region.host.children[1]).hidden).to.be.true;
        expect((<HTMLElement>app.region.host.children[2]).hidden).to.be.false;
        await app.region.activate('view2');
        expect((<HTMLElement>app.region.host.children[0]).hidden).to.be.true;
        expect((<HTMLElement>app.region.host.children[1]).hidden).to.be.false;
        expect((<HTMLElement>app.region.host.children[2]).hidden).to.be.true;
        await app.region.activate('view1');
        expect((<HTMLElement>app.region.host.children[0]).hidden).to.be.false;
        expect((<HTMLElement>app.region.host.children[1]).hidden).to.be.true;
        expect((<HTMLElement>app.region.host.children[2]).hidden).to.be.true;*/
    })
});
