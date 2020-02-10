import { subscribe } from '@uxland/event-aggregator';
import { withBaseUrl } from '@uxland/fetch-client';
import { bind, PropertyWatch, watch } from '@uxland/lit-redux-connect';
import { regionManager } from '@uxland/regions';
import { propertiesObserver } from '@uxland/utilities';
import unary from 'ramda/es/unary';
import { Unsubscribe } from 'redux';
import { init as initApp } from './app/init';
import { appInitializedSelector, setAppInitialized } from './app/initialized';
import { LOGOUT_EVENT } from './disconnect';
import { setFormats, setLanguage, setLocales } from './mixins';
import { apiUrlSelector, appsBaseRouteSelector, setOptions } from './options';
import { init as initRouter, router } from './router';
import { store } from './store';
import { fetchUser, fetchUserFunc, ModuleInfo, modulesSelector, setUserFetch, setUserLogin } from './user';

export interface IBootstrapper {
  run(): Promise<any>;
}

export interface BootstrapOptions {
  language: string;
  locales?: any;
  fetchUser: string | fetchUserFunc;
  initialRoute?: string;
  moduleBaseRoute?: string;
  apiUrl?: string;
  appsBaseRoute?: string;
}

const initializeLocalization = (language: string, locales: Object, formats?: any) => {
  if (language) setLanguage(language);
  if (locales) setLocales(locales);
  if (formats) setFormats(formats);
};

export interface IModule {
  initialize(moduleInfo: ModuleInfo): Promise<any>;

  dispose(moduleInfo: ModuleInfo): Promise<any>;
}

export type ModulePostFn = <T = any>(mi: ModuleInfo) => (module: IModule) => Promise<T>;

const moduleInitializer: ModulePostFn = mi => module => module.initialize(mi);
const moduleDisposer: ModulePostFn = mi => module => module.dispose(mi);

export abstract class Bootstrapper extends propertiesObserver(<any>Object) implements IBootstrapper {
  private static __uxlReduxWatchedProperties: { [key: string]: PropertyWatch };
  __reduxStoreSubscriptions__: Unsubscribe[];
  @watch(modulesSelector, { store })
  modules: ModuleInfo[];
  @watch(appInitializedSelector, { store })
  appInitialized: boolean;
  @watch(appsBaseRouteSelector, { store })
  appsBaseRoute: string;
  @watch(apiUrlSelector, { store })
  apiUrl: string;

  constructor(protected options: BootstrapOptions) {
    super();
    bind(<any>this);
  }

  protected static get uxlReduxWatchedProperties(): { [key: string]: PropertyWatch } {
    if (!this.__uxlReduxWatchedProperties) this.__uxlReduxWatchedProperties = {};
    return this.__uxlReduxWatchedProperties;
  }

  public static watchProperty(name: PropertyKey, options: PropertyWatch) {
    this.uxlReduxWatchedProperties[String(name)] = options;
  }

  async run(): Promise<any> {
    setAppInitialized(false);
    withBaseUrl(this.options.apiUrl);
    setOptions({
      appsBaseRoute: this.options.appsBaseRoute,
      modulesBaseRootPath: this.options.moduleBaseRoute,
      apiUrl: this.options.apiUrl
    });
    initializeLocalization(this.options.language, this.options.locales);
    initApp(store.dispatch);
    await this.initializeUser();
    await this.handleModulesChanged(this.modules);
    initRouter(store);
    setAppInitialized(true);
    await router.navigate(window.location.href);
  }

  modulesChanged(modules: ModuleInfo[], old: ModuleInfo[]) {
    if (this.appInitialized) this.handleModulesChanged(modules, old);
  }

  apiUrlChanged(apiUrl: string) {
    withBaseUrl(apiUrl);
  }

  protected abstract moduleLoader(postFn: ModulePostFn, appsBaseRout: string): (moduleInfo: ModuleInfo) => Promise<any>;

  private async initializeUser() {
    setUserLogin(this.options.fetchUser);
    setUserFetch(this.options.fetchUser);
    try {
      await fetchUser();
    } catch (e) {}
  }

  protected async handleModulesChanged(modules: ModuleInfo[], oldModules?: ModuleInfo[]) {
    await this.runModules(oldModules, moduleDisposer);
    await this.runModules(modules, moduleInitializer);
  }

  private runModules(modules: ModuleInfo[] = [], postFn: ModulePostFn): Promise<any> {
    const loader = this.moduleLoader(postFn, this.appsBaseRoute);
    return Promise.all(modules.map(unary(loader)));
  }
}

subscribe(LOGOUT_EVENT, () => {
  regionManager.clear();
  router.navigate(window.location.href).then();
});
