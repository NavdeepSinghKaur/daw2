import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { provideFirestore } from '@angular/fire/firestore';
import { routes } from './app/app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from './environments/environment';
import { getFirestore } from '@angular/fire/firestore';
import { AppComponent } from './app/app.component';
import { getAuth, provideAuth } from '@angular/fire/auth';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideFirebaseApp(() => initializeApp((environment as any).firebaseConfig)), // only works like this idk why
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    provideRouter(routes, withPreloading(PreloadAllModules)),
  ],
});
