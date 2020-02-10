import createMockStore from 'redux-mock-store';
import * as sinon from 'sinon';
import { createLocalizer, LocalizationSelectors } from '../../src';
describe('locale mixin test suite', () => {
  let mockStore: any;
  let localizationSelectors: LocalizationSelectors;
  const testLocales = {
    ca: { test: { property1: 'propietat1' } },
    en: { test: { property1: 'property1' } }
  };
  beforeEach(() => {
    sinon.restore();
    mockStore = createMockStore([])();
    localizationSelectors = {
      localizationSelector: null,
      formatsSelector: sinon.stub().returns(null),
      languageSelector: sinon.stub().returns('ca'),
      localesSelector: sinon.stub().returns(testLocales)
    };
  });
  it('create localizer test', () => {
    let spy = sinon.spy();
    createLocalizer(mockStore, spy, localizationSelectors);
    expect(spy.calledOnce).toBeTruthy();
  });
  it('create localizer updates when localization properties change', () => {
    let spy = sinon.spy();
    createLocalizer(mockStore, spy, localizationSelectors);
    expect(spy.calledOnce).toBeTruthy();

    (<sinon.SinonStub>localizationSelectors.languageSelector).returns('en');
    mockStore.dispatch({ type: 'aux' });
    expect(spy.calledTwice).toBeTruthy();

    (<sinon.SinonStub>localizationSelectors.localesSelector).returns({ ca: {}, en: {} });
    mockStore.dispatch({ type: 'aux' });
    expect(spy.calledThrice).toBeTruthy();

    (<sinon.SinonStub>localizationSelectors.formatsSelector).returns({ ca: {}, en: {} });
    mockStore.dispatch({ type: 'aux' });
    expect(spy.callCount === 4).toBeTruthy();
  });
  it('create localizer does not update when localization properties do not change', () => {
    let spy = sinon.spy();
    createLocalizer(mockStore, spy, localizationSelectors);
    expect(spy.calledOnce).toBeTruthy();

    mockStore.dispatch({ type: 'aux' });
    expect(spy.calledOnce).toBeTruthy();

    mockStore.dispatch({ type: 'aux' });
    expect(spy.calledOnce).toBeTruthy();

    mockStore.dispatch({ type: 'aux' });
    expect(spy.calledOnce).toBeTruthy();
  });
});
