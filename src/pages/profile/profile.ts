import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from "angularfire2/auth";
import { Profile } from "../../models/profile";
import { ProfilesService } from "../../services/profiles.service";

/**
 * Generated class for the ProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  profile = {} as Profile;
  uid = null;

  constructor(private afAuth: AngularFireAuth,
              public navCtrl: NavController, 
              public navParams: NavParams,
              public profilesService: ProfilesService) {
    //   console.log('variable global: ' + this.profilesService.loginState);

      if (this.profilesService.loginState){
        //   console.log('estado de la variable  loginstate: ' + this.profilesService.loginState);
          this.uid = 1;
          this.afAuth.authState.take(1).subscribe(auth => {
                this.profilesService.getProfile(auth.uid).subscribe(profile => {
                    this.profile = profile;
                })
          });
      }else{
          this.uid = 0;
      }
  }

  createProfile(){
      this.afAuth.authState.take(1).subscribe(auth => {
          this.profile.uid = auth.uid;
          this.profilesService.createProfile(this.profile)
              .then(() => this.navCtrl.setRoot('HomePage'))
      })
  }

}