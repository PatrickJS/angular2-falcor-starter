import 'angular2-universal/polyfills';

import {bootstrap, enableProdMode, BROWSER_ROUTER_PROVIDERS, BROWSER_HTTP_PROVIDERS} from 'angular2-universal';

import {App} from './app/app.component';

import {BROWSER_FALCOR_PROVIDERS} from './app/angular2-falcor/browser';

enableProdMode();



bootstrap(App, [
  ...BROWSER_ROUTER_PROVIDERS,
  ...BROWSER_HTTP_PROVIDERS,
  ...BROWSER_FALCOR_PROVIDERS
]);
