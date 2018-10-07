import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LandingPage } from '../pages/landing/landing';
import { SalidaPage } from '../pages/salida/salida';
import { MenuComponent } from '../components/menu/menu';
import { InputComponent } from '../components/input/input';
import { ServicioFiltroComponent } from '../components/servicio-filtro/servicio-filtro';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LandingPage,
    SalidaPage,
    MenuComponent,
    InputComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LandingPage,
    SalidaPage,
    MenuComponent,
    InputComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ServicioFiltroComponent,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
