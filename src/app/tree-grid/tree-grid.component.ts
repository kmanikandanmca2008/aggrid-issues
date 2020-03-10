import { Component, OnInit } from '@angular/core';
import { TreeGridService } from './tree-grid.service';
import { GridOptions } from 'ag-grid-community';
import { Datasource } from './data-source.service';

@Component({
  selector: 'app-tree-grid',
  templateUrl: './tree-grid.component.html',
  styleUrls: ['./tree-grid.component.scss']
})
export class TreeGridComponent implements OnInit {
  agGridOptions: GridOptions;
  constructor(private service: TreeGridService, private ds: Datasource) { }

  ngOnInit(): void {
    this.agGridOptions = this.service.initConfig();

  }

  onGridReady($event) {
    // this.service.getData().subscribe((r: any) => {
    //   this.agGridOptions.api.setRowData(r.data);
    //   this.agGridOptions.api.refreshCells();
    // });
    this.doOnGridReady($event);
  }

  private doOnGridReady(params: any) {
    this.ds.url = 'assets/data.json';
    const queryParams: {
      key: string;
      value: string;
    }[] = [];
    queryParams.push({ key: 'treeSchema', value: 'true' });
    this.ds.updateQueryParams(queryParams);
    this.ds.parentKey = 'id';
     this.ds.paramInterceptor = this.dataInterceptor.bind(this);
    this.ds.dataInterceptor = this.dataInterceptor.bind(this);
    if (params.api) {
      params.api.setServerSideDatasource(this.ds);
    }
    if (this.agGridOptions != null && this.agGridOptions.columnApi != null) {
      this.agGridOptions.columnApi.autoSizeAllColumns();
    }
  }

  private dataInterceptor(d) {
    return d;
  }

}
