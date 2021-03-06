import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
//import { Sqlstorage } from '../providers/sqlstorage/sqlstorage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage:any = 'LoginPage';

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, 
              public statusBar: StatusBar, 
              public splashScreen: SplashScreen,
              public alertCtrl: AlertController
            ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: 'HomePage' },
      { title: 'Perfiles', component: 'ProfilePage' },
      { title: 'Tratamientos', component: 'TreatmentPage' },
      { title: 'Calendario', component: 'CalendarioPage' }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logoutApp(){ ///<-- call from static button
    let alert = this.alertCtrl.create({
    title: 'Finalizar',
    message: 'Esta seguro de salir?',
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Salir',
        handler: () => {
          this.platform.exitApp(); // stops the app
          this.nav.push('LoginPage');
          window.close();
          console.log('Logged out');
        }
      }
    ]
  });
  alert.present();
  }
}

