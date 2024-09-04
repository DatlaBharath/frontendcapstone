import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
  //   {
  //   provide: RxStompService,
  //   useFactory: rxStompServiceFactory,
  //   deps: [InjectableRxStompConfig],
  // },
  // {
  //   provide: InjectableRxStompConfig,
  //   useValue: myRxStompConfig,
  // },
  provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),provideHttpClient(),]
};
