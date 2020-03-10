import { Injectable } from '@angular/core';
import { GridOptions, ColDef, ITooltipParams } from 'ag-grid-community';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class TreeGridService {

  constructor(private http: HttpClient) { }

  initConfig(): GridOptions {

    const config: GridOptions = {
      suppressLoadingOverlay: false,
      suppressContextMenu: true,
      animateRows: false,
      debug: false,
      treeData: true,
      rowModelType: 'serverSide',
      cacheBlockSize: 50,
      headerHeight: 40,
      rowHeight: 35,
      maxBlocksInCache: 20,
      suppressRowClickSelection: true,
      rowMultiSelectWithClick: true,
      groupSelectsChildren: true,
      blockLoadDebounceMillis: 100,
      columnDefs: this.getColumns(),

    };

    config.autoGroupColumnDef = {
      headerName: 'Operation Name',
      field: 'operationName',
      width: 500,
      minWidth: 700,
      resizable: true,
      sortable: true,
      pinned: true,
      cellRendererParams: {
       // innerRenderer: 'operationName',
        checkbox: true
      },
      cellRenderer: 'agGroupCellRenderer'
    };
    config.rowSelection = 'multiple';
    config.groupSelectsChildren = true;
    config.isServerSideGroup = d => d.hasChildren;
    config.getServerSideGroupKey = o => o.hasChildren;
    config.defaultColDef = {
      headerCheckboxSelection: true,
      tooltip: (params: ITooltipParams) => {
        return params.value;
      }
    };

    return config;
  }

  // this.treeGridConfig = {
  //   columns: this.columns,
  //   url: '/rest/tasks',
  //   parentKey: 'id',
  //   isCheckboxSelectionEnabled: true,
  //   groupDisplayColumn: {
  //     headerName: 'Operation Name',
  //     field: 'operationName',
  //     width: 500,
  //     minWidth: 200,
  //     resizable: true,
  //     sortable :false,
  //     pinned: true,
  //   },
  //   groupingKeyField: 'hasChildren',
  //   defaultSortColumn: 'startTime',
  //   defaultSortOrder: 'desc'
  // };


  getColumns(): ColDef[] {
    return [
      {
        field: 'component.displayName',
        headerName: 'Component',
        resizable: true,
        maxWidth: 400
      },
      {
        field: 'status',
        headerName: 'Status',
        // cellRenderer: 'progressBarRenderer',
        resizable: true,
        maxWidth: 400
      },
      {
        field: 'message',
        headerName: 'Message',
        resizable: true,
        maxWidth: 400
      },
      {
        field: 'userName',
        headerName: 'Approval Seeker',
        resizable: true,
        maxWidth: 400
      },
      {
        field: 'approver',
        headerName: 'Approver',
        resizable: true,
        maxWidth: 400
      },
      {
        field: 'startTime',
        sortable: true,
        sortingOrder: ['desc', 'asc'],
        headerName: 'Start Time',
        //  cellRenderer: 'dateRenderer',
        resizable: true,
        maxWidth: 400,
        tooltipComponent: 'dateRenderer'
      },
      {
        field: 'endTime',
        headerName: 'End Time',
        // cellRenderer: 'dateRenderer',
        resizable: true,
        maxWidth: 400,
        tooltipComponent: 'dateRenderer'
      }
    ];
  }

  getData() {
    return this.http.get('assets/data.json');
  }

}
