import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth'
import { AngularFireDatabase, FirebaseObjectObservable } from "angularfire2/database";
import { Profile } from "../../models/profile";

/**
 * Generated class for the HomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  profileData: FirebaseObjectObservable<Profile>;

  constructor(private afAuth: AngularFireAuth, 
              private afDatabase: AngularFireDatabase,
              private toast: ToastController,
              public navCtrl: NavController, 
              public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.afAuth.authState.take(1).subscribe(data => {
      console.log(data);
      if (data && data.email && data.uid){
        this.toast.create({
          message: `Bienvenido a APP_NAME, ${data.email}`,
          duration: 3000
        }).present();

        this.profileData = this.afDatabase.object(`profile/${data.uid}`)
      }else{
        this.toast.create({
          message: `No se pudo autenticar el usuario`,
          duration: 3000
        }).present();
      }
    });  
  }

}
