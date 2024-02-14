import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { SocketIoConfig, SocketIoModule } from "ngx-socket-io";

const config: SocketIoConfig = {
  url: 'http://localhost:8080', options: {
    withCredentials: true,
  }
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(SocketIoModule.forRoot(config)),
  ]
};
