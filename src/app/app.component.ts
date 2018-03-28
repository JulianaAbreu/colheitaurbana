import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NativeStorage } from '@ionic-native/native-storage';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  
  rootPage:any;

  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen, 
    public nativeStorage: NativeStorage
  ) {

    platform.ready().then(() => {
      
      this.nativeStorage.getItem('login')
      .then(
        data =>  this.rootPage = TabsPage,
        error => this.rootPage = LoginPage
      );

      statusBar.styleDefault();
      splashScreen.hide();      
    });
  }
}
