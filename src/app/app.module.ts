import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TreeGridComponent } from './tree-grid/tree-grid.component';
import { HttpClientModule } from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular';
import { Datasource } from './tree-grid/data-source.service';

@NgModule({
  declarations: [
    AppComponent,
    TreeGridComponent
  ],
  imports: [
    BrowserModule,
    AgGridModule.withComponents([]),
    HttpClientModule
  ],
  providers: [ Datasource ],
  bootstrap: [AppComponent]
})
export class AppModule { }
