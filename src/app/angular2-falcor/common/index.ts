import {Injectable, OpaqueToken} from 'angular2/core';
import {Observable} from 'rxjs/Observable';


export const DATASOURCE_URL = new OpaqueToken('dataSourceUrl');
export const DATASOURCE_CONFIG = new OpaqueToken('dataSourceConfig');

export const FALCOR_CACHE = new OpaqueToken('falcorCache');

type PromiseOrObservable = Observable<any> | Promise<any>;

@Injectable()
export abstract class DataSource {
  abstract get(pathSet: any): PromiseOrObservable | any;
  abstract set(jsongEnv: any): PromiseOrObservable | any;
  abstract call(callPath: any, args?: any, pathSuffix?: any, paths?: any): PromiseOrObservable | any;
}




@Injectable()
export abstract class Model {
  constructor(public store: DataSource) {}
  abstract get(path: Array<string> | Array<any> | any): any;
  abstract getValue(path: Array<string> | Array<any> | any): any;
  abstract set(path: Array<any> | any, value: any): PromiseOrObservable;
  abstract set(call): PromiseOrObservable;
  abstract withoutDataSource(): any;
}
