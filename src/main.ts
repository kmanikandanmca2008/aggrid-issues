import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { LicenseManager } from 'ag-grid-enterprise';

if (environment.production) {
  enableProdMode();
}
// tslint:disable-next-line:max-line-length
const AG_GRID_ENTERPRISE_KEY = 'Anuta_Networks_International_LLC__Atom_3Devs23_January_2020__MTU3OTczNzYwMDAwMA==7ab9c2e7f71c85689325b6c6906fdd27';

LicenseManager.setLicenseKey(AG_GRID_ENTERPRISE_KEY);

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
