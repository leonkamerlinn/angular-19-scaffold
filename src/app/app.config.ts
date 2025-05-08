import {
  ApplicationConfig,
  importProvidersFrom,
  isDevMode,
  provideZoneChangeDetection,
  provideAppInitializer
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideClientHydration, withEventReplay} from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideRouterStore } from '@ngrx/router-store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { RouterSerializer } from '@app-core/router-serializer';
import { provideHttpClient, withFetch, withInterceptors, withJsonpSupport } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '@environments/environment';
import { initializeAppFactory } from '@app-core/app-initializer';
import { authInterceptor } from '@app-core/interceptors/auth.interceptor';
import { loggingInterceptor } from '@app-core/interceptors/logging.interceptor';
import { provideTransloco } from '@jsverse/transloco';
import { TranslocoHttpLoader } from './transloco-loader';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideAnimationsAsync(),
    provideStore(),
    provideEffects(),
    provideRouterStore({ serializer: RouterSerializer }),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideHttpClient(
      withFetch(),
      // Uncomment and customize interceptors as needed
      withInterceptors([authInterceptor, loggingInterceptor]),
      withJsonpSupport() // Uncomment if JSONP support is needed
    ),
    provideAppInitializer(initializeAppFactory()),

    importProvidersFrom([AngularFireModule.initializeApp(environment.firebaseConfig)]),
    
    // Uncomment to enable service worker support (PWA)
    // provideServiceWorker('ngsw-worker.js', {
    //   enabled: !isDevMode(),
    //   registrationStrategy: 'registerWhenStable:30000'
    // }),

    // Internationalization support
    provideTransloco({
      config: {
        availableLangs: ['en', 'es', 'fr'],
        defaultLang: 'en',
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      },
      loader: TranslocoHttpLoader
    }),
  ]
};
