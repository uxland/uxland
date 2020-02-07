import * as tslib_1 from "tslib";
import createMockStore from "redux-mock-store";
import { html, LitElement } from "lit-element";
import * as sinon from "sinon";
import { customElement, query } from "lit-element/lib/decorators";
import { localeMixin } from "../../src";
const assert = chai.assert;
const should = chai.should();
const fixtureElementName = "test-fixture";
const defaultComponentName = "custom-element";
const getComponentName = (nameBase) => {
    let counter = 0;
    return () => `${nameBase}${++counter}`;
};
const getDefaultComponentName = getComponentName(defaultComponentName);
const addComponentToFixture = (componentName) => {
    const container = fixture(fixtureElementName);
    const component = document.createElement(componentName);
    container.appendChild(component);
    return component;
};
const createDefaultComponent = (store, selectors, factory) => {
    const componentName = getDefaultComponentName();
    let Component = class Component extends localeMixin(store, selectors, factory)(LitElement) {
        render() {
            return html `<h1 id='header'>${this.localize('test.property1')}</h1>`;
        }
    };
    tslib_1.__decorate([
        query("#header"),
        tslib_1.__metadata("design:type", HTMLHeadElement)
    ], Component.prototype, "header", void 0);
    Component = tslib_1.__decorate([
        customElement(componentName)
    ], Component);
    return addComponentToFixture(componentName);
};
const action = { type: "@@NOP" };
suite("locale mixin test suite", () => {
    let mockStore;
    let localesStub, languageStub, formatsStub, factoryStub;
    let selectors;
    const testLocales = {
        ca: { test: { property1: "propietat1" } },
        en: { test: { property1: "property1" } }
    };
    setup(() => {
        sinon.restore();
        mockStore = createMockStore([])();
        languageStub = sinon.stub().returns("ca");
        localesStub = sinon.stub().returns(testLocales);
        formatsStub = sinon.stub().returns(null);
        factoryStub = sinon.stub().returns(() => "hello");
        selectors = {
            localesSelector: localesStub,
            formatsSelector: formatsStub,
            localizationSelector: null,
            languageSelector: languageStub
        };
    });
    test("mixin test", async () => {
        let component = createDefaultComponent(mockStore, selectors, factoryStub);
        await component.updateComplete;
        assert.isNull(component.formats);
        assert.equal(component.language, "ca");
        assert.deepEqual(component.locales, testLocales);
        should.exist(component.localize);
        assert.equal(component.localize("my-key"), "hello");
        assert.isTrue(component.useKeyIfMissing);
    });
    test("localize is recomputed if locales, formats, language or useKeyifMissing properties change", async () => {
    });
    test("localize is not recomputed if locales, formats, language or useKeyifMissing properties do not change", async () => {
        let component = createDefaultComponent(mockStore, selectors, factoryStub);
        await component.updateComplete;
        assert.isTrue(factoryStub.calledOnce);
        languageStub.returns("ca");
        mockStore.dispatch(action);
        await component.updateComplete;
        assert.isTrue(factoryStub.calledOnce);
        formatsStub.returns(null);
        mockStore.dispatch(action);
        await component.updateComplete;
        assert.isTrue(factoryStub.calledOnce);
        localesStub.returns(testLocales);
        mockStore.dispatch(action);
        await component.updateComplete;
        assert.isTrue(factoryStub.calledOnce);
        component.useKeyIfMissing = true;
        await component.updateComplete;
        assert.isTrue(factoryStub.calledOnce);
    });
});
