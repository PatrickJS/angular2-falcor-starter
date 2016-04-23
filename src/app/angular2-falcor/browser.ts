export * from './common';
import {
  FALCOR_CACHE,
  DATASOURCE_CONFIG,
  DATASOURCE_URL,
  DataSource,
  Model,
} from './common';
import {provide} from 'angular2/core';

import * as falcor from 'falcor';
import HttpDataSource from 'falcor-http-datasource';

export const BROWSER_FALCOR_PROVIDERS: Array<any> = [
  provide(FALCOR_CACHE, {useValue: {} }),

  provide(DATASOURCE_URL, {useValue: './model.json' }),
  provide(DATASOURCE_CONFIG, {useValue: {} }),

  provide(DataSource, {
    deps: [DATASOURCE_CONFIG, DATASOURCE_URL],
    useFactory: (config, url) => new (<any>HttpDataSource)(url, config)
  }),

  provide(Model, {
    deps: [DataSource, FALCOR_CACHE],
    useFactory: (source, cache) => new falcor.Model({ cache, source })
  })
];
