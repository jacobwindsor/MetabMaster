import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

// Have to import Pvjs from index.html as UMD for now because of https://github.com/furqanZafar/react-selectize/pull/130
// BridgeDbJs uses react-selectize. The problem causes a breaking warning when building
// TODO: Use normal import when new version of react-selectize released
// import 'pvjs';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
