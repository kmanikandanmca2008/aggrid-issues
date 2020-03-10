import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  IServerSideDatasource,
  IServerSideGetRowsParams
} from 'ag-grid-community';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';


@Injectable()
export class Datasource implements IServerSideDatasource {
  url: string;
  parentKey: string;
  // tslint:disable-next-line:variable-name
  private _params: { key: string; value: string }[] = [];
  paramInterceptor: Function;
  dataInterceptor: Function;

  private dataSourceError: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  dataError$ = this.dataSourceError.asObservable();

  private dataSourceLoaded: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  dataLoaded$ = this.dataSourceLoaded.asObservable();
  // tslint:disable-next-line:variable-name
  constructor(private _http: HttpClient) { }

  updateQueryParams(qs: { key: string; value: string }[]) {
    if (qs && qs.length > 0) {
      qs.forEach(qsi => {
        if (this.isQueryParamExists(qsi.key)) {
          this._params.find(i => i.key === qsi.key).value = qsi.value;
        } else {
          this._params.push(qsi);
        }
      });
    }
  }

  removeParamByKey(key: string) {
    this._params.splice(this._params.findIndex(i => i.key === key), 1);
  }

  isQueryParamExists(key: string): boolean {
    return this._params.filter(i => i.key === key).length > 0;
  }

  getRows(params: IServerSideGetRowsParams) {
    this.paramInterceptor(params);
    let url: string;
    url = this.url;
    const reqParams = this.getRequestParams(params);
    this._http
      .get(url, { params: new HttpParams({ fromObject: reqParams }) })
      .pipe(
        map(
          (res: {
            data: any[];
            totalCount?: number;
            count?: number
            start?: number
          }): { rows: any[]; lastRow: number } => {
            if (this.dataInterceptor) {
              res.start = reqParams.start ? reqParams.start : 0;
              res = this.dataInterceptor(res);
            }
            return {
              rows: res.data,
              lastRow: res.totalCount || res.count
            };
          }
        )
      )
      .subscribe(
        (response: { rows: any[]; lastRow: number }) => {
          params.successCallback(response.rows, response.lastRow);
          this.dataSourceLoaded.next(true);
        },
        er => {
          params.failCallback();
          this.dataSourceError.next(true);
          params.successCallback([], 0);
        },
        () => {
        }
      );
  }

  private getRequestParams(params: IServerSideGetRowsParams) {
    const clientReqParams = <any>{};

    // set pagination params
    clientReqParams.start = params.request.startRow;
    clientReqParams.limit = params.request.endRow - params.request.startRow;

    // set parent key to fetch children rows.
    if (params.parentNode && params.parentNode.data) {
      clientReqParams.parentId = params.parentNode.data[this.parentKey];
    }

    if (this._params.length > 0) {
      this._params.forEach(p => {
        clientReqParams[p.key] = p.value;
      });
    }

    return clientReqParams;
  }
}
