import * as path from 'path';
import * as express from 'express';
import * as bodyParser from 'body-parser';

// Angular 2 Universal
import 'angular2-universal/polyfills';
import {
  provide,
  enableProdMode,
  expressEngine,
  REQUEST_URL,
  ORIGIN_URL,
  BASE_URL,
  NODE_ROUTER_PROVIDERS,
  NODE_HTTP_PROVIDERS,
  ExpressEngineConfig
} from 'angular2-universal';

// Application
import {App} from '../app/app.component';
import {NODE_FALCOR_PROVIDERS} from '../app/angular2-falcor/node';

const app = express();
const ROOT = path.join(path.resolve(__dirname, '..', '..'));
const PORT = 3000;
const ORIGIN = 'http://localhost:' + PORT;

enableProdMode();

// Express View
app.engine('.html', expressEngine);
app.set('views', path.join(ROOT, 'src'));
app.set('view engine', 'html');

app.use(bodyParser.json());


function ngApp(req, res) {
  let baseUrl = '/';
  let url = req.originalUrl || '/';

  let config: ExpressEngineConfig = {
    directives: [ App ],
    platformProviders: [
      provide(ORIGIN_URL, {useValue: ORIGIN}),
      provide(BASE_URL, {useValue: baseUrl}),
    ],
    providers: [
      provide(REQUEST_URL, {useValue: url}),
      ...NODE_ROUTER_PROVIDERS,
      ...NODE_HTTP_PROVIDERS,
      ...NODE_FALCOR_PROVIDERS
    ],
    preboot: false
  };

  res.render('index', config);
}

// Serve static files
app.use(express.static(ROOT, {index: false}));

// Our API for demos only
app.get('/data.json', (req, res) => {
  res.json({
    data: 'fake data'
  });
});


var falcorExpress = require('falcor-express');
var Router = require('falcor-router');

app.use('/model.json', falcorExpress.dataSourceRoute((req, res) => {
  // create a Virtual JSON resource with single key ("greeting")
  return new Router([
    {
      route: 'greeting',
      get: () => {
        return {
          path: ['greeting'],
          value: 'Hello World'
        };
      }
    }
  ]);
}));
// Routes with html5pushstate
app.use('/', ngApp);
app.use('/about', ngApp);
app.use('/home', ngApp);

// Server
app.listen(PORT, () => {
  console.log('Process ' + process.pid + ' Listen on ' + ORIGIN);
});
