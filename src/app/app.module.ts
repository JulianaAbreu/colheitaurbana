import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler, NavController, NavParams } from 'ionic-angular';
import { MyApp } from './app.component';
//Incluindo módulo HTTP para consumir API
import { HttpModule } from '@angular/http';
import { NativeStorage } from '@ionic-native/native-storage';
import { GoogleMaps } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import { DeviceOrientation } from '@ionic-native/device-orientation';
import { IonicStorageModule } from '@ionic/storage';

import { Component } from "@angular/core/";
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { VisitaPage } from '../pages/visita/visita';
import { LoginPage } from '../pages/login/login';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//Incluindo Colheita provider para consumir API
import { ColheitaProvider } from '../providers/colheita/colheita';
import { QRScanner } from '@ionic-native/qr-scanner';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    VisitaPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),//Incluido para storage e login - Gabi
    HttpModule, //Incluindo módulo HTTP para consumir API
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    VisitaPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    NativeStorage,
    GoogleMaps,
    Geolocation,
    QRScanner,
    DeviceOrientation,
    ColheitaProvider, //Incluindo Colheita provider para consumir API
  ]
})
export class AppModule {}
